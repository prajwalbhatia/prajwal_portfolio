import type { Metadata } from 'next'

import { Band } from '@/components/band'
import { ProjectCard } from '@/components/project-card'
import { projects } from '@/content/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected engineering work — an async thumbnail pipeline on Kafka, a Core Web Vitals programme, a video player platform, and one habit tracker that got shut down.',
}

export default function ProjectsPage() {
  const shipped = projects.filter((p) => p.status === 'shipped')
  const sunset = projects.filter((p) => p.status === 'sunset')

  return (
    <>
      <section className="shell gutter pt-12 pb-6">
        <h1 className="display text-[clamp(2.4rem,8vw,4.5rem)] mb-4">
          Projects<span className="text-signal">.</span>
        </h1>
        <p className="text-base text-dim max-w-[58ch] leading-relaxed">
          Mostly things built inside a company, which means no public repo — described by what they
          do and what changed as a result.
        </p>
      </section>

      <Band title="Shipped">
        <div className="grid gap-3 md:grid-cols-3">
          {shipped.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </Band>

      <Band title="Sunset">
        <div className="grid gap-3 md:grid-cols-3">
          {sunset.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
        <p className="text-xs text-muted mt-4 max-w-[58ch] leading-relaxed">
          Shutting something down is a decision worth writing about. The postmortem is more useful
          than a dead link would have been.
        </p>
      </Band>
    </>
  )
}
