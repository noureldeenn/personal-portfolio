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