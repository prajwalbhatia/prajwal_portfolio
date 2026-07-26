'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { hasKindWords } from '@/content/kind-words'
import { profile } from '@/content/profile'

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

/**
 * `showExplainers` is resolved at build time in the root layout — the route
 * 404s without a YouTube key, and a nav item pointing at a 404 is worse than
 * one missing item.
 */
export function SiteHeader({ showExplainers = false }: { showExplainers?: boolean }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const nav = [
    { href: '/', label: 'Index' },
    { href: '/work', label: 'Work' },
    ...(showExplainers ? [{ href: '/explainers', label: 'Explainers' }] : []),
    ...(hasKindWords ? [{ href: '/kind-words', label: 'Kind words' }] : []),
    { href: '/resume', label: 'Résumé' },
  ]

  return (
    <header className="no-print sticky top-0 z-40 border-b border-rule bg-ground/95 backdrop-blur-sm">
      <div className="shell gutter flex items-center justify-between gap-4 py-3">
        <Link href="/" className="display shrink-0 text-base">
          {profile.name}
        </Link>

        <nav aria-label="Primary" className="hidden gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? 'page' : undefined}
              className={`label transition-colors hover:text-ink ${
                isActive(pathname, item.href) ? 'text-ink' : 'text-muted'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {profile.openToWork && (
            <span className="label hidden items-center gap-2 text-ink sm:flex">
              <span aria-hidden="true" className="live-blip size-1.5 rounded-full bg-live" />
              {profile.availabilityLabel}
            </span>
          )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="label text-muted hover:text-ink md:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="shell gutter flex flex-col border-t border-rule py-2 md:hidden"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(pathname, item.href) ? 'page' : undefined}
              className={`label border-b border-rule py-3 last:border-0 ${
                isActive(pathname, item.href) ? 'text-ink' : 'text-muted'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
