import type { Metadata } from 'next'

import { CaseSection, CaseStudy } from '@/components/case-study'

export const metadata: Metadata = {
  title: 'Thumbnail Pipeline',
  description:
    'A two-tier async thumbnail service on BullMQ — og:image via cheerio as the fast path, Puppeteer as the fallback, SSRF validation at the edge, and 4,300 lines of tests.',
}

export default function ThumbnailPipelinePage() {
  return (
    <CaseStudy
      context="Virtual Internships · 2025"
      title="Thumbnail Pipeline"
      lede="Intern profiles link out to portfolios and certifications, and those links needed thumbnails. The naive version is Puppeteer on request. That's a browser launch on the critical path of an API call, which is unacceptable at any traffic level."
    >
      <CaseSection heading="Two tiers">
        <p>
          The pipeline is two-tier because most of the web already solves this problem for you:
          sites publish <code>og:image</code>. Extracting it with cheerio costs one HTTP request and
          no browser. Puppeteer became the fallback for the minority that don&rsquo;t, not the
          default.
        </p>
      </CaseSection>

      <CaseSection heading="Never blocking">
        <p>
          Everything else is about never blocking. Redis with a 10-minute TTL, then a database
          lookup on <code>url_hash</code> — a generated <code>BINARY(32)</code> column holding{' '}
          <code>SHA2(url, 256)</code> with a unique index, so lookups are O(1) and duplicate URLs
          across profiles generate once. On a miss the API writes a PENDING row, enqueues a BullMQ
          job and returns a placeholder immediately.
        </p>
        <p>
          <code>Promise.allSettled</code> on the batch enqueue so one failure doesn&rsquo;t take the
          others with it. Stale PENDING rows re-queue after five minutes, because jobs do get lost.
        </p>
      </CaseSection>

      <CaseSection heading="Two things worth pointing at">
        <p>
          Fetching arbitrary user-supplied URLs server-side is an SSRF hole, so{' '}
          <code>urlValidator</code> does IP-range and DNS-level validation behind safe HTTP agents —
          125 lines of implementation, 434 lines of tests.
        </p>
        <p>
          And <code>BrowserPool</code> keeps a <code>launchPromises</code> map to deduplicate
          concurrent launches for the same slot: a race closed before it happened rather than after.
        </p>
      </CaseSection>

      <CaseSection heading="What shipped with it">
        <p>
          Roughly 4,300 lines of tests against 1,100 of implementation, plus a technical doc for
          whoever owns it next.
        </p>
      </CaseSection>
    </CaseStudy>
  )
}
