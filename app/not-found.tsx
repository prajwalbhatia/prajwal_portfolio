import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="shell gutter py-24 flex flex-col gap-5 items-start">
      <p className="label text-signal">404</p>
      <h1 className="display text-[clamp(2.4rem,8vw,4.5rem)]">
        Nothing here<span className="text-signal">.</span>
      </h1>
      <p className="text-dim max-w-[46ch]">
        That page doesn&rsquo;t exist. It may have been renamed when the site was rebuilt.
      </p>
      <Link
        href="/"
        className="label border border-signal text-signal px-4 py-2.5 hover:bg-signal hover:text-ink transition-colors"
      >
        Back to the index →
      </Link>
    </section>
  )
}
