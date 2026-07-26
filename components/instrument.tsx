'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import {
  bundleState,
  clockLabel,
  demos,
  FORM_STEPS,
  formState,
  coverageState,
  vitalsState,
  type Chip,
  type Chunk,
  type PageState,
  type Tone,
} from '@/content/instrument'

/**
 * The home page as a working demo of the thing being hired for.
 *
 * Renders at p = 1 — the completed comparison — so the section is fully
 * informative with JavaScript off, still loading, or never touched. It does
 * not autoplay: picking a demo runs that demo, and picking the open one
 * replays it. Under prefers-reduced-motion selection jumps straight to the
 * end state instead.
 *
 * Nothing here is a screen recording; every timing is a reconstruction from a
 * measured figure, and the panel footer says so.
 */

const PLAY_MS = 5200

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const toneText: Record<Tone | 'lazy', string> = {
  was: 'text-was',
  now: 'text-now',
  live: 'text-live',
  idle: 'text-body',
  lazy: 'text-live',
}

const toneBg: Record<Tone | 'lazy', string> = {
  was: 'bg-was',
  now: 'bg-now',
  live: 'bg-live',
  idle: 'bg-rule',
  lazy: 'bg-live',
}

function Panel({
  side,
  stat,
  note,
  children,
}: {
  side: 'Before' | 'After'
  stat: string
  note: string
  children: React.ReactNode
}) {
  const accent = side === 'Before' ? 'text-was' : 'text-now'
  return (
    <section className="flex min-w-0 flex-col border border-rule bg-ground">
      <header className="flex items-baseline justify-between gap-3 border-b border-rule px-4 py-2.5">
        <h3 className={`label ${accent}`}>{side}</h3>
        <span className="label text-muted">{stat}</span>
      </header>
      <div className="flex-1 p-4">{children}</div>
      <p className="border-t border-rule px-4 py-3 text-[0.82rem] leading-snug text-body">{note}</p>
    </section>
  )
}

/* -------------------------------------------------------------- 01 vitals */

