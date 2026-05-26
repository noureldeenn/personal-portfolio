"use client";

import { useTranslations } from "next-intl";
import { siteMeta } from "@/lib/meta";

export default function ContactPage() {
  const t = useTranslations("contact");

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
    </article>
  );
}