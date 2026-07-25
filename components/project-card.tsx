import Link from 'next/link'

import { Pair } from '@/components/pair'
import type { Project } from '@/content/projects'

/**
 * One accent per surface: a card either carries a measured pair, or it carries
 * none of the was/now colours at all. Sunset is signalled by a dashed rule and
 * a label, never by colour — parked is not failure, and rust already means
 * something specific.
 */
export function ProjectCard({ project }: { project: Project }) {
  const parked = project.status === 'sunset'

  return (
    <article
      className={`flex h-full flex-col gap-4 border p-5 transition-colors ${
        parked ? 'border-dashed border-rule' : 'border-rule hover:border-muted'
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="label border border-rule px-2 py-1 text-muted">
            {tag}
          </span>
        ))}
        {parked && (
          <span className="label border border-dashed border-rule px-2 py-1 text-muted">
            Parked
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="display text-xl">{project.title}</h3>
        {project.pair && (
          <Pair size="md" was={project.pair.was} now={project.pair.now} label={project.pair.label} />
        )}
      </div>

      <p className="text-sm leading-relaxed text-muted">{project.summary}</p>

      <p className="label mt-auto pt-1 text-muted">{project.context}</p>

      {project.href && (
        <Link
          href={project.href}
          className="label text-ink underline decoration-rule underline-offset-4 hover:decoration-current"
        >
          {project.linkLabel ?? 'Read more'} &rarr;
        </Link>
      )}
    </article>
  )
}
