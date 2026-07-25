import Link from 'next/link'

import { profile, socials } from '@/content/profile'

export function SiteFooter() {
  return (
    <footer className="border-t border-line no-print">
      <div className="shell gutter py-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <span className="label text-muted">Elsewhere</span>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-dim hover:text-signal transition-colors"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 sm:items-end">
          <a
            href={`mailto:${profile.email}`}
            className="text-sm text-dim hover:text-signal transition-colors"
          >
            {profile.email}
          </a>
          <p className="label text-muted">
            {profile.location} · Built with Next.js ·{' '}
            <Link href="/resume" className="hover:text-text">
              Résumé
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
