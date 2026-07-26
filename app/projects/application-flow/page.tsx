import type { Metadata } from 'next'

import { CaseSection, CaseStudy } from '@/components/case-study'

export const metadata: Metadata = {
  title: 'Application Flow',
  description:
    'A five-step application rebuilt so that nobody loses their work — hybrid auto-save across localStorage and the API, and draft recovery on refresh.',
}

export default function ApplicationFlowPage() {
  return (
    <CaseStudy
      context="Virtual Internships · 2025–26"
      title="Application Flow"
      pair={{ was: '28 min', now: '12 min', label: 'Time to apply (unconfirmed)' }}
      lede="A five-step application, rebuilt around a single premise: never lose what someone has already typed. Long forms fail at the boundary between steps and at the moment a tab closes, and that is where the work went."
    >
      <CaseSection heading="Hybrid auto-save">
        <p>
          Persistence runs at two speeds. On blur, the field writes to{' '}
          <code>localStorage</code> — synchronous, free, and available even if the network is gone.
          Separately, a debounced write persists to the API, so a draft survives the browser as well
          as the tab.
        </p>
        <p>
          On return, a draft is recovered rather than silently discarded. Refreshing mid-application
          is the most ordinary thing a user can do and it should cost nothing.
        </p>
      </CaseSection>

      <CaseSection heading="About that number">
        <p>
          The 28-to-12-minute figure above comes from the product designer&rsquo;s case study, not
          from instrumentation I ran. It is on this page because it is the best estimate available
          and it is labelled as unconfirmed. Two further figures from the same source — a submission
          rate and a revenue change — are deliberately not reproduced anywhere on this site, because
          quoting three unverified numbers is a different thing from quoting one and flagging it.
        </p>
      </CaseSection>

      <CaseSection heading="Credit">
        <p>
          Built with a product designer, who owned the flow structure and the visual design. The
          engineering decisions described above are mine; the shape of the thing was a joint effort.
        </p>
      </CaseSection>
    </CaseStudy>
  )
}
