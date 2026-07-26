import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Band } from '@/components/band'
import {
  hasKindWords,
  kindWordStats,
  notes,
  recommendations,
  type KindWord,
} from '@/content/kind-words'

export const metadata: Metadata = {
  title: 'Kind words',
  description:
    'Recommendations, review notes and Slack messages from people I have worked with — left as screenshots so you can see who wrote them.',
}

/**
 * 404s until there is a real endorsement to show. An empty wall of love is
 * worse than no wall at all, and the alternative — writing one — is not on
 * the table. See content/kind-words.ts.
 */
function Card({ item, large }: { item: KindWord; large?: boolean }) {
  return (
    <figure className="flex flex-col overflow-hidden rounded-xl border border-rule bg-surface">
      <Image
        src={item.image}
        alt={item.alt}
        width={item.width}
        height={item.height}
        sizes={large ? '(min-width: 768px) 45vw, 92vw' : '(min-width: 768px) 30vw, 92vw'}
        loading="lazy"
        className="w-full"
      />
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-t border-rule px-4 py-3">
        <span className="text-sm text-ink">
          {item.name}
          <span className="text-muted"> · {item.title}</span>
        </span>
        <span className="label text-muted">{item.source}</span>
      </figcaption>
    </figure>
  )
}

export default function KindWordsPage() {
  if (!hasKindWords) notFound()

  return (
    <>
      <section className="shell gutter pt-14 pb-10">
        <p className="label mb-5 text-now">Unedited · straight from LinkedIn and Slack</p>
        <h1 className="display max-w-[16ch] text-[clamp(2.5rem,8vw,5rem)]">
          What people say when I&rsquo;m not in the room.
        </h1>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
          <p className="measure text-base leading-relaxed text-muted sm:text-lg">
            Recommendations, review notes and the odd Slack message. I&rsquo;ve left them as
            screenshots so you can see who wrote them.
          </p>

          <dl className="flex gap-10">
            <div>
              <dd className="display text-3xl text-now tabular-nums">
                {kindWordStats.recommendations}
              </dd>
              <dt className="label mt-1 text-muted">Recommendations</dt>
            </div>
            <div>
              <dd className="display text-3xl text-now tabular-nums">{kindWordStats.people}</dd>
              <dt className="label mt-1 text-muted">People</dt>
            </div>
            <div>
              <dd className="display text-3xl text-now tabular-nums">
                {kindWordStats.internsMentored}
              </dd>
              <dt className="label mt-1 text-muted">Interns mentored</dt>
            </div>
          </dl>
        </div>
      </section>

      {recommendations.length > 0 && (
        <Band title="LinkedIn recommendations">
          <ul className="grid gap-4 md:grid-cols-2">
            {recommendations.map((k) => (
              <li key={k.id}>
                <Card item={k} large />
              </li>
            ))}
          </ul>
        </Band>
      )}

      {notes.length > 0 && (
        <Band title="Slack, PR threads and review notes">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((k) => (
              <li key={k.id}>
                <Card item={k} />
              </li>
            ))}
          </ul>
        </Band>
      )}
    </>
  )
}
