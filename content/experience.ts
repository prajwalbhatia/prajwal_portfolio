/**
 * Employment history, newest first.
 *
 * `highlights` render on the home ledger — keep to the strongest 3–5 per role.
 * `result` is the single figure shown in the /work table; omit when there isn't
 * an honest one. Never invent a number here.
 */

export type Role = {
  id: string
  title: string
  shortTitle: string
  company: string
  location: string
  start: string // MM/YYYY
  end: string | 'present'
  /** Marks an internal promotion rather than a new employer. */
  promotion?: boolean
  highlights: string[]
  result?: string
  coreWork: string
}

export const roles: Role[] = [
  {
    id: 'vi-sde3',
    title: 'Senior Software Engineer (SDE-3)',
    shortTitle: 'Senior SWE · SDE-3',
    company: 'Virtual Internships',
    location: 'Remote, United Kingdom',
    start: '04/2025',
    end: 'present',
    promotion: true,
    coreWork: 'Async thumbnail pipeline · review standards · P0 ownership',
    result: '95% / 8×',
    highlights: [
      'Built an async thumbnail extraction service on **Node, BullMQ, Puppeteer and GCS** — a two-tier pipeline whose OG-tag fast path clears **~55% of URLs in ~1s**, **8× faster** than the Puppeteer fallback, at a **95%** success rate in production.',
      'Re-architected the Batch Selection flow: a **500-line component** decomposed into focused hooks, Redux thunks migrated to **RTK Query**, and business rules moved server-side for a single source of truth.',
      "Co-authored the team's **AI-assisted development standards** — frontend guidelines and a reusable skills library across core repos.",
      'Rebuilt PR review from code-only into a three-layer standard covering code, functionality and design. Caught **17 issues** in one admin-surface review before release.',
      'Mentored **2 interns** through onboarding and review cycles; one converted to a full-time offer.',
    ],
  },
  {
    id: 'vi-sde2',
    title: 'Software Development Engineer 2 (Frontend)',
    shortTitle: 'SDE-2, Frontend',
    company: 'Virtual Internships',
    location: 'Remote, United Kingdom',
    start: '01/2023',
    end: '04/2025',
    coreWork: 'Core Web Vitals programme across four flows',
    result: '−42% LCP',
    highlights: [
      'Led Core Web Vitals optimisation on high-traffic pages: batch-selection **LCP p75 5.45s → 3.17s (−42%)** through LCP image preloading, third-party preconnects and deferred analytics.',
      'Improved intern-profile **CLS p75 from 0.229 → 0.006** using reserved layout space and skeleton loaders.',
      'Earlier onboarding and dashboard work: LCP **9.9s → 8.6s** and **5.9s → 5.5s**, CLS **0.44 → 0.24** and **0.38 → 0.24**.',
      'Resolved complex cross-browser and cross-platform production issues through systematic debugging and targeted automated testing.',
    ],
  },
  {
    id: 'extramarks',
    title: 'Software Developer',
    shortTitle: 'Software Developer',
    company: 'Extramarks Education India Pvt. Ltd.',
    location: 'Noida, India',
    start: '07/2021',
    end: '01/2023',
    coreWork: 'Video player platform, background downloads',
    highlights: [
      'Owned the **video player platform** end to end — playback, background video downloads, session activity tracking and milestone event instrumentation.',
      'Refactored legacy frontend modules into reusable, documented React components, standardising UI patterns across the team.',
    ],
  },
  {
    id: 'attosol',
    title: 'Associate Software Engineer',
    shortTitle: 'Associate SWE',
    company: 'Attosol Technologies',
    location: 'Kolkata, India',
    start: '08/2019',
    end: '07/2021',
    coreWork: 'Client caching, request dedup, TTL invalidation',
    result: '−50% calls',
    highlights: [
      'Reduced API call volume by **50%** with client-side caching, request deduplication and TTL-based invalidation, lowering server load on data-heavy workflows.',
      "Translated high-fidelity wireframes into responsive React interfaces and reusable component patterns for the team's evolving design system.",
    ],
  },
]

