import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Band } from '@/components/band'
import { ReelCard } from '@/components/reel-card'
import { CHANNEL_HANDLE, CHANNEL_URL } from '@/content/reels'
import { fetchReels } from '@/lib/youtube'

export const metadata: Metadata = {
  title: 'Reels',
  description:
    'Short explainers on React, TypeScript and web performance — the same problems I work on during the day.',
}

/**
 * The route exists, but only renders when there is real data behind it.
 *
 * Without YOUTUBE_API_KEY this 404s rather than shipping a page that is a
 * heading and a link to somewhere else. It is also absent from the sitemap and
 * the nav until then — add both back in the same commit as the key.
 */
export default async function ReelsPage() {
  const reels = await fetchReels(CHANNEL_HANDLE, 24)
  if (reels.length === 0) notFound()

  return (
    <>
      <section className="shell gutter pt-14 pb-8">
        <h1 className="display text-[clamp(2.25rem,7vw,4rem)]">Reels</h1>
        <p className="measure mt-5 text-muted">
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

      <Band title="All frames">
        <ul className="measure flex flex-col">
          {reels.map((r) => (
            <li key={r.id}>
              <ReelCard reel={r} />
            </li>
          ))}
        </ul>
      </Band>
    </>
  )
}
