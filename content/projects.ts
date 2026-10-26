export type Project = {
  id: string
  title: string
  context: string
  headline?: string
  tags: string[]
  tech?: string[]
  summary: string
  href: string
}

/** The Work index highlights five projects; Home selects three by ID. */
export const projects: Project[] = [
  {
    id: 'ownfolio',
    title: 'Ownfolio',
    context: 'Independent product · 2026',
    tags: ['Product', 'Full-stack'],
    tech: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    summary:
      'I built a career workspace for capturing new work, importing earlier experience and curating a public profile.',
    href: '/projects/ownfolio',
  },
  {
    id: 'web-vitals',
    headline: 'How I cut LCP from 5.45s to 3.17s on our busiest flow',
    title: 'Web Vitals Programme',
    context: 'Virtual Internships · 2023–25',
    tags: ['Performance'],
    tech: ['Core Web Vitals', 'Datadog RUM', 'React'],
    summary: 'Improved field LCP from 5.45s to 3.17s and stabilized layouts across key flows.',
    href: '/projects/web-vitals',
  },
  {
    id: 'application-flow',
    headline: 'Making a long application finishable',
    title: 'Application Flow',
    context: 'Virtual Internships · 2025–26',
    tags: ['Product', 'Reliability'],
    tech: ['React', 'RTK Query', 'TypeScript'],
    summary:
      'Built the draft recovery layer for a configurable application flow; application time fell from 28 to 12 minutes.',
    href: '/projects/application-flow',
  },
  {
    id: 'thumbnail-pipeline',
    title: 'Thumbnail Pipeline',
    context: 'Virtual Internships · 2025',
    tags: ['Architecture', 'Backend'],
    tech: ['Node', 'BullMQ', 'Puppeteer', 'GCS', 'Redis'],
    summary:
      'Built an asynchronous link-preview service with an Open Graph fast path and screenshot fallback.',
    href: '/projects/thumbnail-pipeline',
  },
  {
    id: 'batch-selection',
    title: 'Batch Selection Re-architecture',
    context: 'Virtual Internships · 2026',
    tags: ['Architecture'],
    summary:
      'Split a 500-line component, moved eligibility rules server-side, and fixed missing query parameters.',
    href: '/projects/batch-selection',
  },
]

export const workProjects = projects
