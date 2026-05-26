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