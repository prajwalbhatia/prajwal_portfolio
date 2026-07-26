import type { Metadata } from 'next'

import { CaseSection, CaseStudy, MeasureTable } from '@/components/case-study'

export const metadata: Metadata = {
  title: 'Web Vitals Programme',
  description:
    'Taking the highest-traffic flow from 5.45s LCP p75 to 3.17s — preload, preconnect, deferred analytics — plus the duller CLS work behind 0.229 to 0.006.',
}

export default function WebVitalsPage() {
  return (
    <CaseStudy
      context="Virtual Internships · 2023–25"
      title="Web Vitals Programme"
      // Label kept to one short line: a longer string wrapped differently in
      // the mono fallback than in Plex Mono, changing the header height and
      // costing CLS 0.11 on this page specifically.
      pair={{ was: '5.45s', now: '3.17s', label: 'LCP p75' }}
      lede="The batch-selection page was the highest-traffic flow in the product and its LCP p75 sat at 5.45s. The instinct with a number like that is to reach for a rewrite. It didn't need one."
    >
      <CaseSection heading="What was actually slow">
        <p>
          The LCP element was a single SVG the browser couldn&rsquo;t discover until JavaScript had
          parsed and rendered. Everything else was contention — Google Analytics and HubSpot
          competing for the main thread during first paint, and DNS lookups happening serially at
          the worst possible moment.
        </p>
      </CaseSection>

      <CaseSection heading="The fix">
        <p>
          Preload the LCP image with <code>fetchpriority=&quot;high&quot;</code> so the browser
          starts fetching before it knows the DOM. <code>dns-prefetch</code> and{' '}
          <code>preconnect</code> for the third-party origins, with <code>crossorigin</code> on the
          preconnect so the connection isn&rsquo;t opened twice. Defer analytics to
          post-interactive. Move web-vitals initialisation into <code>requestIdleCallback</code>.
          Add an <code>eager</code> prop to <code>BgImageWithLoader</code> so an already-preloaded
          image skips its JavaScript load check entirely.
        </p>
      </CaseSection>

      <CaseSection heading="Layout shift">
        <p>
          CLS was a separate, duller problem: things arriving late and pushing content down. Reserve
          the header height, reserve the container, and make skeleton cards exactly 145&times;325px
          so the swap to real content moves nothing. That took it under 0.1, and on intern profiles
          the same approach took CLS p75 from 0.229 to 0.006.
        </p>
      </CaseSection>

      <CaseSection heading="Results">
        <MeasureTable
          caption="Measured at p75 in the field, not on my laptop"
          rows={[
            { label: 'Batch selection — LCP p75', was: '5.45s', now: '3.17s' },
            { label: 'Intern profile — CLS p75', was: '0.229', now: '0.006' },
            { label: 'Onboarding — LCP p75', was: '9.9s', now: '8.6s' },
            { label: 'Dashboard — CLS p75', was: '0.44', now: '0.24' },
          ]}
        />
      </CaseSection>
    </CaseStudy>
  )
}
