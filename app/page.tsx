import { Band } from '@/components/band'
import { Contact } from '@/components/contact'
import { Instrument } from '@/components/instrument'
import { WorkShowcase } from '@/components/work-showcase'
import { ExplainerRail } from '@/components/explainer-rail'
import { CHANNEL_HANDLE, CHANNEL_URL, HOME_EXPLAINERS, EXPLAINERS_LIMIT } from '@/content/explainers'
import { profile } from '@/content/profile'
import { fetchExplainers } from '@/lib/youtube'

function Hero() {
  return (
    <section className="shell gutter pt-14 pb-12 text-center sm:pt-20 sm:pb-16">
      {/* The name leads. Space Grotesk tops out at 700, so `.display-heavy`
          adds the extra weight with a hairline stroke — see globals.css. */}
      <h1 className="display display-heavy text-[clamp(2.4rem,7vw,4rem)] text-ink">
        {profile.name}
      </h1>

      <p className="label mt-3.5 text-sm font-extrabold text-ink">{profile.title}</p>

      {/* Subordinate to the name on purpose: this is the claim, but the name
          is the thing being introduced. Roughly a third of the h1's size. */}
      <p className="mx-auto mt-7 max-w-[34ch] text-xl text-body sm:text-2xl">
        {profile.tagline}
      </p>

      {/* inline-flex is inline-level, so the section's text-center centres it. */}
      {profile.openToWork && (
        <p className="label mt-8 inline-flex items-center gap-2 rounded-full border border-now/40 px-3 py-2 text-now">
          <span aria-hidden="true" className="live-blip size-1.5 rounded-full bg-now" />
          {profile.availabilityLabel}
        </p>
      )}
    </section>
  )
}

export default async function HomePage() {
  // Empty unless YOUTUBE_API_KEY is set. No key, no section — never invented titles.
  const explainers = (await fetchExplainers(CHANNEL_HANDLE, EXPLAINERS_LIMIT)).slice(0, HOME_EXPLAINERS)

  return (
    <>
      <Hero />
      <Instrument />
      <WorkShowcase />

      {explainers.length > 0 && (
        <Band title="I explain this stuff in sixty seconds" action="Watch the channel" actionHref={CHANNEL_URL}>
          <ExplainerRail explainers={explainers} />
        </Band>
      )}

      <Contact />
    </>
  )
}
