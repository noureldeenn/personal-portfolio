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