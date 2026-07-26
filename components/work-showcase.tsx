'use client'

import Link from 'next/link'
import { useState } from 'react'

import { Pair } from '@/components/pair'
import { homeProjects } from '@/content/projects'

/**
 * Selected work as a list you read by pointing at it.
 *
 * Hover is an affordance, not the mechanism — the buttons are real, focusable
 * controls that also respond to keyboard focus and click, so the panel is
 * reachable without a pointer. The detail for the selected item is always in
 * the DOM, so nothing here depends on JavaScript to be readable.
 */
export function WorkShowcase() {
  const [active, setActive] = useState(0)
  const project = homeProjects[active]

  return (
    <section aria-labelledby="work-heading" className="rule-t">
      <div className="shell gutter py-10 sm:py-14">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="work-heading" className="label text-muted">
            Selected work — point at one to read it
          </h2>
          <Link href="/projects" className="label text-muted transition-colors hover:text-ink">
            All projects →
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
          {/* the list */}
          <ul className="flex flex-col">
            {homeProjects.map((p, i) => {
              const on = i === active
              return (
                <li key={p.id} className="border-b border-rule first:border-t">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    aria-describedby="work-detail"
                    className="flex w-full items-baseline gap-4 py-4 text-left transition-opacity"
                  >
                    <span className={`label shrink-0 ${on ? 'text-now' : 'text-muted'}`}>
                      0{i + 1}
                    </span>
                    <span className="flex min-w-0 flex-col gap-1">
                      <span
                        className={`display text-xl transition-colors sm:text-2xl ${
                          on ? 'text-ink' : 'text-muted'
                        }`}
                      >
                        {p.title}
                      </span>
                      <span className="label text-muted">
                        {p.pair ? `${p.pair.was} → ${p.pair.now} ${p.pair.label}` : p.tags.join(' · ')}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          {/* the detail */}
          <article
            id="work-detail"
            aria-live="polite"
            className="flex flex-col gap-5 border border-rule bg-surface p-5 sm:p-6"
          >
            {project.pair ? (
              <Pair
                size="md"
                was={project.pair.was}
                now={project.pair.now}
                label={project.pair.label}
              />
            ) : (
              <p className="label text-muted">{project.context}</p>
            )}

            {project.problem && (
              <div className="flex flex-col gap-1.5">
                <h3 className="label text-was">The problem</h3>
                <p className="text-[0.92rem] leading-relaxed text-muted">{project.problem}</p>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <h3 className="label text-now">What I did</h3>
              <p className="text-[0.92rem] leading-relaxed text-muted">{project.summary}</p>
            </div>

            {project.tech && (
              <ul className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <li key={t} className="label border border-rule px-2 py-1 text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            )}

            {project.href && (
              <Link
                href={project.href}
                className="label mt-auto w-fit border-b border-rule pb-1 text-ink transition-colors hover:border-ink"
              >
                Full case study →
              </Link>
            )}
          </article>
        </div>
      </div>
    </section>
  )
}
