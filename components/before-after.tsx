'use client'

import Image from 'next/image'
import { useState } from 'react'

/**
 * Drag-to-compare slider for a pair of screenshots.
 *
 * Two differences from the usual implementation of this, both deliberate:
 *
 * 1. `clip-path: inset()` on the top image rather than a wrapper with
 *    `overflow: hidden` and a live-updated `width`. The wrapper approach
 *    squashes the image as it narrows unless you also pin the image to the
 *    frame's pixel width in JS and re-sync it on resize. Clipping never
 *    resizes anything, so none of that is needed.
 *
 * 2. A real `<input type="range">` drives it, stretched over the frame with a
 *    transparent thumb. That buys pointer, touch, arrow keys, Home/End,
 *    Page Up/Down, focus handling and correct screen-reader semantics for
 *    free — all of which the hand-rolled version has to reimplement with
 *    pointer events plus `role="slider"` and `aria-valuenow`.
 *
 * The visible divider and knob are decorative and `pointer-events: none`;
 * the input underneath is what you are actually dragging.
 */
export function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
  width,
  height,
  label,
  caption,
}: {
  before: string
  after: string
  beforeAlt: string
  afterAlt: string
  /** Intrinsic size of BOTH images — they must match, or the two sides drift apart as you drag. */
  width: number
  height: number
  /** Accessible name for the slider. */
  label: string
  caption?: string
}) {
  const [pos, setPos] = useState(50)

  return (
    <figure className="flex flex-col gap-3">
      <div
        className="ba"
        style={{ aspectRatio: `${width} / ${height}`, ['--pos' as string]: `${pos}%` }}
      >
        <Image
          src={after}
          alt={afterAlt}
          fill
          sizes="(min-width: 1180px) 1100px, 100vw"
          className="object-cover"
        />
        {/* Clipped from the right, so the visible portion is the left `--pos`. */}
        <Image
          src={before}
          alt={beforeAlt}
          fill
          sizes="(min-width: 1180px) 1100px, 100vw"
          className="ba-before object-cover"
        />

        <span aria-hidden="true" className="ba-divider" />
        <span aria-hidden="true" className="ba-knob">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
               strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.5 8 5.5 12l4 4M14.5 8l4 4-4 4" />
          </svg>
        </span>

        <span aria-hidden="true" className="ba-tag ba-tag--before">Before</span>
        <span aria-hidden="true" className="ba-tag ba-tag--after">After</span>

        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={label}
          className="ba-range"
        />
      </div>

      {caption && (
        <figcaption className="label text-[0.62rem] text-muted">{caption}</figcaption>
      )}
    </figure>
  )
}
