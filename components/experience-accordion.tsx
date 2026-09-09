'use client'

import { useState } from 'react'

import { roles } from '@/content/experience'

/**
 * Her .exp-item accordion with the .vi-grid bento inside.
 *
 * The important difference from my first pass: the drawer holds *designed*
 * tiles, not the raw `highlights` prose. Hers works because each tile is a
 * label, one short heading and an optional figure — dropping four sentences of
 * bullet copy into a coloured box looks nothing like it.
 *
 * So the tiles are authored below, distilled from the same résumé bullets in
 * content/experience.ts. Every figure here traces to one of them; nothing is
 * invented. Promoting this design means moving TILES into content/.
 *
 * Accessibility over hers: this is a real <button aria-expanded> controlling a
 * labelled region. Hers toggles a class from an inline handler on a <div>.
 */

type Tile = {
  label: string
  heading: string
  size?: 'xl' | 'lg' | 'md'
  sub?: string
  /** Her .vi-metrics-row — figures set side by side beneath the heading. */
  metrics?: { val: string; lbl: string }[]
  tint: string
  /** Spans two columns from sm up. */
  wide?: boolean
  /** Full bleed at every column count. */
  full?: boolean
}

/**
 * Cell counts are deliberate — a 3-column grid only looks right when the
 * spans sum to a multiple of three, or CSS auto-placement leaves a hole.
 *
 * vi-sde3 is `full`(3) + `wide`(2) + four singles(4) = 9, exactly three rows.
 */
const TILES: Record<string, Tile[]> = {
  'vi-sde3': [
    {
      // Prajwal built this flow; the product designer owned its structure and
      // visual design — the same split the case study's Credit section states.
      //
      // These three figures come from the designer's case study rather than
      // our own instrumentation, which is why they stay out of `proofLedger`.
      // See the provenance note on `application-flow` in content/projects.ts.
      label: 'Activation & onboarding',
      heading: 'Redesigned intern activation & application flow',
      size: 'md',
      metrics: [
        { val: '+24%', lbl: 'completion rate' },
        { val: '↓31%', lbl: 'drop-off' },
        { val: '3 mo', lbl: 'to ship' },
      ],
      sub: 'One of nine engineers on it. The auto-save and draft-recovery layer is mine end to end.',
      tint: 't-coral',
      full: true,
    },
    {
      label: 'Batch Selection',
      heading: 'A 500-line component split into focused hooks',
      size: 'md',
      sub: 'Redux thunks migrated to RTK Query with caching and deduplication; business rules moved server-side.',
      tint: 't-purple',
      wide: true,
    },
    {
      label: 'Thumbnail pipeline',
      heading: '95%',
      size: 'xl',
      sub: 'success in production',
      tint: 't-mint',
    },
    {
      label: 'Fast path',
      heading: '8×',
      size: 'xl',
      sub: 'lower latency than the Puppeteer fallback',
      tint: 't-yellow',
    },
    {
      label: 'Virtualised filter',
      heading: '10+',
      size: 'xl',
      sub: 'autocomplete and filter surfaces',
      tint: 't-sky',
    },
    {
      label: 'Shared frontend repo',
      heading: 'Résumé Builder',
      size: 'md',
      sub: 'plus accessibility, testing, CI and dependency hygiene',
      tint: 't-lavender',
    },
  ],

  'vi-sde2': [
    {
      label: 'Core Web Vitals',
      heading: '5.45s → 3.17s',
      size: 'lg',
      sub: 'Batch Selection LCP p75 — 42% faster, through image preloading, third-party preconnects and deferred analytics.',
      tint: 't-blue',
      wide: true,
    },
    {
      label: 'Layout shift',
      heading: '0.229 → 0.006',
      size: 'lg',
      sub: 'Intern Profile CLS p75',
      tint: 't-mint',
    },
    {
      label: 'Platform scale',
      heading: '285K+',
      size: 'xl',
      sub: 'active applications',
      tint: 't-yellow',
    },
    {
      label: 'Companies',
      heading: '23K+',
      size: 'xl',
      sub: 'on the platform',
      tint: 't-pink',
    },
    {
      label: 'Migration',
      heading: 'EUI + Ant Design → Material UI',
      size: 'md',
      sub: 'drawers, modals, navigation, file pickers, timelines and forms',
      tint: 't-cream',
    },
  ],

  extramarks: [
    {
      label: 'Video platform',
      heading: 'Playback owned end to end',
      size: 'md',
      sub: 'Background downloads for students on unreliable connections, session activity tracking and milestone instrumentation.',
      tint: 't-sky',
      wide: true,
    },
    {
      label: 'Components',
      heading: 'Reusable React',
      size: 'md',
      sub: 'refactored out of legacy modules',
      tint: 't-mint',
    },
  ],

  attosol: [
    {
      label: 'API efficiency',
      heading: '50%',
      size: 'xl',
      sub: 'fewer calls — client-side caching, request deduplication and TTL-based invalidation',
      tint: 't-coral',
      wide: true,
    },
    {
      label: 'Interfaces',
      heading: 'Responsive React',
      size: 'md',
      sub: 'and REST API workflows',
      tint: 't-blue',
    },
  ],
}

