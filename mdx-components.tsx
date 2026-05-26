import type { MDXComponents } from "mdx/types";
import { OutcomeMetric } from "@/components/work/outcome-metric";
import { Gallery } from "@/components/work/gallery";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-[var(--font-display)] text-3xl md:text-4xl font-semibold text-[var(--color-text)] mt-12 mb-6 tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-[var(--font-display)] text-xl md:text-2xl font-semibold text-[var(--color-text)] mt-10 mb-4 tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-[var(--font-mono)] text-lg font-medium text-[var(--color-text)] mt-8 mb-3">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-5 text-[15px] md:text-base">
        {children}
      </p>
    ),
    ul: ({ children }) => <ul className="space-y-2 mb-6 list-none ps-0">{children}</ul>,
    li: ({ children }) => (
      <li className="text-[var(--color-text-muted)] leading-relaxed ps-6 relative before:content-['→'] before:absolute before:start-0 before:text-[var(--color-accent)]">
        {children}
      </li>
    ),
    strong: ({ children }) => (
      <strong className="text-[var(--color-text)] font-medium">{children}</strong>
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        className="text-[var(--color-accent)] underline underline-offset-4 decoration-1 hover:decoration-2"
      >
        {children}
      </a>
    ),
    OutcomeMetric,
    Gallery,
    ...components,
  };
}