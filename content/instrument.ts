/**
 * The home-page instrument: four load demos, each a reconstruction of a real
 * before/after from measured numbers.
 *
 * Nothing here is a screen recording. Every timing below traces to a figure in
 * `experience.ts` or a case study — 5.45s→3.17s, 0.229→0.006, 513KB→240KB,
 * 28min→12min. The visuals are diagrams of that data, and the UI says so.
 *
 * These are pure functions of `p` (scrub position, 0–1) so the component holds
 * no logic and the states can be checked without rendering anything.
 */

export type Tone = 'was' | 'now' | 'idle' | 'live'

export type Demo = {
  id: string
  num: string
  tab: string
  eyebrow: string
  caption: string
  beforeStat: string
  afterStat: string
  /** Playhead marks, as a percentage across the axis. */
  markA: { pct: number; label: string }
  markB: { pct: number; label: string }
  axisStart: string
  axisEnd: string
  /** Total duration the axis represents, in the demo's own unit. */
  domain: number
  unit: 's' | 'min'
}

export const demos: Demo[] = [
  {
    id: 'vitals',
    num: '01',
    tab: 'Web Vitals programme',
    eyebrow: 'Batch selection · highest-traffic flow · field data at p75',
    caption: 'Drag the timeline. Same page, before and after my work.',
    beforeStat: 'LCP 5.45s · CLS 0.229',
    afterStat: 'LCP 3.17s · CLS 0.006',
    markA: { pct: 52.8, label: '3.17s — after LCP' },
    markB: { pct: 90.8, label: '5.45s — before LCP' },
    axisStart: '0s',
    axisEnd: '6s',
    domain: 6000,
    unit: 's',
  },
  {
    id: 'queue',
    num: '02',
    tab: 'Thumbnail pipeline',
    eyebrow: 'Thumbnail extraction · 12 URLs through the queue',
    caption: 'Same twelve jobs. Watch how long the queue takes to drain.',
    beforeStat: 'Serial · ~1.6s each',
    afterStat: '~55% on the fast path',
    markA: { pct: 20.8, label: '4.2s — queue drained' },
    markB: { pct: 96, label: '19.2s — queue drained' },
    axisStart: '0s',
    axisEnd: '20s',
    domain: 20000,
    unit: 's',
  },
  {
    id: 'form',
    num: '03',
    tab: 'Application flow',
    eyebrow: 'Internship application · five steps · one accidental refresh',
    caption: 'Drag past the 19-minute mark and watch what a refresh costs.',
    beforeStat: 'No persistence',
    afterStat: 'Auto-save + draft recovery',
    markA: { pct: 42.8, label: '12 min — submitted' },
    markB: { pct: 99, label: '28 min — submitted' },
    axisStart: '0 min',
    axisEnd: '28 min',
    domain: 28,
    unit: 'min',
  },
  {
    id: 'bundle',
    num: '04',
    tab: 'fe-intern-profile',
    eyebrow: 'fe-intern-profile · the package the platform installs',
    caption: 'How much JavaScript a consumer downloads before anything runs.',
    beforeStat: '513 KB · one chunk',
    afterStat: '240 KB · code-split',
    markA: { pct: 17.5, label: '0.7s — interactive' },
    markB: { pct: 85, label: '3.4s — interactive' },
    axisStart: '0s',
    axisEnd: '4s',
    domain: 4000,
    unit: 's',
  },
]

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))
const pct = (n: number) => `${clamp01(n) * 100}%`

/* ---------------------------------------------------------------- 01 vitals */

/** Which blocks have painted, and whether the late banner has shoved things. */
export type PageState = {
  header: boolean
  text: boolean
  hero: boolean
  /** Space held for the hero before it arrives — the whole point of the fix. */
  heroReserved: boolean
  shifted: boolean
  note: string
}

