# Nour Badr — Personal Portfolio Design Spec

**Date:** 2026-05-26
**Owner:** Nour Badr (Front-End Engineer, Cairo)
**Status:** Awaiting user sign-off
**Project location:** `d:\Nour\profile\personal-portfolio\`

---

## 1. Purpose

A bilingual, fully-themed personal portfolio for **Nour Badr** — a front-end engineer with 4+ years across six companies, currently working in Next.js + Tailwind + shadcn/ui at Neoxero. The site serves as the destination URL on a CV, LinkedIn profile, and outbound applications.

**Primary audiences (equal weight):**
- International recruiters and engineering managers hiring remote front-end developers
- MENA (Egypt, Gulf, Levant) tech companies hiring on-site or remote

**Success criteria:**
- Lighthouse Performance ≥ 90 on mobile and desktop (looser than 95 to allow the planned motion richness)
- Lighthouse Accessibility, Best Practices, SEO ≥ 95 on both locales
- First Contentful Paint < 1.8s on 4G
- Renders correctly at 375px width and up
- Both `/en` and `/ar` routes fully functional, with correct RTL layout in Arabic
- Theme toggle persists and respects `prefers-color-scheme`
- A recruiter can reach "View work" or "Download CV" from the hero in one click
- Looks distinctly different from typical AI-generated SaaS dev portfolios

---

## 2. Brand & Positioning

### Concept

**"Editorial personal essay."** The portfolio reads like a magazine feature about Nour's craft — confident first-person voice, generous typography, scroll-paced narrative. Demonstrates front-end craft through the medium itself: typography, motion, restraint, polish.

This is intentionally **distinct from the existing Craft Crew studio portfolio** (sibling folder `../portfolio/`) which uses a Technical Mono agency-studio aesthetic with "we" voice. The personal portfolio uses **"I" voice** and editorial-magazine visual identity.

### Tone

- First-person, present-tense, confident without arrogance
- Editorial cadence: *"I build interfaces that ship and stay shipped."*
- Outcome-driven copy — percentages, user counts, time saved — not adjectives
- No buzzwords. No "passionate." No "innovative." No "I'm a developer who loves code."

### Site identity

| Field | Value |
|---|---|
| Display name | Nour Badr |
| Role | Front-End Engineer |
| Location | Cairo, Egypt |
| Email | Nourbadr4646@gmail.com |
| Phone | +20 1159347686 |
| GitHub | github.com/noureldeenn |
| LinkedIn | linkedin.com/in/nour-badr-201794155 |
| Working URL | Netlify subdomain initially (e.g. `nourbadr.netlify.app`); custom domain optional later |

---

## 3. Visual System

### Color tokens

Tokens defined as CSS custom properties; both themes share the same names with different values. Tailwind v4 reads them via `@theme`.

**Light mode**

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#FAFAF7` | Page background (warm cream, not pure white) |
| `--surface` | `#FFFFFF` | Cards, elevated surfaces |
| `--text` | `#18181B` | Primary text (deep ink) |
| `--text-muted` | `#6B6B6B` | Secondary text, metadata |
| `--rule` | `#E5E3DC` | Dividers, faint borders |
| `--accent` | `#C73E3A` | Editorial red — links, accent, single statement color |
| `--accent-soft` | `#E8D4D3` | Accent washes, subtle hover backgrounds |

**Dark mode**

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0F0F11` | Page background (rich near-black with warmth) |
| `--surface` | `#17171A` | Cards |
| `--text` | `#EDEAE3` | Primary text (warm paper) |
| `--text-muted` | `#9A9A95` | Secondary text |
| `--rule` | `#26262A` | Dividers |
| `--accent` | `#E45550` | Softer red for dark backgrounds |
| `--accent-soft` | `#3A1F1E` | Subtle washes |

Contrast verified: text-on-bg ≥ 12:1 (AAA), accent-on-bg ≥ 5:1 (AA Large) in both modes.

### Typography

| Role | English font | Arabic font | Weights | Notes |
|---|---|---|---|---|
| Display headlines | **Fraunces** (variable serif) | **Reem Kufi** | 400 / 600 / 700 | Editorial weight; signature surprise |
| Body text & UI | **Inter** | **IBM Plex Sans Arabic** | 400 / 500 / 600 | Workhorse readability |
| Metadata, code, numerals | **JetBrains Mono** | (uses Latin numerals) | 400 / 500 | Mono for technical credibility |

