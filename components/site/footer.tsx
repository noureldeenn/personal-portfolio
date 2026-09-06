import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { siteMeta } from "@/lib/meta";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale() as "en" | "ar";

  return (
    <footer className="relative z-10 border-t border-[var(--color-rule)] mt-32 bg-[var(--color-bg)]">
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <div className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)] mb-3">
              [{t("contact").toUpperCase()}]
            </div>
            <a
              href={`mailto:${siteMeta.email}`}
              className="block font-[var(--font-mono)] text-sm hover:text-[var(--color-accent)] transition-colors mb-2"
              data-cursor="hover"
            >
              {siteMeta.email}
            </a>
            <a
              href={siteMeta.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-[var(--font-mono)] text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
              data-cursor="hover"
            >
              LinkedIn ↗
            </a>
            <a
              href={siteMeta.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-[var(--font-mono)] text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
              data-cursor="hover"
            >
              GitHub ↗
            </a>
          </div>

          <div>
            <div className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)] mb-3">
              [{t("site").toUpperCase()}]
            </div>
            <ul className="space-y-2">
              {(["work", "about", "contact"] as const).map((key) => (
                <li key={key}>
                  <Link
                    href={key === "work" ? "/#work" : `/${key}`}
                    className="font-[var(--font-mono)] text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                    data-cursor="hover"
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)] mb-3">
              [{t("language").toUpperCase()}]
            </div>
            <p className="font-[var(--font-mono)] text-sm text-[var(--color-text-muted)] leading-relaxed">
              {siteMeta.location[locale]}
              <br />
              {siteMeta.phoneDisplay}
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--color-rule)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} {siteMeta.name.toUpperCase()}. {t("rights").toUpperCase()}
          </p>
          <p className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)]">
            v1.0 / 2026
          </p>
        </div>
      </div>
    </footer>
  );
}