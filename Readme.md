# prajwalbhatia.com

Personal site for Prajwal Bhatia — Senior Software Engineer (Frontend Heavy),
SDE-3 at Virtual Internships.

The home page is a working demo of the thing being hired for: a scrubbable
timeline that replays four real before/after changes. Everything else — case
studies, roles, endorsements, résumé — hangs off that.

**Next.js 16 · React 19 · TypeScript · Tailwind 4 · Netlify**

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

| script | |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | production build |
| `npm run start` | serve the production build |
| `npm run typecheck` | `tsc --noEmit` |

### Environment

```bash
cp .env.example .env.local
```

One variable, `YOUTUBE_API_KEY` — a YouTube Data API v3 key.

**Without it the build still succeeds** and the Explainers section silently
disappears, along with its nav item and sitemap entry. That is deliberate (see
_Rules_ below) but it means a missing key looks like a design choice rather than
an error. Set it in Netlify before the first deploy.

---

## How this is organised

The important idea: **`content/` is the single source of truth, and it is
typed.** Pages read from it and render; they hold no facts of their own. A
figure lives in exactly one place, so `/`, `/work` and `/resume` cannot drift
apart the way the old site's copies did.

```
content/          the facts — edit these, not the pages
  profile.ts      name, title, contact, socials, education, awards
  experience.ts   roles + highlights, and the engineering-practice pairs
  projects.ts     every project; HOME_IDS picks the four on the home page
  instrument.ts   the four home-page demos, as pure functions of scrub position
  kind-words.ts   endorsements (screenshots + verbatim transcriptions)
  explainers.ts   YouTube channel handle and limits — no video data
  skills.ts       stack chips and the résumé skill groups

lib/              things that compute
  youtube.ts      Data API v3 fetch; returns [] on any failure
  kind-words.ts   resolves endorsements against files in public/, reads image
                  dimensions from the PNG/JPEG headers at build time
  tenure.ts       role dates -> the tenure bars on /work
  rich.tsx        renders **bold** inside content strings, no markdown dep

components/       presentation only
app/              routes
```

### Routes

| route | |
|---|---|
| `/` | hero, the instrument, selected work, explainers, contact |
| `/work` | full project index with tag filter, roles, engineering practice |
| `/projects/<slug>` | case studies |
| `/resume` | résumé, with a PDF download |
| `/kind-words` | endorsements — **404s when there are none** |
| `/explainers` | Shorts archive — **404s without a YouTube key** |

`/projects` redirects to `/work`; the two had become the same page.

---

## Editing content

**Add a project.** Append to `projects` in `content/projects.ts`. Give it
`tags` (the first one drives the `/work` filter), a `problem`, and `tech`. Add
`pair` only if you have a genuine measured before **and** after. Create
`app/projects/<slug>/page.tsx` using the `CaseStudy` shell, and add the route to
`app/sitemap.ts`.

**Change what the home page features.** Edit `HOME_IDS` in
`content/projects.ts`. It throws at build time on an unknown id rather than
silently dropping a card — this has already caught one mistake.

**Add an endorsement.** Screenshot it, save to `public/kind-words/`, add an
entry to `content/kind-words.ts`. `alt` must be a **verbatim transcription**, not
a summary — that is what a screen reader gets. An entry whose file is missing is
dropped at build time, so it is safe to write the entry first.

**Update the résumé PDF.** Replace `public/prajwal-bhatia-resume.pdf`. It is
maintained by hand, so it will drift from `/resume` unless you re-export when
content changes. The previous one still claimed "6.5+ years" and listed Kafka
long after the site had corrected both.

---

## Rules

These encode decisions that took a while to arrive at. Undoing one by accident
is easy; each has a reason.

**Never invent a number.** Every figure on the site traces to something
measured. Where there is no honest number, no number is shown — see the signup
funnel and partner landing case studies, which say so explicitly rather than
leaving the absence to read as modesty. Two figures are labelled in code as
approximate: the thumbnail demo's card proportions, and `3+` calls, which is a
floor rather than a count. `WorkFilter` suppresses a derived percentage for
values containing `+ ~ < >`, because "−67%" from an approximation invents
precision the source never had.

**Two accent colours mean one thing each.** `--color-was` (orange) is the
before; `--color-now` (green) is the after. Never emphasis, links, hover or
decoration. A section with no genuine before gets no accent at all. The moment
orange means "look here", the system stops signalling.

**The text scale is contrast-tested.** `ink` 14.8:1 for headings, `body` 11:1
for prose, `muted` 7:1 for dates and captions, `dim` for non-text indicators
only — it sits at 3.4:1 and must never carry words. A designer caught body copy
at 5.26:1 that passed every automated audit; the WCAG floor is a floor, not a
target.

**Content renders without JavaScript.** The instrument, the work detail panel
and the explainer rail all server-render complete. JS only enhances — the
scrubber, the filter, copy-to-clipboard. A portfolio whose content needs JS is a
bug on an engineer's site specifically.

**Missing data means no section, never a placeholder.** No API key, no
Explainers. No screenshots, no Kind Words. Inventing testimonials or video
titles is the one failure mode with a real cost.

**Dark only, deliberately.** The instrument panels read as screens; a light
inversion would turn them into paper.

**No new runtime dependencies.** Ships `next`, `react`, `react-dom` and nothing
else. Two self-hosted latin-subset woff2 faces, no font CDN — a site whose home
page is a performance demo should not put a third party on its critical path.

---

## Deployment

Netlify, from `main`. `netlify.toml` sets the build command, publish directory
and Node 22, and overrides the UI settings, which still describe the old webpack
site.

Pages carry a 6-hour revalidate so new Shorts appear without a rebuild.

**`.next/` cannot be dragged and dropped.** It needs the Netlify Next runtime —
the site uses ISR, `next/image` optimisation and a server redirect.

If a replaced image still shows the old version after a deploy, clear the build
cache; Next's image optimiser keys on the URL, not the file contents.

---

## Verifying a change

```bash
npm run build && npm run start
npx lighthouse http://localhost:3000/ --preset=desktop --view
```

The bar is **100 across all four categories on desktop** for every page. Mobile
sits at 96–97 on performance under simulated slow-4G, 100 elsewhere, CLS 0.

Worth checking by hand, because Lighthouse will not: that the page still reads
with JavaScript disabled, and that heading order has one `h1` and no skipped
levels.

---

## On the filename

This file is `Readme.md`, not `README.md`. macOS is case-insensitive while git
is not, so creating the other spelling deletes this one on disk while git
carries on tracking both names. Leave it as it is.