Loaded via `next/font/google` with `display: 'swap'`. Arabic fonts loaded conditionally based on locale to keep English-only bundles small.

### Texture & decoration

- **Background dot grid:** 1px accent dots at 4% opacity on 24px grid, fixed-position decorative layer. Subtle ripple-on-hover effect on desktop (no JS overhead — uses CSS `radial-gradient` with cursor-tracked CSS variables).
- **Section labels:** mono `[01] / SELECTED WORK` style — small tracking-wide caps, paper-dim color
- **Rules:** 1px solid `--rule`, with optional accent tick-mark at left edge for section starts
- **No drop shadows.** No glassmorphism. One carefully-tuned radial accent glow behind the home hero headline.

---

## 4. Animation & Interactivity

**Philosophy:** *Intentional motion.* Every animation must (a) demonstrate a front-end technique that recruiters notice, or (b) make content easier to absorb. No motion-spam, but no shyness.

### Home page motion inventory

| Element | Effect | Library |
|---|---|---|
| Hero headline | Word-by-word reveal, blur-to-clear filter, 700ms staggered | Motion |
| Hero subtitle + CTA | Fade-up after headline | Motion |
| Stat counters | Animate count-up when in viewport | Motion `useMotionValue` |
| Project cards | Cursor-tracking gradient spotlight; thumbnail scales; arrow translates on hover | CSS + JS for cursor pos |
| Skills grid | Staggered fade-in on scroll; subtle glow on hover | Motion |
| Companies marquee | Slow horizontal infinite scroll, pauses on hover | Pure CSS keyframes |
| Pull-quote | Letter-by-letter reveal on viewport enter | Motion |
| CTA section | Subtle animated gradient mesh background | CSS only |

### Work detail page motion

| Element | Effect | Library |
|---|---|---|
| Hero image | Clip-path reveal from bottom-up on load | GSAP (lazy-loaded) |
| Sidebar metadata | Slides in from side; sticky on scroll | Motion + CSS sticky |
| Outcome metric | Bold count-up reveal when scrolled to | Motion |
| Image gallery | Lightbox with smooth scale transition | Motion |
| Next entry card | Magnetic hover (pulls toward cursor) | Motion |

### About page motion

| Element | Effect | Library |
|---|---|---|
| Timeline | Scroll-driven progress line fills; entries fade in | GSAP ScrollTrigger (lazy) |
| Photo | Subtle parallax on scroll (max 15px translate) | CSS + Motion |

### Global cross-page motion

| Element | Effect | Library |
|---|---|---|
| Page transitions | Fade + 8px slide between routes | View Transitions API + Motion fallback |
| Theme toggle | Color crossfade across entire page | CSS transitions on tokens |
| Language toggle | Character-stagger text swap when toggling EN ↔ AR | Motion |
| Custom cursor | Dot + ring, expands on interactive elements (desktop only) | Custom hook |
| Smooth scroll | Buttery scroll feel | Lenis |
| Magnetic buttons | Primary CTAs pull toward cursor proximity | Custom hook + Motion |
| Section underline | Draws as section enters viewport | CSS + Motion |
| 404 page | Playful cursor-reactive draggable text | Motion drag |

### Reduced-motion behavior

When `prefers-reduced-motion: reduce` is set:
- All reveals replaced with instant `opacity: 1`
- Custom cursor disabled
- Lenis smooth scroll disabled (native scroll)
- Marquee paused
- Page transitions become 50ms opacity fade only
- Magnetic hover and parallax disabled

### Mobile behavior

- Custom cursor disabled (touch device detection)
- Lenis disabled (native iOS scroll is already smooth)
- Magnetic hover disabled
- All other animations preserved but with reduced amplitude

---

## 5. Internationalization

### Library

`next-intl` — chosen over `next-international` because it has the most mature App Router support and built-in middleware for locale detection.

### URL structure

```
/                    → redirects to /en (or /ar if Accept-Language matches)
/en                  → English home
/ar                  → Arabic home
/en/work/oilmz       → English case study
/ar/work/oilmz       → Arabic case study
/en/about
/ar/about
/en/contact
/ar/contact
```

