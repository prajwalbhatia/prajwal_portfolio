import type { Reel } from '@/content/reels'

/**
 * Deliberately quiet. No thumbnail-as-chrome, no play glyph, no accent colour
 * — this section is supporting evidence on a page whose argument is measured
 * engineering work, and it should not compete with the proof ledger.
 */
export function ReelCard({ reel }: { reel: Reel }) {
  return (
    <a
      href={reel.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-baseline justify-between gap-4 border-b border-rule py-3 transition-colors hover:border-muted"
    >
      <span className="text-sm leading-snug text-muted group-hover:text-ink">{reel.title}</span>
      <span className="label shrink-0 text-muted">{reel.duration}</span>
    </a>
  )
}
