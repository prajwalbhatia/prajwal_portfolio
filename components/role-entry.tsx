import type { Role } from '@/content/experience'
import { rich } from '@/lib/rich'

function period(role: Role) {
  return role.end === 'present' ? `${role.start} — now` : `${role.start} — ${role.end}`
}

export function RoleEntry({ role }: { role: Role }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-rule bg-surface p-6 sm:p-8">
      <div className="label flex flex-wrap items-center justify-between gap-2 text-muted">
        <span>{role.company}</span>
        <time>{period(role)}</time>
      </div>
      <h3 className="display mt-7 text-[clamp(1.45rem,2.5vw,2rem)] leading-tight">
        {role.title}
      </h3>
      <p className="label mt-2 text-muted">
        {role.location}{role.promotion ? ' · Promoted' : ''}
      </p>
      <ul className="rich mt-6 flex flex-col gap-3 border-t border-rule pt-5">
        {role.highlights.slice(0, 2).map((highlight) => (
          <li key={highlight} className="relative pl-4 text-[0.9rem] leading-relaxed text-body">
            <span aria-hidden="true" className="absolute left-0 text-accent">·</span>
            {rich(highlight)}
          </li>
        ))}
      </ul>
    </article>
  )
}