### Locale detection

- On first visit: read `Accept-Language` header in middleware, redirect to matching locale (`ar` if Arabic detected, otherwise `en`)
- After: respect explicit URL choice (no auto-redirect)
- Toggle in header persists locale to `NEXT_LOCALE` cookie

### RTL handling

- Root `<html dir="rtl" lang="ar">` when locale is Arabic
- Tailwind logical properties (`ms-4`, `me-4`, `ps-6`, `pe-6`, `text-start`, `text-end`, `border-s`, `border-e`) used throughout — handles flip automatically
- Flex/grid direction relies on document direction
- Icons (arrows, chevrons) flip via CSS `transform: scaleX(-1)` in RTL contexts
- Numbers stay Latin (Western Arabic numerals) even in Arabic locale for technical/metric clarity

### Content storage

**Static strings** (nav labels, buttons, section headings) in JSON:
```
messages/
  en.json
  ar.json
```

**Case study content** as parallel MDX files:
```
content/work/
  oilmz.en.mdx
  oilmz.ar.mdx
  syft-gg.en.mdx
  syft-gg.ar.mdx
  ...
```

**Long-form page content** (about, etc.) as parallel MDX files:
```
content/pages/
  about.en.mdx
  about.ar.mdx
```

### Translation workflow

1. Write all English content first
2. Generate Arabic translations using AI (Claude/GPT) as first draft
3. User reviews each Arabic translation, fixes awkward phrasing
4. Both languages are first-class — neither is the "translation"

---

## 6. Theme

### Library

`next-themes` — handles SSR flicker, system preference, persistence in localStorage, and DOM class injection.

### Toggle behavior

- Header icon: sun/moon based on current theme
- Click cycles `light → dark → system` (or just toggle if preferred)
- Default: `system` preference
- Persists in localStorage as `theme`

### Implementation

- `<html className={theme}>` controlled by next-themes
- All color tokens defined under `:root` and `.dark` selectors in `globals.css`
- Components use Tailwind semantic classes (`bg-bg`, `text-text`, `border-rule`) — no `dark:` variants needed

---

## 7. Page Architecture

### `/[locale]` Home

Single column, max-width 1280px, generous horizontal padding (5vw mobile, 8vw desktop).

| Section | Content |
|---|---|
| **Header (sticky)** | Logo (`Nour Badr`) · nav (`work`, `about`, `contact`) · theme toggle · language toggle (`EN | عر`) |
| **Hero** | Kicker `[FRONT-END / SINCE 2020]`; animated headline "I build interfaces that ship and stay shipped."; one-sentence sub; CTAs (`View work →` + `Download CV ↓`) |
| **Selected works** | `[01] SELECTED WORKS`; 4 featured projects as numbered editorial entries (numbered 01–04). Each: thumbnail, project name, year, 1-line outcome, tags, "Read entry →" link |
| **About strip** | `[02] ABOUT`; portrait photo (or stylized geometric placeholder); 2-paragraph bio; 4 stat counters (Years: 4+, Companies: 6, Projects shipped: 30+, Languages: 2) |
| **Skills** | `[03] SKILLS`; grouped in 4 columns — Frameworks, Styling, State, APIs — each with chip tags |
| **More work** | `[04] MORE WORK`; grid of 6 additional projects, each: logo/thumbnail, name, year, stack tags, outcome line, live link if available |
| **Pull-quote** | Editorial serif line, centered, accent quotation marks: *"Code is the medium. The interface is the message."* |
| **Companies marquee** | Slow horizontal scroll of company names where Nour shipped work |
| **CTA** | Big serif headline "Let's build something" + primary button "Get in touch →" linking to /contact |
| **Footer** | 3 columns: contact, site, languages/socials |

### `/[locale]/work/[slug]` Case study detail

Two-column on desktop (content 65% / sticky sidebar 35%), single column on mobile.

