import Link from 'next/link'

import { profile } from '@/content/profile'

export function SiteFooter() {
  return (
    <footer className="no-print border-t border-rule">
      <div className="shell gutter flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="label text-muted">
          {profile.name} · {profile.location}
        </p>
        <p className="label flex gap-5 text-muted">
          <Link href="/resume" className="hover:text-ink">
            Résumé
          </Link>
          <a href={`mailto:${profile.email}`} className="hover:text-ink">
            Email
          </a>
        </p>
      </div>
    </footer>
  )
}
