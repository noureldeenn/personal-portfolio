import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";

const groups = {
  frameworks: ["React", "Next.js", "Angular", "TypeScript", "JavaScript ES6+", "HTML", "CSS"],
  styling: ["Tailwind", "shadcn/ui", "Material UI", "Ant Design", "Chakra UI", "Bootstrap", "SASS", "Storybook"],
  state: ["Redux Toolkit", "Redux Thunk", "React Query", "MobX"],
  apis: ["REST", "GraphQL"],
};

export function SkillsGrid() {
  const t = useTranslations("skills");
  const tSec = useTranslations("sections");

  return (
    <section id="skills" className="relative py-20 md:py-28 border-t border-[var(--color-rule)]">
      <div className="container-page">
        <div className="flex items-center gap-3 mb-12">
          <span className="block w-8 h-px bg-[var(--color-accent)]" />
          <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)]">
            [03] {tSec("skills").toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {(Object.keys(groups) as Array<keyof typeof groups>).map((key, i) => (
            <Reveal key={key} delay={i * 0.08}>
              <h3 className="font-[var(--font-mono)] text-[11px] tracking-widest text-[var(--color-accent)] mb-4">
                {t(key).toUpperCase()}
              </h3>
              <ul className="space-y-2">
                {groups[key].map((s) => (
                  <li
                    key={s}
                    className="font-[var(--font-mono)] text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                    data-cursor="hover"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}