import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { siteMeta } from "@/lib/meta";

export function CtaBlock() {
  const t = useTranslations("cta");

  return (
    <section
      id="contact-cta"
      className="relative py-24 md:py-32 border-t border-[var(--color-rule)] overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, color-mix(in oklab, var(--color-accent) 30%, transparent), transparent 60%)",
        }}
      />
      <div className="container-page relative">
        <div className="flex items-center gap-3 mb-10">
          <span className="block w-8 h-px bg-[var(--color-accent)]" />
          <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)]">
            [—] NEXT
          </span>
        </div>
        <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.02em] leading-[1.05] text-[var(--color-text)] max-w-4xl">
          {t("headline")}
        </h2>
        <p className="mt-8 max-w-xl text-[var(--color-text-muted)] text-base md:text-lg leading-relaxed">
          {t("sub")}
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
          <Magnetic>
            <Button href="/contact" size="lg" data-cursor="hover">
              {t("button")} →
            </Button>
          </Magnetic>
          <Button
            href={`mailto:${siteMeta.email}`}
            external
            variant="ghost"
            size="lg"
            data-cursor="hover"
          >
            {siteMeta.email}
          </Button>
        </div>
      </div>
    </section>
  );
}