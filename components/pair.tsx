/**
 * The paired-state motif — the site's identity, in one component.
 *
 * Two values with the relationship carried by layout and colour: rust for what
 * it was, teal for what it became. The connecting rule is decorative and hidden
 * from assistive tech; screen readers get the relationship stated in words
 * instead, because a hairline is not a sentence.
 *
 * Rule: only render this where a real measured before exists. There is no
 * variant that takes a single value — if you find yourself wanting one, the
 * content doesn't belong in the motif.
 */

const sizes = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-[clamp(1.75rem,4vw,2.5rem)]',
} as const

export function Pair({
  was,
  now,
  label,
  where,
  size = 'md',
}: {
  was: string
  now: string
  /** What is being measured. Rendered as a mono label beneath. */
  label?: string
  /** Optional context line — where the measurement was taken. */
  where?: string
  size?: keyof typeof sizes
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className={`pair ${sizes[size]}`}>
        <span className="pair-was">
          <span className="sr-only">Was </span>
          {was}
        </span>
        <span aria-hidden="true" className="pair-rule" />
        <span className="pair-now">
          <span className="sr-only">now </span>
          {now}
        </span>
      </p>
      {(label || where) && (
        <div className="flex flex-col gap-0.5">
          {label && <span className="label text-ink">{label}</span>}
          {where && <span className="label text-muted normal-case tracking-normal">{where}</span>}
        </div>
      )}
    </div>
  )
}

/**
 * Inline variant for prose and table cells, where a stacked label would break
 * the line. Same colour contract.
 */
export function PairInline({ was, now }: { was: string; now: string }) {
  return (
    <span className="pair text-base">
      <span className="pair-was">
        <span className="sr-only">Was </span>
        {was}
      </span>
      <span aria-hidden="true" className="pair-rule" />
      <span className="pair-now">
        <span className="sr-only">now </span>
        {now}
      </span>
    </span>
  )
}
