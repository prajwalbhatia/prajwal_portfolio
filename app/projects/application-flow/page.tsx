import type { Metadata } from 'next'
import Link from 'next/link'

import { CaseSection, CaseStudy } from '@/components/case-study'
import { SaveFlowDiagram } from '@/components/save-flow-diagram'

export const metadata: Metadata = {
  title: 'Application Flow',
  description:
    'A configurable application flow with draft recovery, built across two releases with clear ownership and measured outcomes.',
}

export default function ApplicationFlowPage() {
  return (
    <CaseStudy
      context="Virtual Internships · 2025–26"
      title="Application Flow"
      pair={{ was: '28 min', now: '12 min', label: 'Time to apply' }}
      lede="The application redesign and draft recovery shipped in separate releases. I worked on the configurable flow with a designer and backend engineer, then built the persistence layer end to end so a refresh would no longer erase a draft."
    >
      <CaseSection heading="What changed">
        <p>
          Depending on the batch, applicants see five to eight steps. Each step has its own route,
          so refresh, back navigation and shared links return to the right place. The redesign cut
          time to apply from 28 to 12 minutes; completion rose 24% and drop-off fell 31%, according
          to the product designer&apos;s case study. The flow&apos;s own events cannot break those
          figures down by step.
        </p>
      </CaseSection>

      <CaseSection heading="Recovering drafts">
        <p>
          Six months later, I added local per-step drafts and a debounced API write. Blur, a one-second
          idle check and submit all feed the same save path. A draft restores only empty fields, so
          older local data cannot overwrite a saved server value.
        </p>
        <SaveFlowDiagram />
        <p>
          The limitation is two tabs on the same step: they share a local key without versioning, so
          the last writer wins. That is the next edge case I would address.
        </p>
      </CaseSection>

      <CaseSection heading="My contribution">
        <p>
          The designer owned research, structure and visuals. Other developers built the résumé
          parser; I integrated and hardened its output. The persistence layer, step shell and
          validation integration were mine. The profile package this flow uses has its own{' '}
          <Link href="/projects/intern-profile-package">case study</Link>.
        </p>
      </CaseSection>
    </CaseStudy>
  )
}
