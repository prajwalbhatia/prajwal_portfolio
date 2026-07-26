import type { Role } from '@/content/experience'
import { rich } from '@/lib/rich'

function period(role: Role) {
  return role.end === 'present' ? `${role.start} — now` : `${role.start} — ${role.end}`
}

/**
 * A role: dates and a status tag in the left rail, everything else in the
 * body. `promotion: true` adds a "Promoted" marker so an internal move reads
 * as career progression rather than a job change — that distinction shouldn't
 * depend on the reader noticing the company name repeat.
 */
export function RoleEntry({
  role,
  samePlaceAsPrevious,
  tag,
}: {
  role: Role
  samePlaceAsPrevious: boolean
  /** Short status word for the rail — "Current", "Frontend", "Early career". */
  tag?: string
}) {
  return (
    <article className="grid gap-x-10 gap-y-3 border-b border-rule py-8 first:border-t md:grid-cols-[11rem_1fr]">
      <div className="flex flex-col gap-1">
        <time className="label text-ink">{period(role)}</time>
        {tag && <span className="label text-muted">{tag}</span>}
        {role.promotion && samePlaceAsPrevious && (
          <span className="label text-muted">↳ Promoted</span>
        )}
      </div>

      <div>
        <h3 className="display text-[clamp(1.4rem,2.6vw,1.8rem)]">{role.title}</h3>
        <p className="mt-1.5 mb-5 text-sm text-muted">
          {role.company} · {role.location}
        </p>

        <ul className="rich flex flex-col gap-2.5">
          {role.highlights.map((h, i) => (
            <li
              key={i}
              className="relative max-w-[76ch] pl-5 text-[0.9rem] leading-relaxed text-muted"
            >
              <span aria-hidden="true" className="absolute left-0 text-rule">
                —
              </span>
              {rich(h)}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
