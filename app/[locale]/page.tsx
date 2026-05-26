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