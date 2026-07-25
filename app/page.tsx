import Link from 'next/link'

import { Band } from '@/components/band'
import { MetricStrip } from '@/components/metric-strip'
import { ProjectCard } from '@/components/project-card'
import { ReelCard } from '@/components/reel-card'
import { RoleEntry } from '@/components/role-entry'
import { roles } from '@/content/experience'
import { profile, yearsOfExperience } from '@/content/profile'
import { featuredProjects } from '@/content/projects'
import { CHANNEL_URL, reels, SHOW_REELS } from '@/content/reels'
import { stack } from '@/content/skills'

function Hero() {
  const facts = [
    { k: 'Experience', v: `${yearsOfExperience()} years` },
    { k: 'Level', v: profile.level },
    { k: 'Based', v: profile.locationShort },
  ]

  return (
    <section className="shell gutter pt-12 pb-8 sm:pt-16 flex flex-col gap-6">
      <h1 className="display text-[clamp(3.2rem,13vw,8rem)]">
        Prajwal
        <br />
        Bhatia<span className="text-signal">.</span>
      </h1>

      <div className="rule-t pt-5 grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:items-end">
        <p className="text-base sm:text-lg leading-relaxed text-dim max-w-[50ch]">
          Senior software engineer, frontend-heavy, {yearsOfExperience()} years in.{' '}
          <span className="text-text font-semibold">{profile.tagline}</span> Currently{' '}
          <span className="text-text font-semibold">
            {profile.level} at {profile.company}
          </span>
          , where I took our highest-traffic flow from{' '}
          <span className="text-text font-semibold tabular-nums">5.45s to 3.17s</span>, built the
          async pipeline behind portfolio thumbnails, and rewrote how the team reviews code.
        </p>

        <dl className="flex flex-col gap-2">
          {facts.map((f) => (
            <div
              key={f.k}
              className="flex justify-between gap-4 border-b border-dotted border-line pb-1.5"
            >
              <dt className="label text-muted">{f.k}</dt>
              <dd className="label text-text">{f.v}</dd>
            </div>
          ))}
          {profile.openToWork && (
            <div className="flex justify-between gap-4 border-b border-dotted border-line pb-1.5">
              <dt className="label text-muted">Status</dt>
              <dd className="label text-signal">Open to roles</dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="rule-t">
      <div className="shell gutter py-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="display text-[clamp(1.9rem,5vw,3rem)] mb-3">
            Hiring for a
            <br />
            senior role<span className="text-signal">?</span>
          </h2>
          <p className="text-sm text-dim max-w-[42ch]">
            I&rsquo;m open to conversations. Email is fastest — I answer everything.
          </p>
        </div>
        <a
          href={`mailto:${profile.email}`}
          className="label border border-signal text-signal px-5 py-3 hover:bg-signal hover:text-ink transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          {profile.email}
        </a>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <MetricStrip />

      <Band title="Track record" action="Full detail" actionHref="/work">
        <div>
          {roles.map((role) => (
            <RoleEntry key={role.id} role={role} />
          ))}
        </div>
      </Band>

      <Band title="Stack">
        <ul className="flex flex-wrap gap-2">
          {stack.map((s) => (
            <li
              key={s.name}
              className={`border px-2.5 py-1.5 text-sm ${
                s.core ? 'border-signal text-text' : 'border-line-2 text-dim'
              }`}
            >
              {s.name}
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted mt-3">
          Outlined in magenta = what I write every day. The rest is shipped, working familiarity.
        </p>
      </Band>

      <Band title="Selected work" action="All projects" actionHref="/projects">
        <div className="grid gap-3 md:grid-cols-3">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </Band>

      {SHOW_REELS && (
        <Band title="I also teach this" action="Watch the channel" actionHref="/reels">
          <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {reels.map((r) => (
              <li key={r.id}>
                <ReelCard reel={r} />
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted mt-4">
            Short explainers on React, TypeScript and performance.{' '}
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dim hover:text-signal transition-colors"
            >
              youtube.com/@prajwalbhatia
            </a>
          </p>
        </Band>
      )}

      <Contact />
    </>
  )
}
