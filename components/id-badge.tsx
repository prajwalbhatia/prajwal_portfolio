import Image from 'next/image'

import { profile, socials, yearsOfExperience } from '@/content/profile'

/**
 * The lanyard ID badge from her hero (.hero-card-floating).
 *
 * Structure is hers: a woven strap with vertical text, a metal clip, then a
 * dark plastic card carrying a status pill, a LinkedIn button, the role, a
 * one-line claim and a portrait in a recessed ring. The whole assembly hangs
 * from `transform-origin: top center` and swings as one rigid object.
 *
 * No JavaScript — the swing is a CSS animation that stops under
 * prefers-reduced-motion.
 *
 * Her clip is ~60 lines of stacked gradients and drop-shadow filters for a
 * photorealistic carabiner. This is a plainer D-ring and clip: three
 * gradients instead of five, no filters. It reads as metal at this size and
 * costs a fraction of the markup.
 */

const LINKEDIN = socials.find((s) => s.id === 'linkedin')

export function IdBadge() {
  return (
    <div className="idcard-hang hidden lg:block">
      <div className="idcard-pivot">
        {/* strap */}
        <div className="idcard-strap">
          <span className="idcard-strap-text">{yearsOfExperience()} years experience</span>
        </div>

        {/* clip: D-ring above a sprung gate */}
        <svg
          viewBox="0 0 64 92"
          aria-hidden="true"
          className="-mt-0.5 h-23 w-16"
          fill="none"
        >
          <defs>
            <linearGradient id="pb-metal" x1="0" y1="0.5" x2="1" y2="0.5">
              <stop offset="0%" stopColor="#5a5a60" />
              <stop offset="20%" stopColor="#d9d9de" />
              <stop offset="46%" stopColor="#f6f6f8" />
              <stop offset="72%" stopColor="#c3c3ca" />
              <stop offset="100%" stopColor="#6a6a71" />
            </linearGradient>
            <linearGradient id="pb-spine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#9d9da4" />
              <stop offset="38%" stopColor="#efeff2" />
              <stop offset="70%" stopColor="#d5d5db" />
              <stop offset="100%" stopColor="#8c8c93" />
            </linearGradient>
          </defs>

          {/* D-ring the strap threads through */}
          <ellipse cx="32" cy="16" rx="19" ry="12" stroke="url(#pb-metal)" strokeWidth="7" />
          <ellipse cx="32" cy="16" rx="19" ry="12" stroke="rgb(255 255 255 / 0.22)" strokeWidth="2" />

          {/* clip body — thick spine right, sprung gate left */}
          <path d="M16 28q4-2 16-2t16 2" stroke="url(#pb-metal)" strokeWidth="5" strokeLinecap="round" />
          <path d="M48 28q8 7 8 26t-8 26" stroke="url(#pb-spine)" strokeWidth="9" strokeLinecap="round" />
          <path d="M16 28q-8 7-8 26t8 26" stroke="url(#pb-metal)" strokeWidth="5" strokeLinecap="round" />
          <path d="M16 80q4 2 16 2t16-2" stroke="url(#pb-metal)" strokeWidth="5" strokeLinecap="round" />

          {/* locking collar */}
          <rect x="48" y="42" width="10" height="24" rx="3" fill="#bdbdc4" />
          <path d="M48 47h10M48 52h10M48 57h10" stroke="rgb(255 255 255 / 0.45)" strokeWidth="1" />

          {/* tab the card hangs off */}
          <rect x="23" y="83" width="18" height="8" rx="3" fill="url(#pb-spine)" />
        </svg>

        {/* the card */}
        <div className="idcard">
          <div className="idcard-top">
            <div className="idcard-dots" aria-hidden="true" />

            <div className="relative z-1 mb-3 flex items-center justify-between">
              {profile.openToWork && (
                <span className="idcard-pill live-signal">
                  {/* live-blip is the existing breathing animation from globals.css */}
                  <span aria-hidden="true" className="idcard-dot live-blip" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#6ee7b7]">
                    {profile.availabilityLabel}
                  </span>
                </span>
              )}

              {LINKEDIN && (
                <a
                  href={LINKEDIN.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="idcard-li"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
            </div>

            <p className="relative z-1 mb-2.5 text-[13px] font-semibold uppercase leading-snug tracking-[0.08em] text-[#f0ede6]">
              {profile.title}
            </p>
            <p className="relative z-1 text-[13px] leading-relaxed text-white/70">
              {BADGE_CLAIM}
            </p>
          </div>

          <div className="idcard-bottom">
            <div className="idcard-ring">
              <div className="idcard-ring-inner">
                {/* Not `priority`: the badge is `hidden` below lg, and a
                    display:none element never intersects, so lazy loading
                    means phones don't download a portrait they can't see.
                    At 132px the optimised file is tiny either way. */}
                <Image
                  src="/prajwal.jpg"
                  alt={`Portrait of ${profile.name}`}
                  width={132}
                  height={132}
                  sizes="132px"
                  className="size-full object-cover object-[center_18%]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * The short claim on the badge. Her card pairs the role with a punchy line
 * in the same three-beat cadence.
 */
const BADGE_CLAIM = 'Think in systems. Build with intent. Ship with impact.'
