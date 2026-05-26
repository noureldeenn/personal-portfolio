"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef } from "react";
import { Link } from "@/lib/i18n/routing";

function Counter({ to, suffix = "+" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const value = useMotionValue(0);
  const rounded = useTransform(value, (v) => Math.round(v).toString() + suffix);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      value.set(to);
      return;
    }
    const controls = animate(value, to, { duration: 1.4, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, to, reduced, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function AboutStrip() {
  const t = useTranslations("stats");
  const tSec = useTranslations("sections");
  const locale = useLocale() as "en" | "ar";

  const bio =
    locale === "ar"
      ? "أبني واجهات منذ 2020. عملت في ثماني شركات عبر التجارة الإلكترونية ولوحات SaaS والأسواق ولوحات الرعاية الصحية ومنصات التعليم وتطبيقات الصوت. ما زلت أؤمن بأن السرعة والوضوح وأدق التفاصيل البصرية هي ما يفرّق المنتج الجيد عن العظيم."
      : "I've been building interfaces since 2020. Eight companies across e-commerce, SaaS dashboards, marketplaces, healthcare, learning platforms, and audio apps. I still believe speed, clarity, and the smallest visual details are what separate a good product from a great one.";

  return (
    <section
      id="about-strip"
      className="relative py-20 md:py-28 border-t border-[var(--color-rule)]"
    >
      <div className="container-page">
        <div className="flex items-center gap-3 mb-12">
          <span className="block w-8 h-px bg-[var(--color-accent)]" />
          <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)]">
            [02] {tSec("about").toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <p className="font-[var(--font-display)] text-2xl md:text-3xl leading-snug text-[var(--color-text)] max-w-2xl">
              {bio}
            </p>
            <div className="mt-8">
              <Link
                href="/about"
                className="font-[var(--font-mono)] text-sm text-[var(--color-accent)] underline underline-offset-4"
                data-cursor="hover"
              >
                {tSec("about")} →
              </Link>
            </div>
          </div>

          <dl className="lg:col-span-5 grid grid-cols-2 gap-px bg-[var(--color-rule)] self-start">
            {[
              { k: t("years"), to: 5 },
              { k: t("companies"), to: 8 },
              { k: t("projects"), to: 30 },
              { k: t("languages"), to: 2, suffix: "" },
            ].map((row) => (
              <div key={row.k} className="bg-[var(--color-bg)] p-6">
                <dt className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)] mb-2">
                  {row.k.toUpperCase()}
                </dt>
                <dd className="font-[var(--font-display)] text-4xl md:text-5xl text-[var(--color-text)]">
                  <Counter to={row.to} suffix={row.suffix ?? "+"} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}