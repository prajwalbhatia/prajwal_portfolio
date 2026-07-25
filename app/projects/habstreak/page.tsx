import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Habstreak — a postmortem',
  description:
    'A habit tracker built on streaks and rewards, shipped on web and the Play Store, then shut down. What worked, what did not, and what I would never build again.',
  // Unlinked draft while Habstreak is rebuilt. Keep out of the index until the
  // prose is written — it is also absent from app/sitemap.ts for the same reason.
  robots: { index: false, follow: false },
}

/**
 * DRAFT — structure only.
 *
 * The headings and prompts below are scaffolding for Prajwal to fill in. Every
 * paragraph marked "TO WRITE" is a placeholder; none of it should ship as-is.
 */
const sections = [
  {
    heading: 'What it was',
    prompt:
      'What Habstreak did, who it was for, and the theory it was built on — that consistency beats intensity.',
  },
  {
    heading: 'What I built',
    prompt:
      'The stack, the interesting technical decisions, what you would keep. Web plus a Play Store app is not a small scope for a side project.',
  },
  {
    heading: 'What actually happened',
    prompt:
      'Real numbers if you have them — signups, retention, how long people kept a streak. Honest is more interesting than impressive.',
  },
  {
    heading: 'Why I shut it down',
    prompt:
      'The real reason, not the flattering one. This is the section a hiring manager will actually read.',
  },
  {
    heading: 'What I would do differently',
    prompt:
      'The engineering lesson and the product lesson. Ideally one of each, stated plainly.',
  },
]

export default function HabstreakPage() {
  return (
    <article className="shell gutter py-12 max-w-[70ch]">
      <Link href="/projects" className="label text-muted hover:text-signal transition-colors">
        ← Projects
      </Link>

      <header className="mt-6 mb-8">
        <p className="label text-signal mb-3">Postmortem · Sunset</p>
        <h1 className="display text-[clamp(2.4rem,8vw,4rem)] mb-4">
          Habstreak<span className="text-signal">.</span>
        </h1>
        <p className="text-lg text-dim leading-relaxed">
          A habit tracker built on streaks and rewards. Shipped on web and the Play Store, then shut
          down.
        </p>
      </header>

      <div className="border border-signal/40 bg-signal/5 p-4 mb-10">
        <p className="label text-signal mb-2">Draft — not for publication</p>
        <p className="text-sm text-dim leading-relaxed">
          This page is scaffolding. The section headings are the argument; the prose underneath
          still needs writing. Nothing here should go live until it does.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="display text-2xl mb-2">{s.heading}</h2>
            <p className="text-sm text-muted leading-relaxed italic">TO WRITE — {s.prompt}</p>
          </section>
        ))}
      </div>
    </article>
  )
}
