# Nour Badr — Personal Portfolio

Bilingual (EN/AR), themed (light/dark), motion-rich personal portfolio built with Next.js 15, Tailwind v4, shadcn/ui, Motion, GSAP, Lenis, next-intl, and next-themes.

## Local development

```bash
npm install
npm run dev
# open http://localhost:3000 (redirects to /en)
```

## Build & start

```bash
npm run build
npm run start
```

## Adding a new case study

1. Create `content/work/<slug>.en.mdx` and `content/work/<slug>.ar.mdx`. Use an existing file as the template — every frontmatter field must be present.
2. Add `<slug>` to the `caseStudySlugs` array in [`lib/work.ts`](lib/work.ts).
3. Add hero/gallery images to `public/work/<slug>/`.
4. Build to confirm Zod validation passes.

## Adding a project to the "More Work" grid

Edit [`lib/grid-projects.ts`](lib/grid-projects.ts) — push a new `GridProject` entry.

## Editing static UI strings

[`messages/en.json`](messages/en.json) and [`messages/ar.json`](messages/ar.json) must stay in sync — both files need the same key shape.

## Deployment (Netlify)

1. Push to a GitHub repo (private or public)
2. In Netlify: New site from Git → pick the repo → leave defaults (Next.js auto-detected via `@netlify/plugin-nextjs`)
3. Free `*.netlify.app` subdomain is live within ~2 minutes
4. Custom domain: Site settings → Domain management → add domain → follow Netlify's DNS instructions

## Performance targets

- Lighthouse Performance ≥ 90 on mobile
- Accessibility, Best Practices, SEO ≥ 95
- Run `npm run build` then `npm run start` then Lighthouse locally before every push

## Pending content (placeholders shipped)

- Real project specifics + screenshots for **Craft Crew LMS** and **Vertex Radio** case studies (currently placeholder MDX)
- Real **headshot** photo at `public/about/headshot.jpg` (currently a generated placeholder)
- Real **OG image** at `public/og.png` (currently a generated placeholder)
- Live URLs for grid projects where public

## Structure

See [`docs/superpowers/specs/2026-05-26-personal-portfolio-design.md`](docs/superpowers/specs/2026-05-26-personal-portfolio-design.md) for the full design spec and [`docs/superpowers/plans/2026-05-26-personal-portfolio.md`](docs/superpowers/plans/2026-05-26-personal-portfolio.md) for the implementation plan.