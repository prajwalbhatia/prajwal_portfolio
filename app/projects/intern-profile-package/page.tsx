import type { Metadata } from 'next'

import { CaseSection, CaseStudy } from '@/components/case-study'

export const metadata: Metadata = {
  title: 'fe-intern-profile',
  description:
    'A versioned React package with downstream consumers — keyboard navigation across 25 files and a 513KB to 240KB bundle reduction via targeted code-splitting.',
}

export default function InternProfilePackagePage() {
  return (
    <CaseStudy
      context="Virtual Internships · 2024–26"
      title="fe-intern-profile"
      pair={{ was: '513KB', now: '240KB', label: 'Bundle' }}
      lede="This started as intern-profile UI and became a package the main application installs. That shift changes the work: once something has consumers, you can't reshape an API because it would be tidier."
    >
      <CaseSection heading="Library maintenance, done properly">
        <p>
          Most of it is unglamorous. Breaking a monolithic profile view into discrete section
          components across 31 files. Building the resume builder as a component that holds both
          edit and view modes rather than duplicating markup for each.
        </p>
        <p>
          Getting the whole surface keyboard-navigable — 782 additions across 25 files, driven by an
          accessibility issue filed against the consuming app, which is the useful part: the bug
          arrived from downstream and had to be fixed at the source.
        </p>
      </CaseSection>

      <CaseSection heading="Code-splitting with an opinion">
        <p>
          The performance work was code-splitting with an opinion about which sections matter.
          Above-the-fold — profile, about, skills — stays synchronous. Portfolio, experience,
          education and certifications move behind <code>React.lazy</code> with skeleton fallbacks.{' '}
          <code>fetchPriority=&quot;high&quot;</code> on the profile picture, <code>low</code> on
          four decorative header SVGs. Terser at two passes.
        </p>
      </CaseSection>

    </CaseStudy>
  )
}
