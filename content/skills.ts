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

/** Grouped view for /resume, mirroring the PDF. */
export const skillGroups = [
  {
    group: 'Languages',
    items: 'JavaScript (ES6+), TypeScript, HTML5, CSS3',
  },
  {
    group: 'Frontend',
    items:
      'React, Next.js, Redux + RTK Query, Component Libraries / Design Systems, Material UI, Responsive Web Design, Accessibility',
  },
  {
    group: 'Testing & Quality',
    items: 'Jest / RTL, code review at scale',
  },
  {
    group: 'Backend & Tools',
    items: 'Node.js, Express, BullMQ, Redis, Puppeteer, GCS, REST APIs',
  },
  {
    group: 'Monitoring & Performance',
    items: 'Core Web Vitals (LCP, CLS, INP), Datadog RUM, Sentry, Lighthouse',
  },
] as const
