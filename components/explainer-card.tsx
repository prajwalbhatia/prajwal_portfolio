import type { Explainer } from '@/content/explainers'

/**
 * Deliberately quiet. No thumbnail-as-chrome, no play glyph, no accent colour
 * — this section is supporting evidence on a page whose argument is measured
 * engineering work, and it should not compete with the proof ledger.
 */
export function ExplainerCard({ explainer }: { explainer: Explainer }) {
  return (
    <a
      href={explainer.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-baseline justify-between gap-4 border-b border-rule py-3 transition-colors hover:border-muted"
    >
      <span className="text-sm leading-snug text-muted group-hover:text-ink">{explainer.title}</span>
      <span className="label shrink-0 text-muted">{explainer.duration}</span>
    </a>
  )
}
