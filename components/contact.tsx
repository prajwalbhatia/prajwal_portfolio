'use client'

import { useState } from 'react'

import { profile, socials } from '@/content/profile'

/**
 * One CTA: the email address. Copy-to-clipboard is progressive enhancement —
 * the address is a real `mailto:` anchor first, so it works with JavaScript
 * off and the button only ever adds a shortcut.
 *
 * Phone stays off the site. See the comment in content/profile.ts.
 */
export function Contact() {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked (permissions, insecure context). The mailto link
      // beside this button still works, so there is nothing to recover from.
    }
  }

  return (
    <section aria-labelledby="contact-heading" className="rule-t">
      <div className="shell gutter flex flex-col gap-8 py-14 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-4">
          <h2 id="contact-heading" className="display text-[clamp(1.75rem,4.5vw,2.75rem)]">
            Hiring for a senior role?
          </h2>
          <p className="measure text-body">
            I&rsquo;m open to conversations. Email is fastest — I answer everything.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="border border-rule px-4 py-2.5 text-sm transition-colors hover:border-muted"
            >
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copy}
              className="label border border-rule px-3 py-2.5 text-muted transition-colors hover:border-muted hover:text-ink"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
            <span aria-live="polite" className="sr-only">
              {copied ? 'Email address copied to clipboard' : ''}
            </span>
          </div>
        </div>

        <nav aria-label="Elsewhere" className="flex flex-col gap-3">
          <span className="label text-muted">Elsewhere</span>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-body underline decoration-rule underline-offset-4 transition-colors hover:text-ink"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
