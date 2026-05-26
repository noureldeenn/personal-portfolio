import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/lib/i18n/routing";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { loadCaseStudy, getAdjacent, caseStudySlugs, type CaseStudySlug } from "@/lib/work";
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
  if (!caseStudySlugs.includes(slug as CaseStudySlug)) return {};
  try {
    const { frontmatter } = await loadCaseStudy(slug as CaseStudySlug, locale as Locale);
    return { title: frontmatter.title, description: frontmatter.summary };
  } catch {
    return {};
  }
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (!caseStudySlugs.includes(slug as CaseStudySlug)) notFound();

  const { Content, frontmatter } = await loadCaseStudy(slug as CaseStudySlug, locale as Locale);
  const t = await getTranslations("work");
  const { next } = getAdjacent(slug as CaseStudySlug);
  const entryIdx = caseStudySlugs.indexOf(slug as CaseStudySlug);
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