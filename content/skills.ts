/**
 * `core: true` renders outlined in the signal colour — "what I write every day".
 * Keep that list short; if everything is core, nothing is.
 *
 * React Native is deliberately absent. It was two years, six years ago, and it
 * dilutes an otherwise clean performance-and-reliability story.
 */

export type Skill = { name: string; core?: boolean }

export const stack: Skill[] = [
  { name: 'React', core: true },
  { name: 'TypeScript', core: true },
  { name: 'JavaScript', core: true },
  { name: 'Next.js', core: true },
  { name: 'Redux · RTK Query' },
  { name: 'Node · Express' },
  { name: 'BullMQ · Redis' },
  { name: 'Puppeteer · GCS' },
  { name: 'Jest · RTL' },
  { name: 'Core Web Vitals' },
  { name: 'Datadog RUM · Sentry' },
  { name: 'Material UI' },
  { name: 'Accessibility' },
]

/**
 * Grouped view for /resume, following the PDF's two groups, with two
 * deliberate divergences:
 *
 *  - React Native is omitted. The PDF carries it for ATS keyword matching;
 *    the site does not claim it, for the reason given on `stack` above.
 *  - HTML5/CSS3, GCS, Core Web Vitals and Lighthouse are kept. The PDF
 *    dropped them in the Sep 2026 revision, but GCS carries the thumbnail
 *    pipeline and Core Web Vitals is the whole SDE-2 story — a skills list
 *    that omits them contradicts the case studies it sits next to.
 *
 * So this is a superset of the PDF by four items, on purpose. The PDF is the
 * side that needs updating; when it is, this comment can lose its second half.
 */
export const skillGroups = [
  {
    group: 'Frontend & Architecture',
    items:
      'JavaScript (ES6+), TypeScript, HTML5, CSS3, React, Next.js, React Router, Vite, Material UI, Redux Toolkit, RTK Query, Component Architecture, Design Systems, Accessibility',
  },
  {
    group: 'Backend, Testing & Production',
    items:
      'Node.js, Express, BullMQ, Redis, Puppeteer, GCS, TypeORM, REST APIs, Jest, React Testing Library, Core Web Vitals (LCP, CLS, INP), Datadog, Sentry, Lighthouse',
  },
] as const