| Section | Content |
|---|---|
| **Header strip** | `← BACK TO INDEX` (locale-aware); `[ENTRY 0X / YEAR]` numeral; project title |
| **Hero image** | Full-width screenshot, clip-path reveal animation |
| **Sticky sidebar** | Client, Year, Duration, Role, Stack list, Live URL (if available), GitHub link (if applicable) |
| **Overview** | 1-paragraph summary |
| **The problem** | 2-paragraph context |
| **My role** | What Nour specifically did (vs the rest of the team) |
| **Approach** | 4-6 bullets describing the build |
| **Outcome** | Big animated metric in accent color; supporting paragraph |
| **Gallery** | 2-4 supporting screenshots in a lightbox-enabled grid |
| **Next entry** | Card with magnetic hover, linking to next case study |

### `/[locale]/about`

| Section | Content |
|---|---|
| **Hero** | Portrait photo (left/right based on locale); name + headline "Front-end engineer building interfaces since 2020" |
| **Long bio** | 3-paragraph personal narrative — how started, what shaped the career, what's interesting now |
| **Timeline** | Vertical timeline with scroll-driven progress line; one entry per company (Neoxero → Atech → Perfect Touch → Smartivemedia → Alefsoftware → Syft.la); each: dates, role, 1-line description |
| **Education** | 3 entries: Microverse, Coursera, Helwan University (Mechatronics) |
| **Tools I reach for** | Categorized chip grid: editor, terminal, design, productivity |
| **Outside work** | 1 paragraph — personality, side interests (kept lightly professional) |
| **CTA** | "Reach out →" linking to /contact |

### `/[locale]/contact`

| Section | Content |
|---|---|
| **Header** | "Let's talk" headline + 1-line "I respond within 24 hours" |
| **Direct contact** | Email (mailto link), LinkedIn, GitHub, phone (international format) — each as large clickable rows |
| **Cal.com embed** | Embedded 15-min intro booking — lazy-loaded on intent (button reveal) |
| **Quick note** | "Open to: remote roles, MENA on-site, contract work, paid side projects" |

### `/[locale]/not-found`

| Section | Content |
|---|---|
| **404 marker** | `[404 / NOT FOUND]` |
| **Headline** | "This page doesn't exist." with a draggable last word (motion drag, snaps back) |
| **Link home** | "← Back to home" |

---

## 8. Project Showcase Strategy

### Featured case studies (4)

Each gets a full `/work/[slug]` MDX page in both languages.

1. **Neoxero / Zid Store (`zid-store-apps`)** — current. React app customization for Zid Store platform; Tailwind + shadcn/ui design system; +30% load speed; Redux Toolkit integration cutting API errors 20%.
2. **Syft.gg Marketplace (`syft-gg-marketplace`)** — Syft.la, 2020–2021. Marketplace reaching 50k+ gamers and brands; GraphQL + Storybook + Chakra + MobX. Plus App.syft.la social platform linking influencers/campaigns, +60% ad reach.
3. **Craft Crew — LMS (`craft-crew-lms`)** — NEW, not on CV. Learning Management System project. Details pending from user.
4. **Vertex — Radio App (`vertex-radio`)** — NEW, not on CV. Radio app. Details pending from user.

### "More work" grid (6 entries, from CV)

Shown on home page only. No detail pages.

1. Oilmz
2. Sattec
3. Lighting Address
4. Almutlaq Furnitures
5. Silverback
6. Ejaz Homes

(Alefsoftware, App.syft.la rolled into the case studies above as supporting context; remaining grid items pulled from CV project links list.)

Each grid item: small logo or screenshot, name, year, 2-3 stack tags, 1-line outcome, optional live link.

### Live URLs

Mixed availability ("some live, some private"). For each project, the data structure has `liveUrl: string | null`. When `null`, display a `[PRIVATE]` badge instead of a "View live" link.

### Data Nour still needs to provide

- For **Craft Crew LMS**: years, role, stack, problem, 2-3 outcomes, live URL
- For **Vertex Radio**: years, role, stack, problem, 2-3 outcomes, live URL
- Live URLs (where public) for all 9 CV projects
- 1 professional headshot photo

---

## 9. Content Strategy

### MDX frontmatter schema (case studies)

