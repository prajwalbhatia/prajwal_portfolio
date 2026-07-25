import { practices } from '@/content/experience'

/**
 * The same motif applied to process rather than code. Rendered as a
 * definition-style grid instead of `Pair` because these are sentences, not
 * figures — the was/now colours still carry the relationship, but a hairline
 * between two clauses would read as a typo.
 */
export function Practices() {
  return (
    <ul className="flex flex-col">
      {practices.map((p) => (
        <li
          key={p.area}
          className="grid gap-x-8 gap-y-2 border-b border-rule py-5 first:border-t md:grid-cols-[11rem_1fr]"
        >
          <h3 className="label text-ink pt-1">{p.area}</h3>

          <div className="flex flex-col gap-2">
            <div className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
              <p className="pair-was text-sm leading-snug">
                <span className="sr-only">Was: </span>
                {p.was}
              </p>
              <p className="pair-now text-sm leading-snug">
                <span className="sr-only">Now: </span>
                {p.now}
              </p>
            </div>

            {p.evidence && (
              <p className="label text-muted normal-case tracking-normal">{p.evidence}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
