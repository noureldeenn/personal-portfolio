import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";

export function Header() {
  const t = useTranslations("nav");
  const tSite = useTranslations("site");

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-rule)] bg-[color-mix(in_oklab,var(--color-bg)_85%,transparent)] backdrop-blur-md">
      <div className="container-page flex items-center justify-between py-4">
        <Link href="/" className="group flex items-baseline gap-2" data-cursor="hover">
          <span className="font-[var(--font-display)] text-lg font-semibold tracking-tight text-[var(--color-text)]">
            {tSite("name")}
          </span>
          <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)] hidden sm:inline">
            / {tSite("role")}
          </span>
        </Link>

        <nav className="flex items-center gap-1 md:gap-2">
          <ul className="hidden md:flex items-center gap-1">
            {(["work", "about", "contact"] as const).map((key) => (
              <li key={key}>
                <Link
                  href={key === "work" ? "/#work" : `/${key}`}
                  className="font-[var(--font-mono)] text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] px-3 py-1.5 transition-colors"
                  data-cursor="hover"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 ms-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}