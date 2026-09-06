/**
 * Prefix a public-directory path with the deploy basePath.
 *
 * `next/image` does not apply `basePath` to `src` under `output: "export"` with
 * `images.unoptimized`, and a plain `<a href>` never applies it at all. Content
 * (MDX frontmatter) stores paths as site-absolute — "/work/x/hero.png" — so they
 * must be prefixed at the render site or they 404 on the GitHub Pages subpath.
 *
 * Use the `Link` from `@/lib/i18n/routing` for internal navigation; this helper
 * is for static assets only.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return path.startsWith("/") ? `${BASE_PATH}${path}` : path;
}