/**
 * The proof ledger under the hero — the site's clearest statement of the
 * before/after motif. Every entry must be a genuine measured pair, and every
 * one must be defensible in conversation.
 *
 * Figures that are not pairs do not belong here. `95% pipeline success` and
 * `29 min P0 resolution` are real but single-valued; they live in
 * `beyondCode` and on the case studies instead. Do not pad this list with
 * them — a fabricated "before" would undo the whole argument.
 */
export type MetricPair = {
  label: string
  was: string
  now: string
  /** Where it was measured. Kept short; renders as a mono caption. */
  where: string
}

export const proofLedger: MetricPair[] = [
  {
    label: 'LCP p75',
    was: '5.45s',
    now: '3.17s',
    where: 'Batch selection · highest-traffic flow',
  },
  { label: 'CLS p75', was: '0.229', now: '0.006', where: 'Intern profile' },
  { label: 'Bundle', was: '513KB', now: '240KB', where: 'fe-intern-profile package' },
  { label: 'LCP p75', was: '9.9s', now: '8.6s', where: 'Onboarding' },
  { label: 'CLS p75', was: '0.44', now: '0.24', where: 'Dashboard' },
]

/**
 * Process changes, framed as before/after. Same motif, applied to how a team
 * works rather than how code runs — which is the distinction between SDE-2
 * and SDE-3 and is almost never shown on an engineering portfolio.
 */
export type PracticePair = {
  area: string
  was: string
  now: string
  /** One sentence on why the change mattered. The was/now pair is the claim;
      this is the reasoning an interviewer would ask for next. */
  detail: string
  /** A verified figure, or null when the change is real but unmeasured. */
  evidence: string | null
}

export const practices: PracticePair[] = [
  {
    area: 'Code review',
    was: 'Reviews stopped at the code',
    now: 'Three layers — code, functionality, design',
    detail:
      'Approving a diff that compiles is not the same as approving a feature. Reviewers now open the branch, use it, and check it against the PRD and the design before approving.',
    evidence: '17 issues caught in one admin-surface review, before release',
  },
  {
    area: 'Incident response',
    was: 'Fix it, ship it, move on',
    now: 'Post-incident review is part of the fix',
    detail:
      'A P0 that gets patched without asking how it shipped will happen again in a different file. Every incident now ends with a product-design review rather than a closed ticket.',
    evidence: '29 minutes from P0 report to deployment',
  },
  {
    area: 'AI-assisted development',
    was: 'Everyone prompting their own way',
    now: 'Shared frontend guidelines and a reusable skills library',
    detail:
      'Without shared conventions, generated code arrives in four different styles and review gets slower, not faster. Co-authored the standards so the output lands consistent across core repos.',
    evidence: null,
  },
  {
    area: 'Handoff',
    was: 'Requirements arriving mid-build',
    now: 'Cross-functional kickoff before a line is written',
    detail:
      'Most late-stage rework traces back to a question nobody asked at the start. Design, frontend, backend and QA now agree the shape of a feature up front.',
    evidence: null,
  },
  {
    area: 'Mentoring',
    was: 'Interns left to find their own way in',
    now: 'Structured onboarding, ramp-up and review cycles',
    detail:
      'Two interns taken from first commit to conversion, with review used as teaching rather than gatekeeping.',
    evidence: '1 of 2 converted to a full-time offer',
  },
]

/** What separates SDE-3 from SDE-2. Rendered as a table on /work. */
export const beyondCode = [
  {
    area: 'Code review',
    change: 'Moved the team from code-only review to three layers — code, functionality, design',
    evidence: '17 issues caught pre-release',
    isMetric: true,
  },
  {
    area: 'AI-assisted dev',
    change: 'Co-authored frontend guidelines and a reusable skills library across core repos',
    evidence: 'Adopted team-wide',
    isMetric: false,
  },
  {
    area: 'Incident response',
    change: 'Co-resolved a P0 end to end; introduced post-incident delivery process',
    evidence: '29 min to deploy',
    isMetric: true,
  },
  {
    area: 'Mentoring',
    change: 'Two interns through onboarding, codebase ramp-up and review cycles',
    evidence: '1 converted to full-time',
    isMetric: false,
  },
  {
    area: 'Handoff',
    change: 'Mandatory product-design reviews and cross-functional kickoffs (Design, FE, BE, QA)',
    evidence: 'Less late-stage rework',
    isMetric: false,
  },
]