```mdx
---
slug: "zid-store-apps"
title: "Zid Store App Customizations"
client: "Neoxero"
year: "2024–present"
role: "Front-End Developer"
duration: "ongoing"
stack: ["React", "Tailwind", "shadcn/ui", "Redux Toolkit", "TypeScript"]
outcome: "+30%"
outcomeLabel: "load speed improvement"
liveUrl: null
heroImage: "/work/zid-store/hero.png"
gallery: ["/work/zid-store/01.png", "/work/zid-store/02.png"]
tags: ["E-commerce", "Performance"]
summary: "Customized React applications for the Zid Store platform, building a consistent design system with Tailwind and shadcn/ui that cut UI inconsistencies 40%."
---

[Markdown body with Overview / Problem / My Role / Approach / Outcome sections]
```

Validated at build time with a Zod schema in `lib/work.ts`. Build fails on missing required fields.

### Static UI strings

`messages/en.json` and `messages/ar.json` — namespaced by component for clarity:

```json
{
  "nav": { "work": "Work", "about": "About", "contact": "Contact" },
  "hero": { "kicker": "...", "headline": "...", "sub": "...", "ctaWork": "...", "ctaCV": "..." },
  "skills": { "frameworks": "Frameworks", "styling": "Styling", "state": "State Management", "apis": "APIs" },
  ...
}
```

Loaded via `useTranslations()` from next-intl.

### CV download

PDF of CV stored at `/public/nour-badr-cv.pdf` (uses the file the user already provided). Downloaded with the "Download CV ↓" button.

---

## 10. Technical Architecture

### Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 15** (App Router, RSC by default) | |
| Language | **TypeScript** (strict mode) | |
| Styling | **Tailwind CSS v4** (`@theme` + logical properties) | |
| Components | **shadcn/ui** primitives (Button, Card, Dialog) | Heavily restyled |
| Animation | **Motion** (Framer Motion) | Core animation lib |
| Advanced anim | **GSAP** + ScrollTrigger | Lazy-loaded; clip-path reveals, scroll-driven timeline |
| Smooth scroll | **Lenis** | ~3KB, desktop only |
| i18n | **next-intl** | App Router-native, SSG-friendly |
| Theme | **next-themes** | SSR-flicker-free |
| Content | **MDX** via `@next/mdx` | Per-locale files |
| Schema validation | **Zod** | Validates frontmatter at build |
| Fonts | **next/font** (Google) | Fraunces, Inter, Reem Kufi, IBM Plex Sans Arabic, JetBrains Mono |
| Forms | Native HTML + server actions | No Formik |
| Booking | Cal.com embed | Lazy-loaded |
| Deploy | **Netlify** free tier + `@netlify/plugin-nextjs` | |
| Analytics | None v1 | Optional Plausible later |

### Project layout

```
personal-portfolio/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx              # Locale-aware layout with i18n provider
│   │   ├── page.tsx                # Home
│   │   ├── work/
│   │   │   └── [slug]/page.tsx     # Case study detail
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   └── not-found.tsx
│   ├── globals.css                 # Tailwind + tokens (light + dark)
│   └── layout.tsx                  # Root layout (theme provider, fonts)
├── components/
│   ├── site/
│   │   ├── header.tsx              # Nav + theme toggle + lang toggle
│   │   ├── footer.tsx
│   │   ├── hero.tsx                # Client: animated headline
│   │   ├── case-card.tsx
│   │   ├── grid-card.tsx           # "More work" grid cell
│   │   ├── about-strip.tsx
│   │   ├── skills-grid.tsx
│   │   ├── pull-quote.tsx
│   │   ├── companies-marquee.tsx
│   │   ├── cta-block.tsx
│   │   ├── theme-toggle.tsx
│   │   └── language-toggle.tsx
│   ├── work/
│   │   ├── sidebar-meta.tsx        # Sticky case study sidebar
│   │   ├── outcome-metric.tsx      # Animated count-up
│   │   ├── gallery.tsx             # Lightbox-enabled
│   │   └── next-entry.tsx          # Magnetic hover card
│   ├── about/
│   │   └── timeline.tsx            # Scroll-driven timeline
│   ├── ui/                          # shadcn primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── dialog.tsx
│   ├── motion/
│   │   ├── custom-cursor.tsx
│   │   ├── lenis-provider.tsx
│   │   ├── magnetic.tsx            # Hook + wrapper
│   │   └── reveal.tsx              # Scroll-reveal wrapper
│   └── decorative/
│       └── dot-grid.tsx            # Cursor-reactive bg
├── content/
│   ├── work/
│   │   ├── zid-store-apps.en.mdx
│   │   ├── zid-store-apps.ar.mdx
│   │   ├── syft-gg-marketplace.en.mdx
│   │   ├── syft-gg-marketplace.ar.mdx
│   │   ├── craft-crew-lms.en.mdx
│   │   ├── craft-crew-lms.ar.mdx
│   │   ├── vertex-radio.en.mdx
│   │   └── vertex-radio.ar.mdx
│   └── pages/
│       ├── about.en.mdx
│       └── about.ar.mdx
├── messages/
│   ├── en.json
│   └── ar.json
├── lib/
│   ├── work.ts                     # MDX loader, Zod schema, locale-aware
│   ├── meta.ts                     # Site identity, social URLs
│   ├── grid-projects.ts            # The 6 "more work" entries
│   └── i18n/
│       ├── routing.ts              # next-intl routing config
│       └── request.ts              # Server-side message loading
├── middleware.ts                   # next-intl middleware for locale routing
├── public/
│   ├── work/                       # Project screenshots
│   ├── about/                      # Headshot
│   ├── nour-badr-cv.pdf            # Downloadable CV
│   └── og.png                      # OG image
├── mdx-components.tsx
├── netlify.toml
├── next.config.mjs
├── postcss.config.mjs
├── tailwind.config.ts              # Tailwind v4 still uses minimal config
├── tsconfig.json
├── package.json
└── README.md
```

