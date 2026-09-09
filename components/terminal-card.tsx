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

const ROW =
  'flex items-baseline justify-between gap-6 px-5 py-3.5 text-left transition-colors hover:bg-raise'

function Prompt() {
  return (
    <span aria-hidden="true" className="text-now">
      ${' '}
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
          <span className="shrink-0 text-muted">↓</span>
        </a>

        <button type="button" onClick={copy} className={ROW}>
          <span className="text-body">
            <Prompt />
            copy email
          </span>
          <span className="shrink-0 text-muted">{copied ? '✓' : '⧉'}</span>
        </button>

        {LINKEDIN && (
          <a href={LINKEDIN.href} target="_blank" rel="noopener noreferrer" className={ROW}>
            <span className="text-body">
              <Prompt />
              open linkedin
            </span>
            <span className="shrink-0 text-muted">↗</span>
          </a>
        )}
      </div>

      <span aria-live="polite" className="sr-only">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </div>
  )
}
