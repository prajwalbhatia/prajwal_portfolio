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

/** Grouped skills for the HTML résumé, aligned with the downloadable PDF. */
export const skillGroups = [
  {
    group: 'Frontend',
    items:
      'React, TypeScript, JavaScript, Next.js, Redux Toolkit, RTK Query, TanStack Query, React Native, Material UI, Tailwind CSS, HTML, CSS, Vite',
  },
  {
    group: 'Architecture & quality',
    items:
      'System design, design systems, Core Web Vitals, WCAG, Jest, React Testing Library',
  },
  {
    group: 'Backend & tools',
    items:
      'Node.js, Express.js, REST APIs, PostgreSQL, TypeORM, Drizzle ORM, Redis, BullMQ, Git, CI/CD, Lighthouse, Datadog, Sentry',
  },
] as const
