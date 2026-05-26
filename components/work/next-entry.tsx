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