import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/content/profile'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes = [
    { path: '', priority: 1 },
    { path: '/work', priority: 0.9 },
    { path: '/projects', priority: 0.8 },
    { path: '/projects/habstreak', priority: 0.6 },
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
