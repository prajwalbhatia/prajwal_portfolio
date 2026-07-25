import { headlineMetrics } from '@/content/experience'

/**
 * Four figures directly under the hero — the first thing a recruiter reads,
 * before they've decided whether to keep scrolling.
 */
export function MetricStrip() {
  return (
    <section aria-label="Headline results" className="rule-t">
      <div className="shell">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line">
          {headlineMetrics.map((m) => (
            <div
              key={m.label}
              className="bg-ink px-[clamp(1rem,4vw,2.5rem)] py-5 flex flex-col gap-1"
            >
              <dt className="sr-only">{m.label}</dt>
              <dd className="flex flex-col gap-1">
                <span className="font-display text-3xl sm:text-4xl leading-none tracking-tight text-signal tabular-nums">
                  {m.value}
                </span>
                <span aria-hidden="true" className="label text-muted leading-relaxed">
                  {m.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
