import type { Reel } from '@/content/reels'

/**
 * A 9:16 frame — the medium used as a layout module. The scanline overlay is
 * decorative; when real thumbnails arrive it sits on top of them unchanged.
 */
export function ReelCard({ reel }: { reel: Reel }) {
  const inner = (
    <>
      <div className="relative aspect-[9/16] border border-line bg-linear-168 from-[#1C1F26] to-[#0F1114] flex items-end p-2 overflow-hidden transition-colors group-hover:border-signal">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.028)_0_1px,transparent_1px_4px)]"
        />
        <span className="absolute top-2 right-2 font-mono text-[0.6rem] tracking-wide text-signal tabular-nums">
          {reel.duration}
        </span>
        <span className="display relative text-sm leading-tight">{reel.title}</span>
      </div>
      <span className="text-[0.7rem] text-muted">{reel.topic}</span>
    </>
  )

  if (!reel.href) {
    return <div className="group flex flex-col gap-1.5">{inner}</div>
  }

  return (
    <a
      href={reel.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-1.5"
    >
      {inner}
      <span className="sr-only">Watch “{reel.title}” on YouTube</span>
    </a>
  )
}
