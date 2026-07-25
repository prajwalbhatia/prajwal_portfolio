import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * Shared shell for the four case studies. They differ in prose, not structure,
 * so the header, back link and measure live here rather than in four near-copies.
 *
 * Heading contract: this renders the only `h1`. Sections render `h2` via
 * `CaseSection`. Nothing renders `h3` — if a page ever needs one, add it here
 * so the order stays enforceable in one place.
 */
export function CaseStudy({
  context,
  title,
  metric,
  lede,
  children,
}: {
  context: string
  title: string
  metric?: string
  lede: string
  children: ReactNode
}) {
  return (
    <article className="shell gutter py-12 max-w-[72ch] case-prose">
      <Link href="/projects" className="label text-muted hover:text-signal transition-colors">
        ← Projects
      </Link>

      <header className="mt-6 mb-10">
        <p className="label text-muted mb-3">{context}</p>
        <h1 className="display text-[clamp(2.2rem,7vw,3.6rem)] mb-4">
          {title}
          <span className="text-signal">.</span>
        </h1>
        {metric && (
          <p className="font-display text-3xl leading-none tracking-tight text-signal tabular-nums mb-4">
            {metric}
          </p>
        )}
        <p className="text-lg text-dim leading-relaxed">{lede}</p>
      </header>

      <div className="flex flex-col gap-10">{children}</div>
    </article>
  )
}

export function CaseSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="display text-2xl mb-3">{heading}</h2>
      <div className="flex flex-col gap-4 text-[0.95rem] leading-relaxed text-dim">{children}</div>
    </section>
  )
}

export type Pair = { label: string; before: string; after: string }

/**
 * The before/after motif, as paired values in a table.
 *
 * A table because that is what this is — two measurements of the same thing at
 * two points in time. Arrows would be decoration; columns carry the comparison
 * on their own and stay readable with styles or JavaScript off.
 */
export function BeforeAfter({ pairs, caption }: { pairs: Pair[]; caption: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm min-w-[22rem]">
        <caption className="label text-muted text-left pb-2">{caption}</caption>
        <thead>
          <tr>
            <th
              scope="col"
              className="label text-muted font-normal text-left border-b border-line-2 px-3 py-2"
            >
              Measure
            </th>
            <th
              scope="col"
              className="label text-muted font-normal text-right border-b border-line-2 px-3 py-2"
            >
              Before
            </th>
            <th
              scope="col"
              className="label text-muted font-normal text-right border-b border-line-2 px-3 py-2"
            >
              After
            </th>
          </tr>
        </thead>
        <tbody>
          {pairs.map((p) => (
            <tr key={p.label}>
              <th
                scope="row"
                className="border-b border-line px-3 py-2.5 text-left font-normal text-dim"
              >
                {p.label}
              </th>
              <td className="border-b border-line px-3 py-2.5 text-right text-muted tabular-nums">
                {p.before}
              </td>
              <td className="border-b border-line px-3 py-2.5 text-right text-signal tabular-nums font-semibold">
                {p.after}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
