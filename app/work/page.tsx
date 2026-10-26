import type { Metadata } from 'next'
import Link from 'next/link'

import { Practices } from '@/components/practices'
import { ProjectGrid } from '@/components/project-grid'
import { RoleEntry } from '@/components/role-entry'
import { roles } from '@/content/experience'
import { profile } from '@/content/profile'
import { workProjects } from '@/content/projects'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects and roles, including Ownfolio and production work in performance, product and architecture.',
}

export default function WorkPage() {
  return (
    <>
      <section className="shell gutter grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:gap-20">
        <div>
          <p className="label text-muted">Projects, products and the roles behind them</p>
          <h1 className="display mt-5 text-[clamp(4.5rem,13vw,10rem)] leading-[0.88]">
            Work<span className="text-accent">.</span>
          </h1>
        </div>
        <div className="lg:pb-2">
          <p className="max-w-[38ch] text-[clamp(1.15rem,2vw,1.5rem)] leading-snug text-body">
            A product I built independently and engineering work that made complex flows faster,
            clearer and more reliable.
          </p>
          <a
            href="#projects"
            className="label mt-7 inline-flex items-center gap-2 border-b border-ink pb-1 text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Explore projects <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section id="projects" aria-labelledby="projects-heading" className="rule-t">
        <div className="shell gutter py-14 sm:py-20">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label mb-3 text-muted">01 / The work</p>
              <h2 id="projects-heading" className="display text-[clamp(2.2rem,5vw,4rem)]">
                Selected projects
              </h2>
            </div>
            <p className="label text-muted">{workProjects.length} stories</p>
          </div>
          <ProjectGrid projects={workProjects} />
        </div>
      </section>

      <section id="roles" aria-labelledby="roles-heading" className="rule-t">
        <div className="shell gutter py-14 sm:py-20">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label mb-3 text-muted">02 / The path</p>
              <h2 id="roles-heading" className="display text-[clamp(2.2rem,5vw,4rem)]">
                Experience
              </h2>
            </div>
            <Link href="/resume" className="label text-ink underline decoration-rule underline-offset-4 hover:decoration-ink">
              Full résumé ↗
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {roles.map((role) => (
              <RoleEntry key={role.id} role={role} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="practice-heading" className="rule-t">
        <div className="shell gutter py-14 sm:py-20">
          <p className="label mb-3 text-muted">03 / Beyond delivery</p>
          <h2 id="practice-heading" className="display text-[clamp(2.2rem,5vw,4rem)]">
            How I work
          </h2>
          <p className="mt-4 mb-9 max-w-[60ch] text-body">
            I test what I build, learn from failures and help teammates take ownership of their work.
          </p>
          <Practices />
        </div>
      </section>

      <section className="rule-t">
        <div className="shell gutter py-12 sm:py-16">
          <div className="flex flex-col gap-8 rounded-2xl bg-ink p-8 text-ground sm:flex-row sm:items-end sm:justify-between sm:p-10">
            <div>
              <p className="label text-ground/65">Let’s talk</p>
              <h2 className="display mt-4 max-w-[17ch] text-[clamp(1.9rem,4vw,3.2rem)]">
                Want to know more about the work?
              </h2>
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="label inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-ground px-5 py-3 text-ink transition-colors hover:bg-[#eceaf8]"
            >
              Email me <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
