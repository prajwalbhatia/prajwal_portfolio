import type { Metadata } from 'next'

import { roles } from '@/content/experience'
import { awards, education, profile, socials, yearsOfExperience } from '@/content/profile'
import { skillGroups } from '@/content/skills'
import { rich } from '@/lib/rich'

export const metadata: Metadata = {
  title: 'Résumé',
  description: `Résumé of ${profile.name} — ${profile.title}, ${profile.level}, with ${yearsOfExperience()} years in React and TypeScript.`,
}

function period(start: string, end: string) {
  return end === 'present' ? `${start} – Present` : `${start} – ${end}`
}

export default function ResumePage() {
  return (
    <article className="shell gutter py-12 max-w-[62rem]">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-5 border-b border-rule">
        <div>
          <h1 className="display text-[clamp(2.2rem,6vw,3.4rem)] leading-none mb-2">
            {profile.name}
          </h1>
          <p className="text-muted">
            {profile.title} · {profile.level}
          </p>
        </div>
        <div className="flex flex-col gap-1 sm:text-right label text-muted">
          <a href={`mailto:${profile.email}`} className="hover:text-ink">
            {profile.email}
          </a>
          <span>{profile.location}</span>
          <span className="flex gap-3 sm:justify-end">
            {socials
              .filter((s) => s.id === 'github' || s.id === 'linkedin')
              .map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink"
                >
                  {s.label}
                </a>
              ))}
          </span>
        </div>
      </header>

      <section className="py-6 border-b border-rule">
        <h2 className="label text-muted mb-3">Summary</h2>
        <p className="text-sm leading-relaxed text-muted max-w-[75ch]">
          {profile.title}, {profile.level}, with {yearsOfExperience()} years building and scaling
          React + TypeScript products, shipping cross-stack features across React and Node. Combines
          hands-on delivery with team leadership — driving standards for code review, AI-assisted
          development, and design-to-engineering handoff. Specialises in scalable frontend
          architecture, Core Web Vitals optimisation, and operational ownership of production
          reliability.
        </p>
      </section>

      <section className="py-6 border-b border-rule">
        <h2 className="label text-muted mb-4">Experience</h2>
        <div className="flex flex-col gap-6">
          {roles.map((role) => (
            <div key={role.id} className="grid gap-2 sm:grid-cols-[1fr_11rem]">
              <div>
                <h3 className="font-semibold text-ink">
                  {role.title},{' '}
                  <span className="font-normal italic text-muted">{role.company}</span>
                </h3>
                <ul className="mt-2 flex flex-col gap-1.5 rich">
                  {role.highlights.map((h, i) => (
                    <li key={i} className="relative pl-4 text-sm leading-relaxed text-muted">
                      <span aria-hidden="true" className="absolute left-0 text-muted">
                        ·
                      </span>
                      {rich(h)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="label text-muted sm:text-right tabular-nums leading-relaxed">
                <span className="block">{period(role.start, role.end)}</span>
                <span className="block">{role.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-6 border-b border-rule">
        <h2 className="label text-muted mb-3">Education</h2>
        <div className="grid gap-1 sm:grid-cols-[1fr_11rem]">
          <div>
            <h3 className="font-semibold text-ink">{education.degree}</h3>
            <p className="text-sm italic text-muted">{education.institution}</p>
          </div>
          <div className="label text-muted sm:text-right tabular-nums leading-relaxed">
            <span className="block">{education.period}</span>
            <span className="block">{education.location}</span>
          </div>
        </div>
      </section>

      <section className="py-6 border-b border-rule">
        <h2 className="label text-muted mb-3">Technical skills</h2>
        <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {skillGroups.map((g) => (
            <div key={g.group}>
              <dt className="font-semibold text-sm text-ink mb-0.5">{g.group}</dt>
              <dd className="text-sm text-muted leading-relaxed">{g.items}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="py-6">
        <h2 className="label text-muted mb-3">Awards &amp; honours</h2>
        <ul className="flex flex-col gap-1.5">
          {awards.map((a) => (
            <li key={a.title} className="text-sm text-muted">
              <span className="font-semibold text-ink">{a.title}</span> — {a.detail} ({a.year})
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
