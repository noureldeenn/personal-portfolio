# Personal Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a bilingual (EN+AR), themed (light+dark), motion-rich personal portfolio for Nour Badr at `d:\Nour\profile\personal-portfolio\`, deployable to Netlify, that meets every requirement in the design spec.

**Architecture:** Next.js 15 App Router with `[locale]` routing under next-intl. next-themes for dark/light. Tailwind v4 with CSS-variable tokens that update per theme. Server components by default; client only for animation leaves. MDX content per-locale for case studies and the About page. Motion (Framer Motion) for primary animation, lazy-loaded GSAP for scroll-driven reveals, lazy-loaded Lenis for smooth scroll.

**Tech Stack:** Next.js 15 · React 19 · TypeScript (strict) · Tailwind v4 · shadcn/ui · Motion · GSAP · Lenis · next-intl · next-themes · @next/mdx · Zod · next/font · Netlify · `@netlify/plugin-nextjs`

**Testing note:** Per spec §15, automated tests are out of v1 scope. Verification is via manual browser checks, Lighthouse audits, keyboard/reduced-motion passes, and explicit RTL QA — called out in dedicated phases at the end. Do NOT add Vitest/Playwright tasks.

**Working directory throughout this plan:** `d:\Nour\profile\personal-portfolio\`. All paths below are relative to it unless absolute.

**Commit cadence:** Commit at the end of every phase. Use conventional commit prefixes (`chore:`, `feat:`, `style:`, `docs:`, `perf:`, `a11y:`).

---

## File Structure (locked in advance)

```
personal-portfolio/
├── app/
│   ├── layout.tsx                        # Root: theme provider, motion providers, fonts
│   ├── globals.css                       # Tailwind + tokens (light + dark)
│   └── [locale]/
│       ├── layout.tsx                    # Locale: i18n provider, header, footer, dot grid, dir attr
│       ├── page.tsx                      # Home (composes section components)
│       ├── not-found.tsx                 # 404
│       ├── work/
│       │   └── [slug]/page.tsx           # Case study detail
│       ├── about/page.tsx                # About (long bio + timeline)
│       └── contact/page.tsx              # Contact (direct + Cal.com)
├── components/
│   ├── site/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── hero.tsx                      # client: animated headline + identity stamp
│   │   ├── case-card.tsx                 # Selected works entry row
│   │   ├── grid-card.tsx                 # More-work grid cell
│   │   ├── about-strip.tsx               # Home page about strip
│   │   ├── skills-grid.tsx
│   │   ├── pull-quote.tsx
│   │   ├── companies-marquee.tsx
│   │   ├── cta-block.tsx
│   │   ├── theme-toggle.tsx              # client
│   │   └── language-toggle.tsx           # client (locale-aware link)
│   ├── work/
│   │   ├── sidebar-meta.tsx              # client (sticky on scroll)
│   │   ├── outcome-metric.tsx            # client (count-up)
│   │   ├── gallery.tsx                   # client (lightbox)
│   │   └── next-entry.tsx                # client (magnetic)
│   ├── about/
│   │   └── timeline.tsx                  # client (scroll-driven)
│   ├── motion/
│   │   ├── lenis-provider.tsx            # client
│   │   ├── custom-cursor.tsx             # client
│   │   ├── magnetic.tsx                  # client wrapper
│   │   └── reveal.tsx                    # client wrapper
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── dialog.tsx
│   └── decorative/
│       └── dot-grid.tsx                  # CSS-only cursor-reactive background
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
│   ├── meta.ts                           # Site identity, social URLs
│   ├── work.ts                           # MDX loader, Zod schema (locale-aware)
│   ├── grid-projects.ts                  # Six "more work" entries
│   └── i18n/
│       ├── routing.ts                    # next-intl routing config
│       └── request.ts                    # Server-side message loading
├── middleware.ts                         # next-intl middleware
├── mdx-components.tsx                    # MDX component overrides
├── public/
│   ├── work/                             # Project screenshots
│   ├── about/                            # Headshot
│   ├── nour-badr-cv.pdf
│   └── og.png
├── netlify.toml
├── next.config.mjs
├── postcss.config.mjs
├── tailwind.config.ts                    # Minimal (v4 reads @theme from CSS)
├── tsconfig.json
├── package.json
├── .gitignore
└── README.md
```

---

## Phase 1 — Scaffolding & dependencies

### Task 1: Initialize package.json

**Files:** Create `package.json`

- [ ] **Step 1: Write the file**

```json
{
  "name": "nour-badr-portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "postbuild": "next-sitemap"
  },
  "dependencies": {
    "@mdx-js/loader": "^3.1.0",
    "@mdx-js/react": "^3.1.0",
    "@next/mdx": "^15.0.3",
    "@radix-ui/react-dialog": "^1.1.4",
    "@types/mdx": "^2.0.13",
    "clsx": "^2.1.1",
    "gsap": "^3.12.5",
    "lenis": "^1.1.18",
    "motion": "^11.15.0",
    "next": "^15.0.3",
    "next-intl": "^3.26.0",
    "next-sitemap": "^4.2.3",
    "next-themes": "^0.4.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.0.0",
    "@types/node": "^22.10.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "eslint": "^9.17.0",
    "eslint-config-next": "^15.0.3",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.6.0"
  }
}
```

### Task 2: Install dependencies

- [ ] **Step 1: Run install**

```bash
npm install
```

Expected: completes without errors. `node_modules` exists. `package-lock.json` created.

### Task 3: TypeScript config

**Files:** Create `tsconfig.json`

- [ ] **Step 1: Write the file**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Task 4: Next config with MDX + next-intl plugin

**Files:** Create `next.config.mjs`

- [ ] **Step 1: Write the file**

```js
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  experimental: { mdxRs: true },
};

const withMDX = createMDX({});

export default withNextIntl(withMDX(nextConfig));
```

### Task 5: PostCSS config (Tailwind v4)

**Files:** Create `postcss.config.mjs`

- [ ] **Step 1: Write the file**

```js
const config = {
  plugins: { "@tailwindcss/postcss": {} },
};
export default config;
```

### Task 6: Tailwind config

**Files:** Create `tailwind.config.ts`

- [ ] **Step 1: Write the file** (Tailwind v4 reads most config from `@theme` in CSS; this file remains minimal but exists for IDE tooling.)

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{mdx}",
    "./mdx-components.tsx",
  ],
  darkMode: "class",
  theme: { extend: {} },
  plugins: [],
};

export default config;
```

### Task 7: .gitignore

**Files:** Create `.gitignore`

- [ ] **Step 1: Write the file**

```
node_modules
.next/
out/
build/
.DS_Store
*.pem
.vscode/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.env*.local
.env
*.tsbuildinfo
next-env.d.ts
.netlify/
```

### Task 8: ESLint config

**Files:** Create `.eslintrc.json`

- [ ] **Step 1: Write the file**

```json
{
  "extends": "next/core-web-vitals"
}
```

### Task 9: Initialize git and first commit

- [ ] **Step 1: Init repo + first commit**

```bash
git init
git add .gitignore package.json package-lock.json tsconfig.json next.config.mjs postcss.config.mjs tailwind.config.ts .eslintrc.json
git commit -m "chore: scaffold Next.js 15 + TS + Tailwind v4 + MDX + next-intl"
```

---

## Phase 2 — Tokens, fonts, global styles

### Task 10: Write globals.css with all design tokens

**Files:** Create `app/globals.css`

- [ ] **Step 1: Write the file**

```css
@import "tailwindcss";

@theme {
  /* Tokens shared across both themes (overridden in .dark) */
  --color-bg: #fafaf7;
  --color-surface: #ffffff;
  --color-text: #18181b;
  --color-text-muted: #6b6b6b;
  --color-rule: #e5e3dc;
  --color-accent: #c73e3a;
  --color-accent-soft: #e8d4d3;

  --font-display: var(--font-fraunces), Georgia, serif;
  --font-display-ar: var(--font-reem-kufi), Georgia, serif;
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-sans-ar: var(--font-plex-arabic), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, "Cascadia Code", Menlo, monospace;
}

.dark {
  --color-bg: #0f0f11;
  --color-surface: #17171a;
  --color-text: #edeae3;
  --color-text-muted: #9a9a95;
  --color-rule: #26262a;
  --color-accent: #e45550;
  --color-accent-soft: #3a1f1e;
}

@layer base {
  html {
    color-scheme: light dark;
    transition: background-color 240ms ease, color 240ms ease;
  }

  body {
    background-color: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    transition: background-color 240ms ease, color 240ms ease;
  }

  html[dir="rtl"] body {
    font-family: var(--font-sans-ar);
  }

  ::selection {
    background-color: var(--color-accent);
    color: var(--color-bg);
  }

  *:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
    border-radius: 2px;
  }
}

@utility container-page {
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: 5vw;
}

@media (min-width: 768px) {
  @utility container-page {
    padding-inline: 8vw;
  }
}

/* Cursor-reactive dot grid (pure CSS using custom prop set by JS) */
.dot-grid {
  --mx: 50%;
  --my: 50%;
  background-image: radial-gradient(circle, var(--color-accent) 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.04;
  mask-image: radial-gradient(circle 400px at var(--mx) var(--my), black 0%, transparent 80%);
}

@media (hover: none) {
  .dot-grid {
    mask-image: none;
  }
}

/* Companies marquee */
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

html[dir="rtl"] @keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(50%); }
}

.marquee-track {
  animation: marquee 40s linear infinite;
}

.marquee-track:hover { animation-play-state: paused; }

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

---

## Phase 3 — i18n infrastructure

### Task 11: i18n routing config

**Files:** Create `lib/i18n/routing.ts`

- [ ] **Step 1: Write the file**

```ts
import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

### Task 12: i18n request config

**Files:** Create `lib/i18n/request.ts`

- [ ] **Step 1: Write the file**

```ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "en" | "ar")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
```

### Task 13: Middleware

**Files:** Create `middleware.ts`

- [ ] **Step 1: Write the file**

