# prajwalbhatia.com

Prajwal Bhatia's portfolio, built with Next.js, React, TypeScript and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

`npm run build` checks the production build; `npm run typecheck` checks TypeScript.
Set `YOUTUBE_API_KEY` in `.env.local` to show the Explainers archive. Without it,
that route and its navigation link are omitted.

## Where to edit content

- `content/profile.ts`: identity, contact links and résumé download path.
- `content/experience.ts`: employment history, work practices and measured pairs.
- `content/projects.ts`: the Work index. The homepage selects three projects in `app/page.tsx`.
- `content/skills.ts`: homepage stack and HTML résumé skills.
- `content/kind-words.ts`: attributed recommendations and screenshots.
- `app/projects/*/page.tsx`: case-study details.

The HTML résumé uses shared content. The downloadable PDF is maintained separately
at `public/prajwal-bhatia-resume.pdf`; replace it whenever the résumé changes,
then check that dates, role titles, skills and Ownfolio details still agree.

## Routes

`/` introduces the work and shows recent video explainers. `/work` lists projects and roles. `/projects/<slug>`
contains the longer case studies. `/resume` provides an accessible HTML résumé
and PDF download. `/kind-words` and `/explainers` are available when their content
is present.

`/projects` redirects to `/work`. Retired project URLs also redirect there so
existing links do not break.

## Content rules

Use numbers only when their source and meaning are clear. Describe what you
personally built and credit collaborators. Keep the index brief; put implementation
details and limitations in case studies. Update `app/sitemap.ts` when adding a route.

The site deploys from `main` on Netlify using `netlify.toml`.

This file is named `Readme.md` because the repository was created on a
case-insensitive macOS filesystem. Avoid adding a second `README.md`.
