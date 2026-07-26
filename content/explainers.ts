/**
 * Explainers carry no hardcoded content.
 *
 * There was a placeholder array here with six invented titles. It's gone —
 * inventing video titles on a job-search site is the one failure mode with a
 * real cost. The strip now renders only from `lib/youtube.ts`, and hides
 * itself entirely when that returns nothing.
 *
 * To turn it on: set YOUTUBE_API_KEY in the environment. Nothing else to do.
 */

export type Explainer = {
  id: string
  title: string
  duration: string
  href: string
  /** i.ytimg.com still. Allow-listed in next.config.ts. */
  thumb: string
  thumbWidth: number
  thumbHeight: number
}

export const CHANNEL_HANDLE = '@prajwalbhatia'
export const CHANNEL_URL = `https://www.youtube.com/${CHANNEL_HANDLE}`

/**
 * Every caller fetches this many and slices down locally.
 *
 * Deliberate: the layout probe, the sitemap, the home strip and /explainers all hit
 * the same URLs, so Next's fetch cache collapses them into one set of three
 * requests per build. Asking for different limits per caller meant seven.
 */
export const EXPLAINERS_LIMIT = 24

/** How many appear in the home-page strip. */
export const HOME_EXPLAINERS = 6