export function vitalsState(p: number): { before: PageState; after: PageState } {
  const t = p * 6000
  return {
    before: {
      header: t >= 1400,
      text: t >= 2100,
      hero: t >= 5450,
      heroReserved: false,
      shifted: t >= 5600,
      note:
        t < 2100
          ? 'Blank. Nothing has painted yet.'
          : t < 5450
            ? 'Text is up, but the hero image — the largest element — is still missing.'
            : t < 5600
              ? 'Largest contentful paint, finally. 5.45 seconds in.'
              : 'A late banner arrives and shoves everything down. That jump is the 0.229 CLS.',
    },
    after: {
      header: t >= 400,
      text: t >= 600,
      hero: t >= 3170,
      heroReserved: true,
      shifted: false,
      note:
        t < 600
          ? 'Blank — but only for half a second.'
          : t < 3170
            ? "Text and cards are readable already. The hero's space is reserved, so nothing will move."
            : 'Done at 3.17s, and not a single pixel shifted on the way.',
    },
  }
}

/* ----------------------------------------------------------------- 02 queue */

export type Chip = { tone: Tone; label: string }

export function queueState(p: number) {
  const t = p * 20000
  const chip = (done: boolean, running: boolean, label: string): Chip =>
    done ? { tone: 'now', label } : running ? { tone: 'was', label: '···' } : { tone: 'idle', label: '—' }

  const before: Chip[] = []
  const after: Chip[] = []
  for (let i = 0; i < 12; i++) {
    // Serial Puppeteer: every job pays the full ~1.6s, one after another.
    const doneAt = (i + 1) * 1600
    before.push(chip(t >= doneAt, t >= doneAt - 1600 && t < doneAt, 'PUP'))
    // Two-tier: the og:image fast path clears roughly 55% in about a second.
    const fast = i < 7
    const aDone = fast ? 950 : i < 10 ? 2550 : 4150
    after.push(chip(t >= aDone, t >= aDone - 900 && t < aDone, fast ? 'FAST' : 'PUP'))
  }
  const beforeDone = before.filter((c) => c.tone === 'now').length
  const afterDone = after.filter((c) => c.tone === 'now').length

  return {
    before,
    after,
    beforeDone: `${beforeDone} / 12`,
    afterDone: `${afterDone} / 12`,
    beforeW: pct(t / 19200),
    afterW: pct(t / 4150),
    beforeNote:
      t < 1600
        ? 'First job is still in a headless browser.'
        : beforeDone < 12
          ? `${beforeDone} of 12 done. Every URL pays the full Puppeteer cost, one after another.`
          : 'Twelve jobs, 19.2 seconds — and a single slow page could hold up everything behind it.',
    afterNote:
      t < 950
        ? 'Both tiers started at once.'
        : afterDone < 12
          ? `${afterDone} of 12 done. The og:image path cleared most of them in about a second.`
          : 'Drained in 4.2s. Puppeteer is the fallback now, not the default.',
  }
}

/* ------------------------------------------------------------------ 03 form */

export const FORM_STEPS = [
  'Personal details',
  'Education',
  'Experience',
  'Motivation',
  'Review & submit',
] as const

const countUpTo = (arr: number[], v: number) => arr.filter((x) => v >= x).length

