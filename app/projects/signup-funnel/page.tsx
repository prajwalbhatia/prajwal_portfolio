import type { Metadata } from 'next'
import Link from 'next/link'

import { CaseSection, CaseStudy } from '@/components/case-study'

export const metadata: Metadata = {
  title: 'Signup Funnel Rebuild',
  description:
    'Three signup screens became one transactional flow while preserving users partway through the old version.',
}

export default function SignupFunnelPage() {
  return (
    <CaseStudy
      context="Virtual Internships · 2026"
      title="Signup Funnel Rebuild"
      pair={{ was: '3+', now: '1', label: 'Sequential API calls' }}
      lede="Signup spanned three screens, including one that collected nothing. I collapsed the flow into one screen and one transactional endpoint while preserving users who were already partway through the old version."
    >
      <CaseSection heading="Simpler signup">
        <p>
          The empty congratulations screen was removed. Country and timezone are inferred as
          defaults instead of requiring a separate form, and fields still needed later moved into
          the application flow. The frontend now makes one registration call.
        </p>
      </CaseSection>

      <CaseSection heading="A safe migration">
        <p>
          The endpoint creates the intern, batch mapping and application in one transaction. It
          recognizes existing records, updates them in place and skips records that already exist.
          That let people who started under the old flow finish under the new one without a duplicate
          application. I built both the frontend change and the endpoint.
        </p>
      </CaseSection>

      <CaseSection heading="Outcome and limits">
        <p>
          The three screens and at least three sequential calls became one of each. We did not
          measure a before-and-after change in completion, drop-off or time to first screen, so I
          make no claim about those outcomes. The related{' '}
          <Link href="/projects/batch-selection">batch-selection rewrite</Link> has its own story.
        </p>
      </CaseSection>
    </CaseStudy>
  )
}
