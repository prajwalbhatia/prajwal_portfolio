/**
 * Employment history, newest first.
 *
 * `highlights` render on Work and the HTML résumé.
 */

export type Role = {
  id: string
  title: string
  company: string
  location: string
  start: string // MM/YYYY
  end: string | 'present'
  /** Marks an internal promotion rather than a new employer. */
  promotion?: boolean
  highlights: string[]
}

export const roles: Role[] = [
  {
    id: 'vi-sde3',
    title: 'Senior Software Engineer (SDE-3)',
    company: 'Virtual Internships',
    location: 'Remote, United Kingdom',
    start: '04/2025',
    end: '09/2026',
    promotion: true,
    highlights: [
      'Reduced Batch Selection **LCP p75 by 42% (5.45s to 3.17s)** and Intern Profile **CLS p75 by 97% (0.229 to 0.006)** through resource prioritisation, deferred analytics and layout stabilisation.',
      'Designed and built the application’s **autosave and draft-recovery system** with local drafts, debounced API writes and validation-aware saves, covered by **72 tests**.',
      'Built a reusable **React and TypeScript résumé builder** in a shared profile library, with edit and view modes, section feedback and keyboard accessibility.',
      'Owned frontend development for a configurable **5–8-step application redesign** with a backend engineer and designer; time to apply fell **from 28 to 12 minutes**, completion rose **24%** and drop-off fell **31%**.',
      'Refactored **Batch Selection** across React and Express, centralising eligibility and flow decisions in backend services and introducing typed **RTK Query** hooks with test coverage.',
      'Built a **Node.js, BullMQ and Redis thumbnail pipeline**: Open Graph extraction handled about **55% of URLs in roughly one second**; the Puppeteer fallback and cloud storage supported **95% processing success**.',
    ],
  },
  {
    id: 'vi-sde2',
    title: 'Software Development Engineer 2 (Frontend)',
    company: 'Virtual Internships',
    location: 'Remote, United Kingdom',
    start: '01/2023',
    end: '04/2025',
    highlights: [
      'Developed multi-step **candidate recommendation workflows** with configurable selection order, eligibility-aware tables, company-contact selection and customisable email previews.',
      'Built a reusable **React and TypeScript notes module** across candidate, company, recommendation and placement workflows, with rich-text editing, contextual tagging, filtering and paginated infinite scrolling.',
      'Modernised legacy **Ant Design and Elastic UI** screens with **Material UI**, standardising reusable components and typography across candidate-discovery and operations workflows.',
    ],
  },
  {
    id: 'extramarks',
    title: 'Software Developer',
    company: 'Extramarks Education India Pvt. Ltd.',
    location: 'Noida, India',
    start: '07/2021',
    end: '01/2023',
    highlights: [
      'Built interactive learning-video features across **React web and React Native** applications, synchronising animations, games, PDFs and timestamped assessments with progress milestones.',
      'Implemented **offline video downloads** with profile-specific media caching and class, chapter and topic filters.',
    ],
  },
  {
    id: 'attosol',
    title: 'Associate Software Engineer',
    company: 'Attosol Technologies',
    location: 'Kolkata, India',
    start: '08/2019',
    end: '07/2021',
    highlights: [
      'Built File Manager and Image Manager features with documented, reusable **React components** adopted across the platform.',
      'Reduced redundant API calls by **50%** through client-side caching, improving dashboard responsiveness.',
    ],
  },
]

/**
 * Measured before/after pairs used by the social preview image.
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

/** A few concrete habits that shape how I work with a team. */
export type Practice = {
  area: string
  title: string
  detail: string
  evidence: string | null
}

export const practices: Practice[] = [
  {
    area: 'Code review',
    title: 'Try the feature before approving it',
    detail:
      'I review the code, use the feature and compare it with the design. That catches gaps a code review alone can miss.',
    evidence: '17 issues caught before one release',
  },
  {
    area: 'Incident response',
    title: 'Fix it and learn why it reached users',
    detail:
      'After restoring service, I trace the cause and improve the checks or handoff that missed it.',
    evidence: 'P0 fix deployed in 29 minutes',
  },
  {
    area: 'Mentoring',
    title: 'Give new engineers a clear path in',
    detail:
      'I pair on early tasks, give useful reviews and help people take ownership of their work.',
    evidence: 'Two interns mentored; one joined full time',
  },
]
