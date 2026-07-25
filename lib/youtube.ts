import type { Reel } from '@/content/reels'

/**
 * YouTube Data API v3 — uploads for a channel handle.
 *
 * Returns `[]` whenever anything is missing or fails, and the reels strip is
 * hidden on empty. That is deliberate: the alternative to real data is no
 * section, never invented titles. The site is a job-search artefact, and a
 * fabricated video list is the one failure mode that would actually cost
 * something.
 *
 * Set YOUTUBE_API_KEY in the environment to turn the section on. Quota cost is
 * 3 units per build against a 10,000/day allowance.
 */

const API = 'https://www.googleapis.com/youtube/v3'

/** ISO 8601 duration → m:ss. Returns null for anything unparseable. */
function formatDuration(iso: string): string | null {
  const m = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso)
  if (!m) return null
  const [h, min, s] = [Number(m[1] ?? 0), Number(m[2] ?? 0), Number(m[3] ?? 0)]
  const total = h * 3600 + min * 60 + s
  if (total === 0) return null
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`
}

async function get<T>(path: string, params: Record<string, string>): Promise<T | null> {
  const key = process.env.YOUTUBE_API_KEY
  if (!key) return null

  const url = new URL(`${API}/${path}`)
  for (const [k, v] of Object.entries({ ...params, key })) url.searchParams.set(k, v)

  try {
    const res = await fetch(url, { next: { revalidate: 21_600 } })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

type ChannelResponse = {
  items?: { contentDetails: { relatedPlaylists: { uploads: string } } }[]
}

type PlaylistResponse = {
  items?: { contentDetails: { videoId: string }; snippet: { title: string } }[]
}

type VideoResponse = {
  items?: { id: string; contentDetails: { duration: string } }[]
}

/**
 * Shorts have no API flag, so duration is the filter. Anything over three
 * minutes is a long-form upload and doesn't belong in a 9:16 strip.
 */
const MAX_SHORT_SECONDS = 180

export async function fetchReels(handle: string, limit = 6): Promise<Reel[]> {
  const channel = await get<ChannelResponse>('channels', {
    part: 'contentDetails',
    forHandle: handle,
  })
  const uploads = channel?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads
  if (!uploads) return []

  const playlist = await get<PlaylistResponse>('playlistItems', {
    part: 'snippet,contentDetails',
    playlistId: uploads,
    maxResults: String(Math.min(limit * 3, 50)),
  })
  const items = playlist?.items ?? []
  if (items.length === 0) return []

  const details = await get<VideoResponse>('videos', {
    part: 'contentDetails',
    id: items.map((i) => i.contentDetails.videoId).join(','),
  })
  const durations = new Map(details?.items?.map((v) => [v.id, v.contentDetails.duration]) ?? [])

  const reels: Reel[] = []
  for (const item of items) {
    const id = item.contentDetails.videoId
    const iso = durations.get(id)
    if (!iso) continue

    const seconds = (() => {
      const m = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso)
      if (!m) return Infinity
      return Number(m[1] ?? 0) * 3600 + Number(m[2] ?? 0) * 60 + Number(m[3] ?? 0)
    })()
    if (seconds > MAX_SHORT_SECONDS) continue

    const duration = formatDuration(iso)
    if (!duration) continue

    reels.push({
      id,
      title: item.snippet.title,
      duration,
      href: `https://www.youtube.com/watch?v=${id}`,
    })
    if (reels.length === limit) break
  }

  return reels
}
