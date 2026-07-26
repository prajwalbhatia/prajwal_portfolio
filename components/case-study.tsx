import Link from 'next/link'
import type { ReactNode } from 'react'

import { Pair } from '@/components/pair'

/**
 * Shared shell for the case studies. They differ in prose, not structure.
 *
 * Where a project has a measured before/after it is stated once, at the top,
 * as a pair — then the prose explains how. Where it doesn't (batch-selection,
 * fe-intern-profile's process work), the page runs on serif and neutrals and
 * the motif stays out of it. Rule 3: don't force it.
 *
 * Heading contract: this renders the only `h1`; sections render `h2` via
 * `CaseSection`. Nothing renders `h3`.
 */
export function CaseStudy({
  context,
  title,
  pair,
  lede,
  children,
}: {
  context: string
  title: string
  pair?: { was: string; now: string; label: string }
  lede: string
  children: ReactNode
}) {
  return (
    <article className="case-prose shell gutter py-14">
      <Link
        href="/work"
        className="label text-muted underline decoration-rule underline-offset-4 hover:text-ink"
      >
        &larr; Work
      </Link>

      <header className="mt-8 mb-12 flex flex-col gap-6">
        <p className="label text-muted">{context}</p>
        <h1 className="display text-[clamp(2.25rem,6.5vw,3.75rem)]">{title}</h1>
        {pair && <Pair size="lg" was={pair.was} now={pair.now} label={pair.label} />}
        <p className="measure text-lg leading-relaxed text-muted">{lede}</p>
      </header>

      <div className="flex flex-col gap-10">{children}</div>
    </article>
  )
}

export function CaseSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="display mb-4 text-2xl">{heading}</h2>
      <div className="flex flex-col gap-4 leading-relaxed text-muted">{children}</div>
    </section>
  )
}

/**
 * Secondary measurements, below the headline pair. Same colour contract as
 * `Pair`; a table because these are several measurements of the same kind and
 * columns let them be compared down as well as across.
 */
export function MeasureTable({
  rows,
  caption,
}: {
  rows: { label: string; was: string; now: string }[]
  caption: string
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-88 border-collapse text-sm">
        <caption className="label pb-3 text-left text-muted">{caption}</caption>
        <thead>
          <tr>
            <th scope="col" className="label border-b border-rule px-3 py-2 text-left text-muted">
              Measure
            </th>
            <th scope="col" className="label border-b border-rule px-3 py-2 text-right text-muted">
              Was
            </th>
            <th scope="col" className="label border-b border-rule px-3 py-2 text-right text-muted">
              Now
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              {/* nowrap: letting these wrap made row height depend on the
                  loaded font, which reflowed the page on swap and cost CLS
                  0.108. The container already scrolls horizontally. */}
              <th
                scope="row"
                className="border-b border-rule px-3 py-3 text-left font-normal whitespace-nowrap"
              >
                {r.label}
              </th>
              <td className="pair-was border-b border-rule px-3 py-3 text-right tabular-nums">
                {r.was}
              </td>
              <td className="pair-now border-b border-rule px-3 py-3 text-right tabular-nums">
                {r.now}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
