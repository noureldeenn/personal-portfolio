/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://nour-badr.netlify.app",
  generateRobotsTxt: true,
  alternateRefs: [
    { href: "https://nour-badr.netlify.app/en", hreflang: "en" },
    { href: "https://nour-badr.netlify.app/ar", hreflang: "ar" },
  ],
  exclude: ["/server-sitemap.xml"],
};