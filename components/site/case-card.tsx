"use client";

import { Link } from "@/lib/i18n/routing";
import { useRef } from "react";
import type { CaseStudyMeta } from "@/lib/work";

type Props = { study: CaseStudyMeta; index: number };

export function CaseCard({ study, index }: Props) {
  const num = String(index + 1).padStart(2, "0");
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--gx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--gy", `${e.clientY - r.top}px`);
  };

  return (
    <Link
      ref={ref}
      href={`/work/${study.slug}`}
      onMouseMove={onMove}
      className="group relative block border-t border-[var(--color-rule)] hover:border-[var(--color-accent)] transition-colors duration-300 overflow-hidden"
      data-cursor="hover"
      style={{
        backgroundImage:
          "radial-gradient(circle 240px at var(--gx, 50%) var(--gy, 50%), color-mix(in oklab, var(--color-accent) 8%, transparent), transparent 70%)",
      }}
    >
      <article className="grid grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 items-start">
        <div className="col-span-12 md:col-span-1">
          <span className="font-[var(--font-mono)] text-xs tracking-widest text-[var(--color-accent)]">
            [{num}]
          </span>
        </div>
        <div className="col-span-12 md:col-span-5">
          <h3 className="font-[var(--font-display)] text-2xl md:text-3xl font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-300 tracking-tight">
            {study.title}
          </h3>
          <p className="mt-3 text-[var(--color-text-muted)] text-sm leading-relaxed max-w-md">
            {study.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)] border border-[var(--color-rule)] px-2 py-1"
              >
                {tag.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
        <div className="col-span-6 md:col-span-3">
          <div className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)] mb-2">
            STACK
          </div>
          <ul className="space-y-1">
            {study.stack.slice(0, 4).map((s) => (
              <li key={s} className="font-[var(--font-mono)] text-xs text-[var(--color-text-muted)]">
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-6 md:col-span-3">
          <div className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)] mb-2">
            OUTCOME
          </div>
          <div className="font-[var(--font-display)] text-3xl md:text-4xl text-[var(--color-accent)] tracking-tight">
            {study.outcome}
          </div>
          <div className="font-[var(--font-mono)] text-[11px] text-[var(--color-text-muted)] mt-1">
            {study.outcomeLabel}
          </div>
        </div>
      </article>
    </Link>
  );
}