import Image from 'next/image'
import Link from 'next/link'

import type { Project } from '@/content/projects'

const cardTones: Record<string, string> = {
  papermode: 'bg-[#f5f0e5]',
  'web-vitals': 'bg-[#eaf2fb]',
  'application-flow': 'bg-[#f1ebf8]',
  'thumbnail-pipeline': 'bg-[#e5f1eb]',
  'batch-selection': 'bg-[#faf1de]',
}

export function ProjectGrid({
  projects,
  positionStart = 1,
  totalProjects = projects.length,
}: {
  projects: Project[]
  positionStart?: number
  totalProjects?: number
}) {
  const ownfolio = projects.find((project) => project.id === 'ownfolio')
  const others = projects.filter((project) => project.id !== 'ownfolio')

  return (
    <div>
      {ownfolio && (
        <article className="group grid overflow-hidden rounded-2xl border border-rule bg-surface shadow-[0_18px_45px_-38px_rgb(23_23_26/0.38)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-between gap-12 p-7 sm:p-10">
            <div>
              <p className="label text-muted">Independent product · 2026</p>
              <h3 className="display mt-7 text-[clamp(2.5rem,5vw,4.5rem)]">Ownfolio</h3>
              <p className="mt-5 max-w-[44ch] text-base leading-relaxed text-body">
                {ownfolio.summary}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href={ownfolio.href}
                className="label inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-ground transition-colors hover:bg-accent"
              >
                Read the story <span aria-hidden="true">↗</span>
              </Link>
              <a
                href="https://ownfolio.in"
                target="_blank"
                rel="noopener noreferrer"
                className="label text-body underline decoration-rule underline-offset-4 transition-colors hover:text-ink"
              >
                Visit the product ↗
              </a>
            </div>
          </div>
          <div className="flex items-center overflow-hidden border-t border-rule bg-[#eceaf8] p-5 sm:p-8 lg:border-l lg:border-t-0">
            <Image
              src="/ownfolio-home.png"
              alt="Ownfolio homepage and sample career profile"
              width={1440}
              height={933}
              sizes="(min-width: 1024px) 48vw, 90vw"
              className="h-auto w-full rounded-xl border border-rule bg-surface shadow-[0_22px_45px_-30px_rgb(23_23_26/0.5)] transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </article>
      )}

      <ul className="mt-5 grid gap-5 md:grid-cols-2">
        {others.map((project, index) => (
          <li key={project.id} className={others.length === 1 ? 'md:col-span-2' : undefined}>
            <article
              className={`group relative flex h-full min-h-72 overflow-hidden rounded-2xl border border-rule transition-all duration-300 hover:-translate-y-1 hover:border-muted hover:shadow-[0_20px_40px_-30px_rgb(23_23_26/0.35)] ${project.id === 'papermode' ? 'flex-col md:grid md:grid-cols-[1fr_0.9fr]' : 'flex-col p-6 sm:p-8'} ${cardTones[project.id] ?? 'bg-surface'}`}
            >
              <div className={project.id === 'papermode' ? 'flex flex-col justify-between p-6 sm:p-8' : 'contents'}>
              <div>
                <div className="label flex items-center justify-between gap-4 text-muted">
                  <span>
                    {String(positionStart + index + (ownfolio ? 1 : 0)).padStart(2, '0')} /{' '}
                    {String(totalProjects).padStart(2, '0')}
                  </span>
                  <span>{project.tags[0]}</span>
                </div>
                <h3 className="display mt-8 max-w-[18ch] text-[clamp(1.8rem,3vw,2.5rem)] leading-tight">
                  {project.external ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {project.title}
                    </a>
                  ) : (
                    <Link href={project.href} className="after:absolute after:inset-0 after:content-['']">
                      {project.title}
                    </Link>
                  )}
                </h3>
                <p className="mt-4 max-w-[55ch] text-[0.95rem] leading-relaxed text-body">
                  {project.summary}
                </p>
              </div>
              <div className="label relative z-10 mt-9 flex items-center justify-between gap-4 border-t border-ink/10 pt-4 text-muted">
                <span>{project.context}</span>
                {project.sourceUrl ? (
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink underline decoration-rule underline-offset-4 transition-colors hover:text-accent"
                  >
                    Source ↗
                  </a>
                ) : (
                  <span aria-hidden="true" className="text-lg text-ink transition-transform group-hover:translate-x-1">
                    ↗
                  </span>
                )}
              </div>
              </div>
              {project.id === 'papermode' && (
                <div className="flex min-h-64 items-center justify-center overflow-hidden border-t border-rule bg-[#e9eee4] p-4 md:border-l md:border-t-0 md:p-7">
                  <Image
                    src="/papermode-study.png"
                    alt="Notebook and pencil resting on a laptop while a video lesson plays"
                    width={1254}
                    height={1254}
                    sizes="(min-width: 1024px) 42vw, 90vw"
                    className="h-auto max-h-[340px] w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
