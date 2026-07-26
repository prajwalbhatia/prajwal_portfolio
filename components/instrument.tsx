'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import {
  bundleState,
  clockLabel,
  demos,
  FORM_STEPS,
  formState,
  queueState,
  vitalsState,
  type Chip,
  type Chunk,
  type PageState,
  type Tone,
} from '@/content/instrument'

/**
 * The home page as a working demo of the thing being hired for.
 *
 * Server-renders at p = 1 — the completed comparison — so the section is fully
 * informative with JavaScript off or still loading. Only once mounted does it
 * rewind and play through, and only if the visitor hasn't asked for reduced
 * motion. Nothing here is a screen recording; every timing is a reconstruction
 * from a measured figure, and the caption says so.
 */

const PLAY_MS = 5200

const toneText: Record<Tone | 'lazy', string> = {
  was: 'text-was',
  now: 'text-now',
  live: 'text-live',
  idle: 'text-muted',
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
      <p className="border-t border-rule px-4 py-3 text-[0.82rem] leading-snug text-muted">{note}</p>
    </section>
  )
}

/* -------------------------------------------------------------- 01 vitals */

function PageSkeleton({ state }: { state: PageState }) {
  const bar = 'rounded-[2px] bg-rule'
  return (
    <div
      className={`flex h-52 flex-col gap-2 transition-transform duration-300 ${
        state.shifted ? 'translate-y-3' : ''
      }`}
    >
      <div className={`h-4 w-1/3 ${bar} ${state.header ? 'opacity-100' : 'opacity-0'}`} />
      {state.heroReserved || state.hero ? (
        <div
          className={`h-20 w-full rounded-[2px] transition-colors duration-300 ${
            state.hero ? 'bg-now/25' : 'border border-dashed border-rule bg-transparent'
          }`}
        />
      ) : (
        <div className={`h-20 w-full ${state.hero ? 'bg-was/25' : 'opacity-0'} rounded-[2px]`} />
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
    <div className="flex h-52 flex-col gap-3">
      <div className="grid grid-cols-4 gap-1.5">
        {chips.map((c, i) => (
          <span
            key={i}
            className={`label border px-1 py-2 text-center ${
              c.tone === 'now'
                ? 'border-now/40 bg-now/10 text-now'
                : c.tone === 'was'
                  ? 'border-was/40 bg-was/10 text-was'
                  : 'border-rule bg-surface text-muted'
            }`}
          >
            {c.label}
          </span>
        ))}
      </div>
      <div className="mt-auto flex flex-col gap-1.5">
        <span className="label text-muted">{done} drained</span>
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
    <div className="flex h-52 flex-col gap-2">
      {FORM_STEPS.map((s, i) => (
        <span
          key={s}
          className={`flex items-center gap-2 border px-2.5 py-1.5 text-[0.78rem] ${
            i < filled
              ? tone === 'now'
                ? 'border-now/30 bg-now/8 text-ink'
                : 'border-was/30 bg-was/8 text-ink'
              : 'border-rule bg-surface text-muted'
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
    <div className="flex h-52 flex-col gap-3">
      {chunks.map((c) => (
        <div key={c.name} className="flex flex-col gap-1">
          <span className="flex items-baseline justify-between gap-2 text-[0.72rem] text-muted">
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
  const started = useRef(false)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

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

  // Play through once on mount. Skipped entirely for reduced motion, which
  // leaves the completed state the server already rendered.
  useEffect(() => {
    if (started.current) return
    started.current = true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    play()
    return stop
  }, [play, stop])

  const select = useCallback(
    (i: number) => {
      setActive(i)
      setP(1)
      stop()
    },
    [stop],
  )

  const v = vitalsState(p)
  const q = queueState(p)
  const f = formState(p)
  const b = bundleState(p)

  return (
    <section aria-labelledby="instrument-heading" className="rule-t">
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
                i === active ? 'bg-surface text-ink' : 'bg-ground text-muted hover:text-ink'
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
                  <PageSkeleton state={v.before} />
                </Panel>
                <Panel side="After" stat={demo.afterStat} note={v.after.note}>
                  <PageSkeleton state={v.after} />
                </Panel>
              </>
            )}

            {demo.id === 'queue' && (
              <>
                <Panel side="Before" stat={demo.beforeStat} note={q.beforeNote}>
                  <Chips chips={q.before} done={q.beforeDone} width={q.beforeW} />
                </Panel>
                <Panel side="After" stat={demo.afterStat} note={q.afterNote}>
                  <Chips chips={q.after} done={q.afterDone} width={q.afterW} />
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

            {/* Marks and their labels share one positioned track, so the text
                sits under the tick it belongs to instead of being spread by a
                flex row that knows nothing about the timings. */}
            <div className="relative h-10 select-none">
              <span aria-hidden="true" className="label absolute left-0 top-0 text-muted">
                {demo.axisStart}
              </span>
              <span aria-hidden="true" className="label absolute right-0 top-0 text-muted">
                {demo.axisEnd}
              </span>
              {(
                [
                  [demo.markA, 'now'],
                  [demo.markB, 'was'],
                ] as const
              ).map(([m, tone]) => (
                <span
                  key={m.label}
                  className="absolute top-0 flex flex-col items-center gap-1"
                  style={{ left: `${m.pct}%`, transform: 'translateX(-50%)' }}
                >
                  <span
                    aria-hidden="true"
                    className={`block h-2.5 w-px ${tone === 'now' ? 'bg-now' : 'bg-was'}`}
                  />
                  <span
                    className={`label whitespace-nowrap ${tone === 'now' ? 'text-now' : 'text-was'}`}
                  >
                    {m.label}
                  </span>
                </span>
              ))}
            </div>

            <p className="label mt-1 text-muted">
              Reconstructed from field measurements — not a screen recording
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
