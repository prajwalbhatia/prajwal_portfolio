import { practices } from '@/content/experience'

/**
 * The same before/after applied to process rather than code.
 *
 * Rendered as prose rather than with `Pair`, because these are sentences: a
 * hairline rule between two clauses reads as a typo. The was/now colours still
 * carry the relationship, and each row states why the change mattered — that
 * is the question an interviewer asks next.
 */
export function Practices() {
  return (
    <ul className="flex flex-col">
      {practices.map((p) => (
        <li
          key={p.area}
          className="grid gap-x-10 gap-y-4 border-b border-rule py-7 first:border-t md:grid-cols-[11rem_1fr]"
        >
          <h3 className="label text-ink">{p.area}</h3>

          <div className="flex flex-col gap-3">
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[0.95rem]">
              <span className="text-was line-through decoration-was/50">{p.was}</span>
              <span aria-hidden="true" className="text-body">
                →
              </span>
              <span className="font-semibold text-now">{p.now}</span>
            </p>

            <p className="max-w-[68ch] text-[0.9rem] leading-relaxed text-body">{p.detail}</p>

            {p.evidence && <p className="label text-muted">{p.evidence}</p>}
          </div>
        </li>
      ))}
    </ul>
  )
}
