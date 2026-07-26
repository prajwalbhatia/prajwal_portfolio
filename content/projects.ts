export type Project = {
  id: string
  title: string
  context: string
  /** Mono, uppercase, hairline border. Two at most — they classify, not decorate. */
  tags: string[]
  /** What was wrong before the work. Leads the detail panel — the fix only
      reads as impressive once the problem is stated. */
  problem?: string
  /** Technologies actually used. Distinct from `tags`, which classify. */
  tech?: string[]
  /**
   * A genuine measured before/after. Only set this where both numbers are
   * real; there is no single-value variant by design. Projects without one
   * render in neutrals and that is the correct outcome, not a gap to fill.
   */
  pair?: { was: string; now: string; label: string }
  summary: string
  /** Internal route or external URL. Omit when there's nothing to link to. */
  href?: string
  linkLabel?: string
  status: 'shipped' | 'sunset'
}

export const projects: Project[] = [
  {
    id: 'web-vitals',
    title: 'Web Vitals Programme',
    context: 'Virtual Internships · 2023–25',
    tags: ['Performance'],
    pair: { was: '5.45s', now: '3.17s', label: 'LCP p75' },
    problem:
      "The highest-traffic flow in the product — batch selection — took 5.45s to paint at p75. Layout shifted under people as late assets landed.",
    tech: ['Core Web Vitals', 'Datadog RUM', 'React'],
    summary:
      'Preloaded the LCP image, preconnected the third-party origins, deferred analytics past interactive, and reserved layout space so nothing arrives late and pushes content down.',
    href: '/projects/web-vitals',
    linkLabel: 'Read the case study',
    status: 'shipped',
  },
  {
    id: 'intern-profile-package',
    title: 'fe-intern-profile',
    context: 'Virtual Internships · 2024–26',
    tags: ['Package', 'Performance'],
    pair: { was: '513KB', now: '240KB', label: 'Bundle' },
    problem:
      "A versioned React package the main platform installs — and every consumer paid for the whole thing on first paint, including an accessibility gap filed downstream.",
    tech: ['React', 'TypeScript', 'Accessibility'],
    summary:
      'A versioned React package the main platform installs. Above-the-fold sections stay synchronous, the rest moved behind React.lazy. Full keyboard navigation, driven by an accessibility issue filed downstream.',
    href: '/projects/intern-profile-package',
    linkLabel: 'Read the case study',
    status: 'shipped',
  },
  {
    // No pair: the 8× and 95% figures are single-valued and unverified. A
    // fabricated "before" here would cost more than the badge is worth.
    id: 'thumbnail-pipeline',
    title: 'Thumbnail Pipeline',
    context: 'Virtual Internships · 2025',
    tags: ['Architecture', 'Backend'],
    problem:
      "Portfolio cards only had a thumbnail if the intern had uploaded a picture, and most never did — so the browse page was mostly empty boxes.",
    tech: ['Node', 'BullMQ', 'Puppeteer', 'GCS', 'Redis'],
    summary:
      'Two-tier async extraction on BullMQ that generates the thumbnail instead of waiting for one. An og:image fast path via cheerio covers most links with a single HTTP request; Puppeteer screenshots only what has no og:image to read. SSRF validation at the edge, URL-hash deduplication, and nothing on the critical path of an API call.',
    href: '/projects/thumbnail-pipeline',
    linkLabel: 'Read the case study',
    status: 'shipped',
  },
  {
    // TODO — VERIFY BEFORE THIS IS QUOTED IN AN INTERVIEW.
    // "28 → 12 min" comes from the product designer's public case study, not
    // from our own measurement. The related "50% → 83% submission rate" and
    // "+9% revenue" figures are from the same source and are deliberately NOT
    // used anywhere on the site. This pair is also kept out of `proofLedger`,
    // which is reserved for figures we measured ourselves.
    id: 'application-flow',
    title: 'Application Flow',
    context: 'Virtual Internships · 2025–26',
    tags: ['Product', 'Reliability'],
    pair: { was: '28 min', now: '12 min', label: 'Time to apply (unconfirmed)' },
    problem:
      "A five-step application that lost people's work. Refresh the tab mid-way and the draft was gone — the single biggest source of support tickets on the flow.",
    tech: ['React', 'RTK Query', 'TypeScript'],
    summary:
      "A five-step application rebuilt around not losing people's work. Hybrid auto-save — localStorage on blur, debounced API persistence, draft recovery on refresh.",
    href: '/projects/application-flow',
    linkLabel: 'Read the case study',
    status: 'shipped',
  },
  {
    // No metric by design. Nothing has been measured on this yet, and a vague
    // one would be worse than none.
    id: 'partner-landing',
    title: '10x Partner Landing Page',
    context: 'Virtual Internships · 2026',
    tags: ['Product', 'Routing'],
    summary:
      'A partner-branded landing page rendered from a catch-all slug route. Eight sections, three live API integrations, full error handling for invalid, expired and inactive partners, and correct behaviour under prefers-reduced-motion.',
    href: '/projects/partner-landing',
    linkLabel: 'Read the case study',
    status: 'shipped',
  },
  {
    // "3+ calls" is a floor, not a count — the backend PR describes the old
    // frontend making three or more sequential calls. WorkFilter therefore
    // suppresses a delta percentage for it; "-67%" would be arithmetic on an
    // approximation.
    id: 'signup-funnel',
    title: 'Signup Funnel Rebuild',
    context: 'Virtual Internships · 2026',
    tags: ['Architecture', 'Product'],
    pair: { was: '3+', now: '1', label: 'Sequential API calls' },
    problem:
      'Signup ran across three screens — one of them 148 lines of TSX and a Lottie file that collected nothing — each accumulating partial state before anything was committed.',
    tech: ['React', 'TypeScript', 'Node'],
    summary:
      'Deleted the registration page — three signup screens down to one, with country and timezone inferred rather than asked. One transactional endpoint replaced the walk, and had to absorb everyone already halfway through the old flow.',
    href: '/projects/signup-funnel',
    linkLabel: 'Read the case study',
    status: 'shipped',
  },
  {
    id: 'batch-selection',
    title: 'Batch Selection Re-architecture',
    context: 'Virtual Internships · 2026',
    tags: ['Architecture'],
    summary:
      'A 500-line component decomposed into focused hooks, legacy thunks migrated to RTK Query, and business rules moved server-side so frontend state could be deleted. Surfaced a bug silently dropping query params on every request.',
    href: '/projects/batch-selection',
    linkLabel: 'Read the case study',
    status: 'shipped',
  },
  {
    id: 'video-player',
    title: 'Video Player Platform',
    context: 'Extramarks · 2021–23',
    tags: ['Platform'],
    summary:
      'Owned playback end to end, including background downloads for students on unreliable connections, session activity tracking and milestone event instrumentation.',
    status: 'shipped',
  },

]

/**
 * The home page shows four, in this order. /work carries everything.
 *
 * An explicit list rather than a `featured` flag: the home page is the one
 * surface where order and count are a design decision, and a boolean spread
 * across nine entries lets that quietly grow to five and then six.
 */
const HOME_IDS = [
  'web-vitals',
  'thumbnail-pipeline',
  'application-flow',
  'signup-funnel',
] as const

export const homeProjects: Project[] = HOME_IDS.map((id) => {
  const project = projects.find((p) => p.id === id)
  // Fails the build rather than silently dropping a card on a typo.
  if (!project) throw new Error(`HOME_IDS references unknown project id: ${id}`)
  return project
})

/**
 * Everything, for /work — shipped first, parked last.
 *
 * /work absorbed the old /projects index, so this list is the only place a
 * case study is linked from. Dropping an entry here orphans its page.
 */
export const workProjects: Project[] = [
  ...projects.filter((p) => p.status === 'shipped'),
  ...projects.filter((p) => p.status === 'sunset'),
]

// Habstreak was the only 'sunset' entry; it and its postmortem page were
// removed while it is being rebuilt. The status field and the ordering above
// stay so that reinstating it is a content change, not a code change.
