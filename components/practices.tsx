import { practices } from '@/content/experience'

const featuredAreas = ['Code review', 'Incident response', 'Mentoring']

export function Practices() {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {featuredAreas.map((area) => {
        const practice = practices.find((item) => item.area === area)
        if (!practice) return null

        return (
          <li key={practice.area} className="flex h-full flex-col rounded-2xl border border-rule bg-surface p-6 sm:p-7">
            <h3 className="label text-muted">{practice.area}</h3>
            <p className="mt-7 text-lg font-semibold leading-snug text-ink">{practice.title}</p>
            <p className="mt-5 flex-1 text-[0.9rem] leading-relaxed text-body">{practice.detail}</p>
            {practice.evidence && (
              <p className="label mt-6 border-t border-rule pt-4 text-muted">{practice.evidence}</p>
            )}
          </li>
        )
      })}
    </ul>
  )
}
