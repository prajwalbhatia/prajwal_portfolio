import type { Metadata } from 'next'

import { CaseSection, CaseStudy } from '@/components/case-study'

export const metadata: Metadata = {
  title: 'fe-intern-profile',
  description:
    'A shared React package with improved keyboard access and a bundle reduced from 513KB to 240KB.',
}

export default function InternProfilePackagePage() {
  return (
    <CaseStudy
      context="Virtual Internships · 2024–26"
      title="fe-intern-profile"
      pair={{ was: '513KB', now: '240KB', label: 'Bundle' }}
      lede="Intern-profile UI grew into a versioned React package used by the main application. That made bundle size, accessibility and stable component APIs a concern for every consumer."
    >
      <CaseSection heading="Shared components">
        <p>
          I broke the profile into reusable sections and built a résumé builder with edit and view
          modes. An accessibility issue in the consuming application led us to fix keyboard
          navigation in the package itself, where every consumer benefits.
        </p>
      </CaseSection>

      <CaseSection heading="Smaller first load">
        <p>
          Profile, about and skills stay synchronous. Lower sections load through{' '}
          <code>React.lazy</code> with skeleton fallbacks. Prioritizing the profile image and
          deferring decorative assets helped bring the package bundle from 513KB to 240KB.
        </p>
      </CaseSection>
    </CaseStudy>
  )
}
