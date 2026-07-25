/**
 * PLACEHOLDER CONTENT.
 *
 * These six titles are invented to show the layout. Replace them with real ones,
 * or better: delete this array and wire up the YouTube Data API v3 feed instead
 * (see lib/youtube.ts). Until then the reels strip is the only part of the site
 * not backed by something true.
 */

export type Reel = {
  id: string
  title: string
  topic: string
  duration: string
  href?: string
}

export const CHANNEL_URL = 'https://www.youtube.com/@prajwalbhatia'

export const reels: Reel[] = [
  { id: 'r1', title: 'Why useEffect runs twice', topic: 'React', duration: '0:48' },
  { id: 'r2', title: 'What LCP actually measures', topic: 'Performance', duration: '1:02' },
  { id: 'r3', title: 'Narrowing in TypeScript', topic: 'TypeScript', duration: '0:39' },
  { id: 'r4', title: 'Stop using index as key', topic: 'React', duration: '0:55' },
  { id: 'r5', title: 'RTK Query in 60 seconds', topic: 'Redux', duration: '1:11' },
  { id: 'r6', title: 'Fixing layout shift', topic: 'CSS', duration: '0:44' },
]

/** Flip to false to hide the reels strip entirely without touching layout code. */
export const SHOW_REELS = true
