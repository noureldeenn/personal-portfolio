"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "@/lib/i18n/routing";

export default function NotFound() {
  const t = useTranslations("notFound");
  const reduced = useReducedMotion();
  const headline = t("headline");
  const lastWord = t("lastWord");
  const splitAt = headline.lastIndexOf(lastWord);
  const before = headline.slice(0, splitAt);
  const after = headline.slice(splitAt + lastWord.length);

  return (
    <section className="container-page py-32 md:py-48">
      <div className="flex items-center gap-3 mb-8">
        <span className="block w-8 h-px bg-[var(--color-accent)]" />
        <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)]">
          [{t("marker").toUpperCase()}]
        </span>
      </div>
      <h1 className="font-[var(--font-display)] text-4xl md:text-7xl font-semibold tracking-[-0.02em] text-[var(--color-text)] max-w-3xl">
        {before}
        <motion.span
          drag={reduced ? false : true}
          dragSnapToOrigin
          dragElastic={0.4}
          className="inline-block cursor-grab active:cursor-grabbing text-[var(--color-accent)]"
          whileDrag={{ scale: 1.1 }}
          data-cursor="hover"
        >
          {lastWord}
        </motion.span>
        {after}
      </h1>
      <Link
        href="/"
        className="inline-block mt-12 font-[var(--font-mono)] text-sm text-[var(--color-accent)] underline underline-offset-4"
        data-cursor="hover"
      >
        ← {t("back")}
      </Link>
    </section>
  );
}