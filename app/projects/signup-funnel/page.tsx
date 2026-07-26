import type { Metadata } from 'next'
import Link from 'next/link'

import { CaseSection, CaseStudy } from '@/components/case-study'

export const metadata: Metadata = {
  title: 'Signup Funnel Rebuild',
  description:
    'Deleting a registration page and collapsing signup into a single transaction — plus moving batch-selection business rules out of the frontend and into one backend endpoint.',
}

export default function SignupFunnelPage() {
  return (
    <CaseStudy
      context="Virtual Internships · 2026"
      title="Signup Funnel Rebuild"
      pair={{ was: '3+', now: '1', label: 'Sequential API calls' }}
      lede="Signup ran across several screens, each one accumulating a bit more partial state before anything was committed. The rebuild deleted a page, made the whole thing one transaction, and moved the rules that decide what a user is eligible for out of the browser."
    >
      <CaseSection heading="Deleting the registration page">
        <p>
          The clearest win was removing a screen. A page that exists only to collect fields the rest
          of the flow could collect is a page that can be deleted, and every screen removed from a
          funnel is one fewer place for someone to abandon it or for state to go stale between
          steps.
        </p>
      </CaseSection>

      <CaseSection heading="One transaction instead of accumulated state">
        <p>
          The old flow built a user up in pieces across several requests. That means intermediate
          states exist — half-created accounts, records that are valid at step two and invalid by
          step four — and every one of them is something the backend has to tolerate and someone
          eventually has to clean up.
        </p>
        <p>
          Signup is now a single transactional endpoint. It either produces a complete user or it
          produces nothing, which removes the partial states rather than handling them.
        </p>
      </CaseSection>

      <CaseSection heading="Moving the rules off the frontend">
        <p>
          Batch selection previously fetched through three or more sequential calls, and the logic
          deciding which batches a user was eligible for lived in the browser alongside a copy of it
          on the server. Two implementations of one rule drift, and the drift shows up in
          production.
        </p>
        <p>
          One backend endpoint now owns those rules and returns what the user is actually eligible
          for, so the frontend renders an answer rather than computing one.{' '}
          <Link
            href="/projects/batch-selection"
            className="text-ink underline decoration-rule underline-offset-4 hover:decoration-current"
          >
            Batch selection&rsquo;s frontend was rewritten around that in a separate piece of work
          </Link>
          .
        </p>
      </CaseSection>

      <CaseSection heading="What isn't measured">
        <p>
          The call count is verified — the backend change describes the previous frontend making
          three or more sequential requests where there is now one. Everything else here is
          structural: a screen removed, partial states removed, one owner for a rule instead of two.
        </p>
        <p>
          There is no conversion or completion figure for this work, so there isn&rsquo;t one on
          this page. A shorter funnel is a reasonable thing to expect to help; whether it did is not
          something I measured.
        </p>
      </CaseSection>
    </CaseStudy>
  )
}
