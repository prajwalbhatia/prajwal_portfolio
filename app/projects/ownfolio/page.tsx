import type { Metadata } from 'next'
import Image from 'next/image'

import { CaseSection, CaseStudy } from '@/components/case-study'

export const metadata: Metadata = {
  title: 'Ownfolio',
  description:
    'Why I built Ownfolio, a public career platform for capturing work, keeping evidence and publishing a selected record of a professional journey.',
}

export default function OwnfolioPage() {
  return (
    <CaseStudy
      context="Independent product · 2026"
      title="Ownfolio"
      lede="When I tried to look back on my own engineering work, too much of it lived in old tickets, conversations and repositories. I built Ownfolio so the projects, decisions and impact behind a career can be recorded while they are still fresh. I designed, built and released the first version solo."
      action={{ href: 'https://ownfolio.in', label: 'Visit Ownfolio' }}
    >
      <CaseSection heading="The problem I kept running into">
        <p>
          Engineers spend years solving difficult problems, then struggle to remember the details
          when it is time to update a résumé or prepare for an interview. The evidence is scattered
          across Slack conversations, Jira tickets, pull requests and documents. Leave an
          organization, and some of those sources are no longer available. A product can disappear
          too, leaving its work as a vague memory.
        </p>
        <p>
          I wanted a record that belongs to the person who did the work: something more useful than
          a list of job titles, and something they can build gradually instead of reconstructing
          years later.
        </p>
      </CaseSection>

      <CaseSection heading="What the first version lets you do">
        <p>
          The path starts with a quick note. The original words stay in Raw captures, and the owner
          can review that note into a structured career record when ready. Records can be grouped
          into career chapters, linked to supporting evidence and acknowledged by colleagues.
        </p>
        <p>
          A Career Profile is a separate publishing step. The owner selects and orders confirmed
          public records, then chooses when to publish the profile. It gives the work a shareable
          home without making every private note public by default.
        </p>
      </CaseSection>

      <CaseSection heading="The product in the browser">
        <figure className="overflow-hidden rounded-xl border border-rule bg-surface">
          <Image
            src="/ownfolio-home.png"
            alt="Ownfolio homepage showing its career-record message beside a clearly labelled fictional Career Profile with a project, colleague acknowledgement and supporting link"
            width={1440}
            height={933}
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="h-auto w-full"
          />
          <figcaption className="label border-t border-rule px-4 py-3 text-muted">
            Public homepage. The profile preview uses fictional people and work.
          </figcaption>
        </figure>
      </CaseSection>

      <CaseSection heading="Private first, shared deliberately">
        <p>
          A career record may contain details that should stay private. In Ownfolio, a record must
          be confirmed, marked public and selected before it can appear on a published profile.
          Evidence links need their own sharing choice. A colleague&apos;s name and response appear
          publicly only if that colleague consents.
        </p>
        <p>
          The owner also writes the record themselves. Draft assistance has a separate review and
          apply step; the public release does not automatically turn a rough note into a published
          story.
        </p>
      </CaseSection>

      <CaseSection heading="Building and releasing it solo">
        <p>
          I built the Next.js web app, the Express API and its PostgreSQL data layer, including
          account sessions, email verification, career records, evidence and public profiles. The
          repository also has a separate worker path for optional draft proposals. Shipping the
          first version meant carrying the product from the initial problem and interface design
          through implementation, testing and deployment.
        </p>
        <p>
          Ownfolio is now publicly available at{' '}
          <a
            href="https://ownfolio.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-now underline decoration-rule underline-offset-4 hover:opacity-70"
          >
            ownfolio.in
          </a>
          . The result I can claim today is a working release and the complete path from a private
          note to a selected public profile; I am not attaching adoption or impact numbers before
          they are measured.
        </p>
      </CaseSection>
    </CaseStudy>
  )
}
