import type { Metadata } from 'next'
import { Archivo_Narrow, Inter, JetBrains_Mono } from 'next/font/google'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { profile, SITE_URL, socials, yearsOfExperience } from '@/content/profile'

import './globals.css'

// Self-hosted at build time — no CDN request, no layout shift.
const archivo = Archivo_Narrow({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-archivo-narrow',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const description = `${profile.title} (${profile.level}) with ${yearsOfExperience()} years building React and TypeScript products. Core Web Vitals, production reliability, and the backend when the problem needs it.`

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
    jobTitle: profile.title,
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-dvh flex flex-col">
        <PersonSchema />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-3 focus:left-3 focus:bg-signal focus:text-ink focus:px-3 focus:py-2 label"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
