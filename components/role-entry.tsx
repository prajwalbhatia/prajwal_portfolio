import type { Role } from '@/content/experience'
import { rich } from '@/lib/rich'

function period(role: Role) {
  return role.end === 'present' ? `${role.start} — now` : `${role.start} — ${role.end}`
}

export function RoleEntry({ role }: { role: Role }) {
  const current = role.end === 'present'

  return (
    <article className="grid gap-4 sm:gap-6 border-b border-line py-5 first:border-t sm:grid-cols-[7rem_1fr_5rem]">
      <div className="label text-muted leading-relaxed tabular-nums pt-1">
        <span className="block">{period(role)}</span>
        {role.promotion && <span className="block text-signal">Promoted</span>}
      </div>

      <div>
        <h3 className="display text-2xl sm:text-[1.6rem] leading-none">{role.company}</h3>
        <p className="text-xs text-muted mt-1 mb-3">
          {role.title} · {role.location}
        </p>
        <ul className="flex flex-col gap-1.5 rich">
          {role.highlights.map((h, i) => (
            <li key={i} className="relative pl-4 text-sm leading-relaxed text-dim">
              <span aria-hidden="true" className="absolute left-0 text-muted">
                —
              </span>
              {rich(h)}
            </li>
          ))}
        </ul>
      </div>

      <div className="label text-signal sm:text-right pt-1">{current ? 'Current' : ''}</div>
    </article>
  )
}
