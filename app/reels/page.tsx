import type { Metadata } from 'next'

import { Band } from '@/components/band'
import { ReelCard } from '@/components/reel-card'
import { CHANNEL_URL, reels } from '@/content/reels'

export const metadata: Metadata = {
  title: 'Reels',
  description:
    'Short explainers on React, TypeScript and web performance — the same problems I work on during the day, in under a minute.',
}

export default function ReelsPage() {
  return (
    <>
      <section className="shell gutter pt-12 pb-6">
        <h1 className="display text-[clamp(2.4rem,8vw,4.5rem)] mb-4">
          Reels<span className="text-signal">.</span>
        </h1>
        <p className="text-base text-dim max-w-[58ch] leading-relaxed">
          Short explainers on React, TypeScript and performance — the same problems I work on during
          the day, compressed into under a minute. Being able to explain a thing simply is most of
          understanding it.
        </p>
        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="label border border-signal text-signal px-4 py-2.5 hover:bg-signal hover:text-ink transition-colors inline-block mt-6"
        >
          Subscribe on YouTube →
        </a>
      </section>

      <Band title="All frames">
        <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
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
