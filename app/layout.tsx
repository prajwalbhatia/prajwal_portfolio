import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { profile, SITE_URL, socials, yearsOfExperience } from '@/content/profile'
import { CHANNEL_HANDLE, EXPLAINERS_LIMIT } from '@/content/explainers'
import { fetchExplainers } from '@/lib/youtube'

import './globals.css'

/*
  Served from public/fonts, latin-subset woff2, 136 KB for all three
  families. No font CDN: a site arguing about performance shouldn't put a
  third party on its critical path.

  On `display`, which is a deliberate split and not an oversight:

  The display face is preloaded and uses `swap` — it carries the identity of
  the design and is worth waiting for. The sans and mono use `optional`.

  Measured reason: with all three on `swap`, the sans and mono arriving late
  reflowed the hero lede by a line and shifted everything below it. That was
  CLS 0.108 on /projects/web-vitals — a page whose subject is fixing CLS.
  Lighthouse named the exact cause ("Web font loaded", plex_sans_400,
  plex_mono_400/500). `optional` gives them a ~100ms window and otherwise
  keeps the fallback for that page load, so no swap and no shift. Both are
  small and same-origin, so in practice they make the window; on a slow first
  visit the reader gets Arial and a system mono, and the real faces on the
  next. Every page now measures CLS 0.

  Ruled out along the way: `optional` on the serif (no effect — it was never
  the cause), preloading the sans (FCP 1.1s -> 0.9s, LCP and CLS unchanged,
  three extra critical requests), and nowrap on the measure-table labels.
*/
const sourceSerif = localFont({
  src: '../public/fonts/source-serif-4-latin.woff2',
  weight: '400 700',
  style: 'normal',
  variable: '--font-source-serif',
  display: 'swap',
  preload: true,
  // The fallback list must lead with the same family the metric override is
  // computed from, or the swap shifts. Georgia first here cost CLS 0.11 on the
  // case studies — on a page about fixing CLS, which is a good way to be caught.
  fallback: ['Times New Roman', 'Georgia', 'serif'],
  adjustFontFallback: 'Times New Roman',
})

const plexSans = localFont({
  src: [
    { path: '../public/fonts/plex-sans-400-latin.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/plex-sans-500-latin.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/plex-sans-600-latin.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-plex-sans',
  display: 'optional',
  preload: false,
  fallback: ['Arial', 'system-ui', 'sans-serif'],
  adjustFontFallback: 'Arial',
})

const plexMono = localFont({
  src: [
    { path: '../public/fonts/plex-mono-400-latin.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/plex-mono-500-latin.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-plex-mono',
  display: 'optional',
  preload: false,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
  // Off deliberately. Next defaults to an Arial-derived override, which is a
  // proportional face standing in for a monospace one — it produced a
  // size-adjust of 131% and the uppercase labels reflowed hard on swap. A real
  // monospace fallback is far closer on width than any adjusted Arial.
  adjustFontFallback: false,
})

const description = `${profile.title}, ${profile.level}, with ${yearsOfExperience()} years building React and TypeScript products. Core Web Vitals, production reliability, and the backend when the problem needs it.`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description,
  keywords: [
    'Prajwal Bhatia',
    'Senior Software Engineer',
    'Frontend Engineer',
    'React',
    'TypeScript',
    'Next.js',
    'Core Web Vitals',
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    siteName: profile.name,
    title: `${profile.name} — ${profile.title}`,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — ${profile.title}`,
    description,
    creator: '@bhatia_prajwal',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: SITE_URL },
}

/** Tells Google this is a person, not a company. Improves the knowledge panel. */
function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.titleShort,
    email: `mailto:${profile.email}`,
    url: SITE_URL,
    address: { '@type': 'PostalAddress', addressLocality: profile.location },
    worksFor: { '@type': 'Organization', name: profile.company },
    sameAs: socials.map((s) => s.href),
    knowsAbout: ['React', 'TypeScript', 'Next.js', 'Core Web Vitals', 'Node.js'],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Same limit as every other caller so the fetch cache collapses these into
  // one set of requests for the whole build.
  const showExplainers = (await fetchExplainers(CHANNEL_HANDLE, EXPLAINERS_LIMIT)).length > 0

  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="min-h-dvh flex flex-col">
        <PersonSchema />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-3 focus:left-3 focus:bg-ink focus:text-ground focus:px-3 focus:py-2 label"
        >
          Skip to content
        </a>
        <SiteHeader showExplainers={showExplainers} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
