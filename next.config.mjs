import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

// Served from https://noureldeenn.github.io/personal-portfolio/ (GitHub Pages project site).
// Override with NEXT_PUBLIC_BASE_PATH="" for a user/org page or custom domain (root).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/personal-portfolio";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ["ts", "tsx", "mdx"],
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

const withMDX = createMDX({});

export default withNextIntl(withMDX(nextConfig));
