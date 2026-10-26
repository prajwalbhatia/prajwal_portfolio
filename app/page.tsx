import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

import { IdBadge } from '@/components/id-badge'
import { ExplainerCard } from '@/components/explainer-card'
import { StackIcon, stackHue } from '@/components/stack-icons'
import { TerminalCard } from '@/components/terminal-card'
import { Instrument } from '@/components/instrument'
import {
  CHANNEL_HANDLE,
  CHANNEL_URL,
  EXPLAINERS_LIMIT,
  HOME_EXPLAINERS,
  type Explainer,
} from '@/content/explainers'
import { profile, socials, SITE_URL } from '@/content/profile'
import { projects } from '@/content/projects'
import { stack } from '@/content/skills'
import { fetchExplainers } from '@/lib/youtube'

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
}

function SectionHead() {
  return (
    <header className="mb-8 flex flex-col items-center gap-3 text-center">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <h2 id="work-heading" className="display text-[clamp(1.75rem,4.5vw,2.6rem)]">
          Selected
          <svg
            aria-hidden="true"
            viewBox="0 0 120 12"
            className="mx-3 inline-block h-3 w-22 align-middle text-now"
            fill="none"
          >
            <path
              d="M1 7c14-6 26 4 40-1s24 5 38 0 26-3 40 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Work
        </h2>
      </div>
    </header>
  )
}

type Metric =
  | { was: string; now: string; label: string; sub?: string }
  | { val: string; label: string; sub?: string }

function MetricCell({ m }: { m: Metric }) {
  return (
    <div className="cs-tile flex flex-col gap-1 px-3.5 py-3">
      <p className="display text-[clamp(1.3rem,3vw,1.85rem)] tabular-nums text-ink">
        {'was' in m ? (
          <>
            {m.was}
            <span aria-hidden="true" className="cs-arrow">
              →
            </span>
            {m.now}
          </>
        ) : (
          m.val
        )}
      </p>
      <p className="label cs-hue text-[0.62rem]">{m.label}</p>
      {m.sub && <p className="text-[0.75rem] text-muted">{m.sub}</p>}
    </div>
  )
}

/* ------------------------------------------------------------------- data */

/** Three featured projects; /work carries the full list. */
const CARDS: {
  id: string
  theme: string
  metrics: Metric[]
  /** Optional direct product link, separate from the case-study card link. */
  liveUrl?: string
  shot?: { src: string; alt: string; width: number; height: number }
  custom?: { node: 'instrument-vitals'; wide?: boolean }
}[] = [
  {
    id: 'ownfolio',
    theme: 'theme-lav',
    metrics: [],
    liveUrl: 'https://ownfolio.in',
    shot: {
      src: '/ownfolio-home.png',
      alt: 'Ownfolio homepage showing a fictional Career Profile with a project, colleague acknowledgement and supporting link',
      width: 1440,
      height: 933,
    },
  },
  {
    id: 'web-vitals',
    theme: 'theme-sky',
    metrics: [
      { was: '5.45s', now: '3.17s', label: 'LCP p75', sub: 'batch selection · 42% faster' },
      { was: '0.229', now: '0.006', label: 'CLS p75', sub: 'intern profile' },
    ],
    custom: { node: 'instrument-vitals', wide: true },
  },
  {
    id: 'application-flow',
    theme: 'theme-lav',
    metrics: [
      { was: '28 min', now: '12 min', label: 'Time to apply', sub: '57% faster' },
      { val: '+24%', label: 'completion rate' },
    ],
    shot: {
      src: '/application.png',
      alt: 'The résumé-profile step of the application. A rail on the left marks seven steps with the sixth active, the heading reads Step 6 of 7, and the main action offers to autofill the profile from an uploaded résumé.',
      width: 1726,
      height: 976,
    },
  },
]

/* --------------------------------------------------------------- sections */

/**
 * Name and one-liner, centred both ways in a tall section — the same
 * arrangement as her `.section` rule (min-height: 100vh, flex, centred).
 *
 * `svh` rather than `vh` so mobile browsers don't shift the block when the
 * URL bar collapses. 72 rather than 100 so the ticker below sits well above
 * the fold rather than only peeking.
 *
 * The `max(32rem, …)` floor is load-bearing: the hanging badge is about 490px
 * tall (96 strap + 90 clip + ~304 card), so on a short viewport a pure
 * percentage would let it spill through the ticker band underneath.
 *
 * The role label is gone as its own line — the one-liner now opens with
 * "Senior Frontend Engineer", so the page still states it once, without
 * saying it twice in a row.
 */
