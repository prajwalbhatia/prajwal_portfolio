import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="shell gutter flex flex-col items-start gap-5 py-24">
      <p className="label text-muted">404</p>
      <h1 className="display text-[clamp(2.25rem,7vw,4rem)]">Nothing here</h1>
      <p className="measure text-muted">
        That page doesn&rsquo;t exist. It may have been renamed when the site was rebuilt.
      </p>
      <Link
        href="/"
        className="label border border-rule px-4 py-2.5 transition-colors hover:border-muted"
      >
        Back to the index &rarr;
      </Link>
    </section>
  )
}
