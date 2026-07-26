import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Band } from '@/components/band'
import { ExplainerCard } from '@/components/explainer-card'
import { CHANNEL_HANDLE, CHANNEL_URL, EXPLAINERS_LIMIT } from '@/content/explainers'
import { fetchExplainers } from '@/lib/youtube'

export const metadata: Metadata = {
  title: 'Explainers',
  description:
    'Short explainers on React, TypeScript and web performance — the same problems I work on during the day.',
}

/**
 * The route exists, but only renders when there is real data behind it.
 *
 * Without YOUTUBE_API_KEY this 404s rather than shipping a page that is a
 * heading and a link to somewhere else. The nav item and the sitemap entry
 * resolve from the same fetch, so they appear and disappear with it.
 */
export default async function ExplainersPage() {
  const explainers = await fetchExplainers(CHANNEL_HANDLE, EXPLAINERS_LIMIT)
  if (explainers.length === 0) notFound()

  return (
    <>
      <section className="shell gutter pt-14 pb-8">
        <h1 className="display text-[clamp(2.25rem,7vw,4rem)]">Explainers</h1>
        <p className="measure mt-5 text-body">
          Short explainers on React, TypeScript and performance — the same problems I work on during
          the day, in under a minute. Being able to explain a thing simply is most of understanding
          it.
        </p>
        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="label mt-6 inline-block border border-rule px-4 py-2.5 transition-colors hover:border-muted"
        >
          Subscribe on YouTube &rarr;
        </a>
      </section>

      <Band title="Every one">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {explainers.map((e) => (
            <li key={e.id}>
              <ExplainerCard explainer={e} />
            </li>
          ))}
        </ul>
      </Band>
    </>
  )
}
