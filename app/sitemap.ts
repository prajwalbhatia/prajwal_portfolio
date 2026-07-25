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
    // /projects/habstreak is deliberately absent — unlinked draft, noindexed.
    { path: '/resume', priority: 0.8 },
    { path: '/reels', priority: 0.6 },
  ]

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: r.priority,
  }))
}
