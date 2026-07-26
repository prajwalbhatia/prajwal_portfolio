'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

import type { Project } from '@/content/projects'

/**
 * The work index: one row per project, filterable by its primary tag.
 *
 * Filtering is on `tags[0]` rather than every tag — projects carry two or
 * three, and a pill per tag gives six buttons for four rows, which is more
 * chrome than content.
 *
 * Every row renders regardless of filter state, so the page is complete with
 * JavaScript off; the filter only hides.
 */

/** "5.45s" → 5.45, "513KB" → 513, "28 min" → 28. Null when there's no number. */
function magnitude(v: string): number | null {
  const n = Number.parseFloat(v.replace(/[^\d.]/g, ''))
  return Number.isFinite(n) ? n : null
}

/** Percentage reduction between the two sides of a pair, when both parse. */
function delta(was: string, now: string): string | null {
  const a = magnitude(was)
  const b = magnitude(now)
  if (a === null || b === null || a === 0) return null
  const pct = Math.round(((a - b) / a) * 100)
  return pct > 0 ? `−${pct}%` : null
}

export function WorkFilter({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>('All')

  const filters = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((p) => p.tags[0]).filter(Boolean)))],
    [projects],
  )

  const shown = filter === 'All' ? projects : projects.filter((p) => p.tags[0] === filter)

  return (
    <>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter work by area">
          {filters.map((f) => {
            const on = f === filter
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={on}
                className={`label rounded-full border px-3 py-1.5 transition-colors ${
                  on
                    ? 'border-now bg-now text-ground'
                    : 'border-rule text-muted hover:border-muted hover:text-ink'
                }`}
              >
                {f}
              </button>
            )
          })}
        </div>
        <p aria-live="polite" className="label text-muted">
          {shown.length} of {projects.length} shown
        </p>
      </div>

      <ul className="flex flex-col">
        {projects.map((p, i) => {
          const visible = shown.includes(p)
          const d = p.pair ? delta(p.pair.was, p.pair.now) : null
          return (
            <li
              key={p.id}
              hidden={!visible}
              className="grid gap-x-8 gap-y-4 border-b border-rule py-7 first:border-t md:grid-cols-[2.5rem_1fr_13rem_11rem]"
            >
              <span className="label text-muted">0{i + 1}</span>

              <div className="flex flex-col gap-3">
                <h3 className="display text-[clamp(1.5rem,3vw,2rem)]">{p.title}</h3>
                {p.problem && (
                  <p className="max-w-[52ch] text-[0.9rem] leading-relaxed text-muted">
                    {p.problem}
                  </p>
                )}
                {p.tech && (
                  <ul className="flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <li
                        key={t}
                        className="label rounded-full border border-rule px-2.5 py-1 text-muted"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex flex-col gap-1">
                {p.pair ? (
                  <>
                    <p className="flex flex-wrap items-baseline gap-2">
                      <span className="label text-was line-through decoration-was/70">
                        {p.pair.was}
                      </span>
                      <span className="display text-[clamp(1.6rem,3vw,2.1rem)] tabular-nums text-now">
                        {p.pair.now}
                      </span>
                    </p>
                    <p className="label text-muted">
                      {p.pair.label}
                      {d && ` · ${d}`}
                    </p>
                  </>
                ) : (
                  <p className="label text-muted">{p.tags.join(' · ')}</p>
                )}
              </div>

              <div className="flex flex-col gap-2 md:items-end md:text-right">
                <span className="label text-muted">{p.context}</span>
                {p.href && (
                  <Link href={p.href} className="label text-now transition-opacity hover:opacity-70">
                    Case study →
                  </Link>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
