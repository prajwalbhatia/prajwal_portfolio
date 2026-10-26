import type { Metadata } from 'next'

import { roles } from '@/content/experience'
import { awards, education, profile, SITE_URL, socials } from '@/content/profile'
import { skillGroups } from '@/content/skills'
import { rich } from '@/lib/rich'

export const metadata: Metadata = {
  title: 'Résumé',
  description: `Résumé of ${profile.name} — ${profile.title} with 7+ years of experience in frontend engineering.`,
}

const linkedin = socials.find((social) => social.id === 'linkedin')

function period(start: string, end: string) {
  return end === 'present' ? `${start} – Present` : `${start} – ${end}`
}

export default function ResumePage() {
  return (
    <article className="shell gutter max-w-[62rem] py-12">
      <div className="no-print mb-8">
        <a
          href={profile.resumePdf}
          download
          className="label border border-now px-4 py-2.5 text-now transition-colors hover:bg-now hover:text-ground"
        >
          Download PDF ↓
        </a>
      </div>

      <header className="flex flex-col gap-4 border-b border-rule pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="display mb-2 text-[clamp(2.2rem,6vw,3.4rem)] leading-none">
            {profile.name}
          </h1>
          <p className="text-body">{profile.title}</p>
        </div>
        <div className="label flex flex-col gap-1 text-muted sm:text-right">
          <span>India</span>
          <a href={`mailto:${profile.email}`} className="hover:text-ink">
            {profile.email}
          </a>
          <a href={SITE_URL} className="hover:text-ink">
            prajwalbhatia.com
          </a>
          {linkedin && (
            <a href={linkedin.href} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              LinkedIn
            </a>
          )}
        </div>
      </header>

      <section className="border-b border-rule py-6">
        <h2 className="label mb-3 text-ink">Summary</h2>
        <p className="max-w-[75ch] text-sm leading-relaxed text-body">
          Senior frontend engineer with 7+ years of experience building web applications with
          React, TypeScript, JavaScript and Next.js. Specialised in frontend architecture,
          performance and reusable components, with end-to-end feature ownership across React and
          Node.js.
        </p>
      </section>

      <section className="border-b border-rule py-6">
        <h2 className="label mb-3 text-ink">Technical skills</h2>
        <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.group}>
              <dt className="mb-0.5 text-sm font-semibold text-ink">{group.group}</dt>
              <dd className="text-sm leading-relaxed text-body">{group.items}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-b border-rule py-6">
        <h2 className="label mb-4 text-ink">Experience</h2>
        <div className="flex flex-col gap-6">
          {roles.map((role) => (
            <div key={role.id} className="grid gap-2 sm:grid-cols-[1fr_11rem]">
              <div>
                <h3 className="font-semibold text-ink">
                  {role.title},{' '}
                  <span className="font-normal italic text-body">{role.company}</span>
                </h3>
                <ul className="rich mt-2 flex flex-col gap-1.5">
                  {role.highlights.map((highlight) => (
                    <li key={highlight} className="relative pl-4 text-sm leading-relaxed text-body">
                      <span aria-hidden="true" className="absolute left-0 text-body">·</span>
                      {rich(highlight)}
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

      <section className="border-b border-rule py-6">
        <h2 className="label mb-3 text-ink">Projects</h2>
        <div className="grid gap-2 sm:grid-cols-[1fr_11rem]">
          <div>
            <h3 className="font-semibold text-ink">
              <a href="https://ownfolio.in" target="_blank" rel="noopener noreferrer" className="underline decoration-rule underline-offset-4 hover:decoration-current">
                Ownfolio
              </a>{' '}
              <span className="font-normal italic text-body">· Creator</span>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-body">
              Built and launched a career-journaling platform for capturing contributions and
              evidence, requesting colleague acknowledgements and publishing career profiles.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-body">
              <span className="font-semibold text-ink">Stack:</span> Next.js, React, Node.js,
              Express, PostgreSQL, Drizzle ORM, Redis, BullMQ, Zod and Railway.
            </p>
          </div>
          <span className="label text-muted sm:text-right tabular-nums leading-relaxed">
            09/2026 – Present
          </span>
        </div>
      </section>

      <section className="py-6">
        <h2 className="label mb-3 text-ink">Education and honors</h2>
        <div className="grid gap-1 sm:grid-cols-[1fr_11rem]">
          <div>
            <h3 className="font-semibold text-ink">{education.degree}</h3>
            <p className="text-sm italic text-body">{education.institution}</p>
          </div>
          <span className="label text-muted sm:text-right tabular-nums leading-relaxed">
            {education.period}
          </span>
        </div>
        <ul className="mt-3 flex flex-col gap-1.5">
          {awards.map((award) => (
            <li key={award.title} className="text-sm text-body">
              <span className="font-semibold text-ink">{award.title}</span> — {award.detail} ({award.year})
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
