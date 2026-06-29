const siteUrl =
  process.env.SITE_URL || "https://noureldeenn.github.io/personal-portfolio";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  outDir: "./out",
  alternateRefs: [
    { href: `${siteUrl}/en`, hreflang: "en" },
    { href: `${siteUrl}/ar`, hreflang: "ar" },
  ],
  exclude: ["/server-sitemap.xml"],
};
