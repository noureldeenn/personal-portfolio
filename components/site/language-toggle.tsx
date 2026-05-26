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