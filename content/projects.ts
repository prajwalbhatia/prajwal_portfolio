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
      'Preloaded the LCP image, preconnected the third-party origins, deferred analytics past interactive, and reserved layout space so nothing arrives late and pushes content down. Fifty-eight lines for the LCP work, fourteen for the CLS.',
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
      'A versioned React package the main platform installs. Above-the-fold sections stay synchronous, the rest moved behind React.lazy. Full keyboard navigation, driven by an accessibility issue filed downstream, and ongoing CVE remediation across the dependency tree.',
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
      "Every thumbnail went through a headless browser, so a single slow page could hold up the queue — and nothing was safe against SSRF.",
    tech: ['Node', 'BullMQ', 'Puppeteer', 'GCS', 'Redis'],
    summary:
      'Two-tier async extraction on BullMQ. An og:image fast path via cheerio handles most URLs with one HTTP request; Puppeteer is the fallback, not the default. SSRF validation at the edge, URL-hash deduplication, and nothing on the critical path of an API call.',
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
      "A five-step application rebuilt around not losing people's work. Hybrid auto-save — localStorage on blur, debounced API persistence, draft recovery on refresh — plus a resume parser that fills most of it in.",
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
  // Parked. Being rebuilt from scratch, so there is nothing honest to show yet.
  // The postmortem page stays at /projects/habstreak but is unlinked and
  // noindexed until the rebuild lands — don't re-add `href` before then.
  {
    id: 'habstreak',
    title: 'Habstreak',
    context: 'Personal · rebuilding',
    tags: ['Personal'],
    summary:
      'A habit tracker built on streaks and rewards. Shipped on web and the Play Store, then taken down. Currently being rebuilt from scratch.',
    status: 'sunset',
  },
]

/**
 * The home page shows four, in this order. /projects carries everything.
 *
 * An explicit list rather than a `featured` flag: the home page is the one
 * surface where order and count are a design decision, and a boolean spread
 * across nine entries lets that quietly grow to five and then six.
 */
const HOME_IDS = [
  'web-vitals',
  'thumbnail-pipeline',
  'application-flow',
  'intern-profile-package',
] as const

export const homeProjects: Project[] = HOME_IDS.map((id) => {
  const project = projects.find((p) => p.id === id)
  // Fails the build rather than silently dropping a card on a typo.
  if (!project) throw new Error(`HOME_IDS references unknown project id: ${id}`)
  return project
})
