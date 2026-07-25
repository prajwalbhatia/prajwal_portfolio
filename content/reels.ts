/**
 * Reels carry no hardcoded content.
 *
 * There was a placeholder array here with six invented titles. It's gone —
 * inventing video titles on a job-search site is the one failure mode with a
 * real cost. The strip now renders only from `lib/youtube.ts`, and hides
 * itself entirely when that returns nothing.
 *
 * To turn it on: set YOUTUBE_API_KEY in the environment. Nothing else to do.
 */

export type Reel = {
  id: string
  title: string
  duration: string
  href: string
}

export const CHANNEL_HANDLE = '@prajwalbhatia'
export const CHANNEL_URL = `https://www.youtube.com/${CHANNEL_HANDLE}`
