import Link from 'next/link'
import { Children, isValidElement, type ReactNode } from 'react'

import { Pair } from '@/components/pair'

function sectionId(heading: string) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function CaseStudy({
  context,
  title,
  pair,
  lede,
  action,
  children,
}: {
  context: string
  title: string
  pair?: { was: string; now: string; label: string }
  lede: string
  action?: { href: string; label: string }
  children: ReactNode
}) {
  const headings = Children.toArray(children).flatMap((child) =>
    isValidElement<{ heading?: string }>(child) && typeof child.props.heading === 'string'
      ? [child.props.heading]
      : [],
  )

  return (
    <article className="case-prose">
      <div className="shell gutter pb-12 pt-9 sm:pb-16 sm:pt-12">
        <Link
          href="/work"
          className="label inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
        >
          <span aria-hidden="true">←</span> All work
        </Link>

        <header className={`mt-12 gap-8 ${pair ? 'grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end lg:gap-14' : ''}`}>
          <div>
            <p className="label text-muted">{context}</p>
            <h1 className="display mt-5 max-w-[18ch] text-[clamp(2.6rem,6.5vw,5rem)] leading-[1.02]">
              {title}
            </h1>
            <p className="mt-7 max-w-[63ch] text-[clamp(1.1rem,2vw,1.35rem)] leading-relaxed text-body">
              {lede}
            </p>
            {action && (
              <a
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="label mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-ground transition-colors hover:bg-accent"
              >
                {action.label} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
          {pair && (
            <div className="rounded-2xl border border-rule bg-surface p-6 shadow-[0_15px_35px_-30px_rgb(23_23_26/0.3)] sm:p-7">
              <p className="label mb-5 text-muted">Measured change</p>
              <Pair size="lg" was={pair.was} now={pair.now} label={pair.label} />
            </div>
          )}
        </header>
      </div>

      <div className="rule-t">
        <div className="shell gutter grid gap-8 py-10 sm:py-14 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12">
          {headings.length > 0 && (
            <aside>
              <nav aria-label="On this page" className="lg:sticky lg:top-24">
                <p className="label mb-4 text-muted">In this story</p>
                <ol className="flex flex-wrap gap-x-5 gap-y-2 lg:flex-col lg:gap-3">
                  {headings.map((heading, index) => (
                    <li key={heading}>
                      <a
                        href={`#${sectionId(heading)}`}
                        className="group flex items-baseline gap-2 text-sm leading-snug text-body transition-colors hover:text-accent"
                      >
                        <span className="label text-muted">{String(index + 1).padStart(2, '0')}</span>
                        <span>{heading}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}
          <div className="min-w-0 rounded-2xl border border-rule bg-surface px-6 sm:px-9 lg:px-11">
            {children}
          </div>
        </div>
      </div>

      <div className="rule-t">
        <div className="shell gutter flex flex-wrap items-center justify-between gap-4 py-10">
          <p className="text-body">Interested in the rest of the work?</p>
          <Link
            href="/work"
            className="label inline-flex items-center gap-2 text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
          >
            Browse projects <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </article>
  )
}

export function CaseSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section id={sectionId(heading)} className="scroll-mt-24 border-b border-rule py-9 last:border-b-0 sm:py-11">
      <h2 className="display max-w-[24ch] text-[clamp(1.6rem,3vw,2.25rem)] leading-tight">
        {heading}
      </h2>
      <div className="mt-5 flex flex-col gap-5 text-[0.98rem] leading-[1.8] text-body">
        {children}
      </div>
    </section>
  )
}

export function MeasureTable({
  rows,
  caption,
}: {
  rows: { label: string; was: string; now: string }[]
  caption: string
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-rule bg-ground">
      <table className="w-full min-w-88 border-collapse text-sm">
        <caption className="label px-4 py-3 text-left text-muted">{caption}</caption>
        <thead>
          <tr>
            <th scope="col" className="label border-b border-rule px-4 py-3 text-left text-muted">
              Measure
            </th>
            <th scope="col" className="label border-b border-rule px-4 py-3 text-right text-muted">
              Was
            </th>
            <th scope="col" className="label border-b border-rule px-4 py-3 text-right text-muted">
              Now
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row" className="border-b border-rule px-4 py-3 text-left font-normal whitespace-nowrap last:border-0">
                {row.label}
              </th>
              <td className="pair-was border-b border-rule px-4 py-3 text-right tabular-nums">
                {row.was}
              </td>
              <td className="pair-now border-b border-rule px-4 py-3 text-right tabular-nums">
                {row.now}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
