import { useLocale } from "next-intl";
import type { GridProject } from "@/lib/grid-projects";

export function GridCard({ project }: { project: GridProject }) {
  const locale = useLocale() as "en" | "ar";

  const content = (
    <>
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
          {project.name}
        </h3>
        <span className="font-[var(--font-mono)] text-[11px] text-[var(--color-text-muted)]">
          {project.year}
        </span>
      </div>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">
        {project.outcome[locale]}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span
            key={s}
            className="font-[var(--font-mono)] text-[10px] text-[var(--color-text-muted)] border border-[var(--color-rule)] px-2 py-1"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="mt-5 font-[var(--font-mono)] text-[11px] tracking-widest">
        {project.liveUrl ? (
          <span className="text-[var(--color-accent)]">VIEW LIVE ↗</span>
        ) : (
          <span className="text-[var(--color-text-muted)]">PRIVATE</span>
        )}
      </div>
    </>
  );

  if (project.liveUrl) {
    return (
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block border border-[var(--color-rule)] p-6 hover:border-[var(--color-accent)] transition-colors bg-[var(--color-surface)]"
        data-cursor="hover"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="group block border border-[var(--color-rule)] p-6 hover:border-[var(--color-accent)] transition-colors bg-[var(--color-surface)]">
      {content}
    </div>
  );
}