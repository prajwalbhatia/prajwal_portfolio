export type Project = {
  id: string
  title: string
  context: string
  metric?: string
  summary: string
  /** Internal route or external URL. Omit when there's nothing to link to. */
  href?: string
  linkLabel?: string
  status: 'shipped' | 'sunset'
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'thumbnail-pipeline',
    title: 'Thumbnail Pipeline',
    context: 'Virtual Internships · 2025',
    metric: '8× faster',
    summary:
      'Two-tier async extraction on Kafka. An OG-tag fast path clears roughly 55% of URLs in about a second; Puppeteer only handles what falls through. URL-hash deduplication and non-blocking queueing, at a 95% success rate in production.',
    status: 'shipped',
    featured: true,
  },
  {
    id: 'web-vitals',
    title: 'Web Vitals Programme',
    context: 'Virtual Internships · 2023–25',
    metric: '−42%',
    summary:
      'LCP and CLS work across batch selection, intern profiles, onboarding and dashboards. Image preloading, third-party preconnects, deferred analytics, reserved layout space. Measured at p75 in the field, not on my laptop.',
    status: 'shipped',
    featured: true,
  },
  {
    id: 'video-player',
    title: 'Video Player Platform',
    context: 'Extramarks · 2021–23',
    summary:
      'Owned playback end to end, including background downloads for students on unreliable connections, session activity tracking and milestone event instrumentation.',
    status: 'shipped',
    featured: false,
  },
  {
    id: 'habstreak',
    title: 'Habstreak',
    context: 'Personal · sunset',
    summary:
      'A habit tracker built on streaks and rewards. Shipped on web and the Play Store. Written up as a postmortem — what worked, what I would never build again.',
    href: '/projects/habstreak',
    linkLabel: 'Read the postmortem',
    status: 'sunset',
    featured: true,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
