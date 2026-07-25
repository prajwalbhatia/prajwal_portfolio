import type { Role } from '@/content/experience'
import { rich } from '@/lib/rich'

function period(role: Role) {
  return role.end === 'present' ? `${role.start} — now` : `${role.start} — ${role.end}`
}

/**
 * `promotion: true` renders as a continuation of the same employer rather than
 * a new job — a left rule joining it to the row above, and an explicit label.
 * That distinction is career signal and shouldn't rely on the reader noticing
 * the company name is repeated.
 */
export function RoleEntry({ role, samePlaceAsPrevious }: { role: Role; samePlaceAsPrevious: boolean }) {
  const current = role.end === 'present'

  return (
    <article
      className={`grid gap-x-8 gap-y-3 border-b border-rule py-6 first:border-t sm:grid-cols-[9rem_1fr] ${
        samePlaceAsPrevious ? 'border-l border-l-rule pl-4 sm:pl-6' : ''
      }`}
    >
      <div className="flex flex-col gap-1">
        <time className="label text-muted">{period(role)}</time>
        {role.promotion && samePlaceAsPrevious && (
          // Neutral, not teal. A promotion is a single state, not a measured
          // pair — the joining rule and the label carry it structurally, which
          // is what the accent colours are protected for.
          <span className="label text-ink normal-case tracking-normal">↳ Promoted</span>
        )}
        {current && <span className="label text-muted">Current</span>}
      </div>

      <div>
        <h3 className="display text-xl">{role.title}</h3>
        <p className="mt-1 mb-4 text-sm text-muted">
          {samePlaceAsPrevious ? (
            <span className="sr-only">{role.company}, </span>
          ) : (
            <span>{role.company} · </span>
          )}
          {role.location}
        </p>

        <ul className="rich flex flex-col gap-2">
          {role.highlights.map((h, i) => (
            <li key={i} className="relative pl-4 text-sm leading-relaxed text-muted">
              <span aria-hidden="true" className="absolute left-0">
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
