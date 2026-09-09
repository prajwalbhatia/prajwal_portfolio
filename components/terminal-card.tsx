'use client'

import { useState } from 'react'

import { profile, socials, yearsOfExperience } from '@/content/profile'

/**
 * The action panel from her hero's .tc-terminal, cut down to just the actions.
 *
 * Everything else that was in it has gone as duplication: `whoami` restated
 * the role the hero one-liner already opens with, `ls -m interests/` restated
 * the stack the marquee already scrolls, and "AVAILABLE ACTIONS" was a heading
 * over four self-evident lines.
 *
 * What is left is the thing the hero genuinely lacked — somewhere to click.
 * The résumé and LinkedIn rows are real anchors. `copy email` is the one
 * button, and with JavaScript off it does nothing — the address is still
 * reachable from the contact section's mailto at the foot of the page.
 */

const LINKEDIN = socials.find((s) => s.id === 'linkedin')

// `items-center`, not baseline: an SVG has no text baseline, so baseline
// alignment drops the icon below the line it belongs to.
const ROW =
  'group flex items-center justify-between gap-6 px-5 py-3.5 text-left transition-colors hover:bg-raise'

function Prompt() {
  return (
    <span aria-hidden="true" className="text-now">
      ${' '}
    </span>
  )
}

/*
  Action affordances. These were ↓ ⧉ ↗ as text characters, which read as thin
  and ambiguous — ⧉ especially, since it is an obscure codepoint that many
  fonts either lack or draw differently.

  Drawn instead, at one stroke weight, all currentColor so they follow the
  row's hover. Kept aria-hidden: each row already says what it does in words,
  so an accessible name here would only repeat it.
*/
const ICON = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  className: 'size-4',
} as const

/** Arrow descending into a tray — the standard download mark. */
function DownloadIcon() {
  return (
    <svg {...ICON}>
      <path d="M12 3.5v10.5" />
      <path d="M7.75 10.25 12 14.5l4.25-4.25" />
      <path d="M4 17v2a1.75 1.75 0 0 0 1.75 1.75h12.5A1.75 1.75 0 0 0 20 19v-2" />
    </svg>
  )
}

/** Two offset sheets — the standard copy mark. */
function CopyIcon() {
  return (
    <svg {...ICON}>
      <rect x="9" y="9" width="11.5" height="11.5" rx="2.25" />
      <path d="M15.25 6V5.5A2 2 0 0 0 13.25 3.5H5.5a2 2 0 0 0-2 2v7.75a2 2 0 0 0 2 2H6" />
    </svg>
  )
}

/** Confirmation for the copy button. */
function CheckIcon() {
  return (
    <svg {...ICON}>
      <path d="M4.5 12.75 9.25 17.5 19.5 6.5" />
    </svg>
  )
}

/** Arrow leaving a frame — opens away from this page. */
function ExternalIcon() {
  return (
    <svg {...ICON}>
      <path d="M14.5 3.5H20.5v6" />
      <path d="M20.5 3.5 11.75 12.25" />
      <path d="M18 14v5A1.5 1.5 0 0 1 16.5 20.5H5A1.5 1.5 0 0 1 3.5 19V7.5A1.5 1.5 0 0 1 5 6h5" />
    </svg>
  )
}

/** Wrapper so every trailing icon shares its colour and hover behaviour. */
function Trailing({ children, tone }: { children: React.ReactNode; tone?: 'now' }) {
  return (
    <span
      className={`shrink-0 transition-colors ${
        tone === 'now' ? 'text-now' : 'text-muted group-hover:text-ink'
      }`}
    >
      {children}
    </span>
  )
}

export function TerminalCard() {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked. The mailto row below still works.
    }
  }

  return (
    <div className="term w-full max-w-112 text-left 2xl:max-w-128">
      <div className="term-bar flex items-center gap-2 px-4 py-3">
        <span aria-hidden="true" className="term-dot" style={{ background: '#e5695b' }} />
        <span aria-hidden="true" className="term-dot" style={{ background: '#e0b341' }} />
        <span aria-hidden="true" className="term-dot" style={{ background: '#4fa860' }} />
        <span className="label ml-2 text-[0.66rem] text-muted">prajwal — zsh</span>
      </div>

      <div className="flex flex-col divide-y divide-rule py-1 font-mono text-[0.9rem]">
        {/* Output, not an action — deliberately without the row hover.
            `locationShort` was one of the dead fields in content/profile.ts;
            this is the first thing to render it, and the location is the one
            fact here that appears nowhere else in the hero. */}
        <div className="px-5 py-3.5">
          <p className="text-body">
            <Prompt />
            whoami
          </p>
          <p className="mt-1.5 pl-4 text-ink">
            {profile.title} · {yearsOfExperience()} years
          </p>
          <p className="pl-4 text-muted">{profile.locationShort}</p>
        </div>

        <a href={profile.resumePdf} className={ROW}>
          <span className="text-body">
            <Prompt />
            open resume.pdf
          </span>
          <Trailing>
            <DownloadIcon />
          </Trailing>
        </a>

        <button type="button" onClick={copy} className={ROW}>
          <span className="text-body">
            <Prompt />
            copy email
          </span>
          <Trailing tone={copied ? 'now' : undefined}>
            {copied ? <CheckIcon /> : <CopyIcon />}
          </Trailing>
        </button>

        {LINKEDIN && (
          <a href={LINKEDIN.href} target="_blank" rel="noopener noreferrer" className={ROW}>
            <span className="text-body">
              <Prompt />
              open linkedin
            </span>
            <Trailing>
              <ExternalIcon />
            </Trailing>
          </a>
        )}
      </div>

      <span aria-live="polite" className="sr-only">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </div>
  )
}
