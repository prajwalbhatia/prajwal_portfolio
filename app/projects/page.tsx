import type { Metadata } from 'next'

import { Band } from '@/components/band'
import { ProjectCard } from '@/components/project-card'
import { projects } from '@/content/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected engineering work — a Core Web Vitals programme, a versioned React package, an async thumbnail pipeline on BullMQ, and a batch-selection re-architecture.',
}

export default function ProjectsPage() {
  const shipped = projects.filter((p) => p.status === 'shipped')
  const parked = projects.filter((p) => p.status === 'sunset')

  return (
    <>
      <section className="shell gutter pt-14 pb-8">
        <h1 className="display text-[clamp(2.25rem,7vw,4rem)]">Projects</h1>
        <p className="measure mt-5 text-muted">
          Mostly built inside a company, which means no public repo — described by what they do and
          what changed as a result.
        </p>
      </section>

      <Band title="Shipped">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {shipped.map((p) => (
            <li key={p.id} className="flex">
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      </Band>

      <Band title="Parked">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {parked.map((p) => (
            <li key={p.id} className="flex">
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
        <p className="measure mt-5 text-xs text-muted">
          Listed because taking something down is part of the record. There is nothing to read yet —
          the rebuild has to exist before it is worth writing about.
        </p>
      </Band>
    </>
  )
}