### Component boundaries

- **All page sections default to server components.** Only animation-bearing leaves (hero, custom cursor, lenis provider, theme toggle, language toggle, magnetic wrappers) are client components.
- **Content loading:** `lib/work.ts` exposes `getCaseStudy(slug, locale)` and `getAllCaseStudies(locale)`. MDX content is statically imported per slug+locale; frontmatter validated via Zod.
- **i18n provider:** Wraps the `[locale]` layout with `NextIntlClientProvider`, passing only the messages each tree needs (no full message bundle in client by default).
- **Theme provider:** `<ThemeProvider>` from `next-themes` lives in root layout outside the locale boundary.
- **Lenis provider:** Mounted once in root layout; auto-disabled on touch and reduced-motion.

### Build-time concerns

- `generateStaticParams` generates routes for both locales × all case study slugs
- All images use `next/image` with explicit width/height
- Hero image gets `priority` + `fetchPriority="high"`
- OG image is static (generated once, stored in `/public/og.png`)
- Sitemap generated at build via `next-sitemap` covering both locales

---

## 11. Performance Budget

| Metric | Target |
|---|---|
| LCP (mobile) | < 1.8s |
| TBT | < 250ms |
| CLS | < 0.05 |
| Home JS shipped (initial route) | < 120KB gzipped |
| Home CSS shipped | < 20KB gzipped |
| Hero image | WebP/AVIF, < 90KB, `priority` |
| Font preload | Only Fraunces + Inter on initial load; Arabic fonts loaded only on `/ar` |
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse Best Practices | ≥ 95 |
| Lighthouse SEO | ≥ 95 |

GSAP and Lenis are lazy-loaded via `dynamic(() => import(...), { ssr: false })` and only on routes that need them.

---

## 12. Accessibility

- All interactive elements keyboard-navigable; visible focus rings (2px accent outline, 3px offset)
- Skip-to-content link in header
- Color contrast verified AAA for text, AA Large for accents
- Hero animation respects `prefers-reduced-motion` (instant reveal, no stagger)
- Custom cursor and Lenis fully disabled with `prefers-reduced-motion: reduce`
- All images have meaningful `alt`; decorative images use `alt=""` + `aria-hidden`
- Heading hierarchy strict: `h1` per page, no skipping levels
- `<html lang>` updates per locale; `dir="rtl"` for Arabic
- Form inputs (contact) have explicit `<label>` associations
- Cal.com embed has accessible iframe title
- Color is never the sole carrier of information

---

## 13. SEO & Meta

- Per-page `title` and `description` via Next.js Metadata API, localized
- Open Graph image (1200×630, generated once, stored in `/public/og.png`)
- Twitter card metadata
- `robots.txt` allows all
- `sitemap.xml` auto-generated covering both locales
- `hreflang` tags on each page declaring `en` and `ar` alternates
- Structured data: `Person` JSON-LD on home, `Article` JSON-LD on case studies
- Canonical URLs set per locale
- 404 page returns proper 404 status