function PageSkeleton({ state, tone }: { state: PageState; tone: 'was' | 'now' }) {
  const bar = 'rounded-[2px] bg-rule'
  // The hero block takes the panel's own colour. Deriving it from whether the
  // hero had painted meant the before-panel turned green at the end, which
  // said the opposite of what the demo is arguing.
  const heroFill = tone === 'now' ? 'bg-now/25' : 'bg-was/25'
  return (
    <div
      className={`flex min-h-52 flex-col gap-2 transition-transform duration-300 ${
        state.shifted ? 'translate-y-3' : ''
      }`}
    >
      <div className={`h-4 w-1/3 ${bar} ${state.header ? 'opacity-100' : 'opacity-0'}`} />
      {state.hero ? (
        <div className={`h-20 w-full rounded-[2px] transition-colors duration-300 ${heroFill}`} />
      ) : state.heroReserved ? (
        /* Space held for an image that hasn't arrived — the whole point of
           the CLS fix, and worth showing as a deliberate empty slot. */
        <div className="h-20 w-full rounded-[2px] border border-dashed border-rule" />
      ) : (
        <div className="h-20 w-full" aria-hidden="true" />
      )}
      <div className={`flex flex-col gap-1.5 ${state.text ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`h-2.5 w-full ${bar}`} />
        <div className={`h-2.5 w-11/12 ${bar}`} />
        <div className={`h-2.5 w-4/5 ${bar}`} />
      </div>
      <div className={`mt-auto grid grid-cols-3 gap-2 ${state.text ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`h-10 ${bar}`} />
        <div className={`h-10 ${bar}`} />
        <div className={`h-10 ${bar}`} />
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- 02 queue */

function Chips({ chips, done, width }: { chips: Chip[]; done: string; width: string }) {
  return (
    <div className="flex min-h-52 flex-col gap-3">
      <div className="grid grid-cols-4 gap-1.5">
        {chips.map((c, i) => (
          <span
            key={i}
            className={`label border px-1 py-2 text-center ${
              c.tone === 'now'
                ? 'border-now/40 bg-now/10 text-now'
                : c.tone === 'was'
                  ? 'border-was/40 bg-was/10 text-was'
                  : 'border-rule bg-surface text-body'
            }`}
          >
            {c.label}
          </span>
        ))}
      </div>
      <div className="mt-auto flex flex-col gap-1.5">
        <span className="label text-muted">{done} with a thumbnail</span>
        <span className="block h-1.5 w-full bg-rule">
          <span className="block h-full bg-live transition-[width] duration-100" style={{ width }} />
        </span>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- 03 form */

function Steps({
  filled,
  flag,
  flagTone,
  step,
  width,
  tone,
}: {
  filled: number
  flag: string
  flagTone: Tone
  step: string
  width: string
  tone: 'was' | 'now'
}) {
  return (
    <div className="flex min-h-52 flex-col gap-2">
      {FORM_STEPS.map((s, i) => (
        <span
          key={s}
          className={`flex items-center gap-2 border px-2.5 py-1.5 text-[0.78rem] ${
            i < filled
              ? tone === 'now'
                ? 'border-now/30 bg-now/8 text-ink'
                : 'border-was/30 bg-was/8 text-ink'
              : 'border-rule bg-surface text-body'
          }`}
        >
          <span
            aria-hidden="true"
            className={`size-1.5 shrink-0 rounded-full ${
              i < filled ? (tone === 'now' ? 'bg-now' : 'bg-was') : 'bg-rule'
            }`}
          />
          {s}
        </span>
      ))}
      <div className="mt-auto flex flex-col gap-1.5">
        <span className={`label ${toneText[flagTone]}`}>
          {flag} · {step}
        </span>
        <span className="block h-1.5 w-full bg-rule">
          <span
            className={`block h-full transition-[width] duration-100 ${tone === 'now' ? 'bg-now' : 'bg-was'}`}
            style={{ width }}
          />
        </span>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- 04 bundle */

function Chunks({
  chunks,
  total,
  flag,
  flagTone,
}: {
  chunks: Chunk[]
  total: string
  flag: string
  flagTone: Tone
}) {
  return (
    <div className="flex min-h-52 flex-col gap-3">
      {chunks.map((c) => (
        <div key={c.name} className="flex flex-col gap-1">
          <span className="flex items-baseline justify-between gap-2 text-[0.72rem] text-body">
            <span className="truncate">{c.name}</span>
            <span className="shrink-0 tabular-nums">{c.size}</span>
          </span>
          <span className="block h-2 w-full bg-rule">
            <span
              className={`block h-full transition-[width] duration-100 ${toneBg[c.tone]}`}
              style={{ width: c.w }}
            />
          </span>
        </div>
      ))}
      <div className="mt-auto flex items-baseline justify-between gap-2">
        <span className={`label ${toneText[flagTone]}`}>{flag}</span>
        <span className="font-display text-2xl tabular-nums text-ink">{total}</span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ shell */

export function Instrument() {
  const [active, setActive] = useState(0)
  const [p, setP] = useState(1)
  const [playing, setPlaying] = useState(false)
  const raf = useRef<number | null>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const sectionRef = useRef<HTMLElement | null>(null)
  const playedOnce = useRef(false)

  const demo = demos[active]

  const stop = useCallback(() => {
    if (raf.current !== null) cancelAnimationFrame(raf.current)
    raf.current = null
    setPlaying(false)
  }, [])

  const play = useCallback(() => {
    stop()
    setPlaying(true)
    const t0 = performance.now()
    const tick = (now: number) => {
      const next = Math.min(1, (now - t0) / PLAY_MS)
      setP(next)
      if (next < 1) raf.current = requestAnimationFrame(tick)
      else {
        raf.current = null
        setPlaying(false)
      }
    }
    raf.current = requestAnimationFrame(tick)
  }, [stop])

  // Plays the open demo once, when the section first scrolls into view.
  //
  // Not on mount: the instrument sits below the fold, so firing at load meant
  // it animated while the reader was still on the hero and was already
  // finished by the time they got here. Not never, either — arriving at a
  // static panel gives no clue it does anything. Every play after this one is
  // something the visitor asked for.
  useEffect(() => {
    const el = sectionRef.current
    if (!el || playedOnce.current) return
    if (reducedMotion()) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || playedOnce.current) continue
          playedOnce.current = true
          io.disconnect()
          play()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [play])

  // Cancels any in-flight frame on unmount.
  useEffect(() => stop, [stop])

  const select = useCallback(
    (i: number) => {
      setActive(i)
      playedOnce.current = true
      // Selecting a demo plays it. Picking the one already open replays it,
      // which is what a second click on a tab should do here.
      if (reducedMotion()) {
        stop()
        setP(1)
        return
      }
      play()
    },
    [play, stop],
  )

  const v = vitalsState(p)
  const c = coverageState(p)
  const f = formState(p)
  const b = bundleState(p)

  return (
    <section ref={sectionRef} aria-labelledby="instrument-heading" className="rule-t">
      <div className="shell gutter py-10 sm:py-14">
        <h2 id="instrument-heading" className="sr-only">
          Interactive before-and-after demonstrations
        </h2>

        {/* tabs */}
        <div role="tablist" aria-label="Choose a demonstration" className="flex flex-wrap border border-rule">
          {demos.map((d, i) => (
            <button
              key={d.id}
              role="tab"
              type="button"
              id={`tab-${d.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${d.id}`}
              tabIndex={i === active ? 0 : -1}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              onClick={() => select(i)}
              onKeyDown={(e) => {
                // Roving tabindex: a tablist is one tab stop, arrows move within.
                const last = demos.length - 1
                const to =
                  e.key === 'ArrowRight' ? (i === last ? 0 : i + 1)
                  : e.key === 'ArrowLeft' ? (i === 0 ? last : i - 1)
                  : e.key === 'Home' ? 0
                  : e.key === 'End' ? last
                  : null
                if (to === null) return
                e.preventDefault()
                select(to)
                tabRefs.current[to]?.focus()
              }}
              className={`flex min-w-0 flex-1 items-baseline gap-2 border-r border-rule px-3 py-3 text-left last:border-r-0 transition-colors ${
                i === active ? 'bg-surface text-ink' : 'bg-ground text-body hover:text-ink'
              }`}
            >
              <span className={`label ${i === active ? 'text-now' : 'text-muted'}`}>{d.num}</span>
              <span className="truncate text-[0.82rem]">{d.tab}</span>
            </button>
          ))}
        </div>

        {/* the instrument */}
        <div
          role="tabpanel"
          id={`panel-${demo.id}`}
          aria-labelledby={`tab-${demo.id}`}
          className="border border-t-0 border-rule bg-surface"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-rule px-4 py-3">
            <div className="flex min-w-0 flex-col gap-1">
              <span className="label text-muted">{demo.eyebrow}</span>
              <p className="text-[0.9rem] text-ink">{demo.caption}</p>
            </div>
            <output
              aria-live="off"
              className="font-display text-3xl tabular-nums text-ink sm:text-4xl"
            >
              {clockLabel(demo, p)}
            </output>
          </div>

          <div className="grid gap-3 p-3 md:grid-cols-2">
            {demo.id === 'vitals' && (
              <>
                <Panel side="Before" stat={demo.beforeStat} note={v.before.note}>
                  <PageSkeleton state={v.before} tone="was" />
                </Panel>
                <Panel side="After" stat={demo.afterStat} note={v.after.note}>
                  <PageSkeleton state={v.after} tone="now" />
                </Panel>
              </>
            )}

            {demo.id === 'coverage' && (
              <>
                <Panel side="Before" stat={demo.beforeStat} note={c.beforeNote}>
                  <Chips chips={c.before} done={c.beforeDone} width={c.beforeW} />
                </Panel>
                <Panel side="After" stat={demo.afterStat} note={c.afterNote}>
                  <Chips chips={c.after} done={c.afterDone} width={c.afterW} />
                </Panel>
              </>
            )}

            {demo.id === 'form' && (
              <>
                <Panel side="Before" stat={demo.beforeStat} note={f.beforeNote}>
                  <Steps
                    filled={f.beforeFilled}
                    flag={f.beforeFlag}
                    flagTone={f.beforeFlagTone}
                    step={f.beforeStep}
                    width={f.beforeW}
                    tone="was"
                  />
                </Panel>
                <Panel side="After" stat={demo.afterStat} note={f.afterNote}>
                  <Steps
                    filled={f.afterFilled}
                    flag={f.afterFlag}
                    flagTone={f.afterFlagTone}
                    step={f.afterStep}
                    width={f.afterW}
                    tone="now"
                  />
                </Panel>
              </>
            )}

            {demo.id === 'bundle' && (
              <>
                <Panel side="Before" stat={demo.beforeStat} note={b.beforeNote}>
                  <Chunks
                    chunks={b.before}
                    total={b.beforeKb}
                    flag={b.beforeFlag}
                    flagTone={b.beforeFlagTone}
                  />
                </Panel>
                <Panel side="After" stat={demo.afterStat} note={b.afterNote}>
                  <Chunks
                    chunks={b.after}
                    total={b.afterKb}
                    flag={b.afterFlag}
                    flagTone={b.afterFlagTone}
                  />
                </Panel>
              </>
            )}
          </div>

          {/* scrubber */}
          <div className="flex flex-col gap-2 border-t border-rule px-4 py-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => (playing ? stop() : play())}
                className="label shrink-0 border border-rule px-2.5 py-1.5 text-muted transition-colors hover:border-muted hover:text-ink"
              >
                {playing ? 'Pause' : 'Replay'}
              </button>
              <label htmlFor={`scrub-${demo.id}`} className="sr-only">
                Scrub the {demo.tab} timeline
              </label>
              <input
                id={`scrub-${demo.id}`}
                type="range"
                min={0}
                max={1000}
                value={Math.round(p * 1000)}
                onChange={(e) => {
                  stop()
                  setP(Number(e.target.value) / 1000)
                }}
                className="scrub min-w-0 flex-1"
              />
            </div>

            {/* Ticks sit on the timeline; their labels get a row of their own
                beneath the axis, so a long one cannot collide with the start
                and end labels. Labels near an edge align inward rather than
                centring — "28 min — submitted" at 99% otherwise hangs half its
                width outside the panel. */}
            <div className="select-none">
              <div className="relative h-2.5" aria-hidden="true">
                {(
                  [
                    [demo.markA, 'now'],
                    [demo.markB, 'was'],
                  ] as const
                ).map(([m, tone]) => (
                  <span
                    key={m.label}
                    className={`absolute top-0 block h-2.5 w-px ${
                      tone === 'now' ? 'bg-now' : 'bg-was'
                    }`}
                    style={{ left: `${m.pct}%`, transform: 'translateX(-50%)' }}
                  />
                ))}
              </div>

              <div className="flex justify-between">
                <span className="label text-muted">{demo.axisStart}</span>
                <span className="label text-muted">{demo.axisEnd}</span>
              </div>

              <div className="relative mt-1.5 h-4">
                {(
                  [
                    [demo.markA, 'now'],
                    [demo.markB, 'was'],
                  ] as const
                ).map(([m, tone]) => (
                  <span
                    key={m.label}
                    className={`label absolute top-0 whitespace-nowrap ${
                      tone === 'now' ? 'text-now' : 'text-was'
                    }`}
                    style={{
                      left: `${m.pct}%`,
                      transform:
                        m.pct >= 82
                          ? 'translateX(-100%)'
                          : m.pct <= 14
                            ? 'translateX(0)'
                            : 'translateX(-50%)',
                    }}
                  >
                    {m.label}
                  </span>
                ))}
              </div>
            </div>

            {demo.caveat && <p className="label mt-1 text-muted">{demo.caveat}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
