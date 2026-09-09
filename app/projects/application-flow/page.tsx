import type { Metadata } from 'next'
import Link from 'next/link'

import { CaseSection, CaseStudy } from '@/components/case-study'
import { projects } from '@/content/projects'
import { SaveFlowDiagram } from '@/components/save-flow-diagram'
import { StepOrderExplorer } from '@/components/step-order-explorer'

export const metadata: Metadata = {
  title: 'Application Flow',
  description:
    'Draft persistence for an internship application that is 5–8 steps long depending on batch config — three write paths into one debounced save, 15 per-step draft keys, and a hydration model that fills blanks but never corrects them.',
}

/**
 * Grouped rather than one flat row: the outcome figures belong to the project,
 * the system figures are the thing being described, and the last group is the
 * honest scope. Mixing them made a reader do that separation themselves.
 */
const GROUPS: { title: string; facts: { k: string; v: string; note?: string }[] }[] = [
  {
    title: 'Outcome',
    facts: [
      { k: 'Time to apply', v: '28 → 12 min', note: '57% faster' },
      { k: 'Completion rate', v: '+24%' },
      { k: 'Drop-off', v: '−31%' },
    ],
  },
  {
    title: 'System',
    facts: [
      { k: 'Steps', v: '5–8', note: '4 orders pre-generated' },
      { k: 'Write paths', v: '3 → 1', note: 'collapsed by one debounce' },
      { k: 'API debounce', v: '5s', note: 'plus a 1s idle poll' },
      { k: 'Draft keys', v: '15', note: 'per step · 24h TTL' },
      { k: 'Persistence layer', v: '573 lines', note: '6 files · 72 test cases' },
      { k: 'Whole flow', v: '21k lines', note: '533 test cases · 68 events' },
    ],
  },
  {
    title: 'Scope',
    facts: [
      { k: 'My commits', v: '123 / 286', note: 'a plurality, not a majority' },
      { k: 'Engineers', v: '9', note: 'across the flow' },
      { k: 'Persistence layer', v: 'all mine', note: 'and its 3 post-launch fixes' },
    ],
  },
]

/** Read from content so the card and this page cannot show different titles. */
const PROJECT = projects.find((p) => p.id === 'application-flow')!

export default function ApplicationFlowPage() {
  return (
    <CaseStudy
      context="Virtual Internships · 2025–26"
      title={PROJECT.headline ?? PROJECT.title}
      pair={{ was: '28 min', now: '12 min', label: 'Time to apply' }}
      lede="Two releases, not one. The redesigned flow shipped over five weeks in Aug–Sep 2025; the persistence layer that stopped it losing drafts landed six months later, and that layer is mine end to end."
    >
      <CaseSection heading="By the numbers">
        <div className="flex flex-col gap-8">
          {GROUPS.map((g) => (
            <div key={g.title} className="flex flex-col gap-4">
              <p className="label border-b border-rule pb-2 text-[0.58rem] text-muted">{g.title}</p>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
                {g.facts.map((f) => (
                  <div key={f.k} className="flex flex-col gap-1">
                    <dt className="label text-[0.56rem] text-muted">{f.k}</dt>
                    <dd className="display text-[1.5rem] tabular-nums leading-none text-ink">
                      {f.v}
                    </dd>
                    {f.note && <dd className="text-[0.74rem] text-muted">{f.note}</dd>}
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <p>
          The outcome figures were measured on the design side. The flow&rsquo;s own instrumentation
          cannot break them down by step — the failure events for steps two through four are
          declared and never fired.
        </p>
      </CaseSection>

      <CaseSection heading="Step count is configuration">
        <p>
          Five steps are always present; three splice in from batch config. So the flow is five to
          eight steps long and four orders are pre-generated rather than derived per render.
        </p>
        <StepOrderExplorer />
        <p>
          Each step is its own route and its own lazily-loaded page, so position is computed against
          the visible order rather than stored. That is what makes the back button, a refresh and a
          shared link all land on the step you were actually on — and it is a precondition for
          drafts being recoverable at all, since a restored draft is useless if reaching it means
          walking forward through four screens.
        </p>
      </CaseSection>

      <CaseSection heading="Three writers, one debounce">
        <SaveFlowDiagram />
        <p>
          Drafts are keyed per step, not per application —{' '}
          <code>app_autosave_draft_&#123;uuid&#125;_&#123;stepKey&#125;</code> — because each step is
          a separate route with its own form instance. There is no moment when the whole
          application is in memory at once.
        </p>
      </CaseSection>

      <CaseSection heading="The draft fills blanks, it never corrects them">
        <p>
          Hydration runs once per mount and writes a draft value only into fields that are currently
          empty, so the server always wins. Safe by default — a stale draft cannot clobber saved
          data — but narrower than it looks.
        </p>
        <p>
          A <code>mergeWithServerData</code> function exists that compares timestamps and prefers
          the newer side. It is dead code, and it would not have worked: the merge spreads server
          keys last, so server values overwrite local ones on the exact branch meant to prefer
          local. Two tabs on one step also share a key with no versioning and no storage listener —
          last writer wins, silently.
        </p>
      </CaseSection>

      <CaseSection heading="Credit">
        <p>
          The designer owned structure, research and visuals. The résumé parser and its field
          pre-fill were started before my first commit here and built by other developers — I integrated and hardened its output, and added custom-skill
          entry. The persistence layer, the step shell and the validation integration are mine.
        </p>
        <p>
          The profile this feeds is separate work:{' '}
          <Link href="/projects/intern-profile-package">fe-intern-profile</Link>.
        </p>
      </CaseSection>
    </CaseStudy>
  )
}
