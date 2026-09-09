'use client'

import { useState } from 'react'

/**
 * Interactive view of `generateStepOrder`.
 *
 * Five steps are always present and three splice in from batch config, so the
 * flow is 5–8 steps long and four orders are pre-generated rather than
 * computed per render. Three toggles say that faster than a paragraph.
 *
 * Order below is the real route order in internRoutes.tsx, so the positions
 * the optional steps occupy are the shipped ones.
 */

type OptionKey = 'additional' | 'resume' | 'video'
type Step = { key: string; label: string; optional?: OptionKey }

const STEPS: Step[] = [
  { key: 'personal-information', label: 'Personal info' },
  { key: 'career-field', label: 'Career field' },
  { key: 'internship-preference', label: 'Internship preference' },
  { key: 'additional-questions', label: 'Additional questions', optional: 'additional' },
  { key: 'diversity-information', label: 'Diversity' },
  { key: 'resume-profile', label: 'Résumé profile', optional: 'resume' },
  { key: 'video-profile', label: 'Video profile', optional: 'video' },
  { key: 'review-application', label: 'Review' },
]

const OPTIONS: { key: OptionKey; label: string }[] = [
  { key: 'additional', label: 'Additional questions' },
  { key: 'resume', label: 'Résumé profile' },
  { key: 'video', label: 'Video profile' },
]

export function StepOrderExplorer() {
  const [on, setOn] = useState<Record<OptionKey, boolean>>({
    additional: true,
    resume: true,
    video: false,
  })
  const visible = STEPS.filter((s) => !s.optional || on[s.optional])

  return (
    <div className="flex flex-col gap-5">
      <fieldset className="flex flex-wrap items-center gap-2">
        <legend className="label mb-2 text-[0.6rem] text-muted">Batch configuration</legend>
        {OPTIONS.map((o) => (
          <label
            key={o.key}
            className={`label cursor-pointer select-none rounded-full border px-3 py-1.5 text-[0.6rem] transition-colors ${
              on[o.key]
                ? 'border-accent/40 bg-accent/10 text-accent'
                : 'border-rule text-muted hover:border-muted'
            }`}
          >
            <input
              type="checkbox"
              checked={on[o.key]}
              onChange={() => setOn((p) => ({ ...p, [o.key]: !p[o.key] }))}
              className="sr-only"
            />
            {on[o.key] ? '✓ ' : '+ '}
            {o.label}
          </label>
        ))}
      </fieldset>

      <ol className="flex flex-wrap items-stretch gap-2">
        {STEPS.map((s) => {
          const active = !s.optional || on[s.optional]
          const index = visible.findIndex((v) => v.key === s.key)
          return (
            <li
              key={s.key}
              className={`flex min-w-0 flex-col gap-1 rounded-lg border px-3 py-2.5 transition-all ${
                active ? 'border-rule bg-surface' : 'border-dashed border-rule opacity-45'
              }`}
            >
              <span className={`label text-[0.58rem] ${active ? 'text-accent' : 'text-dim'}`}>
                {active ? String(index + 1).padStart(2, '0') : '—'}
              </span>
              <span className={`text-[0.82rem] ${active ? 'text-ink' : 'text-muted'}`}>
                {s.label}
              </span>
            </li>
          )
        })}
      </ol>

      <p aria-live="polite" className="label text-[0.62rem] text-muted">
        {visible.length} steps ·{' '}
        {visible.length === 5 ? 'minimum configuration' : `${visible.length - 5} optional spliced in`}
      </p>
    </div>
  )
}
