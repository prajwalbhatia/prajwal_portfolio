const prUrl = 'https://github.com/DmytroVasin/DrawPen/pull/110'
const releaseUrl = 'https://github.com/DmytroVasin/DrawPen/releases/tag/v0.0.61'

function ToolbarPreview() {
  return (
    <div
      aria-hidden="true"
      className="flex min-h-[245px] flex-col justify-between rounded-xl border border-rule bg-raise p-5 sm:p-6"
    >
      <p className="label text-[0.65rem] text-muted">Draw over any app</p>
      <div className="relative mx-auto my-5 w-full max-w-[350px] rounded-lg border border-rule bg-surface p-4 shadow-[0_12px_30px_-18px_rgb(23_23_26/0.25)]">
        <div className="mb-5 flex gap-1.5">
          <span className="size-1.5 rounded-full bg-rule" />
          <span className="size-1.5 rounded-full bg-rule" />
          <span className="size-1.5 rounded-full bg-rule" />
        </div>
        <div className="space-y-2.5">
          <div className="h-1.5 w-3/5 rounded-full bg-rule" />
          <div className="ml-4 h-1.5 w-4/5 rounded-full bg-rule" />
          <div className="ml-4 h-1.5 w-2/3 rounded-full bg-rule" />
          <div className="h-1.5 w-1/2 rounded-full bg-rule" />
        </div>
        <svg
          viewBox="0 0 150 45"
          fill="none"
          className="absolute left-5 top-12 w-[150px] max-w-[45%] text-accent"
        >
          <path
            d="M3 28c30-21 65-25 102-14m-11-9 12 9-15 7M25 41c24-8 47-8 69-2"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="mt-5 flex justify-end">
          <div className="flex items-center rounded-full border border-rule bg-surface p-1 shadow-sm">
            <span className="flex size-8 items-center justify-center rounded-full text-sm text-body">↶</span>
            <span className="flex size-8 items-center justify-center rounded-full text-sm text-body">⌁</span>
            <span className="flex size-8 items-center justify-center rounded-full text-sm text-body">▢</span>
            <span className="flex size-8 items-center justify-center rounded-full bg-accent text-base text-white">✎</span>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-body">Toolbar opens inward; the pen stays in place.</p>
    </div>
  )
}

export function OpenSourceHighlight({ className = '' }: { className?: string }) {
  return (
    <article className={`rounded-2xl border border-rule bg-surface p-5 sm:p-7 ${className}`}>
      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.8fr)] lg:items-center lg:gap-10">
        <div>
          <p className="label inline-block max-w-full rounded-full bg-accent px-4 py-2 text-[0.62rem] leading-relaxed text-white">
            First open-source contribution · DrawPen
          </p>
          <h3 className="display mt-4 max-w-[17ch] text-[clamp(1.8rem,3vw,2.6rem)] leading-tight">
            I fixed DrawPen’s toolbar near screen edges
          </h3>
          <p className="mt-5 max-w-[57ch] text-base leading-relaxed text-body">
            DrawPen lets you draw over anything on your screen. I use it to mark up code while I
            read. When its floating toolbar opened near an edge, the pen button moved. I fixed it to
            open toward the available space while keeping the button in place, and added regression
            tests.
          </p>
          <p className="mt-4 text-sm font-semibold text-ink">Merged as PR #110 · Shipped in v0.0.61</p>
          <div className="label mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[0.68rem]">
            <a
              href={prUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-ink pb-1 text-ink transition-colors hover:border-accent hover:text-accent"
            >
              View the merged PR ↗
            </a>
            <a
              href={releaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-rule pb-1 text-body transition-colors hover:border-accent hover:text-accent"
            >
              See the release ↗
            </a>
          </div>
        </div>
        <ToolbarPreview />
      </div>
    </article>
  )
}
