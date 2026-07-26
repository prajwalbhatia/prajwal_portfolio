import type { Metadata } from 'next'
import Link from 'next/link'

import { Band } from '@/components/band'
import { Practices } from '@/components/practices'
import { RoleEntry } from '@/components/role-entry'
import { WorkFilter } from '@/components/work-filter'
import { roles } from '@/content/experience'
import { profile } from '@/content/profile'
import { workProjects } from '@/content/projects'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Projects and roles, newest first — Core Web Vitals, a thumbnail pipeline, a signup rebuild and a published React package.',
}

/** Short rail labels, keyed by role id. Purely editorial, so it lives here. */
const roleTags: Record<string, string> = {
  'vi-sde3': 'Current',
  'vi-sde2': 'Frontend',
  extramarks: 'Platform',
  attosol: 'Early career',
}

export default function WorkPage() {
  return (
    <>
      <section className="shell gutter pt-14 pb-10">
        <p className="label mb-5 text-now">Every number here is measured, not estimated</p>
        <h1 className="display text-[clamp(2.75rem,9vw,6rem)]">Work</h1>
        <p className="measure mt-6 text-base leading-relaxed text-body sm:text-lg">
          Projects and the roles they came out of. Each one links to a longer write-up.
        </p>
      </section>

      <section aria-labelledby="projects-heading" className="rule-t">
        <div className="shell gutter py-10 sm:py-12">
          <h2 id="projects-heading" className="sr-only">
            Selected projects
          </h2>
          <WorkFilter projects={workProjects} />
        </div>
      </section>

      <Band title="Roles">
        <div>
          {roles.map((role, i) => (
            <RoleEntry
              key={role.id}
              role={role}
              tag={roleTags[role.id]}
              samePlaceAsPrevious={i > 0 && roles[i - 1].company === role.company}
            />
          ))}
        </div>
      </Band>

      <Band title="Engineering practice">
        <p className="measure mb-6 text-sm text-body">
          The same before and after, applied to how a team works rather than how code runs.
        </p>
        <Practices />
      </Band>

      <section className="rule-t">
        <div className="shell gutter flex flex-col gap-6 py-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="display text-[clamp(1.9rem,5vw,3rem)]">
              Want the long version
              <br />
              of any of these?
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="border border-rule px-4 py-2.5 text-sm transition-colors hover:border-muted"
            >
              {profile.email}
            </a>
            <Link href="/resume" className="label text-muted transition-colors hover:text-ink">
              Full CV →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
