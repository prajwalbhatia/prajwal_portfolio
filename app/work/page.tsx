import type { Metadata } from 'next'

import { Band } from '@/components/band'
import { Practices } from '@/components/practices'
import { RoleEntry } from '@/components/role-entry'
import { roles } from '@/content/experience'
import { awards, education } from '@/content/profile'
import { stack } from '@/content/skills'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Role history newest first, with measured results — Core Web Vitals, an async thumbnail pipeline, review standards and incident response.',
}

export default function WorkPage() {
  return (
    <>
      <section className="shell gutter pt-14 pb-8">
        <h1 className="display text-[clamp(2.25rem,7vw,4rem)]">Work</h1>
        <p className="measure mt-5 text-muted">
          Newest first. Where there isn&rsquo;t an honest number, there isn&rsquo;t one shown.
        </p>
      </section>

      <Band title="Roles">
        <div>
          {roles.map((role, i) => (
            <RoleEntry
              key={role.id}
              role={role}
              samePlaceAsPrevious={i > 0 && roles[i - 1].company === role.company}
            />
          ))}
        </div>
      </Band>

      <Band title="Engineering practice">
        <Practices />
      </Band>

      <Band title="Stack">
        <ul className="flex flex-wrap gap-2">
          {stack.map((sk) => (
            <li
              key={sk.name}
              className={`border px-3 py-1.5 text-sm ${
                sk.core ? 'border-now text-now' : 'border-rule text-muted'
              }`}
            >
              {sk.name}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted">
          Outlined in green is what I write every day. The rest is shipped, working familiarity.
        </p>
      </Band>

      <Band title="Education & recognition">
        <dl className="flex flex-col">
          <div className="grid gap-x-8 gap-y-1 border-b border-rule py-4 first:border-t sm:grid-cols-[9rem_1fr]">
            <dt className="label text-muted">{education.period}</dt>
            <dd>
              <p className="text-sm text-ink">{education.degree}</p>
              <p className="text-sm text-muted">
                {education.institution}, {education.location}
              </p>
            </dd>
          </div>
          {awards.map((a) => (
            <div
              key={a.title}
              className="grid gap-x-8 gap-y-1 border-b border-rule py-4 sm:grid-cols-[9rem_1fr]"
            >
              <dt className="label text-muted">{a.year}</dt>
              <dd>
                <p className="text-sm text-ink">{a.title}</p>
                <p className="text-sm text-muted">{a.detail}</p>
              </dd>
            </div>
          ))}
        </dl>
      </Band>
    </>
  )
}
