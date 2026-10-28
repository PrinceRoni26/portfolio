# Prince Roniver Magsalos — Portfolio

Next.js (App Router) · TypeScript · Tailwind CSS · Motion · Lucide

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit your content

Everything lives in `src/data/`:

| File | What it controls |
|---|---|
| `site.ts` | Name, email, LinkedIn, **GitHub username**, site URL |
| `projects.ts` | Project cards + case studies (`/projects/[slug]`) |
| `creative.ts` | Creative gallery (graphics, reels, campaigns) |
| `experience.ts` | Career timeline (dates are plain text) |
| `skills.ts` | Skills, education, awards |

- **Resume:** replace `public/resume.pdf`. Delete it and buttons switch to "Request Resume" (email).
- **Project screenshots:** add to `public/images/projects/`, then set `image` in `projects.ts`.
- **Creative images:** `public/images/creative/` · **Videos (MP4):** `public/videos/` — see the comment at the top of `creative.ts`.
- **GitHub showcase:** set `githubUsername` in `site.ts` (the section stays hidden until you do).

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com → **Add New → Project** → import the repo → **Deploy** (no settings needed).
3. Optional environment variables (Project → Settings → Environment Variables), see `.env.example`:
   - `NEXT_PUBLIC_SITE_URL` — your final URL (for SEO and social previews)
   - `GITHUB_USERNAME`, `GITHUB_TOKEN` — GitHub showcase / higher API limits (token stays server-side)
