import Link from 'next/link'

import { ExperienceAccordion } from '@/components/experience-accordion'
import { IdBadge } from '@/components/id-badge'
import { StackIcon, stackHue } from '@/components/stack-icons'
import { TerminalCard } from '@/components/terminal-card'
import { ExplainerCard } from '@/components/explainer-card'
import { CHANNEL_HANDLE, CHANNEL_URL, EXPLAINERS_LIMIT } from '@/content/explainers'
import { profile, socials } from '@/content/profile'
import { projects } from '@/content/projects'
import { stack } from '@/content/skills'
import { fetchExplainers } from '@/lib/youtube'

/* ------------------------------------------------------------------ pieces */

/**
 * Her .cs-hdr-row / .ai-hdr-row / .exp-hdr-row: an eyebrow, a hand-drawn
 * line, and the rest of the title. Hers is a scribbled SVG squiggle; this is
 * a restrained version of the same idea — swap `path` for a straight rule if
 * it reads as too much of her signature.
 */
function SectionHead({
  lead,
  trail,
  sub,
  action,
  actionHref,
  center = false,
}: {
  lead: string
  trail?: string
  sub?: string
  action?: string
  actionHref?: string
  /** Centres the heading and its standfirst. */
  center?: boolean
}) {
  return (
    <header className={`mb-8 flex flex-col gap-3 ${center ? 'items-center text-center' : ''}`}>
      <div
        className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${center ? 'justify-center' : ''}`}
      >
        <h2 className="display text-[clamp(1.75rem,4.5vw,2.6rem)]">
          {lead}
          {/* The squiggle is an inline SVG and contributes no whitespace, so
              without these the two words render as "SelectedWork". */}
          {trail !== undefined && (
            <>
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
              {trail && <span>{trail}</span>}
            </>
          )}
        </h2>
        {action && actionHref && (
          <Link
            href={actionHref}
            className="label ml-auto text-muted transition-colors hover:text-ink"
          >
            {action} →
          </Link>
        )}
      </div>
      {sub && <p className="max-w-[58ch] text-body">{sub}</p>}
    </header>
  )
}

type Metric =
  | { was: string; now: string; label: string; sub?: string }
  | { val: string; label: string; sub?: string }

/** Drives the drawn before/after in the card's media slot. */
type Bars = { was: string; now: string; note: string }

/** Letterpressed tile, per her .cs-metric. The arrow is small and raised. */
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

/** "5.45s" → 5.45, "513KB" → 513, "28 min" → 28, "3+" → 3. */
function magnitude(v: string) {
  const n = Number.parseFloat(v.replace(/[^0-9.]/g, ''))
  return Number.isFinite(n) ? n : 0
}

/**
 * Fills her .cs-card-image slot. Hers holds a screenshot or a screen
 * recording; we have neither, and the platform is internal.
 *
 * So it holds the improvement drawn to scale instead — two bars whose lengths
 * are the real ratio between the before and after. This is the one place the
 * was/now pair is used exactly as globals.css intends: the orange bar IS the
 * before and the green one IS the after, not decoration.
 *
 * The proportions are honest, which means CLS 0.229 → 0.006 renders as a
 * sliver next to a full bar. That is the point.
 */
function BeforeAfterBars({ was: wasLabel, now: nowLabel, note }: Bars) {
  const was = magnitude(wasLabel)
  const now = magnitude(nowLabel)
  // Floor at 1.5% so a near-total reduction still leaves something visible.
  const nowPct = was > 0 ? Math.max((now / was) * 100, 1.5) : 0

  return (
    <figure className="flex h-full flex-col justify-center gap-6 p-6 sm:p-8">
      <div className="flex flex-col gap-2.5">
        <div className="flex items-baseline justify-between gap-3">
          <span className="label text-[0.62rem] text-was">Before</span>
          <span className="font-mono text-[0.8rem] tabular-nums text-body">{wasLabel}</span>
        </div>
        <span className="block h-3 w-full rounded-full bg-was/25">
          <span className="block h-full rounded-full bg-was" style={{ width: '100%' }} />
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex items-baseline justify-between gap-3">
          <span className="label text-[0.62rem] text-now">After</span>
          <span className="font-mono text-[0.8rem] tabular-nums text-body">{nowLabel}</span>
        </div>
        <span className="block h-3 w-full rounded-full bg-now/20">
          <span
            className="block h-full rounded-full bg-now"
            style={{ width: `${nowPct.toFixed(1)}%` }}
          />
        </span>
      </div>

      <figcaption className="label text-[0.6rem] text-muted">{note}</figcaption>
    </figure>
  )
}

/* ------------------------------------------------------------------- data */

/**
 * Which four projects lead the home page, and how each one is presented.
 *
 * Headlines live on the Project in content/projects.ts; the theme, metrics and
 * bars are presentation and belong here.
 *
 * The single-value figures (~55%, 8×, 95%) are real and come from
 * content/experience.ts. They are deliberately NOT in `proofLedger`, which is
 * reserved for genuine before/after pairs — inventing a "before" for them
 * would undo the whole argument.
 */
const CARDS: {
  id: string
  theme: string
  metrics: Metric[]
  /** Omit on projects with no honest pair — the card falls back to a diagram. */
  bars?: Bars
}[] = [
  {
    id: 'web-vitals',
    theme: 'theme-sky',
    metrics: [
      { was: '5.45s', now: '3.17s', label: 'LCP p75', sub: '42% faster' },
      { was: '0.229', now: '0.006', label: 'CLS p75', sub: 'near-zero shift' },
    ],
    bars: { was: '5.45s', now: '3.17s', note: 'LCP p75 · batch selection · field data' },
  },
  {
    id: 'thumbnail-pipeline',
    theme: 'theme-green',
    metrics: [
      { val: '~55%', label: 'of URLs via og:image', sub: 'in about a second' },
      { val: '8×', label: 'lower latency', sub: 'vs the Puppeteer fallback' },
      { val: '95%', label: 'success in production' },
    ],
    // No pair by design — these three figures are single-valued.
  },
  {
    id: 'application-flow',
    theme: 'theme-lav',
    metrics: [{ was: '28 min', now: '12 min', label: 'Time to apply', sub: '57% faster' }],
    bars: { was: '28 min', now: '12 min', note: 'Time to complete · five-step application' },
  },
  {
    id: 'signup-funnel',
    theme: 'theme-peach',
    metrics: [
      { was: '3+', now: '1', label: 'Sequential API calls', sub: 'one transactional endpoint' },
    ],
    bars: { was: '3+', now: '1', note: 'Sequential calls before anything is committed' },
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
        <div id="work-heading">
          <SectionHead lead="Selected" trail="Work" center />
        </div>

        {/* Her .cs-cards-wrap: a single column of wide cards, generously
            spaced, each internally two columns — copy left, media right. */}
        <div className="flex flex-col gap-8">
          {CARDS.map((card) => {
            const p = projects.find((x) => x.id === card.id)
            if (!p) throw new Error(`preview CARDS references unknown project: ${card.id}`)

            return (
              <Link
                key={card.id}
                href={p.href ?? '/work'}
                className={`cs-card group grid items-stretch gap-7 p-6 transition-shadow duration-300 hover:shadow-[0_18px_44px_-22px_rgb(23_23_26/0.22)] sm:p-8 lg:grid-cols-2 lg:gap-9 ${card.theme}`}
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
                    {p.headline ?? p.title}
                  </h3>

                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {card.metrics.map((m) => (
                      <MetricCell key={m.label} m={m} />
                    ))}
                  </div>

                  <span className="label mt-1 inline-flex w-fit items-center pb-0.5 text-[0.64rem] text-ink cs-link">
                    Read the case study
                    <span aria-hidden="true">→</span>
                  </span>
                </div>

                {/* Her media column. Ours draws the improvement rather than
                    showing a screenshot we cannot publish. */}
                <div className="cs-media min-h-64 overflow-hidden">
                  {card.bars ? (
                    <BeforeAfterBars {...card.bars} />
                  ) : (
                    <div className="flex h-full flex-col justify-center gap-4 p-6 sm:p-8">
                      <PipelineDiagram />
                      <p className="label text-center text-[0.6rem] text-muted">
                        og:image fast path · Puppeteer fallback
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>

        {/* Closes the list rather than sitting beside the heading: these four
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

function Explainers({ items }: { items: Awaited<ReturnType<typeof fetchExplainers>> }) {
  return (
    <section id="explainers" aria-labelledby="explainers-heading" className="rule-t">
      <div className="shell gutter py-14">
        <div id="explainers-heading">
          <SectionHead
            lead="Explainers"
            trail=""
            sub="Sixty-second breakdowns of the browser behaviour behind the work."
            center
          />
        </div>

        {items.length > 0 && (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {items.slice(0, 4).map((e) => (
              <li key={e.id}>
                <ExplainerCard explainer={e} />
              </li>
            ))}
          </ul>
        )}

        {/* Same shape as Selected Work: the way out closes the list rather
            than sitting beside the heading. External, so a plain anchor. */}
        <div className="mt-10 flex justify-center">
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="label inline-flex items-center gap-2 rounded-full border border-rule bg-surface px-6 py-3 text-[0.68rem] text-ink transition-colors hover:border-muted"
          >
            Watch the channel
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

/** Stands in for her .aib-shot screenshots, which we have no assets for. */
function PipelineDiagram() {
  return (
    <svg viewBox="0 0 260 88" className="w-full text-dim" fill="none" aria-hidden="true">
      <rect x="1" y="30" width="58" height="26" rx="3" stroke="currentColor" />
      <text x="30" y="47" textAnchor="middle" className="fill-body text-[9px]">
        URL
      </text>
      <path d="M60 43h22" stroke="currentColor" strokeDasharray="3 3" />
      <rect x="83" y="4" width="76" height="26" rx="3" className="stroke-now" />
      <text x="121" y="21" textAnchor="middle" className="fill-body text-[9px]">
        og:image ~1s
      </text>
      <rect x="83" y="56" width="76" height="26" rx="3" stroke="currentColor" />
      <text x="121" y="73" textAnchor="middle" className="fill-body text-[9px]">
        Puppeteer
      </text>
      <path d="M82 43 83 17M82 43l1 26" stroke="currentColor" />
      <path d="M160 17h20v26h20M160 69h20" stroke="currentColor" strokeDasharray="3 3" />
      <rect x="201" y="30" width="58" height="26" rx="3" className="stroke-now" />
      <text x="230" y="47" textAnchor="middle" className="fill-body text-[9px]">
        GCS
      </text>
    </svg>
  )
}

function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="rule-t">
      <div className="shell gutter py-14">
        <div id="experience-heading">
          <SectionHead lead="Experience" trail="" center />
        </div>
        <ExperienceAccordion />
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
      <Experience />
      <ContactPills />
    </>
  )
}
