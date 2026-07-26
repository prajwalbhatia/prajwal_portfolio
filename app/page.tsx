import { Band } from '@/components/band'
import { Contact } from '@/components/contact'
import { Instrument } from '@/components/instrument'
import { WorkShowcase } from '@/components/work-showcase'
import { ExplainerRail } from '@/components/explainer-rail'
import { CHANNEL_HANDLE, CHANNEL_URL, HOME_EXPLAINERS, EXPLAINERS_LIMIT } from '@/content/explainers'
import { profile, yearsOfExperience } from '@/content/profile'
import { fetchExplainers } from '@/lib/youtube'

function Hero() {
  return (
    <section className="shell gutter pt-12 pb-10 sm:pt-16">
      {/* Name and role lead as a byline, not a title. Nobody has heard of the
          name yet; the claim is what earns the next ten seconds. */}
      <p className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="display text-2xl sm:text-3xl">{profile.name}</span>
        <span aria-hidden="true" className="h-4 w-px bg-rule" />
        <span className="label font-semibold text-ink">
          {profile.title} · {profile.level}
        </span>
      </p>

      <h1 className="display max-w-[17ch] text-[clamp(2.6rem,8vw,5.6rem)]">
        I own what I ship,
        <span className="text-muted"> including the part that breaks.</span>
      </h1>

      <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
        <p className="measure text-base leading-relaxed text-muted sm:text-lg">
          {yearsOfExperience()} years building React and TypeScript products, currently{' '}
          <span className="text-ink">
            {profile.level} at {profile.company}
          </span>
          . I take features from an ambiguous brief to production and stay on them afterwards — the
          P0 at 9pm, the review standard that catches it next time, the state nobody handled.
          Performance is part of that, not the whole of it.
        </p>

        {profile.openToWork && (
          <p className="label inline-flex shrink-0 items-center gap-2 rounded-full border border-now/40 px-3 py-2 text-now">
            <span aria-hidden="true" className="live-blip size-1.5 rounded-full bg-now" />
            {profile.availabilityLabel}
          </p>
        )}
      </div>
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
