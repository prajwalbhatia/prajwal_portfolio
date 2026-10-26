import type { Metadata } from 'next'

import { CaseSection, CaseStudy, MeasureTable } from '@/components/case-study'

export const metadata: Metadata = {
  title: 'Web Vitals Programme',
  description:
    'Improving the busiest flow from 5.45s to 3.17s LCP at p75 and reducing layout shift across key pages.',
}

export default function WebVitalsPage() {
  return (
    <CaseStudy
      context="Virtual Internships · 2023–25"
      title="Web Vitals Programme"
      pair={{ was: '5.45s', now: '3.17s', label: 'LCP p75' }}
      lede="The busiest step in the product took 5.45 seconds to show its main content for a quarter of real visits. I traced the delay to an image the browser found too late and third-party scripts competing during load."
    >
      <CaseSection heading="What was slowing the page">
        <p>
          The main image only appeared after JavaScript rendered the page, so the browser could not
          fetch it early. Analytics and other third-party scripts also competed for time during the
          first paint. On other pages, late-loading content pushed the layout around.
        </p>
      </CaseSection>

      <CaseSection heading="What I changed">
        <ul className="list-disc space-y-2 pl-5 marker:text-accent">
          <li>Preloaded the main image so its download could start before React rendered it.</li>
          <li>Connected to third-party services early and deferred analytics until after the page became interactive.</li>
          <li>Reserved space for headers, images and cards so content arriving later would not shift the page.</li>
        </ul>
      </CaseSection>

      <CaseSection heading="Results in real visits">
        <p>
          Batch Selection LCP p75 fell from 5.45s to 3.17s, a 42% reduction. The same layout work
          improved Intern Profile CLS p75 from 0.229 to 0.006. These are field measurements at the
          75th percentile, rather than a single local test.
        </p>
        <MeasureTable
          caption="Other field measurements at p75"
          rows={[
            { label: 'Intern profile — CLS p75', was: '0.229', now: '0.006' },
            { label: 'Onboarding — LCP p75', was: '9.9s', now: '8.6s' },
            { label: 'Dashboard — CLS p75', was: '0.44', now: '0.24' },
          ]}
        />
      </CaseSection>
    </CaseStudy>
  )
}
