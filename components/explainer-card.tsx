import Image from 'next/image'

import type { Explainer } from '@/content/explainers'

/**
 * A 9:16 frame — the medium as the layout module. Real thumbnails, lazily
 * loaded through next/image, so the row costs nothing above the fold. No play
 * glyph and no accent colour: this is supporting evidence on a page whose
 * argument is measured engineering work, and it should not compete with the
 * instrument.
 */
export function ExplainerCard({ explainer }: { explainer: Explainer }) {
  return (
    <a
      href={explainer.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-2.5"
    >
      <span className="relative block aspect-9/16 overflow-hidden border border-rule bg-surface transition-colors group-hover:border-muted">
        <Image
          src={explainer.thumb}
          alt=""
          width={explainer.thumbWidth}
          height={explainer.thumbHeight}
          sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 45vw"
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-ground/70 to-55% to-transparent"
        />
        <span className="label absolute bottom-2 right-2 bg-ground/80 px-1.5 py-0.5 text-ink">
          {explainer.duration}
        </span>
      </span>
      <span className="text-[0.82rem] leading-snug text-muted transition-colors group-hover:text-ink">
        {explainer.title}
      </span>
    </a>
  )
}
