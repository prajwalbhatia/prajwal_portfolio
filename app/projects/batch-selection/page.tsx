import type { Metadata } from 'next'
import Link from 'next/link'

import { CaseSection, CaseStudy } from '@/components/case-study'

export const metadata: Metadata = {
  title: 'Batch Selection Re-architecture',
  description:
    'Simplifying a large batch-selection component, moving eligibility rules server-side and fixing missing query parameters.',
}

export default function BatchSelectionPage() {
  return (
    <CaseStudy
      context="Virtual Internships · 2026"
      title="Batch Selection"
      lede="Batch selection had a 500-line component that duplicated backend rules. I split the frontend into focused hooks, moved eligibility decisions to the API and deleted state that no longer needed to exist in the browser."
    >
      <CaseSection heading="A smaller frontend">
        <p>
          The component became separate hooks for data, submission and event logging. I replaced
          legacy Redux thunks with RTK Query and changed the API to return only relevant batches.
          That removed frontend copies of lock and single-batch rules that could drift from the
          server.
        </p>
      </CaseSection>

      <CaseSection heading="A bug the rewrite exposed">
        <p>
          Partner and batch filters had silently been dropped from requests because our custom RTK
          Query base query ignored its <code>params</code> field. I fixed the URL construction and
          added tests and an accessibility pass alongside the rewrite.
        </p>
      </CaseSection>

      <CaseSection heading="Related work">
        <p>
          The <Link href="/projects/signup-funnel">signup rebuild</Link> also moved business rules
          into the backend while simplifying the frontend flow.
        </p>
      </CaseSection>
    </CaseStudy>
  )
}