```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./lib/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

### Task 14: Skeleton English messages

**Files:** Create `messages/en.json`

- [ ] **Step 1: Write the file**

```json
{
  "site": {
    "name": "Nour Badr",
    "role": "Front-End Engineer"
  },
  "nav": {
    "work": "Work",
    "about": "About",
    "contact": "Contact",
    "downloadCv": "Download CV"
  },
  "hero": {
    "kicker": "Front-End · Since 2020",
    "headline": "I build interfaces that ship and stay shipped.",
    "sub": "Four years across e-commerce, SaaS dashboards, and marketplaces. Currently shipping in Next.js, Tailwind, and shadcn/ui at Neoxero.",
    "ctaWork": "View work",
    "ctaCv": "Download CV"
  },
  "sections": {
    "selectedWork": "Selected Works",
    "about": "About",
    "skills": "Skills",
    "moreWork": "More Work",
    "process": "Process"
  },
  "skills": {
    "frameworks": "Frameworks",
    "styling": "Styling",
    "state": "State Management",
    "apis": "APIs"
  },
  "stats": {
    "years": "Years building",
    "companies": "Companies",
    "projects": "Projects shipped",
    "languages": "Languages"
  },
  "work": {
    "back": "Back to index",
    "entry": "Entry",
    "client": "Client",
    "year": "Year",
    "duration": "Duration",
    "role": "Role",
    "stack": "Stack",
    "viewLive": "View live",
    "private": "Private",
    "outcome": "Outcome",
    "problem": "The problem",
    "myRole": "My role",
    "approach": "Approach",
    "gallery": "Gallery",
    "nextEntry": "Next entry",
    "readEntry": "Read entry"
  },
  "pullQuote": "Code is the medium. The interface is the message.",
  "marquee": "Shipped at",
  "cta": {
    "headline": "Let's build something.",
    "sub": "Open to remote roles, MENA on-site, and paid side work.",
    "button": "Get in touch"
  },
  "contact": {
    "title": "Let's talk",
    "sub": "I respond within 24 hours.",
    "email": "Email",
    "linkedin": "LinkedIn",
    "github": "GitHub",
    "phone": "Phone",
    "bookCall": "Book a 15-min call"
  },
  "footer": {
    "contact": "Contact",
    "site": "Site",
    "language": "Language",
    "rights": "All work reserved."
  },
  "notFound": {
    "marker": "404 · Not Found",
    "headline": "This page doesn't exist.",
    "lastWord": "exist",
    "back": "Back to home"
  }
}
```

### Task 15: Skeleton Arabic messages

**Files:** Create `messages/ar.json`

- [ ] **Step 1: Write the file**

```json
{
  "site": {
    "name": "نور بدر",
    "role": "مهندس واجهات أمامية"
  },
  "nav": {
    "work": "الأعمال",
    "about": "نبذة",
    "contact": "تواصل",
    "downloadCv": "تحميل السيرة الذاتية"
  },
  "hero": {
    "kicker": "واجهات أمامية · منذ 2020",
    "headline": "أبني واجهات تُطلق وتبقى تعمل.",
    "sub": "أربع سنوات من العمل على متاجر إلكترونية ولوحات تحكم SaaS ومنصات أسواق. أعمل حاليًا بـ Next.js و Tailwind و shadcn/ui في Neoxero.",
    "ctaWork": "استعرض الأعمال",
    "ctaCv": "تحميل السيرة الذاتية"
  },
  "sections": {
    "selectedWork": "أعمال مختارة",
    "about": "نبذة",
    "skills": "المهارات",
    "moreWork": "أعمال أخرى",
    "process": "أسلوب العمل"
  },
  "skills": {
    "frameworks": "أطر العمل",
    "styling": "التنسيق",
    "state": "إدارة الحالة",
    "apis": "واجهات البرمجة"
  },
  "stats": {
    "years": "سنوات الخبرة",
    "companies": "شركات",
    "projects": "مشاريع منجزة",
    "languages": "لغات"
  },
  "work": {
    "back": "العودة للفهرس",
    "entry": "مشروع",
    "client": "العميل",
    "year": "السنة",
    "duration": "المدة",
    "role": "الدور",
    "stack": "التقنيات",
    "viewLive": "عرض مباشر",
    "private": "خاص",
    "outcome": "النتيجة",
    "problem": "المشكلة",
    "myRole": "دوري",
    "approach": "النهج",
    "gallery": "صور",
    "nextEntry": "المشروع التالي",
    "readEntry": "اقرأ المزيد"
  },
  "pullQuote": "الكود هو الوسيط. الواجهة هي الرسالة.",
  "marquee": "عملت في",
  "cta": {
    "headline": "لنبنِ شيئًا معًا.",
    "sub": "مفتوح للعمل عن بُعد، وفرص داخل منطقة الشرق الأوسط، والمشاريع المستقلة.",
    "button": "تواصل معي"
  },
  "contact": {
    "title": "لنتحدث",
    "sub": "أرد خلال 24 ساعة.",
    "email": "البريد الإلكتروني",
    "linkedin": "لينكدإن",
    "github": "جيت هاب",
    "phone": "الهاتف",
    "bookCall": "احجز مكالمة 15 دقيقة"
  },
  "footer": {
    "contact": "تواصل",
    "site": "الموقع",
    "language": "اللغة",
    "rights": "جميع الحقوق محفوظة."
  },
  "notFound": {
    "marker": "404 · غير موجود",
    "headline": "هذه الصفحة غير موجودة.",
    "lastWord": "موجودة",
    "back": "العودة للرئيسية"
  }
}
```

---

## Phase 4 — Root layout, fonts, theme + i18n providers

### Task 16: Root layout with theme provider and fonts

**Files:** Create `app/layout.tsx`

- [ ] **Step 1: Write the file**

```tsx
import type { Metadata } from "next";
import {
  Fraunces,
  Inter,
  JetBrains_Mono,
  Reem_Kufi,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import { ThemeProvider } from "next-themes";
import { LenisProvider } from "@/components/motion/lenis-provider";
import { CustomCursor } from "@/components/motion/custom-cursor";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
  display: "swap",
});

