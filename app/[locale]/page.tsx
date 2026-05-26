import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/site/hero";
import { CaseCard } from "@/components/site/case-card";
import { AboutStrip } from "@/components/site/about-strip";
import { SkillsGrid } from "@/components/site/skills-grid";
import { WorkArchive } from "@/components/site/work-archive";
import { PullQuote } from "@/components/site/pull-quote";
import { CompaniesMarquee } from "@/components/site/companies-marquee";
import { CtaBlock } from "@/components/site/cta-block";
import { loadAllCaseStudies } from "@/lib/work";
import type { Locale } from "@/lib/i18n/routing";

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
    alternates: { languages: { en: "/en", ar: "/ar" } },
  };
}

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
          <WorkArchive />
        </div>
      </section>

      <PullQuote />
      <CompaniesMarquee />
      <CtaBlock />
    </>
  );
}