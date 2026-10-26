import type { Metadata } from 'next'
import Image from 'next/image'

import { CaseSection, CaseStudy } from '@/components/case-study'

export const metadata: Metadata = {
  title: 'Ownfolio',
  description:
    'How I built Ownfolio, a private career workspace for capturing work, bringing in past experience and curating a public profile.',
}

export default function OwnfolioPage() {
  return (
    <CaseStudy
      context="Independent product · 2026"
      title="Ownfolio"
      lede="I built Ownfolio so people can keep a record of the work they have done, even after the tickets, chats and repositories are out of reach. What began as a way to capture new work now also helps people bring in years of earlier experience. I design, build and release the product solo."
      action={{ href: 'https://ownfolio.in', label: 'Visit Ownfolio' }}
    >
      <CaseSection heading="The problem">
        <p>
          The details behind a project are easy to lose. They live in company tools, and access may
          disappear when a role ends. Starting a career record from scratch is also a lot to ask of
          someone who already has years of work behind them. Ownfolio gives both kinds of work a
          place to start.
        </p>
      </CaseSection>

      <CaseSection heading="How it works today">
        <ol className="list-decimal space-y-3 pl-5 marker:font-semibold marker:text-accent">
          <li>
            <strong className="text-ink">Start with a note or a résumé.</strong> Write freely, follow
            prompts or upload a PDF résumé to review suggested chapters and records.
          </li>
          <li>
            <strong className="text-ink">Make the record your own.</strong> Edit drafts, organize them
            into career chapters, add skills and evidence, and invite colleague acknowledgements.
          </li>
          <li>
            <strong className="text-ink">Choose what to share.</strong> Keep original notes private
            and select confirmed records for a public Career Profile. Evidence and colleague replies
            have their own visibility controls.
          </li>
        </ol>
        <figure className="overflow-hidden rounded-xl border border-rule bg-surface">
          <Image
            src="/ownfolio-home.png"
            alt="Ownfolio homepage with a fictional Career Profile preview"
            width={1440}
            height={933}
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="h-auto w-full"
          />
          <figcaption className="label border-t border-rule px-4 py-3 text-muted">
            Public homepage; the profile preview uses fictional people and work.
          </figcaption>
        </figure>
      </CaseSection>

      <CaseSection heading="How the product evolved">
        <p>
          The early product focused on capturing work and publishing a selected profile. Verified
          production releases in October 2026 expanded that path:
        </p>
        <ul className="list-disc space-y-2 pl-5 marker:text-accent">
          <li><strong className="text-ink">15 October:</strong> email verification, account recovery and session revocation.</li>
          <li><strong className="text-ink">17 October:</strong> editable AI draft suggestions with passages from the original note.</li>
          <li><strong className="text-ink">19 October:</strong> career chapters with month-and-year dates, without inventing unknown days.</li>
          <li><strong className="text-ink">23–25 October:</strong> résumé import, review and selection, followed by background draft preparation for imported records.</li>
        </ul>
      </CaseSection>

      <CaseSection heading="The decisions behind it">
        <p>
          AI can help turn notes and résumés into useful drafts, but it can also misstate a person's
          contribution. Ownfolio shows source passages and keeps suggestions separate from saved
          records until the owner reviews them. Imported records begin as private drafts.
        </p>
        <p>
          Privacy and accuracy shaped the less visible work too: résumé upload requires explicit
          consent, public sharing is a separate choice, and chapter dates can stay incomplete when
          the exact date is unknown.
        </p>
      </CaseSection>

      <CaseSection heading="My role">
        <p>
          I built the responsive Next.js app, Express API, PostgreSQL schema, authentication,
          background jobs and release process. I also set up staging and production deployments,
          monitoring and checks that record what actually reached production. Ownfolio is live at{' '}
          <a href="https://ownfolio.in" target="_blank" rel="noopener noreferrer">ownfolio.in</a>
          {' '}and I am continuing to develop it. I do not have verified adoption or impact numbers
          to report yet.
        </p>
      </CaseSection>
    </CaseStudy>
  )
}
