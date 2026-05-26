import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { workArchive } from "@/lib/work-archive";

export function WorkArchive() {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("work");

  return (
    <div className="border-t border-[var(--color-rule)]">
      {workArchive.map((entry) => (
        <article
          key={entry.slug}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-10 md:py-12 border-b border-[var(--color-rule)]"
        >
          <header className="lg:col-span-3">
            <h3 className="font-[var(--font-display)] text-2xl md:text-3xl font-semibold text-[var(--color-text)] tracking-tight">
              {entry.company}
            </h3>
            <div className="font-[var(--font-mono)] text-[11px] tracking-widest text-[var(--color-text-muted)] mt-2">
              {entry.period}
            </div>
            {entry.featuredSlug && (
              <Link
                href={`/work/${entry.featuredSlug}`}
                className="inline-block mt-4 font-[var(--font-mono)] text-[11px] tracking-widest text-[var(--color-accent)] underline underline-offset-4"
                data-cursor="hover"
              >
                {t("readEntry").toUpperCase()} →
              </Link>
            )}
          </header>

          <div className="lg:col-span-9">
            {entry.blurb && (
              <p className="text-[var(--color-text-muted)] text-sm md:text-base leading-relaxed mb-6 max-w-3xl">
                {entry.blurb[locale]}
              </p>
            )}

            <dl className="space-y-5">
              {entry.groups.map((group, gi) => (
                <div
                  key={gi}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6"
                >
                  {group.label && (
                    <dt className="md:col-span-3 font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)] pt-1">
                      {group.label[locale].toUpperCase()}
                      <span className="ms-2 text-[var(--color-text-muted)] opacity-60">
                        ({group.projects.length})
                      </span>
                    </dt>
                  )}
                  <dd
                    className={`${group.label ? "md:col-span-9" : "md:col-span-12"} flex flex-wrap gap-2`}
                  >
                    {group.projects.map((p) => (
                      <span
                        key={p.name}
                        className="group inline-flex items-baseline gap-2 font-[var(--font-mono)] text-xs text-[var(--color-text)] border border-[var(--color-rule)] hover:border-[var(--color-accent)] px-3 py-1.5 transition-colors"
                        data-cursor="hover"
                      >
                        {p.name}
                        {p.meta && (
                          <span className="text-[var(--color-text-muted)] text-[10px]">
                            · {p.meta[locale]}
                          </span>
                        )}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </article>
      ))}
    </div>
  );
}