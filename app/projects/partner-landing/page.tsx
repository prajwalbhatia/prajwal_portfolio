import type { Metadata } from 'next'

import { CaseSection, CaseStudy } from '@/components/case-study'

export const metadata: Metadata = {
  title: '10x Partner Landing Page',
  description:
    'A partner-branded landing page rendered from a catch-all slug route — eight sections, three live API integrations, and error states for invalid, expired and inactive partners.',
}

export default function PartnerLandingPage() {
  return (
    <CaseStudy
      context="Virtual Internships · 2026"
      title="10x Partner Landing Page"
      lede="One route, many partners. A catch-all slug resolves to a partner, and the page renders in their branding — eight sections, three live API integrations, and a set of error states that matter more than any of them."
    >
      <CaseSection heading="One route, many pages">
        <p>
          The page is rendered from a catch-all slug rather than built per partner. Adding a partner
          is a data change, not a deploy, which is the only version of this that stays maintainable
          once there is more than a handful.
        </p>
      </CaseSection>

      <CaseSection heading="The error states are the feature">
        <p>
          A slug that resolves to nothing, a partner whose agreement has expired, a partner marked
          inactive — each is a distinct case with a distinct outcome, and each is far more likely to
          be hit than anyone plans for. Getting them right is most of what separates this from a
          template.
        </p>
        <p>
          Three live API integrations sit behind the eight sections, which means three more ways the
          page can be asked to render without the data it expected.
        </p>
      </CaseSection>

      <CaseSection heading="Reduced motion, done properly">
        <p>
          <code>prefers-reduced-motion: reduce</code> is honoured rather than declared. A marketing
          page is exactly where motion tends to be treated as decoration that everybody must
          receive, and it is exactly where that assumption causes harm.
        </p>
      </CaseSection>

      <CaseSection heading="No numbers yet">
        <p>
          Nothing here has been measured. There is no conversion figure, no traffic figure, and no
          claim of impact — the page shipped recently and the instrumentation to say anything
          honest about it does not exist yet. When it does, this section gets replaced.
        </p>
      </CaseSection>

      <CaseSection heading="Credit">
        <p>
          Built with a product designer, who owned the visual design and the section structure
          across all eight blocks.
        </p>
      </CaseSection>
    </CaseStudy>
  )
}
