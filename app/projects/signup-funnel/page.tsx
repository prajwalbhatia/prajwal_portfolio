import type { Metadata } from 'next'
import Link from 'next/link'

import { CaseSection, CaseStudy } from '@/components/case-study'

export const metadata: Metadata = {
  title: 'Signup Funnel Rebuild',
  description:
    'Three signup screens down to one, country and timezone inferred rather than asked, and a single transactional endpoint that had to absorb everyone already halfway through the old flow.',
}

export default function SignupFunnelPage() {
  return (
    <CaseStudy
      context="Virtual Internships · 2026"
      title="Signup Funnel Rebuild"
      pair={{ was: '3+', now: '1', label: 'Sequential API calls' }}
      lede="Signup was three screens, one of which collected nothing. The rebuild deleted a page, collapsed the rest into a single transaction, and then had to deal with everyone who was already partway through the old flow when it shipped."
    >
      <CaseSection heading="Three screens, one of them an animation">
        <p>
          Signup was three screens. <code>basicDetails</code> collected first name, last name, date
          of birth, timezone, current country, and how you heard about us.{' '}
          <code>personalizationScreen</code> followed. Then <code>congratulationsScreen</code>: 148
          lines of TSX, 160 of SCSS, one Lottie file, collecting nothing.
        </p>
      </CaseSection>

      <CaseSection heading="Why the registration screen went">
        <p>
          It existed to gather timezone and a handful of other fields. It also stood between signing
          up and seeing what the platform actually offered — one more screen before anyone could
          tell whether the thing was worth their time. The reasoning for removing it was that the
          length of signup was where people were being lost.
        </p>
        <p>
          The fields didn&rsquo;t need a screen of their own. Country and timezone are now inferred
          from IP through a <code>useIpBasedDefaults</code> hook, because the browser already knows
          roughly where you are and asking is friction. The rest moved into the application flow,
          where someone is already filling in a form and one more field costs nothing.{' '}
          <code>congratulationsScreen</code> was deleted outright.
        </p>
      </CaseSection>

      <CaseSection heading="One call">
        <p>
          <code>POST /register/start-onboarding</code> replaced the walk. Inside it, one database
          transaction creates the <code>Intern</code>, the <code>InternBatchPartnerMapping</code>{' '}
          and the <code>InternApplication</code> together. <code>batch_id</code> is required up
          front for the flows that need it, rather than discovered missing three steps later.
        </p>
        <p>I wrote both sides: the frontend deletion and the endpoint behind it.</p>
      </CaseSection>

      <CaseSection heading="The people already halfway through">
        <p>
          That was the hard part. At deploy time someone could be sitting between old screen two and
          three, holding a partly-built record, with no way to finish a flow that no longer existed.
        </p>
        <p>
          So the endpoint treats an existing intern as the normal case rather than the exception. If
          the record is there it updates in place and carries the name fields forward instead of
          minting a new <code>uuid</code>. Before creating the batch mapping it looks for one, and
          skips both the mapping and the application if it finds it. If{' '}
          <code>is_intern_onboarding_started</code> is already set it returns a token and touches
          nothing at all.
        </p>
        <p>
          One step isn&rsquo;t idempotency. The old flow wrote a{' '}
          <code>UserPartnerBatchMapping</code> keyed by <code>uuid</code>, before the user was an
          intern. The new one writes an <code>InternBatchPartnerMapping</code> keyed by{' '}
          <code>intern_id</code>. The transaction creates the second and deletes the first, so a
          record that straddled the pre- and post-authentication boundary lands cleanly on one side
          of it.
        </p>
        <p>
          Every branch in that method is a version of the same question: what if they&rsquo;ve
          already done part of this?
        </p>
      </CaseSection>

      <CaseSection heading="What wasn't measured">
        <p>
          Nothing was. There&rsquo;s no before-and-after on signup completion, drop-off or
          time-to-first-screen — no dashboard, no instrumentation added, no number in any of the
          four pull requests. The change was made on the reasoning above, not on a measurement, and
          I&rsquo;m not going to claim a result I didn&rsquo;t record.
        </p>
      </CaseSection>

      <CaseSection heading="Related">
        <p>
          The batch-selection frontend was rewritten separately — hooks, an RTK Query migration, and
          a bug that had been dropping query params on every request.{' '}
          <Link
            href="/projects/batch-selection"
            className="text-ink underline decoration-rule underline-offset-4 hover:decoration-current"
          >
            That one has its own write-up
          </Link>
          .
        </p>
      </CaseSection>
    </CaseStudy>
  )
}
