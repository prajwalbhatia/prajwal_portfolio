import Link from 'next/link'

import type { Project } from '@/content/projects'

export function ProjectCard({ project }: { project: Project }) {
  const sunset = project.status === 'sunset'

  return (
    <article
      className={`flex flex-col gap-2.5 border p-4 transition-colors ${
        sunset ? 'border-sunset' : 'border-line hover:border-line-2'
      }`}
    >
      <span className="label text-muted">{project.context}</span>
      <h3 className="display text-xl leading-tight">{project.title}</h3>

      {project.metric && (
        <span className="font-display text-2xl leading-none tracking-tight text-signal tabular-nums">
          {project.metric}
        </span>
      )}

      <p className="text-sm leading-relaxed text-dim">{project.summary}</p>

      {project.href && (
        <Link
          href={project.href}
          className="label text-signal hover:underline underline-offset-4 mt-auto pt-2"
        >
          {project.linkLabel ?? 'Read more'} →
        </Link>
      )}
    </article>
  )
}
