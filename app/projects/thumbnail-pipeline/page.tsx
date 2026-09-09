import type { Metadata } from 'next'

import { BeforeAfter } from '@/components/before-after'
import { CaseSection, CaseStudy } from '@/components/case-study'

export const metadata: Metadata = {
  title: 'Thumbnail Pipeline',
  description:
    'Generating link previews server-side so a browse page of static placeholders became real thumbnails — og:image extraction as the primary path, headless-browser screenshots as the fallback, both queued off the API’s critical path. Zero frontend changes.',
}

export default function ThumbnailPipelinePage() {
  return (
    <CaseStudy
      context="Virtual Internships · 2025"
      title="Thumbnail Pipeline"
      lede="Intern profiles link out to portfolios and certifications, and the browse page rendered a card for each one. A card only had an image if the intern had uploaded one, and most never did — so the page was mostly identical placeholders. I proposed and built a service that stops waiting for an upload and derives the preview from the link itself."
    >
      <CaseSection heading="What the API was actually returning">
        <p>
          The candidates endpoint returned two fields per row: <code>image_url</code> when one
          existed, and <code>link</code>. The frontend rendered the image if it was there and a
          static placeholder if it wasn&rsquo;t.
        </p>
        <p>
          Nothing about that was broken, and that was the problem — it worked exactly as written,
          and the result was a browse page where most cards looked the same. The information needed
          to do better was already in the response. Nobody was using the <code>link</code>.
        </p>
      </CaseSection>

      <CaseSection heading="The same card, before and after">
        <p>
          One intern row, dragged. The two paperclip placeholders on the left are what every card
          with an un-uploaded image looked like; on the right, the same row after the pipeline
          resolved both links — one via <code>og:image</code>, one screenshotted.
        </p>
        <BeforeAfter
          before="/thumbnail-before.png"
          after="/thumbnail-after.png"
          beforeAlt="An intern row on the browse page showing two generic paperclip placeholders where project previews should be"
          afterAlt="The same intern row showing two generated thumbnails of the intern's actual project pages"
          width={2700}
          height={540}
          label="Drag to compare the browse card before and after thumbnail generation"
          caption="Candidate name, institution and previous employer redacted"
        />
      </CaseSection>

      <CaseSection heading="The constraint that shaped the design">
        <p>
          I set one constraint in the proposal before choosing an approach:{' '}
          <strong>the frontend must not change</strong>. It keeps rendering whatever{' '}
          <code>image_url</code> the API hands it, and generation is entirely the backend&rsquo;s
          problem.
        </p>
        <p>
          That is what rules out the obvious alternatives. Generating client-side would have meant
          shipping the work to every browser on every render and exposing arbitrary outbound fetches
          from the user&rsquo;s session. Adding a second endpoint would have meant a waterfall on a
          page that renders a dozen cards. Filling the existing field is the only version where the
          browse page gets better without a single component being touched.
        </p>
      </CaseSection>

      <CaseSection heading="The whole flow, end to end">
        <p>
          The beat worth watching is the one where the response leaves before the work happens —
          the API returns a placeholder and queues the job in the same instant, so nothing blocks
          on a browser launch.
        </p>
        {/* Plain <img>, not inline and not next/image. Inline would put 33KB of
            markup in the document for no gain; next/image refuses SVG without
            dangerouslyAllowSVG, which is not a switch worth flipping for one
            asset. CSS animations inside an SVG still run when it is loaded this
            way, and its own prefers-reduced-motion query still evaluates
            against the visitor's setting. */}
        <img
          src="/thumbnail_generation.svg"
          alt="Animated diagram of the pipeline. A request reaches the candidates API, misses both the Redis and database caches, and immediately returns a placeholder while queueing a BullMQ job. A worker passes an SSRF validation gate, then resolves the thumbnail either through the fast og:image path or, when no tag exists, a slower headless-browser screenshot. The result is written to cloud storage and cached, so the next request returns instantly."
          width={1200}
          height={520}
          loading="lazy"
          className="h-auto w-full rounded-xl border border-rule bg-surface"
        />
      </CaseSection>

      <CaseSection heading="og:image first, because the web already solved this">
        <p>
          Most sites publish an Open Graph image so their links look right when shared. That image
          is chosen and sized by the site owner specifically to represent the page — it is better
          than anything I would generate, and it costs one HTTP request to find.
        </p>
        <p>
          So tier one fetches the HTML and parses <code>og:image</code> out of the head with cheerio,
          falling back to <code>twitter:image</code> and then a plain <code>meta name=&quot;image&quot;</code>.
          No browser, no rendering, no JavaScript execution. In production this resolves{' '}
          <strong>~55% of URLs in about a second</strong>.
        </p>
        <p>
          It is not universal, which is the whole reason there is a second tier: plenty of sites
          publish no tags at all, and the URL they do publish is sometimes stale or already broken.
          So the extracted URL gets validated rather than trusted.
        </p>
      </CaseSection>

      <CaseSection heading="A screenshot only when there is nothing to read">
        <p>
          Tier two renders the page in headless Puppeteer and captures the viewport at 1200&times;630
          — the same dimensions Open Graph uses, so both tiers produce interchangeable output. It
          works for effectively any reachable URL, which is exactly what a fallback needs to do.
        </p>
        <p>
          It is also the expensive path: two to five seconds per capture, real CPU and memory per
          instance, and it fails in ways the first tier cannot — auth walls, bot detection, pages
          that never settle. Every one of those properties argues for it being the fallback rather
          than the default. Making it tier two is what keeps a browser launch off the critical path
          of an API call, and it is why the fast path runs at roughly{' '}
          <strong>an eighth of the fallback&rsquo;s latency</strong>.
        </p>
        <p>
          When both tiers fail the response still carries the original placeholder. A missing
          thumbnail is a worse card; it is never a failed request.
        </p>
      </CaseSection>

      <CaseSection heading="Never on the critical path">
        <p>
          A request checks Redis first with a 10-minute TTL, then the database on{' '}
          <code>url_hash</code> — a generated <code>BINARY(32)</code> column holding{' '}
          <code>SHA2(url, 256)</code> under a unique index. Lookups are O(1), and because the hash
          is of the URL rather than the profile, the same link shared across two interns generates
          once.
        </p>
        <p>
          On a miss the API writes a PENDING row, enqueues a BullMQ job and returns the placeholder
          immediately. Nothing waits. The batch enqueue runs through{' '}
          <code>Promise.allSettled</code> so one bad URL cannot take its eleven neighbours down with
          it, and PENDING rows still sitting there after five minutes get re-queued, because jobs do
          get lost and a row stuck in PENDING is a card that never recovers.
        </p>
      </CaseSection>

      <CaseSection heading="Fetching URLs a stranger supplied">
        <p>
          The uncomfortable part of this design is that it makes a server fetch arbitrary
          user-supplied URLs, which is a textbook SSRF hole — point it at{' '}
          <code>169.254.169.254</code> and it will happily read cloud metadata for you.{' '}
          <code>urlValidator</code> does IP-range and DNS-level checks behind pinned safe HTTP
          agents: 125 lines of implementation against 434 lines of tests, which is the ratio a
          security boundary earns.
        </p>
        <p>
          <code>BrowserPool</code> keeps a <code>launchPromises</code> map so concurrent requests
          for the same slot await one launch instead of racing to start several. That was closed
          before it happened rather than after, which is rarer than it should be.
        </p>
      </CaseSection>

      <CaseSection heading="Where it landed">
        <p>
          <strong>95% success in production</strong>, roughly{' '}
          <strong>55% of URLs served by the cheap tier in about a second</strong>, and{' '}
          <strong>8&times; lower latency</strong> on that path than the browser fallback. The browse
          page went from mostly placeholders to mostly real previews.
        </p>
        <p>
          The frontend diff was empty, which was the point. I would revisit one thing: the service
          started as a module inside the candidates API because that was the fastest route to
          shipping, and browser instances are the kind of workload that eventually wants its own
          process and its own scaling. The seam is drawn for it; it has not needed crossing yet.
        </p>
      </CaseSection>
    </CaseStudy>
  )
}
