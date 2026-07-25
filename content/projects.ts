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
      'Two-tier async extraction on BullMQ. An OG-tag fast path clears roughly 55% of URLs in about a second; Puppeteer only handles what falls through. URL-hash deduplication and non-blocking queueing, at a 95% success rate in production.',
    href: '/projects/thumbnail-pipeline',
    linkLabel: 'Read the case study',
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
    href: '/projects/web-vitals',
    linkLabel: 'Read the case study',
    status: 'shipped',
    featured: true,
  },
  {
    id: 'intern-profile-package',
    title: 'fe-intern-profile',
    context: 'Virtual Internships · 2024–26',
    metric: '−53% bundle',
    summary:
      'A versioned React package the main platform depends on. Full keyboard navigation, bundle down from 513KB to 240KB via targeted code-splitting, and ongoing CVE remediation across the dependency tree.',
    href: '/projects/intern-profile-package',
    linkLabel: 'Read the case study',
    status: 'shipped',
    featured: true,
  },
  {
    id: 'batch-selection',
    title: 'Batch Selection Re-architecture',
    context: 'Virtual Internships · 2026',
    summary:
      'A 500-line component decomposed into focused hooks, legacy thunks migrated to RTK Query, and business rules moved server-side so frontend state could be deleted. Surfaced a bug silently dropping query params on every request.',
    href: '/projects/batch-selection',
    linkLabel: 'Read the case study',
    status: 'shipped',
    featured: false,
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
  // Parked. Being rebuilt from scratch, so there is nothing honest to show yet.
  // The postmortem page stays at /projects/habstreak but is unlinked and
  // noindexed until the rebuild lands — don't re-add `href` before then.
  {
    id: 'habstreak',
    title: 'Habstreak',
    context: 'Personal · rebuilding',
    summary:
      'A habit tracker built on streaks and rewards. Shipped on web and the Play Store, then taken down. Currently being rebuilt from scratch.',
    status: 'sunset',
    featured: false,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
