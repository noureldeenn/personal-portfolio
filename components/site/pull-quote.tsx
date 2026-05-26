"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";

export function PullQuote() {
  const t = useTranslations();
  const text = t("pullQuote");
  const reduced = useReducedMotion();
  const chars = text.split("");

  return (
    <section className="container-page py-24 md:py-32">
      <figure className="max-w-3xl mx-auto text-center">
        <span aria-hidden className="block text-[var(--color-accent)] font-[var(--font-display)] text-6xl leading-none mb-4">
          &ldquo;
        </span>
        <motion.blockquote
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={{
            visible: { transition: { staggerChildren: reduced ? 0 : 0.018 } },
          }}
          className="font-[var(--font-display)] italic text-3xl md:text-5xl leading-[1.2] text-[var(--color-text)]"
          aria-label={text}
        >
          {chars.map((c, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 6 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
              }}
              className="inline-block"
            >
              {c === " " ? " " : c}
            </motion.span>
          ))}
        </motion.blockquote>
      </figure>
    </section>
  );
}