import { z } from "zod";
import type { Locale } from "@/lib/i18n/routing";

export const caseStudyFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  client: z.string(),
  year: z.string(),
  duration: z.string(),
  role: z.string(),
  stack: z.array(z.string()),
  outcome: z.string(),
  outcomeLabel: z.string(),
  liveUrl: z.string().nullable(),
  tags: z.array(z.string()),
  summary: z.string(),
  heroImage: z.string(),
  gallery: z.array(z.string()),
});

export type CaseStudyMeta = z.infer<typeof caseStudyFrontmatterSchema>;

export const caseStudySlugs = [
  "zid-store-apps",
  "syft-gg-marketplace",
  "craft-crew-lms",
  "vertex-radio",
] as const;

export type CaseStudySlug = (typeof caseStudySlugs)[number];

export async function loadCaseStudy(slug: CaseStudySlug, locale: Locale) {
  const mod = await import(`@/content/work/${slug}.${locale}.mdx`);
  const frontmatter = caseStudyFrontmatterSchema.parse(mod.frontmatter ?? mod.metadata);
  return { Content: mod.default, frontmatter };
}

export async function loadAllCaseStudies(locale: Locale) {
  return Promise.all(
    caseStudySlugs.map(async (slug) => (await loadCaseStudy(slug, locale)).frontmatter),
  );
}

export function getAdjacent(slug: CaseStudySlug) {
  const i = caseStudySlugs.indexOf(slug);
  return {
    prev: i > 0 ? caseStudySlugs[i - 1] : null,
    next: i < caseStudySlugs.length - 1 ? caseStudySlugs[i + 1] : null,
  };
}