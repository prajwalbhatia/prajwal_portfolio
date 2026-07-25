import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/content/profile'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes = [
    { path: '', priority: 1 },
    { path: '/work', priority: 0.9 },
    { path: '/projects', priority: 0.8 },
    { path: '/projects/web-vitals', priority: 0.7 },
    { path: '/projects/thumbnail-pipeline', priority: 0.7 },
    { path: '/projects/intern-profile-package', priority: 0.7 },
    { path: '/projects/batch-selection', priority: 0.7 },
    { path: '/projects/application-flow', priority: 0.7 },
    { path: '/projects/partner-landing', priority: 0.7 },
    // /projects/habstreak is deliberately absent — unlinked draft, noindexed.
    { path: '/resume', priority: 0.8 },
    // /reels is absent until YOUTUBE_API_KEY exists — the route 404s without
    // it. Add it back in the same commit as the key.
  ]

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: r.priority,
  }))
}