---

## 14. Deployment

### Netlify config (`netlify.toml`)

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[redirects]]
  from = "/"
  to = "/en"
  status = 302
  conditions = {Language = ["en"]}
```

(Middleware handles smarter language detection; redirect is the fallback.)

### Deploy flow

1. Initialize git inside `personal-portfolio/`
2. Push to a private GitHub repo
3. Connect to Netlify — auto-detects Next.js + installs the plugin
4. Free Netlify subdomain (e.g. `nour-badr.netlify.app`) initially
5. Optional later: connect a custom domain

### Environment variables

None required v1. Cal.com link is hardcoded.

---

## 15. Out of Scope (Explicitly NOT v1)

- Blog or writing section (kept as future v2 if Nour wants to write technical posts)
- Newsletter signup
- Analytics dashboard (only consider Plausible if traffic justifies)
- Contact form with submission backend (Cal.com + mailto cover all "talk to me" intents)
- CMS — MDX files are the CMS
- Dynamic theming beyond light/dark
- Storybook / component library deployment
- Tests (visual regression + e2e are valuable but not blocking launch)
- Custom 404 illustrations beyond the draggable text effect
- PDF generation from MDX (CV is a manually-maintained PDF)

---

## 16. Risks & Tradeoffs

| Risk | Mitigation |
|---|---|
| Motion-rich design tanks Lighthouse Performance | Lazy-load GSAP/Lenis; GPU-only properties; mobile-lite mode; budget allows 90, not 95 |
| AI-translated Arabic sounds machine-generated | User reviews every Arabic string; AI is first draft only; native review before launch |
| Custom cursor breaks unexpected interactions | Auto-disabled on touch, reduced-motion, and on form inputs |
| RTL layout breaks in untested edge cases | Manual QA pass on every page in Arabic; logical properties handle 95% automatically |
| Two new case studies (Craft Crew LMS, Vertex Radio) blocked on user data | Build infrastructure first with placeholder MDX files; swap in real content when provided |
| MDX bundle size grows with 8 case study files (4 × 2 locales) | Each MDX is its own dynamic chunk; only the requested slug+locale is loaded |
| Netlify free tier cold starts on first request | Acceptable for portfolio traffic; migrate to Vercel free or self-hosted if it bites |
| Custom domain not bought yet | Ship on Netlify subdomain; add domain post-launch with zero code changes |

---

## 17. Build Sequence

1. Scaffold Next.js 15 + TS + Tailwind v4 + ESLint in `personal-portfolio/`
2. Install deps: shadcn/ui, motion, gsap, lenis, next-intl, next-themes, next-mdx, zod, next-sitemap
3. Configure fonts (next/font) and global tokens (light + dark, EN + AR)
4. Set up i18n: middleware, routing config, `messages/{en,ar}.json` skeletons
5. Set up theme provider + theme toggle + language toggle components
6. Build layout shell: root layout, locale layout, header, footer, dot grid
7. Build motion primitives: Lenis provider, custom cursor, magnetic wrapper, reveal wrapper
8. Build home page sections top-down: Hero → Selected Works → About strip → Skills → More Work grid → Pull-quote → Companies marquee → CTA
9. Build `/work/[slug]` template + MDX loader + Zod schema
10. Build `/about` (long-form MDX + timeline)
11. Build `/contact` (direct contact rows + Cal.com lazy embed)
12. Build `/not-found` (interactive 404)
13. Author 4 English case study MDX files (placeholder content for Craft Crew LMS / Vertex Radio until user provides data)
14. Author about page MDX (English)
15. Generate Arabic translations for all content; user reviews
16. Add headshot + project screenshots
17. Performance pass: Lighthouse, fix anything < target
18. Accessibility pass: keyboard, screen reader, reduced-motion verification
19. RTL pass: full QA on every page in Arabic
20. Netlify config + README; deploy

---

## 18. Sign-off

Awaiting user approval. After sign-off:
- Spec self-review is final
- Implementation plan generated via `writing-plans` skill
- Then implementation begins

Estimated work to deployable site: ~6–8 focused hours, plus user content gathering for the 2 new case studies and Arabic review.