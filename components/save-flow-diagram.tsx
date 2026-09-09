/**
 * The persistence layer as one picture: three triggers, two destinations,
 * one gate.
 *
 * Server component — no interaction, no JS. Everything is currentColor or a
 * design token, so it follows the palette rather than pinning its own.
 */
export function SaveFlowDiagram() {
  return (
    <figure className="flex flex-col gap-3">
      <div className="overflow-x-auto rounded-xl border border-rule bg-surface p-5 sm:p-7">
        <svg
          viewBox="0 0 760 300"
          role="img"
          aria-label="Three triggers — a field blurring, a one-second poller while the form is dirty, and the step's own submit — all write immediately to localStorage and feed a single five-second debounced write to the API. The API write is gated on the form being both valid and dirty, so an invalid form drafts locally and never reaches the server."
          className="h-auto w-full min-w-[620px]"
          fill="none"
        >
          <defs>
            <marker id="sf-arrow" viewBox="0 0 10 10" refX="9" refY="5"
                    markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 10 5 0 10z" fill="var(--color-dim)" />
            </marker>
          </defs>

          {/* triggers */}
          {[
            { y: 44, t: 'blur', s: 'field loses focus' },
            { y: 130, t: '1s poller', s: 'while form is dirty' },
            { y: 216, t: 'submit', s: 'step advances' },
          ].map((r) => (
            <g key={r.t}>
              <rect x="1" y={r.y} width="168" height="56" rx="9"
                    stroke="var(--color-rule)" fill="var(--color-ground)" />
              <text x="18" y={r.y + 24} className="fill-ink" fontSize="14" fontWeight="600">
                {r.t}
              </text>
              <text x="18" y={r.y + 42} fill="var(--color-muted)" fontSize="11">
                {r.s}
              </text>
              <path d={`M170 ${r.y + 28}h58`} stroke="var(--color-dim)" strokeDasharray="4 4"
                    markerEnd="url(#sf-arrow)" />
            </g>
          ))}

          {/* fan-in */}
          <path d="M228 72v144" stroke="var(--color-dim)" />

          {/* immediate local write */}
          <path d="M228 72h96" stroke="var(--color-now)" strokeWidth="1.6"
                markerEnd="url(#sf-arrow)" />
          <rect x="326" y="20" width="180" height="60" rx="9"
                stroke="var(--color-now)" fill="color-mix(in srgb, var(--color-now) 7%, transparent)" />
          <text x="344" y="44" className="fill-ink" fontSize="14" fontWeight="600">localStorage</text>
          <text x="344" y="62" fill="var(--color-muted)" fontSize="11">immediate · per step · 24h TTL</text>

          {/* debounce */}
          <path d="M228 158h96" stroke="var(--color-live)" strokeWidth="1.6"
                markerEnd="url(#sf-arrow)" />
          <rect x="326" y="130" width="180" height="56" rx="9"
                stroke="var(--color-live)" fill="color-mix(in srgb, var(--color-live) 7%, transparent)" />
          <text x="344" y="154" className="fill-ink" fontSize="14" fontWeight="600">debounce 5s</text>
          <text x="344" y="172" fill="var(--color-muted)" fontSize="11">collapses the three</text>

          {/* gate */}
          <path d="M508 158h52" stroke="var(--color-dim)" strokeDasharray="4 4"
                markerEnd="url(#sf-arrow)" />
          <rect x="562" y="132" width="86" height="52" rx="26"
                stroke="var(--color-was)" fill="color-mix(in srgb, var(--color-was) 6%, transparent)" />
          <text x="580" y="154" fill="var(--color-was)" fontSize="11" fontWeight="700">gate</text>
          <text x="573" y="170" fill="var(--color-muted)" fontSize="10">valid &amp; dirty</text>

          <path d="M650 158h48" stroke="var(--color-dim)" markerEnd="url(#sf-arrow)" />
          <rect x="1" y="1" width="0" height="0" />
          <text x="700" y="152" className="fill-ink" fontSize="14" fontWeight="600">API</text>
          <text x="700" y="170" fill="var(--color-muted)" fontSize="11">draft</text>

          {/* the rejected path */}
          <path d="M605 186v44h-96" stroke="var(--color-was)" strokeDasharray="4 4"
                markerEnd="url(#sf-arrow)" />
          <text x="330" y="234" fill="var(--color-was)" fontSize="11" fontWeight="600">
            invalid → stays local only
          </text>
        </svg>
      </div>
      <figcaption className="label text-[0.62rem] text-muted">
        Blur alone is not enough — someone who types and closes the tab never blurs the field.
      </figcaption>
    </figure>
  )
}
