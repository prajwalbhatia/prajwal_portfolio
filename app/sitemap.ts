import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/content/profile'
import { CHANNEL_HANDLE, EXPLAINERS_LIMIT } from '@/content/explainers'
import { getKindWords } from '@/lib/kind-words'
import { fetchExplainers } from '@/lib/youtube'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  // /explainers only exists when the API returns something, so the sitemap
  // has to ask the same question the route does rather than hardcode an answer.
  const hasExplainers = (await fetchExplainers(CHANNEL_HANDLE, EXPLAINERS_LIMIT)).length > 0

  const routes = [
    { path: '', priority: 1 },
    { path: '/work', priority: 0.9 },
    { path: '/projects/web-vitals', priority: 0.7 },
    { path: '/projects/thumbnail-pipeline', priority: 0.7 },
    { path: '/projects/intern-profile-package', priority: 0.7 },
    { path: '/projects/batch-selection', priority: 0.7 },
    { path: '/projects/signup-funnel', priority: 0.7 },
    { path: '/projects/application-flow', priority: 0.7 },
    // /projects/partner-landing is out while its entry is commented out.
    { path: '/resume', priority: 0.8 },
    ...(hasExplainers ? [{ path: '/explainers', priority: 0.6 }] : []),
    ...(getKindWords().length > 0 ? [{ path: '/kind-words', priority: 0.6 }] : []),
  ]

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: r.priority,
  }))
}