function Hero() {
  // Split on the last space so the surname keeps working if the name changes.
  const parts = profile.name.trim().split(' ')
  const surname = parts.length > 1 ? parts.pop()! : ''
  const forename = parts.join(' ')

  return (
    <section className="gutter relative flex min-h-[max(32rem,72svh)] flex-col items-center justify-center text-center">
      {/* Hangs from the top of the section, desktop only — hers is hidden
          below her mobile breakpoint too, since a swinging badge next to
          centred text has nowhere to go on a narrow screen. */}
      <IdBadge />

      {/* Balances the badge: physical pass hanging left, terminal right.
          Vertically centred rather than hanging, so the two do not read as a
          matched pair of the same thing.

          Gated at xl, not lg: a 236px badge plus a 304px panel leaves too
          little room for the name between them at 1024px, and it wraps badly. */}
      <div className="absolute right-[clamp(1rem,5vw,4.5rem)] top-1/2 hidden -translate-y-1/2 xl:block">
        <TerminalCard />
      </div>

      <div className="shell flex flex-col items-center">
        {/* One line, always. Which means the type has to be sized to the space
            left between the badge and the panel rather than to the viewport:
            at 1280px those two plus their gutters take ~810px, leaving ~470px
            in the middle, and the name at 5rem is ~560px wide.

            Below lg neither is on screen, so the clamp runs free there. From
            lg up the sizes are fixed to what actually fits — the badge starts
            at lg, the panel at xl, and 2xl has room to grow again. */}
        <h1 className="display display-heavy whitespace-nowrap text-[clamp(2.5rem,9vw,5rem)] text-ink lg:text-[3.2rem] xl:text-[3.4rem] 2xl:text-[4.4rem]">
          {forename}
          {surname && <span className="text-accent"> {surname}</span>}
        </h1>

        {/* The tagline no longer opens with the role, so on narrow screens
            this is the only place it appears. Hidden from lg up, which is
            exactly where the badge header starts carrying it — above that
            the terminal's `whoami` states it a second time. */}
        <p className="label mt-4 font-extrabold text-ink lg:hidden">{profile.title}</p>

        <p className="mt-6 max-w-[34ch] text-[clamp(1.1rem,2.8vw,1.5rem)] leading-snug text-body lg:mt-7">
          {profile.tagline}
        </p>
      </div>
    </section>
  )
}

function StackMarquee() {
  // Two identical sets; the track slides exactly half its width, so the seam
  // never shows. Pure CSS — no JS, not a tab stop.
  //
  // `core: true` entries (the things written every day) get the accent and a
  // heavier chip. That flag has existed in content/skills.ts since the start
  // and rendered nowhere until now.
  const set = (
    <ul className="flex shrink-0 items-center gap-3 px-1.5">
      {stack.map((s) => (
        <li
          key={s.name}
          className={`stack-chip ${s.core ? 'stack-chip--core' : ''}`}
          // One custom property per chip drives its icon, border and tint —
          // cheaper than thirteen classes, and the CSS stays generic.
          style={{ ['--chip-hue' as string]: stackHue(s.name) }}
        >
          <span className="size-4.5 shrink-0">
            <StackIcon name={s.name} />
          </span>
          <span className="label whitespace-nowrap text-[0.7rem]">{s.name}</span>
        </li>
      ))}
    </ul>
  )

  return (
    <section aria-label="Tools and technologies" className="stack-band">
      <div className="marquee-mask overflow-hidden py-5">
        <div className="marquee-track flex" aria-hidden="true">
          {set}
          {set}
        </div>
      </div>
      {/* The visible strip is decorative and duplicated; this is the copy a
          screen reader actually gets. */}
      <p className="sr-only">{stack.map((s) => s.name).join(', ')}</p>
    </section>
  )
}

