import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { profile, SITE_URL, socials, yearsOfExperience } from '@/content/profile'
import { CHANNEL_HANDLE, EXPLAINERS_LIMIT } from '@/content/explainers'
import { getKindWords } from '@/lib/kind-words'
import { fetchExplainers } from '@/lib/youtube'

import './globals.css'

/*
  Served from public/fonts as latin-subset variable woff2 — 61 KB for the
  pair. No font CDN: a site whose home page is a performance demo should not
  put a third party on its own critical path.

  Space Grotesk carries display, body and UI; JetBrains Mono every label and
  figure. Two families is the whole system. Space Grotesk preloads — it
  renders the hero claim, which is the LCP element.

  On `display`: the body and mono faces use `optional` rather than `swap`.
  With all three on swap, late arrivals reflowed the hero and cost CLS 0.108
  on a case-study page. `optional` gives them a ~100ms window and otherwise
  keeps the fallback for that load, so there is no swap and no shift.
*/
const spaceGrotesk = localFont({
  src: '../public/fonts/space-grotesk-latin.woff2',
  weight: '300 700',
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
  fallback: ['Arial', 'system-ui', 'sans-serif'],
  adjustFontFallback: 'Arial',
})

const jetbrains = localFont({
  src: '../public/fonts/jetbrains-mono-latin.woff2',
  weight: '100 800',
  variable: '--font-jetbrains',
  display: 'optional',
  preload: false,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
  // Next defaults to an Arial-derived override — a proportional face standing
  // in for a monospace one, which reflows uppercase labels hard on swap.
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
  const showKindWords = getKindWords().length > 0

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-dvh flex flex-col">
        <PersonSchema />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-3 focus:left-3 focus:bg-ink focus:text-ground focus:px-3 focus:py-2 label"
        >
          Skip to content
        </a>
        <SiteHeader showExplainers={showExplainers} showKindWords={showKindWords} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
