/**
 * Endorsements, as screenshots of the original.
 *
 * Screenshots rather than retyped quotes, deliberately: a pull-quote in the
 * site's own typeface is indistinguishable from one somebody made up, whereas
 * a LinkedIn card shows the face, the name and the platform chrome. It is the
 * difference between a claim and evidence.
 *
 * THIS ARRAY IS EMPTY ON PURPOSE. Nothing here is written for you — inventing
 * praise and attributing it to a colleague is the one thing on this site that
 * could do real damage. Until there is a genuine one, /kind-words 404s and the
 * nav item is absent.
 *
 * To add one:
 *   1. Screenshot the recommendation, Slack message or review comment.
 *   2. Save it to public/kind-words/<something>.png
 *   3. Add an entry below. `alt` must transcribe the words in the image —
 *      otherwise the page is unreadable to a screen reader and invisible to
 *      search, which defeats most of the point of having it.
 */

export type KindWordSource = 'LinkedIn' | 'Slack' | 'PR review' | 'Performance review'

export type KindWord = {
  id: string
  /** Path under /public. */
  image: string
  width: number
  height: number
  /** Who wrote it. An unattributed endorsement is worth nothing. */
  name: string
  /** Their role, and where they worked with you. */
  title: string
  source: KindWordSource
  /** Transcription of the screenshot, for assistive tech and indexing. */
  alt: string
}

export const kindWords: KindWord[] = []

/** LinkedIn recommendations get the large treatment; the rest are a tighter grid. */
export const recommendations = kindWords.filter((k) => k.source === 'LinkedIn')
export const notes = kindWords.filter((k) => k.source !== 'LinkedIn')

export const hasKindWords = kindWords.length > 0

/**
 * Counters under the standfirst. Derived, so they can't drift from the cards —
 * except `internsMentored`, which comes from the résumé rather than from this
 * file.
 */
export const kindWordStats = {
  recommendations: recommendations.length,
  people: new Set(kindWords.map((k) => k.name)).size,
  internsMentored: 2,
}
