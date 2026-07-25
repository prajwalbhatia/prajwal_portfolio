import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * A horizontal section separated by a hairline rule. Every block on the site
 * uses this so gutters and vertical rhythm can't drift between pages.
 */
export function Band({
  title,
  action,
  actionHref,
  children,
  first = false,
  id,
}: {
  title?: string
  action?: string
  actionHref?: string
  children: ReactNode
  first?: boolean
  id?: string
}) {
  return (
    <section id={id} className={first ? '' : 'rule-t'}>
      <div className="shell gutter py-8 sm:py-10">
        {title && (
          <div className="flex items-baseline justify-between gap-4 mb-5">
            <h2 className="label text-text">{title}</h2>
            {action && actionHref && (
              <Link
                href={actionHref}
                className="label text-muted hover:text-signal transition-colors"
              >
                {action} →
              </Link>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
