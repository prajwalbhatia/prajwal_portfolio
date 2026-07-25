/**
 * Single source of truth for identity and contact.
 * Everything on the site reads from here — /, /work and /resume can't drift apart.
 */

export const SITE_URL = 'https://prajwalbhatia.com'

/** Career started 08/2019. Derived so it never goes stale. */
export function yearsOfExperience(from = new Date('2019-08-01')): number {
  const ms = Date.now() - from.getTime()
  return Math.floor(ms / (1000 * 60 * 60 * 24 * 365.25))
}

export const profile = {
  name: 'Prajwal Bhatia',
  title: 'Senior Software Engineer',
  qualifier: 'Frontend-heavy',
  level: 'SDE-3',
  company: 'Virtual Internships',
  location: 'Yamunanagar, India',
  locationShort: 'India · Remote',

  /** Drives the pulsing signal in the header. Flip to false once hired. */
  openToWork: true,
  availabilityLabel: 'Open to senior roles',

  email: 'prajwal6bhatia@gmail.com',
  // Phone deliberately omitted — it lives on the résumé PDF only.
  // Public phone numbers get scraped within days.

  tagline: 'I make slow things fast and I own what breaks.',

  bio: [
    `Senior software engineer, frontend-heavy, ${yearsOfExperience()} years in. I build React and`,
    'TypeScript products and ship the backend when the problem needs it.',
  ].join(' '),

  /** Used in the hero standfirst. Keep to roughly 45 words. */
  standfirst:
    'Currently SDE-3 at Virtual Internships, where I took our highest-traffic flow from 5.45s to 3.17s, built the async pipeline behind portfolio thumbnails, and rewrote how the team reviews code.',
} as const

export const socials = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/prajwalbhatia' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/prajwalbhatia/' },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@prajwalbhatia' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/prajwal_bhatia/' },
  { id: 'twitter', label: 'X', href: 'https://twitter.com/bhatia_prajwal' },
] as const

export const education = {
  degree: 'B.Tech, Computer Science',
  institution: 'Seth Jai Parkash Mukand Lal Institute of Engineering & Technology (JMIT)',
  location: 'Radaur, India',
  period: '2016 — 2020',
} as const

export const awards = [
  { year: '2018', title: 'Smart India Hackathon — Winner', detail: 'National level' },
  { year: '2018', title: 'hackCBS — Finalist', detail: 'Delhi' },
] as const
