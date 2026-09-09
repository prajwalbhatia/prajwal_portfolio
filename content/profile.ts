/**
 * Single source of truth for identity and contact.
 * Everything on the site reads from here — /, /work and /resume can't drift apart.
 */

export const SITE_URL = 'https://prajwalbhatia.com'

/**
 * Career started 08/2019. Derived so it never goes stale.
 *
 * Rounds rather than floors: at 6 years 11 months, flooring reported "6",
 * which understates by a year for eleven months of every year. Rounding
 * reports 7 now and rolls to 8 in early 2027.
 */
export function yearsOfExperience(from = new Date('2019-08-01')): number {
  const ms = Date.now() - from.getTime()
  return Math.round(ms / (1000 * 60 * 60 * 24 * 365.25))
}

export const profile = {
  name: 'Prajwal Bhatia',
  /** Canonical, and matches the résumé PDF exactly. */
  title: 'Senior Frontend Engineer',
  /** For tight surfaces — the OG card, the hero eyebrow, structured data. */
  titleShort: 'Senior Frontend Engineer',
  company: 'Virtual Internships',
  location: 'Yamunanagar, India',
  locationShort: 'India · Remote',

  /** Drives the pulsing signal in the header. Flip to false once hired. */
  openToWork: true,
  availabilityLabel: 'Open to senior roles',

  email: 'prajwal6bhatia@gmail.com',
  /* Prajwal's own export, replaced by hand at public/prajwal-bhatia-resume.pdf.
     Deliberately NOT generated from /resume — he maintains the document
     separately. The consequence to watch is drift: the previous PDF still said
     "6.5+ years" and listed Kafka long after the site had corrected both, so
     whenever résumé content changes here, re-export there. */
  resumePdf: '/prajwal-bhatia-resume.pdf',
  // Phone deliberately omitted — it lives on the résumé PDF only.
  // Public phone numbers get scraped within days.

  /* Rendered by the hero AND the OG card. Both used to hard-code their own
     copy of this line, which is how the three drifted apart — keep it here. */
  tagline:
    'I like taking complex problems, breaking them down, and turning them into simple frontend solutions.',

  /* The short claim on the lanyard badge. Deliberately separate from
     `tagline`: the badge pairs the role with a punchy line, the hero states
     what the work is. */
  badgeClaim: 'Think in systems. Build with intent. Ship with impact.',

  /* Parked, not rendered. This was the hero standfirst until it was pulled
     out of the hero for reuse elsewhere — keep the wording here so it does
     not have to be rewritten from scratch when it lands on its new section. */
  bio: [
    `${yearsOfExperience()} years in React and TypeScript. Mostly performance and frontend`,
    'architecture, plus the Node services underneath.',
  ].join(' '),
} as const

export const socials = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/prajwalbhatia' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/prajwalbhatia/' },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@prajwalbhatia' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/prajwal_the_developer/' },
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