const HEADING = {
  xl: 'text-[clamp(2.1rem,3.8vw,2.75rem)] font-semibold leading-none tracking-tight tabular-nums',
  lg: 'text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold leading-tight tracking-tight tabular-nums',
  md: 'text-[1.15rem] font-semibold leading-snug',
} as const

function initials(company: string) {
  return company
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export function ExperienceAccordion() {
  // First role open on load, as hers is (.exp-auto-expand).
  const [open, setOpen] = useState<string | null>(roles[0]?.id ?? null)

  return (
    <div className="flex flex-col gap-6">
      {roles.map((role) => {
        const isOpen = open === role.id
        const period = role.end === 'present' ? `${role.start} — now` : `${role.start} — ${role.end}`
        const tiles = TILES[role.id] ?? []

        return (
          <div key={role.id} className="exp-card" data-open={isOpen}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`exp-${role.id}`}
                onClick={() => setOpen(isOpen ? null : role.id)}
                className="flex w-full items-center gap-5 px-6 py-6 text-left sm:px-8"
              >
                <span
                  aria-hidden="true"
                  className="exp-logo label flex shrink-0 items-center justify-center text-[0.72rem] text-muted"
                >
                  {initials(role.company)}
                </span>

                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="truncate text-[1.05rem] font-semibold text-ink">
                    {role.company}
                  </span>
                  <span className="truncate text-[0.9rem] text-muted">{role.title}</span>
                </span>

                <span className="label hidden shrink-0 tabular-nums text-muted sm:block">
                  {period}
                </span>

                {/* Two hairlines; CSS rotates them from a plus into a minus. */}
                <span aria-hidden="true" className="exp-icon shrink-0">
                  <i />
                  <i />
                </span>
              </button>
            </h3>

            <div id={`exp-${role.id}`} className="drawer" data-open={isOpen}>
              <div>
                <div className="px-6 pb-7 sm:pl-25 sm:pr-8">
                  <p className="label mb-4 tabular-nums text-muted sm:hidden">{period}</p>

                  <div className="bento">
                    {tiles.map((t) => (
                      <div
                        key={t.label}
                        className={`bento-tile ${t.tint} ${
                          t.full ? 'bento-span3' : t.wide ? 'bento-span2' : ''
                        }`}
                      >
                        <p className="label text-[0.58rem] text-ink/55">{t.label}</p>
                        <div className="flex flex-col gap-2.5">
                          <p className={`text-ink ${HEADING[t.size ?? 'md']}`}>{t.heading}</p>

                          {t.metrics && (
                            <dl className="bento-metrics">
                              {t.metrics.map((m) => (
                                <div key={m.lbl}>
                                  <dd className="text-[1.4rem] font-semibold leading-none tracking-tight tabular-nums text-ink">
                                    {m.val}
                                  </dd>
                                  <dt className="mt-1.5 text-[0.68rem] font-medium text-ink/55">
                                    {m.lbl}
                                  </dt>
                                </div>
                              ))}
                            </dl>
                          )}

                          {t.sub && (
                            <p className="text-[0.78rem] leading-relaxed text-ink/70">{t.sub}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
