'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { profile } from '@/content/profile'

const nav = [
  { href: '/', label: 'Index' },
  { href: '/work', label: 'Work' },
  { href: '/projects', label: 'Projects' },
  { href: '/reels', label: 'Reels' },
  { href: '/resume', label: 'Résumé' },
]

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur-sm no-print">
      <div className="shell gutter flex items-center justify-between gap-4 py-3">
        <Link href="/" className="display text-base tracking-normal shrink-0">
          {profile.name}
        </Link>

        <nav aria-label="Primary" className="hidden md:flex gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? 'page' : undefined}
              className={`label transition-colors hover:text-text ${
                isActive(pathname, item.href) ? 'text-text' : 'text-muted'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {profile.openToWork && (
            <span className="hidden sm:flex items-center gap-2 label text-signal">
              <span
                aria-hidden="true"
                className="signal-blip size-1.5 rounded-full bg-signal"
              />
              {profile.availabilityLabel}
            </span>
          )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="md:hidden label text-muted hover:text-text"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="md:hidden border-t border-line gutter shell flex flex-col py-2"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(pathname, item.href) ? 'page' : undefined}
              className={`label py-3 border-b border-line last:border-0 ${
                isActive(pathname, item.href) ? 'text-text' : 'text-muted'
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
