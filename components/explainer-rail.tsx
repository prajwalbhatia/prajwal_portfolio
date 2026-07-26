'use client'

import { useRef } from 'react'

import { ExplainerCard } from '@/components/explainer-card'
import type { Explainer } from '@/content/explainers'

/**
 * A horizontal rail rather than a grid.
 *
 * Six 9:16 frames across a 1180px shell gave cards about 170px wide — too
 * small to read a title under and too small to see a face in. A rail lets each
 * card be roughly twice that and turns the overflow into an affordance instead
 * of a wrapping problem.
 *
 * Scroll-snap does the work, so it swipes and scrolls natively; the arrows are
 * enhancement and the list is a plain scrollable region without them. The
 * container is focusable so a keyboard can scroll it too.
 */
export function ExplainerRail({ explainers }: { explainers: Explainer[] }) {
  const rail = useRef<HTMLUListElement | null>(null)

  const nudge = (dir: 1 | -1) => {
    const el = rail.current
    if (!el) return
    el.scrollBy({ left: dir * Math.max(240, el.clientWidth * 0.75), behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Scroll explainers left"
          className="label size-8 border border-rule text-muted transition-colors hover:border-muted hover:text-ink"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Scroll explainers right"
          className="label size-8 border border-rule text-muted transition-colors hover:border-muted hover:text-ink"
        >
          →
        </button>
      </div>

      <ul
        ref={rail}
        tabIndex={0}
        aria-label="Explainer videos, horizontally scrollable"
        className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2"
      >
        {explainers.map((e) => (
          <li key={e.id} className="w-[clamp(9rem,22vw,13rem)] shrink-0 snap-start">
            <ExplainerCard explainer={e} />
          </li>
        ))}
      </ul>
    </div>
  )
}
