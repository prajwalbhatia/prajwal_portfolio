import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/content/profile'
import { CHANNEL_HANDLE, REELS_LIMIT } from '@/content/reels'
import { fetchReels } from '@/lib/youtube'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  // /reels only exists when the API returns something, so the sitemap has to
  // ask the same question the route does rather than hardcode an answer.
  const hasReels = (await fetchReels(CHANNEL_HANDLE, REELS_LIMIT)).length > 0

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
    ...(hasReels ? [{ path: '/reels', priority: 0.6 }] : []),
  ]

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: r.priority,
  }))
}