function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-heading" className="rule-t">
      <div className="shell gutter py-14">
        <SectionHead />

        <div className="flex flex-col gap-8">
          {CARDS.map((card) => {
            const p = projects.find((x) => x.id === card.id)
            if (!p) throw new Error(`Featured project is missing: ${card.id}`)

            return (
              /*
                The headline link covers the card. The direct product link sits
                above it so visitors can choose either destination.
              */
              <article
                key={card.id}
                className={`cs-card group relative items-stretch gap-7 p-6 transition-shadow duration-300 hover:shadow-[0_18px_44px_-22px_rgb(23_23_26/0.22)] sm:p-8 ${
                  card.custom?.wide
                    ? 'flex flex-col'
                    : 'grid lg:grid-cols-2 lg:gap-9'
                } ${card.theme}`}
              >
                <div className="flex flex-col justify-center gap-5">
                  <div className="flex flex-wrap items-center gap-2">
                    {[...p.tags, ...(p.tech ?? []).slice(0, 2)].map((t) => (
                      <span key={t} className="cs-chip label px-3 py-1.5 text-[0.6rem]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <h3 className="display max-w-[24ch] text-[clamp(1.35rem,3.2vw,2rem)]">
                    <Link
                      href={p.href}
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {p.headline ?? p.title}
                    </Link>
                  </h3>

                  {card.metrics.length > 0 ? (
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {card.metrics.map((m) => (
                        <MetricCell
                          key={`${m.label}-${'was' in m ? m.was : m.val}-${m.sub ?? ''}`}
                          m={m}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="max-w-[52ch] text-[0.95rem] leading-relaxed text-body">
                      {p.summary}
                    </p>
                  )}

                  <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-3">
                    {/* The headline link already names this destination. */}
                    <span
                      aria-hidden="true"
                      className="label cs-link inline-flex w-fit items-center pb-0.5 text-[0.64rem] text-ink"
                    >
                      Read the case study
                      <span>→</span>
                    </span>
                    {card.liveUrl && (
                      <a
                        href={card.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="label relative z-10 w-fit border-b border-now pb-0.5 text-[0.64rem] text-now transition-opacity hover:opacity-70"
                      >
                        Visit Ownfolio ↗
                      </a>
                    )}
                  </div>
                </div>

                {card.custom ? (
                  <div className="relative z-10">
                    <Instrument only="vitals" />
                  </div>
                ) : card.shot ? (
                  <div className="cs-media overflow-hidden">
                    <Image
                      src={card.shot.src}
                      alt={card.shot.alt}
                      width={card.shot.width}
                      height={card.shot.height}
                      sizes="(min-width: 1024px) 46vw, 92vw"
                      className="h-full w-full object-cover object-left-top"
                    />
                  </div>
                ) : null}
              </article>
            )
          })}
        </div>

        {/* Closes the list rather than sitting beside the heading: these cards
            are a selection, so the way out belongs after them, once you have
            seen what is on offer. */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/work"
            className="label inline-flex items-center gap-2 rounded-full border border-rule bg-surface px-6 py-3 text-[0.68rem] text-ink transition-colors hover:border-muted"
          >
            All work
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

function Explainers({ items }: { items: Explainer[] }) {
  if (items.length === 0) return null

  return (
    <section id="explainers" aria-labelledby="explainers-heading" className="rule-t">
      <div className="shell gutter py-14">
        <h2
          id="explainers-heading"
          className="display text-center text-[clamp(1.75rem,4.5vw,2.6rem)]"
        >
          Explainers
        </h2>
        <p className="mx-auto mt-3 max-w-[58ch] text-center text-body">
          Short videos on React, TypeScript and web performance.
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {items.slice(0, HOME_EXPLAINERS).map((item) => (
            <li key={item.id}>
              <ExplainerCard explainer={item} />
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="label inline-flex items-center gap-2 rounded-full border border-rule bg-surface px-6 py-3 text-[0.68rem] text-ink transition-colors hover:border-muted"
          >
            Watch the channel <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function ContactPills() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="rule-t">
      <div className="shell gutter py-14 text-center">
        <h2 id="contact-heading" className="display text-[clamp(1.75rem,4.5vw,2.6rem)]">
          Hiring for a senior role?
        </h2>
        <p className="mx-auto mt-4 max-w-[46ch] text-body">
          Email is fastest — I answer everything.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full border border-rule bg-surface px-5 py-2.5 text-sm text-ink transition-colors hover:border-muted"
          >
            {profile.email}
          </a>
          {socials
            .filter((s) => s.id === 'github' || s.id === 'linkedin')
            .map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-rule bg-surface px-5 py-2.5 text-sm text-body transition-colors hover:border-muted hover:text-ink"
              >
                {s.label}
              </a>
            ))}
          <a
            href={profile.resumePdf}
            className="rounded-full border border-now bg-now px-5 py-2.5 text-sm text-ground transition-opacity hover:opacity-90"
          >
            Résumé ↓
          </a>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- page */

export default async function HomePage() {
  const explainers = await fetchExplainers(CHANNEL_HANDLE, EXPLAINERS_LIMIT)

  return (
    <>
      <Hero />
      <StackMarquee />
      <SelectedWork />
      <Explainers items={explainers} />
      <ContactPills />
    </>
  )
}