export function formState(p: number) {
  const m = p * 28
  // Before: four steps by minute 18, then the refresh wipes it and they retype.
  const bCount = m < 19 ? countUpTo([4, 9, 14, 18], m) : countUpTo([21, 23, 25, 27, 28], m)
  const raw = countUpTo([1, 1, 4, 7, 10, 12], m)
  const aCount = raw > 5 ? 5 : countUpTo([1, 1, 4, 7, 10], m)
  const refreshedBefore = m >= 18.6 && m < 20.6
  const refreshedAfter = m >= 9.6 && m < 11.6

  return {
    beforeFilled: bCount,
    afterFilled: aCount,
    beforeStep: `${bCount} / 5`,
    afterStep: `${aCount} / 5`,
    beforeFlag: refreshedBefore
      ? 'Page refreshed — draft lost'
      : m >= 28
        ? 'Submitted'
        : 'Nothing saved',
    beforeFlagTone: (refreshedBefore ? 'was' : 'idle') as Tone,
    afterFlag: refreshedAfter
      ? 'Page refreshed — draft restored'
      : m >= 12
        ? 'Submitted'
        : 'Saving as they type',
    afterFlagTone: (refreshedAfter ? 'now' : 'idle') as Tone,
    beforeW: pct(m / 28),
    afterW: pct(m / 12),
    beforeNote:
      m < 18.6
        ? 'Four steps in, nothing saved anywhere but the browser’s memory.'
        : m < 20.6
          ? 'The tab reloaded. Every field is gone and they start again from step one.'
          : m < 28
            ? 'Re-typing everything they already typed once.'
            : 'Submitted — 28 minutes, and most of that was done twice.',
    afterNote:
      m < 1
        ? 'They upload a résumé first.'
        : m < 9.6
          ? 'The parser filled the first two steps. Every keystroke since is in localStorage and on the server.'
          : m < 11.6
            ? 'Same refresh, same moment — the draft comes straight back.'
            : m < 12
              ? 'Straight on to review.'
              : 'Submitted in 12 minutes, with nothing lost on the way.',
  }
}

/* ---------------------------------------------------------------- 04 bundle */

export type Chunk = { name: string; size: string; w: string; tone: Tone | 'lazy' }

const AFTER_CHUNKS = [
  { name: 'critical.js — above the fold', kb: 120, s: 0, e: 700 },
  { name: 'profile-sections.js — lazy', kb: 52, s: 700, e: 1400 },
  { name: 'media-gallery.js — lazy', kb: 41, s: 1400, e: 2100 },
  { name: 'settings.js — lazy', kb: 27, s: 2100, e: 2700 },
]

export function bundleState(p: number) {
  const t = p * 4000
  const grow = (start: number, end: number) => clamp01((t - start) / (end - start))
  const bigProg = grow(0, 3400)

  let afterKb = 0
  const after: Chunk[] = AFTER_CHUNKS.map((c) => {
    const g = grow(c.s, c.e)
    afterKb += c.kb * g
    return { name: c.name, size: `${c.kb} KB`, w: pct(g), tone: c.s === 0 ? 'now' : 'lazy' }
  })

  return {
    before: [
      { name: 'main.bundle.js — everything', size: '513 KB', w: pct(bigProg), tone: 'was' as const },
      { name: '(nothing deferred)', size: '0 KB', w: '0%', tone: 'idle' as const },
    ],
    after,
    beforeKb: `${Math.round(513 * bigProg)} KB`,
    afterKb: `${Math.round(afterKb)} KB`,
    beforeFlag: t >= 3400 ? 'Interactive — 3.4s' : 'Blocked',
    beforeFlagTone: (t >= 3400 ? 'idle' : 'was') as Tone,
    afterFlag: t >= 700 ? 'Interactive — 0.7s' : 'Loading',
    afterFlagTone: (t >= 700 ? 'now' : 'idle') as Tone,
    beforeNote:
      t < 3400
        ? 'Still downloading. Nothing on the page responds yet.'
        : '3.4 seconds of dead page — and every consumer paid for sections most never open.',
    afterNote:
      t < 700
        ? 'The critical chunk is small enough to land almost immediately.'
        : t < 2700
          ? 'Interactive since 0.7s. The lazy sections are still arriving behind the fold.'
          : '240 KB total, but the part that matters shipped in 120.',
  }
}

/** Formats the running clock for a given demo and scrub position. */
export function clockLabel(demo: Demo, p: number): string {
  const v = p * demo.domain
  return demo.unit === 'min' ? `${Math.round(v)} min` : `${(v / 1000).toFixed(2)}s`
}
