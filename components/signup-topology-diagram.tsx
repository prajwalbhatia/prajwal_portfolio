/**
 * Signup before/after as topology rather than as a bar chart.
 *
 * A two-bar chart for "3 → 1" says less than the figure above it already
 * does. What a chart cannot show is the two things that actually mattered:
 * the calls were *serial*, so each one's latency stacked, and the middle
 * screen was deleted rather than merged.
 *
 * Server component, no JS. All colours are tokens: rust is the path that was
 * replaced, green the one that shipped.
 *
 * No horizontal scroll: the viewBox scales down inside the card's half-width
 * column, so the type is set larger than it looks here to survive it.
 */
export function SignupTopologyDiagram() {
  return (
    <figure className="flex flex-col gap-3">
      <div className="rounded-xl border border-rule bg-surface p-4 sm:p-5">
        <svg
          viewBox="0 0 620 300"
          role="img"
          aria-label="Before: three signup screens in sequence, each firing its own API call that waits on the previous one, accumulating partial state. After: a single screen calling one transactional endpoint, with country and timezone inferred rather than asked."
          className="h-auto w-full"
          fill="none"
        >
          <defs>
            <marker id="st-a" viewBox="0 0 10 10" refX="9" refY="5"
                    markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 10 5 0 10z" fill="var(--color-was)" />
            </marker>
            <marker id="st-b" viewBox="0 0 10 10" refX="9" refY="5"
                    markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0 10 5 0 10z" fill="var(--color-now)" />
            </marker>
          </defs>

          {/* ── BEFORE ── */}
          <text x="0" y="14" fill="var(--color-was)" fontSize="10"
                fontWeight="700" letterSpacing="1.4">BEFORE</text>

          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={1 + i * 186} y="30" width="150" height="46" rx="8"
                    stroke="var(--color-was)"
                    fill="color-mix(in srgb, var(--color-was) 6%, transparent)" />
              <text x={20 + i * 186} y="58" className="fill-ink" fontSize="16" fontWeight="600">
                {['Screen 1', 'Screen 2', 'Screen 3'][i]}
              </text>
              {i < 2 && (
                <path d={`M152 ${53 + 0}h${34}`} transform={`translate(${i * 186} 0)`}
                      stroke="var(--color-was)" markerEnd="url(#st-a)" />
              )}

              {/* each screen's own call, chained to the one before */}
              <path d={`M${76 + i * 186} 78v22`} stroke="var(--color-was)"
                    strokeDasharray="3 3" markerEnd="url(#st-a)" />
              <rect x={16 + i * 186} y="102" width="120" height="34" rx="7"
                    stroke="var(--color-was)" strokeDasharray="3 3" />
              <text x={34 + i * 186} y="124" fill="var(--color-was)" fontSize="14" fontWeight="600">
                {`call ${i + 1}`}
              </text>
              {i < 2 && (
                <path d={`M${136 + i * 186} 119h${50}`} stroke="var(--color-was)"
                      markerEnd="url(#st-a)" />
              )}
            </g>
          ))}

          <text x="1" y="158" fill="var(--color-muted)" fontSize="13.5">
            each call waits on the last · partial state accumulates before anything commits
          </text>

          {/* ── AFTER ── */}
          <text x="0" y="200" fill="var(--color-now)" fontSize="10"
                fontWeight="700" letterSpacing="1.4">AFTER</text>

          <rect x="1" y="216" width="200" height="46" rx="8"
                stroke="var(--color-now)"
                fill="color-mix(in srgb, var(--color-now) 7%, transparent)" />
          <text x="20" y="244" className="fill-ink" fontSize="16" fontWeight="600">One screen</text>

          <path d="M203 239h44" stroke="var(--color-now)" markerEnd="url(#st-b)" />

          <rect x="249" y="216" width="228" height="46" rx="8"
                stroke="var(--color-now)"
                fill="color-mix(in srgb, var(--color-now) 7%, transparent)" />
          <text x="268" y="238" className="fill-ink" fontSize="16" fontWeight="600">
            One transactional call
          </text>
          <text x="268" y="254" fill="var(--color-muted)" fontSize="12">
            country + timezone inferred, not asked
          </text>

          {/* what went away */}
          <text x="1" y="286" fill="var(--color-was)" fontSize="14" fontWeight="600">
            the registration screen was deleted, not merged
          </text>
        </svg>
      </div>
      <figcaption className="label text-[0.62rem] text-muted">
        &ldquo;3+&rdquo; is a floor, not a count — the old frontend made three or more sequential
        calls depending on the path taken.
      </figcaption>
    </figure>
  )
}
