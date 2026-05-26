"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { siteMeta } from "@/lib/meta";

const container = {
  hidden: { opacity: 1 },
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const word = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  const t = useTranslations("hero");
  const tStats = useTranslations("stats");
  const locale = useLocale() as "en" | "ar";
  const reduced = useReducedMotion();
  const headline = t("headline");
  const words = headline.split(" ");

  return (
    <section className="relative pt-20 md:pt-28 pb-16 md:pb-24">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="block w-8 h-px bg-[var(--color-accent)]" />
              <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)] uppercase">
                {t("kicker")}
              </span>
            </div>

            <motion.h1
              variants={reduced ? undefined : container}
              initial={reduced ? undefined : "hidden"}
              animate={reduced ? undefined : "visible"}
              className="font-[var(--font-display)] text-[2.4rem] sm:text-5xl lg:text-[5rem] leading-[1.05] tracking-[-0.02em] font-semibold text-[var(--color-text)] max-w-4xl"
              aria-label={headline}
            >
              {reduced
                ? headline
                : words.map((w, i) => (
                    <motion.span key={i} variants={word} className="inline-block">
                      {w}
                      {i < words.length - 1 && <span>&nbsp;</span>}
                    </motion.span>
                  ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : 1.0, duration: 0.5 }}
              className="mt-8 max-w-2xl text-[var(--color-text-muted)] text-base md:text-lg leading-relaxed"
            >
              {t("sub")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : 1.2, duration: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <Button href="/#work" size="lg" data-cursor="hover">
                  {t("ctaWork")} →
                </Button>
              </Magnetic>
              <Button
                href={siteMeta.cvUrl}
                external
                download="Nour_Badr_CV.pdf"
                variant="ghost"
                size="lg"
                data-cursor="hover"
              >
                {t("ctaCv")} ↓
              </Button>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduced ? 0 : 0.7, duration: 0.6 }}
            className="lg:col-span-4 lg:mt-2"
          >
            <div className="border border-[var(--color-rule)] p-6 md:p-7 bg-[var(--color-surface)]">
              <div className="flex items-center justify-between mb-5">
                <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)]">
                  [{tStats("years").toUpperCase()}]
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="block w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                  <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-accent)]">
                    OPEN
                  </span>
                </span>
              </div>

              <dl className="space-y-3 text-sm">
                {[
                  { k: tStats("years"), v: "4+" },
                  { k: tStats("companies"), v: "6+" },
                  { k: tStats("projects"), v: "30+" },
                  { k: tStats("languages"), v: locale === "ar" ? "٢" : "2" },
                ].map((row) => (
                  <div
                    key={row.k}
                    className="flex justify-between items-baseline border-b border-[var(--color-rule)] pb-3 last:border-0"
                  >
                    <dt className="font-[var(--font-mono)] text-xs text-[var(--color-text-muted)]">
                      {row.k}
                    </dt>
                    <dd className="font-[var(--font-mono)] text-[var(--color-text)]">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}