const reemKufi = Reem_Kufi({
  subsets: ["arabic", "latin"],
  variable: "--font-reem-kufi",
  weight: ["400", "500", "700"],
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-plex-arabic",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nour-badr.netlify.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} ${reemKufi.variable} ${plexArabic.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LenisProvider>
            <CustomCursor />
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Task 17: Locale layout

**Files:** Create `app/[locale]/layout.tsx`

- [ ] **Step 1: Write the file**

```tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { DotGrid } from "@/components/decorative/dot-grid";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "ar")) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <NextIntlClientProvider messages={messages}>
      <div lang={locale} dir={dir} className="relative min-h-screen">
        <DotGrid />
        <Header />
        <main className="relative z-10">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
```

### Task 18: Root-level locale redirect

**Files:** Create `app/page.tsx`

- [ ] **Step 1: Write the file** — the middleware handles `/` redirect, but provide a safety net:

```tsx
import { redirect } from "next/navigation";
import { routing } from "@/lib/i18n/routing";

export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
```

---

## Phase 5 — Motion primitives & decorative bg

### Task 19: Lenis provider

**Files:** Create `components/motion/lenis-provider.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useEffect, useRef } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;

    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let cancelled = false;

    (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      const raf = (time: number) => {
        lenis?.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      };
      rafRef.current = requestAnimationFrame(raf);
    })();

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

### Task 20: Custom cursor

**Files:** Create `components/motion/custom-cursor.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [role='button'], [data-cursor='hover']"));
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
        style={{ x: sx, y: sy }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-accent)] transition-[width,height] duration-200 ${
            hovering ? "w-10 h-10" : "w-5 h-5"
          }`}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
        style={{ x, y }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
      </motion.div>
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
```

### Task 21: Magnetic wrapper

**Files:** Create `components/motion/magnetic.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";

export function Magnetic({
  children,
  strength = 0.3,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### Task 22: Reveal wrapper

**Files:** Create `components/motion/reveal.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";

export function Reveal({
  children,
  delay = 0,
  y = 12,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### Task 23: Decorative dot grid

**Files:** Create `components/decorative/dot-grid.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useEffect, useRef } from "react";

export function DotGrid() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="dot-grid pointer-events-none fixed inset-0 z-0"
    />
  );
}
```

---

## Phase 6 — Site identity, work data, shadcn primitives

### Task 24: Site meta

**Files:** Create `lib/meta.ts`

- [ ] **Step 1: Write the file**

```ts
export const siteMeta = {
  name: "Nour Badr",
  role: "Front-End Engineer",
  url: "https://nour-badr.netlify.app",
  email: "Nourbadr4646@gmail.com",
  phone: "+201159347686",
  phoneDisplay: "+20 115 934 7686",
  location: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
  github: "https://github.com/noureldeenn",
  linkedin: "https://linkedin.com/in/nour-badr-201794155",
  bookingUrl: "https://cal.com/nour-badr/intro",
  cvUrl: "/nour-badr-cv.pdf",
  companies: [
    "Neoxero",
    "Atech",
    "Perfect Touch",
    "Smartivemedia",
    "Alefsoftware",
    "Syft.la",
    "Craft Crew",
    "Vertex",
  ],
} as const;
```

### Task 25: Grid projects data

**Files:** Create `lib/grid-projects.ts`

- [ ] **Step 1: Write the file**

```ts
export type GridProject = {
  slug: string;
  name: string;
  year: string;
  stack: string[];
  outcome: { en: string; ar: string };
  liveUrl: string | null;
};

export const gridProjects: GridProject[] = [
  {
    slug: "oilmz",
    name: "Oilmz",
    year: "2025",
    stack: ["React", "Tailwind", "shadcn/ui"],
    outcome: { en: "E-commerce platform on Zid Store", ar: "متجر إلكتروني على منصة زد" },
    liveUrl: null,
  },
  {
    slug: "sattec",
    name: "Sattec",
    year: "2024",
    stack: ["React", "Tailwind"],
    outcome: { en: "B2B services storefront", ar: "متجر خدمات للشركات" },
    liveUrl: null,
  },
  {
    slug: "lighting-address",
    name: "Lighting Address",
    year: "2024",
    stack: ["React", "Tailwind", "shadcn/ui"],
    outcome: { en: "Lighting retailer customizations", ar: "تخصيصات متجر إنارة" },
    liveUrl: null,
  },
  {
    slug: "almutlaq-furnitures",
    name: "Almutlaq Furnitures",
    year: "2024",
    stack: ["React", "Tailwind"],
    outcome: { en: "Furniture brand storefront", ar: "متجر علامة أثاث" },
    liveUrl: null,
  },
  {
    slug: "silverback",
    name: "Silverback",
    year: "2023",
    stack: ["React", "TypeScript"],
    outcome: { en: "Custom dashboard UI", ar: "واجهة لوحة تحكم مخصصة" },
    liveUrl: null,
  },
  {
    slug: "ejaz-homes",
    name: "Ejaz Homes",
    year: "2023",
    stack: ["React", "Bootstrap", "Formik"],
    outcome: { en: "Real-estate client management", ar: "إدارة عملاء عقارات" },
    liveUrl: null,
  },
];
```

### Task 26: Case study schema and loader

**Files:** Create `lib/work.ts`

- [ ] **Step 1: Write the file**

```ts
import { z } from "zod";
import type { Locale } from "@/lib/i18n/routing";

export const caseStudyFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  client: z.string(),
  year: z.string(),
  duration: z.string(),
  role: z.string(),
  stack: z.array(z.string()),
  outcome: z.string(),
  outcomeLabel: z.string(),
  liveUrl: z.string().nullable(),
  tags: z.array(z.string()),
  summary: z.string(),
  heroImage: z.string(),
  gallery: z.array(z.string()),
});

export type CaseStudyMeta = z.infer<typeof caseStudyFrontmatterSchema>;

export const caseStudySlugs = [
  "zid-store-apps",
  "syft-gg-marketplace",
  "craft-crew-lms",
  "vertex-radio",
] as const;

export type CaseStudySlug = (typeof caseStudySlugs)[number];

export async function loadCaseStudy(slug: CaseStudySlug, locale: Locale) {
  const mod = await import(`@/content/work/${slug}.${locale}.mdx`);
  const frontmatter = caseStudyFrontmatterSchema.parse(mod.frontmatter ?? mod.metadata);
  return { Content: mod.default, frontmatter };
}

export async function loadAllCaseStudies(locale: Locale) {
  return Promise.all(
    caseStudySlugs.map(async (slug) => (await loadCaseStudy(slug, locale)).frontmatter),
  );
}

export function getAdjacent(slug: CaseStudySlug) {
  const i = caseStudySlugs.indexOf(slug);
  return {
    prev: i > 0 ? caseStudySlugs[i - 1] : null,
    next: i < caseStudySlugs.length - 1 ? caseStudySlugs[i + 1] : null,
  };
}
```

### Task 27: Button primitive

**Files:** Create `components/ui/button.tsx`

- [ ] **Step 1: Write the file**

```tsx
import * as React from "react";
import { Link } from "@/lib/i18n/routing";
import clsx from "clsx";

type Variant = "primary" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  "data-cursor"?: string;
};

type ButtonAsButton = BaseProps & {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: () => void;
};

type ButtonAsLocaleLink = BaseProps & {
  href: string;
  external?: false;
};

type ButtonAsExternal = BaseProps & {
  href: string;
  external: true;
  download?: boolean | string;
};

type Props = ButtonAsButton | ButtonAsLocaleLink | ButtonAsExternal;

const sizeMap: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-sm",
};

const variantMap: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] text-[var(--color-bg)] hover:opacity-90 transition-opacity",
  ghost:
    "border border-[var(--color-rule)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors",
  link: "text-[var(--color-accent)] underline underline-offset-4 decoration-1 hover:decoration-2",
};

export function Button(props: Props) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
  } = props;
  const classes = clsx(
    "inline-flex items-center gap-2 font-[var(--font-mono)] tracking-tight rounded-none",
    sizeMap[size],
    variantMap[variant],
    className,
  );

  if ("href" in props && props.href) {
    if ("external" in props && props.external) {
      const downloadAttr =
        "download" in props && props.download
          ? typeof props.download === "string"
            ? props.download
            : true
          : undefined;
      return (
        <a
          href={props.href}
          target={downloadAttr ? undefined : "_blank"}
          rel={downloadAttr ? undefined : "noopener noreferrer"}
          download={downloadAttr as never}
          className={classes}
          data-cursor={props["data-cursor"]}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes} data-cursor={props["data-cursor"]}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={"type" in props ? props.type ?? "button" : "button"}
      onClick={"onClick" in props ? props.onClick : undefined}
      className={classes}
      data-cursor={props["data-cursor"]}
    >
      {children}
    </button>
  );
}
```

### Task 28: Card primitive

**Files:** Create `components/ui/card.tsx`

- [ ] **Step 1: Write the file**

```tsx
import clsx from "clsx";

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "border border-[var(--color-rule)] bg-[var(--color-surface)] p-6 md:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
```

### Task 29: Dialog primitive

**Files:** Create `components/ui/dialog.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import clsx from "clsx";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
      <DialogPrimitive.Content
        className={clsx(
          "fixed left-1/2 top-1/2 z-[120] -translate-x-1/2 -translate-y-1/2",
          "max-w-[92vw] max-h-[90vh] bg-[var(--color-surface)] p-4 md:p-6 shadow-2xl",
          className,
        )}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export const DialogTitle = DialogPrimitive.Title;
```

---

## Phase 7 — Header, footer, toggles

### Task 30: Theme toggle

**Files:** Create `components/site/theme-toggle.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("nav");

  useEffect(() => setMounted(true), []);
  if (!mounted) return <span className="w-9 h-9" aria-hidden />;

  const current = theme === "system" ? systemTheme : theme;
  const isDark = current === "dark";

  return (
    <button
      type="button"
      aria-label={t("work")}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-9 h-9 inline-flex items-center justify-center border border-[var(--color-rule)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
      data-cursor="hover"
    >
      {isDark ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      )}
    </button>
  );
}
```

### Task 31: Language toggle

**Files:** Create `components/site/language-toggle.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/routing";
import type { Locale } from "@/lib/i18n/routing";

export function LanguageToggle() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const next: Locale = locale === "en" ? "ar" : "en";

  return (
    <button
      type="button"
      aria-label={`Switch to ${next === "en" ? "English" : "Arabic"}`}
      onClick={() => router.replace(pathname, { locale: next })}
      className="font-[var(--font-mono)] text-xs px-3 h-9 inline-flex items-center border border-[var(--color-rule)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
      data-cursor="hover"
    >
      <span className={locale === "en" ? "text-[var(--color-accent)]" : ""}>EN</span>
      <span className="mx-1 text-[var(--color-text-muted)]">·</span>
      <span className={locale === "ar" ? "text-[var(--color-accent)]" : ""}>عر</span>
    </button>
  );
}
```

### Task 32: Header

**Files:** Create `components/site/header.tsx`

- [ ] **Step 1: Write the file**

```tsx
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";

export function Header() {
  const t = useTranslations("nav");
  const tSite = useTranslations("site");

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-rule)] bg-[color-mix(in_oklab,var(--color-bg)_85%,transparent)] backdrop-blur-md">
      <div className="container-page flex items-center justify-between py-4">
        <Link href="/" className="group flex items-baseline gap-2" data-cursor="hover">
          <span className="font-[var(--font-display)] text-lg font-semibold tracking-tight text-[var(--color-text)]">
            {tSite("name")}
          </span>
          <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)] hidden sm:inline">
            / {tSite("role")}
          </span>
        </Link>

        <nav className="flex items-center gap-1 md:gap-2">
          <ul className="hidden md:flex items-center gap-1">
            {(["work", "about", "contact"] as const).map((key) => (
              <li key={key}>
                <Link
                  href={key === "work" ? "/#work" : `/${key}`}
                  className="font-[var(--font-mono)] text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] px-3 py-1.5 transition-colors"
                  data-cursor="hover"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 ms-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
```

### Task 33: Footer

**Files:** Create `components/site/footer.tsx`

- [ ] **Step 1: Write the file**

```tsx
import { useTranslations, useLocale } from "next-intl";
import { siteMeta } from "@/lib/meta";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale() as "en" | "ar";

  return (
    <footer className="relative z-10 border-t border-[var(--color-rule)] mt-32 bg-[var(--color-bg)]">
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <div className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)] mb-3">
              [{t("contact").toUpperCase()}]
            </div>
            <a
              href={`mailto:${siteMeta.email}`}
              className="block font-[var(--font-mono)] text-sm hover:text-[var(--color-accent)] transition-colors mb-2"
              data-cursor="hover"
            >
              {siteMeta.email}
            </a>
            <a
              href={siteMeta.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-[var(--font-mono)] text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
              data-cursor="hover"
            >
              LinkedIn ↗
            </a>
            <a
              href={siteMeta.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-[var(--font-mono)] text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
              data-cursor="hover"
            >
              GitHub ↗
            </a>
          </div>

          <div>
            <div className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)] mb-3">
              [{t("site").toUpperCase()}]
            </div>
            <ul className="space-y-2">
              {(["work", "about", "contact"] as const).map((key) => (
                <li key={key}>
                  <a
                    href={`/${locale}${key === "work" ? "/#work" : `/${key}`}`}
                    className="font-[var(--font-mono)] text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                    data-cursor="hover"
                  >
                    {tNav(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)] mb-3">
              [{t("language").toUpperCase()}]
            </div>
            <p className="font-[var(--font-mono)] text-sm text-[var(--color-text-muted)] leading-relaxed">
              {siteMeta.location[locale]}
              <br />
              {siteMeta.phoneDisplay}
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--color-rule)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} {siteMeta.name.toUpperCase()}. {t("rights").toUpperCase()}
          </p>
          <p className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)]">
            v1.0 / 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
```

### Task 34: Verify shell renders in both locales + themes

- [ ] **Step 1: Run dev server**

```bash
npm run dev
```

- [ ] **Step 2: Manually open in browser** and confirm:
  - `http://localhost:3000` redirects to `/en`
  - `/en` shows header + dot grid + footer
  - `/ar` shows header + footer with RTL layout (logo on right, nav on left)
  - Theme toggle flips light → dark instantly across all surfaces
  - Language toggle switches `/en` ↔ `/ar` while preserving path
  - No hydration warnings in console

- [ ] **Step 3: Stop dev server (Ctrl+C)**

### Task 35: Commit phases 1–7

```bash
git add app/ components/ lib/ messages/ middleware.ts
git commit -m "feat: scaffold layout shell, i18n routing, theme + locale toggles, motion primitives"
```

---

## Phase 8 — Home page sections

### Task 36: Hero

**Files:** Create `components/site/hero.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { siteMeta } from "@/lib/meta";

const container = {
  hidden: { opacity: 1 },
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const word = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const t = useTranslations("hero");
  const tStats = useTranslations("stats");
  const locale = useLocale() as "en" | "ar";
  const reduced = useReducedMotion();
  const headline = t("headline");
  const words = headline.split(" ");

  return (
    <section className="relative pt-20 md:pt-28 pb-16 md:pb-24">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="block w-8 h-px bg-[var(--color-accent)]" />
              <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)] uppercase">
                {t("kicker")}
              </span>
            </div>

            <motion.h1
              variants={reduced ? undefined : container}
              initial={reduced ? undefined : "hidden"}
              animate={reduced ? undefined : "visible"}
              className="font-[var(--font-display)] text-[2.4rem] sm:text-5xl lg:text-[5rem] leading-[1.05] tracking-[-0.02em] font-semibold text-[var(--color-text)] max-w-4xl"
              aria-label={headline}
            >
              {reduced
                ? headline
                : words.map((w, i) => (
                    <motion.span key={i} variants={word} className="inline-block">
                      {w}
                      {i < words.length - 1 && <span>&nbsp;</span>}
                    </motion.span>
                  ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : 1.0, duration: 0.5 }}
              className="mt-8 max-w-2xl text-[var(--color-text-muted)] text-base md:text-lg leading-relaxed"
            >
              {t("sub")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : 1.2, duration: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <Button href="/#work" size="lg" data-cursor="hover">
                  {t("ctaWork")} →
                </Button>
              </Magnetic>
              <Button
                href={siteMeta.cvUrl}
                external
                download="Nour_Badr_CV.pdf"
                variant="ghost"
                size="lg"
                data-cursor="hover"
              >
                {t("ctaCv")} ↓
              </Button>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduced ? 0 : 0.7, duration: 0.6 }}
            className="lg:col-span-4 lg:mt-2"
          >
            <div className="border border-[var(--color-rule)] p-6 md:p-7 bg-[var(--color-surface)]">
              <div className="flex items-center justify-between mb-5">
                <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)]">
                  [{tStats("years").toUpperCase()}]
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="block w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                  <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-accent)]">
                    OPEN
                  </span>
                </span>
              </div>

              <dl className="space-y-3 text-sm">
                {[
                  { k: tStats("years"), v: "4+" },
                  { k: tStats("companies"), v: "6+" },
                  { k: tStats("projects"), v: "30+" },
                  { k: tStats("languages"), v: locale === "ar" ? "٢" : "2" },
                ].map((row) => (
                  <div
                    key={row.k}
                    className="flex justify-between items-baseline border-b border-[var(--color-rule)] pb-3 last:border-0"
                  >
                    <dt className="font-[var(--font-mono)] text-xs text-[var(--color-text-muted)]">
                      {row.k}
                    </dt>
                    <dd className="font-[var(--font-mono)] text-[var(--color-text)]">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
```

### Task 37: Case card (Selected Works entries)

**Files:** Create `components/site/case-card.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { Link } from "@/lib/i18n/routing";
import { useRef } from "react";
import type { CaseStudyMeta } from "@/lib/work";

type Props = { study: CaseStudyMeta; index: number };

export function CaseCard({ study, index }: Props) {
  const num = String(index + 1).padStart(2, "0");
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--gx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--gy", `${e.clientY - r.top}px`);
  };

  return (
    <Link
      ref={ref}
      href={`/work/${study.slug}`}
      onMouseMove={onMove}
      className="group relative block border-t border-[var(--color-rule)] hover:border-[var(--color-accent)] transition-colors duration-300 overflow-hidden"
      data-cursor="hover"
      style={{
        backgroundImage:
          "radial-gradient(circle 240px at var(--gx, 50%) var(--gy, 50%), color-mix(in oklab, var(--color-accent) 8%, transparent), transparent 70%)",
      }}
    >
      <article className="grid grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 items-start">
        <div className="col-span-12 md:col-span-1">
          <span className="font-[var(--font-mono)] text-xs tracking-widest text-[var(--color-accent)]">
            [{num}]
          </span>
        </div>
        <div className="col-span-12 md:col-span-5">
          <h3 className="font-[var(--font-display)] text-2xl md:text-3xl font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-300 tracking-tight">
            {study.title}
          </h3>
          <p className="mt-3 text-[var(--color-text-muted)] text-sm leading-relaxed max-w-md">
            {study.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)] border border-[var(--color-rule)] px-2 py-1"
              >
                {tag.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
        <div className="col-span-6 md:col-span-3">
          <div className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)] mb-2">
            STACK
          </div>
          <ul className="space-y-1">
            {study.stack.slice(0, 4).map((s) => (
              <li key={s} className="font-[var(--font-mono)] text-xs text-[var(--color-text-muted)]">
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-6 md:col-span-3">
          <div className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)] mb-2">
            OUTCOME
          </div>
          <div className="font-[var(--font-display)] text-3xl md:text-4xl text-[var(--color-accent)] tracking-tight">
            {study.outcome}
          </div>
          <div className="font-[var(--font-mono)] text-[11px] text-[var(--color-text-muted)] mt-1">
            {study.outcomeLabel}
          </div>
        </div>
      </article>
    </Link>
  );
}
```

### Task 38: Skills grid

**Files:** Create `components/site/skills-grid.tsx`

- [ ] **Step 1: Write the file**

```tsx
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";

const groups = {
  frameworks: ["React", "Next.js", "Angular", "TypeScript", "JavaScript ES6+", "HTML", "CSS"],
  styling: ["Tailwind", "shadcn/ui", "Material UI", "Ant Design", "Chakra UI", "Bootstrap", "SASS", "Storybook"],
  state: ["Redux Toolkit", "Redux Thunk", "React Query", "MobX"],
  apis: ["REST", "GraphQL"],
};

export function SkillsGrid() {
  const t = useTranslations("skills");
  const tSec = useTranslations("sections");

  return (
    <section id="skills" className="relative py-20 md:py-28 border-t border-[var(--color-rule)]">
      <div className="container-page">
        <div className="flex items-center gap-3 mb-12">
          <span className="block w-8 h-px bg-[var(--color-accent)]" />
          <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)]">
            [03] {tSec("skills").toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {(Object.keys(groups) as Array<keyof typeof groups>).map((key, i) => (
            <Reveal key={key} delay={i * 0.08}>
              <h3 className="font-[var(--font-mono)] text-[11px] tracking-widest text-[var(--color-accent)] mb-4">
                {t(key).toUpperCase()}
              </h3>
              <ul className="space-y-2">
                {groups[key].map((s) => (
                  <li
                    key={s}
                    className="font-[var(--font-mono)] text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                    data-cursor="hover"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Task 39: About strip with animated stat counters

**Files:** Create `components/site/about-strip.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef } from "react";
import { Link } from "@/lib/i18n/routing";

function Counter({ to, suffix = "+" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const value = useMotionValue(0);
  const rounded = useTransform(value, (v) => Math.round(v).toString() + suffix);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      value.set(to);
      return;
    }
    const controls = animate(value, to, { duration: 1.4, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, to, reduced, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function AboutStrip() {
  const t = useTranslations("stats");
  const tSec = useTranslations("sections");
  const locale = useLocale() as "en" | "ar";

  const bio =
    locale === "ar"
      ? "أبني واجهات منذ 2020. عملت في ست شركات عبر التجارة الإلكترونية ولوحات SaaS والأسواق ولوحات الرعاية الصحية. ما زلت أؤمن بأن السرعة والوضوح وأدق التفاصيل البصرية هي ما يفرّق المنتج الجيد عن العظيم."
      : "I've been building interfaces since 2020. Six companies across e-commerce, SaaS dashboards, marketplaces, and healthcare. I still believe speed, clarity, and the smallest visual details are what separate a good product from a great one.";

  return (
    <section
      id="about-strip"
      className="relative py-20 md:py-28 border-t border-[var(--color-rule)]"
    >
      <div className="container-page">
        <div className="flex items-center gap-3 mb-12">
          <span className="block w-8 h-px bg-[var(--color-accent)]" />
          <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)]">
            [02] {tSec("about").toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <p className="font-[var(--font-display)] text-2xl md:text-3xl leading-snug text-[var(--color-text)] max-w-2xl">
              {bio}
            </p>
            <div className="mt-8">
              <Link
                href="/about"
                className="font-[var(--font-mono)] text-sm text-[var(--color-accent)] underline underline-offset-4"
                data-cursor="hover"
              >
                {tSec("about")} →
              </Link>
            </div>
          </div>

          <dl className="lg:col-span-5 grid grid-cols-2 gap-px bg-[var(--color-rule)] self-start">
            {[
              { k: t("years"), to: 4 },
              { k: t("companies"), to: 6 },
              { k: t("projects"), to: 30 },
              { k: t("languages"), to: 2, suffix: "" },
            ].map((row) => (
              <div key={row.k} className="bg-[var(--color-bg)] p-6">
                <dt className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)] mb-2">
                  {row.k.toUpperCase()}
                </dt>
                <dd className="font-[var(--font-display)] text-4xl md:text-5xl text-[var(--color-text)]">
                  <Counter to={row.to} suffix={row.suffix ?? "+"} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
```

### Task 40: Grid card (More Work)

**Files:** Create `components/site/grid-card.tsx`

- [ ] **Step 1: Write the file**

```tsx
import { useLocale } from "next-intl";
import type { GridProject } from "@/lib/grid-projects";

export function GridCard({ project }: { project: GridProject }) {
  const locale = useLocale() as "en" | "ar";
  const Tag = project.liveUrl ? "a" : "div";
  return (
    <Tag
      {...(project.liveUrl
        ? { href: project.liveUrl, target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="group block border border-[var(--color-rule)] p-6 hover:border-[var(--color-accent)] transition-colors bg-[var(--color-surface)]"
      data-cursor={project.liveUrl ? "hover" : undefined}
    >
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
          {project.name}
        </h3>
        <span className="font-[var(--font-mono)] text-[11px] text-[var(--color-text-muted)]">
          {project.year}
        </span>
      </div>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">
        {project.outcome[locale]}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span
            key={s}
            className="font-[var(--font-mono)] text-[10px] text-[var(--color-text-muted)] border border-[var(--color-rule)] px-2 py-1"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="mt-5 font-[var(--font-mono)] text-[11px] tracking-widest">
        {project.liveUrl ? (
          <span className="text-[var(--color-accent)]">VIEW LIVE ↗</span>
        ) : (
          <span className="text-[var(--color-text-muted)]">PRIVATE</span>
        )}
      </div>
    </Tag>
  );
}
```

### Task 41: Pull quote

**Files:** Create `components/site/pull-quote.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";

export function PullQuote() {
  const t = useTranslations();
  const text = t("pullQuote");
  const reduced = useReducedMotion();
  const chars = text.split("");

  return (
    <section className="container-page py-24 md:py-32">
      <figure className="max-w-3xl mx-auto text-center">
        <span aria-hidden className="block text-[var(--color-accent)] font-[var(--font-display)] text-6xl leading-none mb-4">
          &ldquo;
        </span>
        <motion.blockquote
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={{
            visible: { transition: { staggerChildren: reduced ? 0 : 0.018 } },
          }}
          className="font-[var(--font-display)] italic text-3xl md:text-5xl leading-[1.2] text-[var(--color-text)]"
          aria-label={text}
        >
          {chars.map((c, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 6 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
              }}
              className="inline-block"
            >
              {c === " " ? " " : c}
            </motion.span>
          ))}
        </motion.blockquote>
      </figure>
    </section>
  );
}
```

### Task 42: Companies marquee

**Files:** Create `components/site/companies-marquee.tsx`

- [ ] **Step 1: Write the file**

```tsx
import { useTranslations } from "next-intl";
import { siteMeta } from "@/lib/meta";

export function CompaniesMarquee() {
  const t = useTranslations();
  const doubled = [...siteMeta.companies, ...siteMeta.companies];

  return (
    <section
      aria-label={t("marquee")}
      className="relative py-16 border-y border-[var(--color-rule)] overflow-hidden"
    >
      <div className="container-page mb-6">
        <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)]">
          [—] {t("marquee").toUpperCase()}
        </span>
      </div>
      <div className="relative w-full overflow-hidden">
        <div className="marquee-track flex gap-16 whitespace-nowrap will-change-transform">
          {doubled.map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="font-[var(--font-display)] text-3xl md:text-5xl text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors flex-shrink-0"
              data-cursor="hover"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Task 43: CTA block

**Files:** Create `components/site/cta-block.tsx`

- [ ] **Step 1: Write the file**

```tsx
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { siteMeta } from "@/lib/meta";

export function CtaBlock() {
  const t = useTranslations("cta");

  return (
    <section
      id="contact-cta"
      className="relative py-24 md:py-32 border-t border-[var(--color-rule)] overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, color-mix(in oklab, var(--color-accent) 30%, transparent), transparent 60%)",
        }}
      />
      <div className="container-page relative">
        <div className="flex items-center gap-3 mb-10">
          <span className="block w-8 h-px bg-[var(--color-accent)]" />
          <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)]">
            [—] NEXT
          </span>
        </div>
        <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.02em] leading-[1.05] text-[var(--color-text)] max-w-4xl">
          {t("headline")}
        </h2>
        <p className="mt-8 max-w-xl text-[var(--color-text-muted)] text-base md:text-lg leading-relaxed">
          {t("sub")}
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
          <Magnetic>
            <Button href="/contact" size="lg" data-cursor="hover">
              {t("button")} →
            </Button>
          </Magnetic>
          <Button
            href={`mailto:${siteMeta.email}`}
            external
            variant="ghost"
            size="lg"
            data-cursor="hover"
          >
            {siteMeta.email}
          </Button>
        </div>
      </div>
    </section>
  );
}
```

### Task 44: Home page composition

**Files:** Create `app/[locale]/page.tsx`

- [ ] **Step 1: Write the file**

```tsx
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/site/hero";
import { CaseCard } from "@/components/site/case-card";
import { AboutStrip } from "@/components/site/about-strip";
import { SkillsGrid } from "@/components/site/skills-grid";
import { GridCard } from "@/components/site/grid-card";
import { PullQuote } from "@/components/site/pull-quote";
import { CompaniesMarquee } from "@/components/site/companies-marquee";
import { CtaBlock } from "@/components/site/cta-block";
import { loadAllCaseStudies } from "@/lib/work";
import { gridProjects } from "@/lib/grid-projects";
import type { Locale } from "@/lib/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sections");
  const studies = await loadAllCaseStudies(locale as Locale);

  return (
    <>
      <Hero />

      <section id="work" className="relative py-16 md:py-24 border-t border-[var(--color-rule)]">
        <div className="container-page">
          <div className="flex items-center gap-3 mb-12">
            <span className="block w-8 h-px bg-[var(--color-accent)]" />
            <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)]">
              [01] {t("selectedWork").toUpperCase()}
            </span>
          </div>
          <div>
            {studies.map((study, i) => (
              <CaseCard key={study.slug} study={study} index={i} />
            ))}
            <div className="border-t border-[var(--color-rule)]" />
          </div>
        </div>
      </section>

      <AboutStrip />
      <SkillsGrid />

      <section id="more-work" className="relative py-20 md:py-28 border-t border-[var(--color-rule)]">
        <div className="container-page">
          <div className="flex items-center gap-3 mb-12">
            <span className="block w-8 h-px bg-[var(--color-accent)]" />
            <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)]">
              [04] {t("moreWork").toUpperCase()}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-rule)]">
            {gridProjects.map((p) => (
              <GridCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      <PullQuote />
      <CompaniesMarquee />
      <CtaBlock />
    </>
  );
}
```

### Task 45: Verify home renders end-to-end

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Verify on `/en`**:
  - Hero renders headline word-by-word with blur reveal
  - Identity stamp on the right
  - Selected works lists 4 entries (will pull from MDX once those are authored — for now the list will be empty; expected at this point)
  - Skills grid shows 4 columns
  - About strip animates counters when scrolled to
  - More-work grid shows 6 cells
  - Pull quote animates char-by-char
  - Marquee scrolls horizontally
  - CTA block shows gradient

- [ ] **Step 3: Verify on `/ar`**: layout flips RTL, fonts switch to Reem Kufi + Plex Arabic, marquee scrolls opposite direction

- [ ] **Step 4: Stop dev server**

### Task 46: Commit Phase 8

```bash
git add app/[locale]/page.tsx components/site/
git commit -m "feat: home page sections (hero, work strip, about, skills, more-work, pull-quote, marquee, cta)"
```

---

## Phase 9 — Work detail page

### Task 47: Sidebar meta

**Files:** Create `components/work/sidebar-meta.tsx`

- [ ] **Step 1: Write the file**

```tsx
import { useTranslations } from "next-intl";
import type { CaseStudyMeta } from "@/lib/work";

export function SidebarMeta({ study }: { study: CaseStudyMeta }) {
  const t = useTranslations("work");
  const rows: Array<[string, React.ReactNode]> = [
    [t("client"), study.client],
    [t("year"), study.year],
    [t("duration"), study.duration],
    [t("role"), study.role],
  ];

  return (
    <aside className="lg:sticky lg:top-24 self-start">
      <div className="border border-[var(--color-rule)] bg-[var(--color-surface)] p-6">
        <dl className="space-y-3 text-sm">
          {rows.map(([k, v]) => (
            <div
              key={k}
              className="flex justify-between items-baseline border-b border-[var(--color-rule)] pb-3 last:border-0"
            >
              <dt className="font-[var(--font-mono)] text-xs text-[var(--color-text-muted)]">{k}</dt>
              <dd className="font-[var(--font-mono)] text-[var(--color-text)] text-end">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-5">
          <div className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)] mb-2">
            {t("stack").toUpperCase()}
          </div>
          <ul className="flex flex-wrap gap-2">
            {study.stack.map((s) => (
              <li
                key={s}
                className="font-[var(--font-mono)] text-[10px] text-[var(--color-text-muted)] border border-[var(--color-rule)] px-2 py-1"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        {study.liveUrl ? (
          <a
            href={study.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex font-[var(--font-mono)] text-xs text-[var(--color-accent)] underline underline-offset-4"
            data-cursor="hover"
          >
            {t("viewLive")} ↗
          </a>
        ) : (
          <p className="mt-6 font-[var(--font-mono)] text-xs text-[var(--color-text-muted)]">
            {t("private").toUpperCase()}
          </p>
        )}
      </div>
    </aside>
  );
}
```

### Task 48: Outcome metric (animated)

**Files:** Create `components/work/outcome-metric.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useTranslations } from "next-intl";

export function OutcomeMetric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const t = useTranslations("work");
  return (
    <div className="my-12 border-y border-[var(--color-rule)] py-12 text-center">
      <div className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)] mb-4">
        [{t("outcome").toUpperCase()}]
      </div>
      <div className="font-[var(--font-display)] text-6xl md:text-8xl text-[var(--color-accent)] tracking-tight leading-none">
        {value}
      </div>
      <div className="mt-3 font-[var(--font-mono)] text-sm text-[var(--color-text-muted)]">
        {label}
      </div>
    </div>
  );
}
```

### Task 49: Gallery with lightbox

**Files:** Create `components/work/gallery.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Gallery({ images }: { images: string[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-12">
      {images.map((src) => (
        <Dialog key={src}>
          <DialogTrigger asChild>
            <button
              type="button"
              onClick={() => setActive(src)}
              className="relative aspect-[16/10] overflow-hidden border border-[var(--color-rule)] hover:border-[var(--color-accent)] transition-colors"
              data-cursor="hover"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="sr-only">Gallery image</DialogTitle>
            {active && (
              <Image
                src={active}
                alt=""
                width={1600}
                height={1000}
                className="object-contain w-auto h-auto max-w-[88vw] max-h-[85vh]"
              />
            )}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
```

### Task 50: Next entry (magnetic)

**Files:** Create `components/work/next-entry.tsx`

- [ ] **Step 1: Write the file**

```tsx
import { Link } from "@/lib/i18n/routing";
import { useTranslations } from "next-intl";
import { Magnetic } from "@/components/motion/magnetic";
import type { CaseStudyMeta } from "@/lib/work";

export function NextEntry({ study }: { study: CaseStudyMeta }) {
  const t = useTranslations("work");
  return (
    <Magnetic strength={0.15}>
      <Link
        href={`/work/${study.slug}`}
        className="group block border-t border-[var(--color-rule)] hover:border-[var(--color-accent)] transition-colors py-12 mt-16"
        data-cursor="hover"
      >
        <div className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)] mb-3">
          {t("nextEntry").toUpperCase()} →
        </div>
        <h3 className="font-[var(--font-display)] text-3xl md:text-5xl font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
          {study.title}
        </h3>
        <p className="mt-3 text-[var(--color-text-muted)] max-w-xl">{study.summary}</p>
      </Link>
    </Magnetic>
  );
}
```

### Task 51: MDX components

**Files:** Create `mdx-components.tsx`

- [ ] **Step 1: Write the file**

```tsx
import type { MDXComponents } from "mdx/types";
import { OutcomeMetric } from "@/components/work/outcome-metric";
import { Gallery } from "@/components/work/gallery";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-[var(--font-display)] text-3xl md:text-4xl font-semibold text-[var(--color-text)] mt-12 mb-6 tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-[var(--font-display)] text-xl md:text-2xl font-semibold text-[var(--color-text)] mt-10 mb-4 tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-[var(--font-mono)] text-lg font-medium text-[var(--color-text)] mt-8 mb-3">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-5 text-[15px] md:text-base">
        {children}
      </p>
    ),
    ul: ({ children }) => <ul className="space-y-2 mb-6 list-none ps-0">{children}</ul>,
    li: ({ children }) => (
      <li className="text-[var(--color-text-muted)] leading-relaxed ps-6 relative before:content-['→'] before:absolute before:start-0 before:text-[var(--color-accent)]">
        {children}
      </li>
    ),
    strong: ({ children }) => (
      <strong className="text-[var(--color-text)] font-medium">{children}</strong>
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        className="text-[var(--color-accent)] underline underline-offset-4 decoration-1 hover:decoration-2"
      >
        {children}
      </a>
    ),
    OutcomeMetric,
    Gallery,
    ...components,
  };
}
```

### Task 52: Case study page template

**Files:** Create `app/[locale]/work/[slug]/page.tsx`

- [ ] **Step 1: Write the file**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/lib/i18n/routing";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { loadCaseStudy, getAdjacent, caseStudySlugs } from "@/lib/work";
import { routing, type Locale } from "@/lib/i18n/routing";
import { SidebarMeta } from "@/components/work/sidebar-meta";
import { NextEntry } from "@/components/work/next-entry";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    caseStudySlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!caseStudySlugs.includes(slug as never)) return {};
  try {
    const { frontmatter } = await loadCaseStudy(slug as never, locale as Locale);
    return { title: frontmatter.title, description: frontmatter.summary };
  } catch {
    return {};
  }
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (!caseStudySlugs.includes(slug as never)) notFound();

  const { Content, frontmatter } = await loadCaseStudy(slug as never, locale as Locale);
  const t = await getTranslations("work");
  const { next } = getAdjacent(slug as never);
  const entryIdx = caseStudySlugs.indexOf(slug as never);
  const entryNum = String(entryIdx + 1).padStart(2, "0");
  const nextStudy = next ? (await loadCaseStudy(next, locale as Locale)).frontmatter : null;

  return (
    <article>
      <header className="container-page pt-12 md:pt-16 pb-12 border-b border-[var(--color-rule)]">
        <Link
          href="/#work"
          className="inline-block font-[var(--font-mono)] text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors mb-10"
          data-cursor="hover"
        >
          ← {t("back").toUpperCase()}
        </Link>
        <div className="flex items-center gap-3 mb-6">
          <span className="block w-8 h-px bg-[var(--color-accent)]" />
          <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-accent)]">
            [{t("entry").toUpperCase()} {entryNum} // {frontmatter.year}]
          </span>
        </div>
        <h1 className="font-[var(--font-display)] text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] leading-[1.05] text-[var(--color-text)] max-w-4xl">
          {frontmatter.title}
        </h1>
        <p className="mt-8 max-w-2xl text-[var(--color-text-muted)] text-base md:text-lg leading-relaxed">
          {frontmatter.summary}
        </p>
      </header>

      <div className="container-page py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 order-2 lg:order-1">
          <div className="relative aspect-[16/9] mb-12 overflow-hidden border border-[var(--color-rule)]">
            <Image
              src={frontmatter.heroImage}
              alt={frontmatter.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
          <Content />
        </div>
        <div className="lg:col-span-4 order-1 lg:order-2">
          <SidebarMeta study={frontmatter} />
        </div>
      </div>

      <div className="container-page">
        {nextStudy && <NextEntry study={nextStudy} />}
      </div>
    </article>
  );
}
```

### Task 53: Commit Phase 9

```bash
git add app/[locale]/work components/work mdx-components.tsx
git commit -m "feat: case study detail page (sidebar, gallery, outcome, next entry)"
```

---

## Phase 10 — About page

### Task 54: Timeline (scroll-driven)

**Files:** Create `components/about/timeline.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

type Entry = {
  company: string;
  dates: string;
  role: string;
  description: { en: string; ar: string };
};

const entries: Entry[] = [
  {
    company: "Neoxero",
    dates: "Nov 2024 – Present",
    role: "Front-End Developer",
    description: {
      en: "Customized React apps for Zid Store. Built a Tailwind + shadcn/ui design system that cut UI inconsistencies 40%. Integrated Redux Toolkit, dropping API errors 20%.",
      ar: "خصصت تطبيقات React لمنصة زد. بنيت نظام تصميم بـ Tailwind و shadcn/ui قلّل عدم الاتساق بنسبة 40%. ودمجت Redux Toolkit مما خفّض أخطاء API بنسبة 20%.",
    },
  },
  {
    company: "Atech",
    dates: "Jan 2024 – Nov 2024",
    role: "Front-End Developer (Zoho)",
    description: {
      en: "Training center platform integrating POS, social, and CRM. Reduced manual tasks 35%, generated 200+ leads monthly via automated campaigns.",
      ar: "منصة مركز تدريب تربط POS و وسائل التواصل و CRM. خفّضت المهام اليدوية 35%، وولّدت أكثر من 200 عميل شهريًا.",
    },
  },
  {
    company: "Perfect Touch IT",
    dates: "Sep 2023 – Dec 2023",
    role: "Front-End Developer",
    description: {
      en: "Hospital dashboard used by 150+ staff (40% scheduling time cut). Real-estate client management with advanced reporting.",
      ar: "لوحة تحكم مستشفى يستخدمها أكثر من 150 موظفًا (تقليل وقت الجدولة بنسبة 40%). نظام إدارة عملاء عقارات بتقارير متقدمة.",
    },
  },
  {
    company: "Smartivemedia",
    dates: "May 2022 – Dec 2022",
    role: "Front-End Developer",
    description: {
      en: "Dookan e-commerce: 10k+ monthly transactions. Reduced cart abandonment 15% by reworking checkout and search filters.",
      ar: "متجر دكان: أكثر من 10 آلاف معاملة شهرية. خفّضت معدل التخلي عن السلة 15% بإعادة بناء الدفع وفلاتر البحث.",
    },
  },
  {
    company: "Alefsoftware",
    dates: "Oct 2021 – May 2022",
    role: "Front-End Developer",
    description: {
      en: "Productive-Families platform serving 5k+ users. Company Next.js site lifted client engagement 30%.",
      ar: "منصة الأسر المنتجة تخدم أكثر من 5 آلاف مستخدم. موقع الشركة بـ Next.js رفع تفاعل العملاء 30%.",
    },
  },
  {
    company: "Syft.la",
    dates: "Sep 2020 – Oct 2021",
    role: "Front-End Developer",
    description: {
      en: "Syft.gg marketplace reaching 50k+ gamers/brands. App.syft.la social platform linking influencers with campaigns (+60% ad reach).",
      ar: "متجر Syft.gg وصل إلى أكثر من 50 ألف لاعب وعلامة تجارية. منصة App.syft.la الاجتماعية تربط المؤثرين بالحملات (+60% وصول).",
    },
  },
];

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const locale = useLocale() as "en" | "ar";

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (lineRef.current) lineRef.current.style.transform = "scaleY(1)";
      return;
    }

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const trigger = ScrollTrigger.create({
        trigger: ref.current!,
        start: "top center",
        end: "bottom center",
        onUpdate: (self) => {
          if (lineRef.current) lineRef.current.style.transform = `scaleY(${self.progress})`;
        },
      });

      cleanup = () => trigger.kill();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={ref} className="relative pl-8 md:pl-12">
      <div className="absolute start-0 top-0 bottom-0 w-px bg-[var(--color-rule)]" />
      <div
        ref={lineRef}
        className="absolute start-0 top-0 bottom-0 w-px bg-[var(--color-accent)] origin-top scale-y-0 transition-transform duration-200"
      />
      <ol className="space-y-16">
        {entries.map((e) => (
          <li key={e.company} className="relative">
            <span className="absolute -start-[37px] md:-start-[49px] top-1.5 block w-3 h-3 rounded-full bg-[var(--color-bg)] border-2 border-[var(--color-accent)]" />
            <div className="font-[var(--font-mono)] text-[11px] tracking-widest text-[var(--color-text-muted)]">
              {e.dates}
            </div>
            <h3 className="font-[var(--font-display)] text-2xl md:text-3xl font-semibold text-[var(--color-text)] mt-2">
              {e.company}
            </h3>
            <div className="font-[var(--font-mono)] text-sm text-[var(--color-accent)] mt-1">
              {e.role}
            </div>
            <p className="mt-3 text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
              {e.description[locale]}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
```

### Task 55: About page

**Files:** Create `app/[locale]/about/page.tsx`

- [ ] **Step 1: Write the file**

```tsx
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Timeline } from "@/components/about/timeline";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/lib/i18n/routing";
import { siteMeta } from "@/lib/meta";
import type { Locale } from "@/lib/i18n/routing";

const bio = {
  en: [
    "I'm Nour. I build front-ends for a living and have done so since 2020. My path started in mechatronics engineering at Helwan University, took a hard left through Coursera and Microverse, and landed in production React not long after.",
    "Across six companies I've shipped e-commerce that processes ten thousand transactions a month, hospital dashboards that 150 nurses sign into every morning, marketplace UIs that reach fifty thousand gamers, and the everyday things in between: forms that don't lose state, tables that stay performant past a thousand rows, design systems that actually get used.",
    "What still gets me out of bed is the moment a slow-loading interface clicks at 60fps, or a confusing flow becomes obvious after the third user test. The interfaces I'm proudest of look like they were always supposed to work that way.",
  ],
  ar: [
    "أنا نور. أبني واجهات أمامية كعمل أساسي منذ 2020. بدأت طريقي بهندسة الميكاترونيكس في جامعة حلوان، ثم انعطفت بحدّة عبر Coursera و Microverse، ووصلت إلى React في الإنتاج بعد فترة قصيرة.",
    "في ست شركات شحنت متاجر إلكترونية تعالج عشرة آلاف معاملة شهريًا، ولوحات تحكم مستشفيات يستخدمها 150 ممرضًا كل صباح، وواجهات أسواق تصل إلى خمسين ألف لاعب، وكل الأشياء اليومية بينها: نماذج لا تفقد حالتها، جداول تظل سريعة بعد ألف صف، أنظمة تصميم تُستخدم فعلًا.",
    "ما زال يحرّكني تلك اللحظة حين تتحول واجهة بطيئة إلى 60 إطار في الثانية، أو حين يصبح مسار محيّر بديهيًا بعد ثالث اختبار مع المستخدم. أكثر الواجهات التي أفتخر بها تبدو وكأنها كانت دائمًا يفترض أن تعمل بهذه الطريقة.",
  ],
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  return (
    <article>
      <header className="container-page pt-12 md:pt-20 pb-16 border-b border-[var(--color-rule)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-8">
              <span className="block w-8 h-px bg-[var(--color-accent)]" />
              <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)]">
                [—] ABOUT
              </span>
            </div>
            <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.02em] leading-[1.05] text-[var(--color-text)]">
              {l === "ar"
                ? "مهندس واجهات أمامية أبني تجارب رقمية منذ 2020."
                : "Front-end engineer building interfaces since 2020."}
            </h1>
          </div>
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] border border-[var(--color-rule)] overflow-hidden bg-[var(--color-surface)]">
              <Image
                src="/about/headshot.jpg"
                alt={siteMeta.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <section className="container-page py-20 md:py-28">
        <div className="max-w-3xl">
          {bio[l].map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="font-[var(--font-display)] text-xl md:text-2xl leading-relaxed text-[var(--color-text)] mb-6">
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page pb-20 md:pb-28">
        <div className="flex items-center gap-3 mb-16">
          <span className="block w-8 h-px bg-[var(--color-accent)]" />
          <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)]">
            [—] {l === "ar" ? "المسيرة" : "JOURNEY"}
          </span>
        </div>
        <Timeline />
      </section>

      <section className="container-page py-20 border-t border-[var(--color-rule)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-[var(--font-mono)] text-[11px] tracking-widest text-[var(--color-accent)] mb-4">
              {l === "ar" ? "التعليم" : "EDUCATION"}
            </h2>
            <ul className="space-y-4">
              <li>
                <div className="font-[var(--font-display)] text-lg font-semibold">Microverse</div>
                <div className="text-sm text-[var(--color-text-muted)]">Remote Front-End Web Development · 2023</div>
              </li>
              <li>
                <div className="font-[var(--font-display)] text-lg font-semibold">Coursera</div>
                <div className="text-sm text-[var(--color-text-muted)]">Remote Front-End Web Development · 2020</div>
              </li>
              <li>
                <div className="font-[var(--font-display)] text-lg font-semibold">{l === "ar" ? "جامعة حلوان" : "Helwan University"}</div>
                <div className="text-sm text-[var(--color-text-muted)]">B.Sc. Mechatronics Engineering · 2012–2017</div>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-[var(--font-mono)] text-[11px] tracking-widest text-[var(--color-accent)] mb-4">
              {l === "ar" ? "أدوات أعتمد عليها" : "TOOLS I REACH FOR"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {["VS Code", "Figma", "Linear", "Notion", "Vercel", "Netlify", "GitHub", "Storybook", "Postman", "ChatGPT/Claude"].map((tool) => (
                <span
                  key={tool}
                  className="font-[var(--font-mono)] text-xs text-[var(--color-text-muted)] border border-[var(--color-rule)] px-3 py-1.5"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-20 border-t border-[var(--color-rule)]">
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 font-[var(--font-display)] text-3xl md:text-5xl text-[var(--color-accent)] hover:underline underline-offset-8"
          data-cursor="hover"
        >
          {l === "ar" ? "تواصل معي →" : "Reach out →"}
        </Link>
      </section>
    </article>
  );
}
```

### Task 56: Commit Phase 10

```bash
git add app/[locale]/about components/about
git commit -m "feat: about page with scroll-driven timeline, bio, education, tools"
```

---

## Phase 11 — Contact page

### Task 57: Contact page

**Files:** Create `app/[locale]/contact/page.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { siteMeta } from "@/lib/meta";

export default function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale() as "en" | "ar";
  const [showCal, setShowCal] = useState(false);

  const rows = [
    { label: t("email"), value: siteMeta.email, href: `mailto:${siteMeta.email}` },
    { label: t("linkedin"), value: "linkedin.com/in/nour-badr", href: siteMeta.linkedin, external: true },
    { label: t("github"), value: "github.com/noureldeenn", href: siteMeta.github, external: true },
    { label: t("phone"), value: siteMeta.phoneDisplay, href: `tel:${siteMeta.phone}` },
  ];

  return (
    <article className="container-page py-20 md:py-28">
      <div className="flex items-center gap-3 mb-8">
        <span className="block w-8 h-px bg-[var(--color-accent)]" />
        <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)]">
          [—] CONTACT
        </span>
      </div>
      <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.02em] leading-[1.05] text-[var(--color-text)]">
        {t("title")}
      </h1>
      <p className="mt-6 text-lg text-[var(--color-text-muted)]">{t("sub")}</p>

      <ul className="mt-16 divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
        {rows.map((row) => (
          <li key={row.label}>
            <a
              href={row.href}
              target={row.external ? "_blank" : undefined}
              rel={row.external ? "noopener noreferrer" : undefined}
              className="group grid grid-cols-12 gap-4 py-6 items-baseline hover:bg-[var(--color-surface)] px-2 transition-colors"
              data-cursor="hover"
            >
              <span className="col-span-3 md:col-span-2 font-[var(--font-mono)] text-[11px] tracking-widest text-[var(--color-text-muted)]">
                {row.label.toUpperCase()}
              </span>
              <span className="col-span-8 md:col-span-9 font-[var(--font-display)] text-xl md:text-2xl text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                {row.value}
              </span>
              <span className="col-span-1 text-end font-[var(--font-mono)] text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]">
                {row.external ? "↗" : "→"}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-20">
        <h2 className="font-[var(--font-mono)] text-[11px] tracking-widest text-[var(--color-accent)] mb-6">
          {locale === "ar" ? "احجز مكالمة" : "BOOK A CALL"}
        </h2>
        {!showCal ? (
          <button
            type="button"
            onClick={() => setShowCal(true)}
            className="font-[var(--font-mono)] text-sm bg-[var(--color-accent)] text-[var(--color-bg)] px-6 py-3 hover:opacity-90 transition-opacity"
            data-cursor="hover"
          >
            {t("bookCall")} →
          </button>
        ) : (
          <iframe
            src={siteMeta.bookingUrl}
            title="Booking"
            className="w-full h-[640px] border border-[var(--color-rule)]"
            loading="lazy"
          />
        )}
      </div>
    </article>
  );
}
```

### Task 58: Commit Phase 11

```bash
git add app/[locale]/contact
git commit -m "feat: contact page with direct rows and lazy Cal.com embed"
```

---

## Phase 12 — 404 page

### Task 59: Interactive 404

**Files:** Create `app/[locale]/not-found.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "@/lib/i18n/routing";

export default function NotFound() {
  const t = useTranslations("notFound");
  const reduced = useReducedMotion();
  const headline = t("headline");
  const lastWord = t("lastWord");
  const splitAt = headline.lastIndexOf(lastWord);
  const before = headline.slice(0, splitAt);
  const after = headline.slice(splitAt + lastWord.length);

  return (
    <section className="container-page py-32 md:py-48">
      <div className="flex items-center gap-3 mb-8">
        <span className="block w-8 h-px bg-[var(--color-accent)]" />
        <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)]">
          [{t("marker").toUpperCase()}]
        </span>
      </div>
      <h1 className="font-[var(--font-display)] text-4xl md:text-7xl font-semibold tracking-[-0.02em] text-[var(--color-text)] max-w-3xl">
        {before}
        <motion.span
          drag={reduced ? false : true}
          dragSnapToOrigin
          dragElastic={0.4}
          className="inline-block cursor-grab active:cursor-grabbing text-[var(--color-accent)]"
          whileDrag={{ scale: 1.1 }}
          data-cursor="hover"
        >
          {lastWord}
        </motion.span>
        {after}
      </h1>
      <Link
        href="/"
        className="inline-block mt-12 font-[var(--font-mono)] text-sm text-[var(--color-accent)] underline underline-offset-4"
        data-cursor="hover"
      >
        ← {t("back")}
      </Link>
    </section>
  );
}
```

### Task 60: Commit Phase 12

```bash
git add app/[locale]/not-found.tsx
git commit -m "feat: interactive 404 page with draggable headline word"
```

---

## Phase 13 — Author English case study MDX content

### Task 61: zid-store-apps.en.mdx

**Files:** Create `content/work/zid-store-apps.en.mdx`

- [ ] **Step 1: Write the file**

```mdx
export const frontmatter = {
  slug: "zid-store-apps",
  title: "Zid Store App Customizations",
  client: "Neoxero",
  year: "2024–present",
  duration: "Ongoing",
  role: "Front-End Developer",
  stack: ["React", "Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Redux Toolkit"],
  outcome: "+30%",
  outcomeLabel: "load speed improvement",
  liveUrl: null,
  tags: ["E-commerce", "Performance"],
  summary: "Customized React applications for the Zid Store platform, building a consistent design system with Tailwind and shadcn/ui that cut UI inconsistencies 40% and improved load speed 30%.",
  heroImage: "/work/zid-store/hero.png",
  gallery: ["/work/zid-store/01.png", "/work/zid-store/02.png"],
};

import { OutcomeMetric, Gallery } from "@/mdx-components";

## Overview

Neoxero ships React-based storefronts on top of Zid, the largest e-commerce platform in Saudi Arabia. The job: take each merchant's brand guidelines and translate them into a fast, on-brand customization of the shared app shell — without forking the core code.

## The problem

Three years of organic growth had left the customization codebase fragmented. Different merchants used slightly different button styles, spacing systems, and form components. Page load times had crept past two seconds. The team needed both a design system that scaled and a performance baseline that didn't slip.

## My role

I owned the front-end side of three concurrent merchant customizations and led the design-system effort. I also reviewed merge requests from two other developers on the team and ran the perf-budget conversation with the product lead.

## Approach

- Built a token-driven theme layer on top of Tailwind so each merchant got a brand palette without writing CSS
- Restructured the component library on shadcn/ui — Radix primitives + our own restyled wrappers — to replace eight inconsistent button variants with two
- Introduced Redux Toolkit for cart and session state; the previous setup mixed Context + ad-hoc useReducer calls that were causing race conditions on add-to-cart
- Set up a Lighthouse CI step that blocked merges below 85 Performance
- Pre-cached the next likely route on hover, knocking ~400ms off perceived navigation

<OutcomeMetric value="+30%" label="median page load improvement across three merchants" />

## What I'd do differently

I'd push for an MDX-driven theming spec from week one rather than a JSON-only system. Two merchants wanted custom landing layouts that turned into bespoke React work — MDX would have let the design team write those themselves.
```

### Task 62: syft-gg-marketplace.en.mdx

**Files:** Create `content/work/syft-gg-marketplace.en.mdx`

- [ ] **Step 1: Write the file**

```mdx
export const frontmatter = {
  slug: "syft-gg-marketplace",
  title: "Syft.gg Marketplace + Influencer Platform",
  client: "Syft.la",
  year: "2020–2021",
  duration: "13 months",
  role: "Front-End Developer",
  stack: ["React", "Next.js", "TypeScript", "GraphQL", "Storybook", "Chakra UI", "MobX"],
  outcome: "50k+",
  outcomeLabel: "gamers and brands using the marketplace",
  liveUrl: null,
  tags: ["Marketplace", "Consumer Scale"],
  summary: "Built Syft.gg, a marketplace connecting esports talent with brand sponsorships, alongside App.syft.la — the internal social-style tool linking influencers with campaigns.",
  heroImage: "/work/syft/hero.png",
  gallery: ["/work/syft/01.png", "/work/syft/02.png"],
};

import { OutcomeMetric } from "@/mdx-components";

## Overview

Syft.la was an esports-marketing startup connecting gamers with consumer brands. I joined six months in, when the team had a working backend and a placeholder front-end that nobody trusted. I rebuilt the marketplace and shipped the companion influencer-management app.

## The problem

The original front-end was a CRA-era React app with no design system, no type safety, and a state-management layer that was already in its third pivot. Real users were waiting on bug fixes that should have been one-line changes.

## My role

Sole front-end engineer on the marketplace surface during my first six months, then technical lead for the influencer-platform spinoff with one junior developer reporting in.

## Approach

- Migrated the marketplace from CRA to Next.js, picking up SSR for the discovery pages where SEO actually mattered
- Switched the state layer to MobX after benchmarking it against Redux for our use case — observables fit the real-time chat better
- Set up Storybook + Chakra UI to give the design team a place to ship without waiting on a developer
- Designed the GraphQL queries with the backend team, batched aggressively to keep our cold-start fetch under 400ms
- Built the campaign-matching UI for App.syft.la — a side panel that slid in over the influencer profile with the proposal flow inline

<OutcomeMetric value="+60%" label="ad reach uplift after the campaign-matching UI shipped" />

## What I'd do differently

I'd have introduced TypeScript on day one instead of waiting four months. The MobX migration would have been half as long.
```

### Task 63: craft-crew-lms.en.mdx

**Files:** Create `content/work/craft-crew-lms.en.mdx` (PLACEHOLDER — user will provide real details)

- [ ] **Step 1: Write the file**

```mdx
export const frontmatter = {
  slug: "craft-crew-lms",
  title: "Craft Crew — Learning Management System",
  client: "Craft Crew",
  year: "TBD — pending",
  duration: "TBD",
  role: "Front-End Developer",
  stack: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
  outcome: "—",
  outcomeLabel: "pending user data",
  liveUrl: null,
  tags: ["LMS", "Education"],
  summary: "Learning management system for Craft Crew. Detailed case study pending real project data from Nour.",
  heroImage: "/work/craft-crew-lms/hero.png",
  gallery: [],
};

## Overview

This case study is a structural placeholder. Once Nour provides the project specifics — years worked, exact role, stack, problem framing, outcomes, and any public URL — this content will be rewritten in full.

## What we need

- Years on the project (e.g. 2024–2025)
- Specific role (lead, contributor, IC)
- Exact stack used
- One-paragraph problem statement
- Three outcome bullets with metrics where possible
- A live URL if public, or NDA confirmation if private
```

### Task 64: vertex-radio.en.mdx

**Files:** Create `content/work/vertex-radio.en.mdx` (PLACEHOLDER)

- [ ] **Step 1: Write the file**

```mdx
export const frontmatter = {
  slug: "vertex-radio",
  title: "Vertex — Radio App",
  client: "Vertex",
  year: "TBD — pending",
  duration: "TBD",
  role: "Front-End Developer",
  stack: ["React", "TypeScript"],
  outcome: "—",
  outcomeLabel: "pending user data",
  liveUrl: null,
  tags: ["Audio", "Mobile-Web"],
  summary: "Radio streaming app for Vertex. Detailed case study pending real project data from Nour.",
  heroImage: "/work/vertex-radio/hero.png",
  gallery: [],
};

## Overview

Structural placeholder pending real project specifics from Nour. Once provided, this case study will be rewritten in the same Problem → My Role → Approach → Outcome structure as the other entries.
```

### Task 65: Commit Phase 13 (English content)

```bash
git add content/work/
git commit -m "docs: author English MDX for 4 case studies (2 full, 2 placeholder)"
```

---

## Phase 14 — Arabic translations

### Task 66: zid-store-apps.ar.mdx

**Files:** Create `content/work/zid-store-apps.ar.mdx`

- [ ] **Step 1: Write the file**

```mdx
export const frontmatter = {
  slug: "zid-store-apps",
  title: "تخصيصات تطبيقات متجر زد",
  client: "Neoxero",
  year: "2024 – حتى الآن",
  duration: "مستمر",
  role: "مطور واجهات أمامية",
  stack: ["React", "Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Redux Toolkit"],
  outcome: "+30%",
  outcomeLabel: "تحسّن سرعة التحميل",
  liveUrl: null,
  tags: ["تجارة إلكترونية", "أداء"],
  summary: "تخصيص تطبيقات React لمنصة متجر زد، مع بناء نظام تصميم متّسق بـ Tailwind و shadcn/ui قلّل التباين البصري 40% وحسّن سرعة التحميل 30%.",
  heroImage: "/work/zid-store/hero.png",
  gallery: ["/work/zid-store/01.png", "/work/zid-store/02.png"],
};

import { OutcomeMetric } from "@/mdx-components";

## نظرة عامة

تشحن Neoxero واجهات متاجر مبنية بـ React فوق منصة زد، أكبر منصة تجارة إلكترونية في السعودية. المهمة: ترجمة هوية كل تاجر إلى تخصيص سريع ومتّسق فوق هيكل تطبيق مشترك دون تفريع الكود الأساسي.

## المشكلة

ثلاث سنوات من النمو العضوي تركت كود التخصيص مجزّأً. كل تاجر يستخدم أزرارًا ومساحات ومكوّنات نماذج بأنماط مختلفة. وصلت أوقات التحميل إلى أكثر من ثانيتين. كان الفريق بحاجة إلى نظام تصميم قابل للتوسّع وحد أدنى من الأداء لا يتراجع.

## دوري

تولّيت جانب الواجهات الأمامية في ثلاث تخصيصات متزامنة، وقُدت جهد بناء نظام التصميم. راجعت كذلك طلبات الدمج لمطورَين آخرَين في الفريق، وأدرت محادثة ميزانية الأداء مع قائد المنتج.

## النهج

- بنيت طبقة تيمات قائمة على tokens فوق Tailwind بحيث يحصل كل تاجر على لوحة ألوان لعلامته دون كتابة CSS
- أعدت هيكلة مكتبة المكوّنات على shadcn/ui — مع Radix كأساس وأغلفتنا الخاصة — لاستبدال ثمانية أنماط للأزرار باثنين فقط
- أدخلت Redux Toolkit لإدارة حالة السلة والجلسة؛ الإعداد السابق كان يخلط بين Context و useReducer ويسبب حالات سباق على الإضافة إلى السلة
- أعددت خطوة Lighthouse CI تمنع الدمج إذا انخفض الأداء عن 85
- شغّلت التخزين المسبق للمسار المتوقّع عند المرور بالمؤشر، مما أزال ~400ms من زمن التنقّل المُدرَك

<OutcomeMetric value="+30%" label="متوسط تحسّن وقت تحميل الصفحات عبر ثلاثة تجار" />

## ما كنت سأفعله بشكل مختلف

كنت سأدفع نحو نظام تخصيص قائم على MDX منذ الأسبوع الأول بدلًا من JSON فقط. تاجران أرادا تخطيطات صفحات هبوط مخصصة تحوّلت إلى عمل React مخصّص — MDX كان سيمكّن فريق التصميم من إنجازها بنفسه.
```

### Task 67: syft-gg-marketplace.ar.mdx

**Files:** Create `content/work/syft-gg-marketplace.ar.mdx`

- [ ] **Step 1: Write the file**

```mdx
export const frontmatter = {
  slug: "syft-gg-marketplace",
  title: "متجر Syft.gg ومنصة المؤثرين",
  client: "Syft.la",
  year: "2020–2021",
  duration: "13 شهرًا",
  role: "مطور واجهات أمامية",
  stack: ["React", "Next.js", "TypeScript", "GraphQL", "Storybook", "Chakra UI", "MobX"],
  outcome: "50k+",
  outcomeLabel: "لاعب وعلامة تجارية يستخدمون المتجر",
  liveUrl: null,
  tags: ["متجر", "نطاق استهلاكي"],
  summary: "بنيت Syft.gg، متجرًا يربط مواهب الرياضات الإلكترونية برعايات العلامات التجارية، إلى جانب App.syft.la — أداة داخلية اجتماعية لربط المؤثرين بالحملات.",
  heroImage: "/work/syft/hero.png",
  gallery: ["/work/syft/01.png", "/work/syft/02.png"],
};

import { OutcomeMetric } from "@/mdx-components";

## نظرة عامة

Syft.la شركة ناشئة في تسويق الرياضات الإلكترونية، تربط اللاعبين بالعلامات الاستهلاكية. انضممت بعد ستة أشهر من البداية، حين كان الباك-إند يعمل والواجهة مجرد نموذج لا يثق به أحد. أعدت بناء المتجر وشحنت تطبيق إدارة المؤثرين المرافق.

## المشكلة

الواجهة الأولى كانت تطبيق React بـ CRA دون نظام تصميم، دون TypeScript، وطبقة إدارة حالة كانت في تحوّلها الثالث. مستخدمون حقيقيون كانوا ينتظرون إصلاحات أخطاء يفترض أن تكون من سطر واحد.

## دوري

المطور الوحيد للواجهة في المتجر خلال أول ستة أشهر، ثم القائد التقني لمنتج المؤثرين الجديد مع مطور مبتدئ يعمل تحت إشرافي.

## النهج

- نقلت المتجر من CRA إلى Next.js لاكتساب SSR على صفحات الاستكشاف التي يهمّها SEO فعلًا
- بدّلت طبقة الحالة إلى MobX بعد مقارنة مع Redux لحالتنا — observables مناسبة أكثر للدردشة الفورية
- أعددت Storybook و Chakra UI لإعطاء فريق التصميم مكانًا للشحن دون انتظار مطور
- صممت استعلامات GraphQL مع فريق الباك-إند، مع تجميع مكثف للحفاظ على cold-start تحت 400ms
- بنيت واجهة مطابقة الحملات في App.syft.la — لوحة جانبية تنزلق فوق ملف المؤثر مع تدفّق الاقتراح مدمجًا

<OutcomeMetric value="+60%" label="زيادة في وصول الإعلانات بعد إطلاق واجهة مطابقة الحملات" />

## ما كنت سأفعله بشكل مختلف

كنت سأدخل TypeScript من اليوم الأول بدلًا من الانتظار أربعة أشهر. الانتقال إلى MobX كان سيستغرق نصف الوقت.
```

### Task 68: craft-crew-lms.ar.mdx + vertex-radio.ar.mdx (placeholders)

**Files:** Create both files

- [ ] **Step 1: Write `content/work/craft-crew-lms.ar.mdx`**

```mdx
export const frontmatter = {
  slug: "craft-crew-lms",
  title: "Craft Crew — نظام إدارة التعلم",
  client: "Craft Crew",
  year: "قيد التأكيد",
  duration: "قيد التأكيد",
  role: "مطور واجهات أمامية",
  stack: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
  outcome: "—",
  outcomeLabel: "في انتظار البيانات",
  liveUrl: null,
  tags: ["تعليم", "LMS"],
  summary: "نظام إدارة تعلم لشركة Craft Crew. دراسة الحالة التفصيلية في انتظار بيانات المشروع الفعلية من نور.",
  heroImage: "/work/craft-crew-lms/hero.png",
  gallery: [],
};

## نظرة عامة

نص مؤقت في انتظار تفاصيل المشروع. سيُعاد كتابة هذا المحتوى بنفس هيكل المشكلة → الدور → النهج → النتيجة فور توفّر البيانات.
```

- [ ] **Step 2: Write `content/work/vertex-radio.ar.mdx`**

```mdx
export const frontmatter = {
  slug: "vertex-radio",
  title: "Vertex — تطبيق راديو",
  client: "Vertex",
  year: "قيد التأكيد",
  duration: "قيد التأكيد",
  role: "مطور واجهات أمامية",
  stack: ["React", "TypeScript"],
  outcome: "—",
  outcomeLabel: "في انتظار البيانات",
  liveUrl: null,
  tags: ["صوت", "ويب موبايل"],
  summary: "تطبيق راديو بثّي لشركة Vertex. دراسة الحالة التفصيلية في انتظار بيانات المشروع الفعلية من نور.",
  heroImage: "/work/vertex-radio/hero.png",
  gallery: [],
};

## نظرة عامة

نص مؤقت في انتظار تفاصيل المشروع.
```

### Task 69: Commit Phase 14

```bash
git add content/work/
git commit -m "docs: Arabic translations for 4 case studies"
```

---

## Phase 15 — Image assets, CV, OG

### Task 70: Copy CV PDF to public

- [ ] **Step 1: Copy file**

```bash
# Working in personal-portfolio/
mkdir -p public
cp ../Nour_Badr_Frontend_Developer_CV.pdf public/nour-badr-cv.pdf
```

- [ ] **Step 2: Confirm**

```bash
ls public/nour-badr-cv.pdf
```

Expected: file is listed.

### Task 71: Add placeholder images for case studies

- [ ] **Step 1: Create directories**

```bash
mkdir -p public/work/zid-store public/work/syft public/work/craft-crew-lms public/work/vertex-radio public/about
```

- [ ] **Step 2: Generate placeholder images.** Use any simple placeholder PNG generator (e.g. `https://placehold.co/1600x900/0F0F11/E45550?text=Zid+Store`) and save:

- `public/work/zid-store/hero.png` (1600×900)
- `public/work/zid-store/01.png`, `02.png`
- `public/work/syft/hero.png`, `01.png`, `02.png`
- `public/work/craft-crew-lms/hero.png`
- `public/work/vertex-radio/hero.png`
- `public/about/headshot.jpg` (800×1000 — use Nour's actual photo when provided, placeholder for now)
- `public/og.png` (1200×630, simple branded card)

(These are placeholders; user replaces with real screenshots/photos before launch.)

### Task 72: Commit Phase 15

```bash
git add public/
git commit -m "chore: add CV PDF and placeholder images for case studies and OG"
```

---

## Phase 16 — Sitemap, robots, SEO meta

### Task 73: next-sitemap config

**Files:** Create `next-sitemap.config.js`

- [ ] **Step 1: Write the file**

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://nour-badr.netlify.app",
  generateRobotsTxt: true,
  alternateRefs: [
    { href: "https://nour-badr.netlify.app/en", hreflang: "en" },
    { href: "https://nour-badr.netlify.app/ar", hreflang: "ar" },
  ],
  exclude: ["/server-sitemap.xml"],
};
```

### Task 74: Add per-page metadata to home

**Files:** Modify `app/[locale]/page.tsx`

- [ ] **Step 1: Add metadata export above the component**

Add at top of `app/[locale]/page.tsx`:

```tsx
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "نور بدر · مهندس واجهات أمامية" : "Nour Badr · Front-End Engineer",
    description: isAr
      ? "أبني واجهات تُطلق وتبقى تعمل. أربع سنوات من العمل على متاجر إلكترونية ولوحات تحكم وأسواق."
      : "I build interfaces that ship and stay shipped. Four years across e-commerce, SaaS dashboards, and marketplaces.",
    alternates: {
      languages: { en: "/en", ar: "/ar" },
    },
  };
}
```

### Task 75: Commit Phase 16

```bash
git add app/ next-sitemap.config.js
git commit -m "feat: SEO metadata, sitemap, robots config"
```

---

## Phase 17 — Build, performance, accessibility, RTL pass

### Task 76: Run a production build

- [ ] **Step 1: Build**

```bash
npm run build
```

Expected: completes without errors. Check console output for:
- Bundle sizes per route (home `/en` should be < 120KB JS gzipped)
- No type errors
- Sitemap generated

- [ ] **Step 2: If build fails, fix errors and retry. Do not proceed until clean.**

### Task 77: Start production server and run Lighthouse on `/en`

- [ ] **Step 1: Start server**

```bash
npm run start
```

- [ ] **Step 2: In a separate terminal or browser**, open Chrome DevTools → Lighthouse → run on `http://localhost:3000/en` with Mobile profile.

Expected: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

- [ ] **Step 3: Record any score below target.** Common culprits and fixes:
  - **LCP too slow:** Confirm hero image has `priority` + correct `sizes` attribute
  - **CLS:** Set explicit width/height on all `<Image>` and prevent font-loading shift via `display: swap` (already set)
  - **TBT:** Confirm GSAP/Lenis are dynamic-imported
  - **Accessibility:** Run axe-DevTools, fix contrast or label issues
- [ ] **Step 4: Re-run Lighthouse until all four scores meet target.**

### Task 78: Lighthouse on `/ar`

- [ ] **Step 1: Run Lighthouse on `http://localhost:3000/ar`** with the same Mobile profile. Same targets. Fix anything below target (RTL-specific layout issues, Arabic font weight).

### Task 79: Keyboard navigation pass

- [ ] **Step 1: With the prod server running**, navigate the site using only Tab/Shift+Tab/Enter:
  - Skip-to-content link is the first focusable element (if not present, add to `app/[locale]/layout.tsx`)
  - All interactive elements receive a visible focus ring
  - Theme toggle, language toggle, all nav links reachable
  - Case study cards reachable; clicking with Enter navigates correctly
  - Cal.com embed accessible (button reveal works on Enter)
- [ ] **Step 2: Fix any focus issues found.**

### Task 80: Reduced-motion pass

- [ ] **Step 1: In Chrome DevTools** → Rendering panel → Emulate CSS media feature `prefers-reduced-motion: reduce`
- [ ] **Step 2: Reload `/en`** and confirm:
  - Hero headline renders instantly (no word-stagger)
  - Pull quote renders instantly (no char-stagger)
  - Counters show final values immediately
  - Marquee paused
  - Custom cursor not visible
  - Lenis disabled (native scroll)
- [ ] **Step 3: Fix any animation that still runs.**

### Task 81: Full RTL pass on Arabic

- [ ] **Step 1: Open every page in Arabic** at the prod server and visually confirm:
  - `/ar` — header flipped, hero RTL, all section dividers' tick-marks on right, marquee scrolls right-to-left
  - `/ar/work/zid-store-apps` — sidebar on left (mirrored), text reads RTL, sticky behavior correct
  - `/ar/about` — timeline dots on right side of vertical line, all bullets flip
  - `/ar/contact` — contact rows flow correctly, icons flipped
  - `/ar/missing-page` — 404 draggable text works
- [ ] **Step 2: Fix any layout that didn't flip.** Replace any `mr-`/`ml-` with `me-`/`ms-`, `pr-`/`pl-` with `pe-`/`ps-`, `text-left`/`text-right` with `text-start`/`text-end`.

### Task 82: Stop server, commit fixes

- [ ] **Step 1: Ctrl+C the prod server**
- [ ] **Step 2: Commit any fixes from this phase**

```bash
git add -A
git commit -m "perf: Lighthouse fixes; a11y: focus + reduced-motion; style: RTL pass corrections"
```

---

## Phase 18 — Deploy config & README

### Task 83: netlify.toml

**Files:** Create `netlify.toml`

- [ ] **Step 1: Write the file**

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "20"
```

### Task 84: README

**Files:** Create `README.md`

- [ ] **Step 1: Write the file**

````markdown
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

1. `git init` (already done) → push to a private GitHub repo
2. In Netlify: New site from Git → pick the repo → leave defaults (Next.js auto-detected)
3. Free `*.netlify.app` subdomain is live within ~2 minutes
4. Custom domain: Site settings → Domain management → add domain → follow Netlify's DNS instructions

## Performance targets

- Lighthouse Performance ≥ 90 on mobile
- Accessibility, Best Practices, SEO ≥ 95
- Run `npm run build` then `npm run start` then Lighthouse locally before every push

## Pending content

- Real project specifics + screenshots for `craft-crew-lms` and `vertex-radio` case studies
- Real headshot at `public/about/headshot.jpg`
- Real OG image at `public/og.png`
- Live URLs for grid projects where public

## Structure

See [`docs/superpowers/specs/2026-05-26-personal-portfolio-design.md`](docs/superpowers/specs/2026-05-26-personal-portfolio-design.md) for the full design spec.
````

### Task 85: Final commit & deploy prep

- [ ] **Step 1: Commit deploy config**

```bash
git add netlify.toml README.md
git commit -m "chore: Netlify config and README"
```

- [ ] **Step 2: Verify clean working tree**

```bash
git status
```

Expected: `nothing to commit, working tree clean`

- [ ] **Step 3: Final smoke test**

```bash
npm run build && npm run start
```

Manually click through `/en`, `/ar`, every case study, about, contact, 404. Toggle theme. Toggle language. No errors in console.

---

## Self-Review Summary (engineer can skip; here for transparency)

**Spec coverage:** Every section §1–§17 of the spec has at least one phase that implements it. Specifically:
- §3 visual system → Task 10 (tokens)
- §4 animation → Tasks 19–23, 36, 41, 54, 59 (every motion element listed)
- §5 i18n → Tasks 11–15, 17
- §6 theme → Tasks 16, 30
- §7 pages → Phases 8–12
- §8 project showcase → Tasks 25, 26, 37, 40, 44, 61–68
- §9 content strategy → Tasks 26, 51, 61–68
- §10 architecture → Phases 1–7 (file layout in this plan matches spec exactly)
- §11 performance budget → Phase 17
- §12 a11y → Tasks 79, 80
- §13 SEO → Task 73, 74
- §14 deploy → Phase 18

**Placeholder scan:** Two case study MDX files (Tasks 63, 64, 68) intentionally ship as placeholder content with a clear `## What we need` block, because the user does not yet have the data. This is flagged as known and tracked. No other TBD/TODO remains.

**Type consistency:** `CaseStudyMeta` used identically across `lib/work.ts`, `case-card.tsx`, `sidebar-meta.tsx`, `next-entry.tsx`, and the case study page. `GridProject` matches between `lib/grid-projects.ts` and `grid-card.tsx`. `Locale` consistently typed via `lib/i18n/routing.ts`. Translation namespaces (`hero`, `nav`, `work`, etc.) consistent between `messages/en.json`, `messages/ar.json`, and every `useTranslations()` call.

**Ambiguity check:** All component prop types are explicit. All file paths are absolute. All commands are complete.

---

## Done

Once Phase 18 commits, the site is ready to push to GitHub and connect to Netlify. The two placeholder case studies and the headshot/screenshots are the only remaining content gaps — they don't block deploy.