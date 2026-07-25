import type { Metadata } from 'next'

import { CaseSection, CaseStudy } from '@/components/case-study'

export const metadata: Metadata = {
  title: 'Batch Selection Re-architecture',
  description:
    'Splitting a 500-line component into three hooks, moving business rules server-side so frontend state could be deleted, and finding a bug that had been dropping query params on every request.',
}

export default function BatchSelectionPage() {
  return (
    <CaseStudy
      context="Virtual Internships · 2026"
      title="Batch Selection"
      lede="Batch selection was a 500-line component holding its own copy of rules that belonged to the backend — which flow the user was in, which batches they were eligible for, whether selection was locked. Frontend state mirroring server truth is a bug generator; the two drift and you find out in production."
    >
      <CaseSection heading="Three parts">
        <p>
          Split the component into <code>useBatchSelection</code>,{' '}
          <code>useBatchSelectionSubmit</code> and <code>useBatchSelectionEventLogger</code>, each
          with one job. Replace the legacy <code>getBatchList</code> thunk with RTK Query. Then move
          the rules to the API — and once the backend returns only the relevant batch,{' '}
          <code>isLocked</code> and <code>isSingleBatchScenario</code> don&rsquo;t need
          reimplementing, they need deleting.
        </p>
        <p>The win was state removed, not state reorganised.</p>
      </CaseSection>

      <CaseSection heading="A useMemo doing nothing">
        <p>
          I also took out a <code>useMemo</code> that was doing nothing: RTK Query already
          deep-equals its query arguments, so memoising them buys you a comparison you were getting
          for free.
        </p>
      </CaseSection>

      <CaseSection heading="The bug underneath">
        <p>
          Then the thing worth the whole exercise. Rewriting the data layer surfaced that{' '}
          <code>partner_slug</code> and <code>batch_code</code> had never been reaching the API —{' '}
          <code>customBaseQuery</code> silently ignored RTK Query&rsquo;s <code>params</code> field,
          so the partner flow had been fetching without its filters. Fixed by building the URL with{' '}
          <code>URLSearchParams</code>, matching the pattern already used elsewhere in the codebase.
        </p>
      </CaseSection>

      <CaseSection heading="What shipped with it">
        <p>
          Unit tests, an axe-core pass, and <code>role=&quot;list&quot;</code> added to satisfy{' '}
          <code>aria-required-parent</code> on the cards.
        </p>
      </CaseSection>
    </CaseStudy>
  )
}
