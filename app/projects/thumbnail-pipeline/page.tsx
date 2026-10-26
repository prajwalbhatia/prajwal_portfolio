import type { Metadata } from 'next'

import { BeforeAfter } from '@/components/before-after'
import { CaseSection, CaseStudy } from '@/components/case-study'

export const metadata: Metadata = {
  title: 'Thumbnail Pipeline',
  description:
    'An asynchronous link-preview service with an Open Graph fast path, Puppeteer fallback and 95% production success.',
}

export default function ThumbnailPipelinePage() {
  return (
    <CaseStudy
      context="Virtual Internships · 2025"
      title="Thumbnail Pipeline"
      lede="Most portfolio links in the candidate browser had no uploaded image, so rows showed the same placeholders. I built a backend service that derives previews from those links without changing the frontend or slowing its API response."
    >
      <CaseSection heading="Before and after">
        <BeforeAfter
          before="/thumbnail-before.png"
          after="/thumbnail-after.png"
          beforeAlt="Browse row with two generic placeholders instead of project previews"
          afterAlt="The same row with generated previews of both linked projects"
          width={2700}
          height={540}
          label="Drag to compare the browse card before and after thumbnail generation"
          caption="Candidate name, institution and previous employer redacted"
        />
      </CaseSection>

      <CaseSection heading="How the pipeline works">
        <p>
          The API first checks Redis and a URL-hash database record. On a miss it returns a
          placeholder immediately and queues a BullMQ job. The worker reads <code>og:image</code>
          when available, then falls back to a Puppeteer screenshot. It stores the result for the
          next request. The existing frontend continues to render the same <code>image_url</code>
          field.
        </p>
        <img
          src="/thumbnail_generation.svg"
          alt="A request returns a placeholder while a worker validates the URL, extracts an Open Graph image or takes a screenshot, then stores the preview for later requests."
          width={1200}
          height={520}
          loading="lazy"
          className="h-auto w-full rounded-xl border border-rule bg-surface"
        />
      </CaseSection>

      <CaseSection heading="Safety and result">
        <p>
          Because the links are supplied by users, the worker validates IP ranges and DNS results
          before fetching. Failed jobs leave the original placeholder rather than failing the
          browse request. In production the pipeline processed 95% of links successfully; the Open
          Graph path handled about 55% of URLs in roughly one second, at about one eighth of the
          Puppeteer fallback&apos;s latency.
        </p>
      </CaseSection>
    </CaseStudy>
  )
}
