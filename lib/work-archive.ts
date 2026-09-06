export type ArchiveProject = {
  name: string;
  meta?: { en: string; ar: string };
  href?: string;
};

export type ArchiveGroup = {
  /** Bare list of project names — rendered as comma-separated pills */
  label?: { en: string; ar: string };
  projects: ArchiveProject[];
};

export type CompanyArchive = {
  slug: string;
  company: string;
  period: string;
  blurb?: { en: string; ar: string };
  featuredSlug?: string;
  groups: ArchiveGroup[];
};

export const workArchive: CompanyArchive[] = [
  {
    slug: "craft-crew",
    company: "Craft Crew",
    period: "Jan 2026 – Present",
    blurb: {
      en: "Front-end direction across four products, plus backend work in Nest.js.",
      ar: "قيادة الواجهات الأمامية عبر أربعة منتجات، إضافة إلى عمل على الباك-إند بـ Nest.js.",
    },
    featuredSlug: "craft-crew-lms",
    groups: [
      {
        label: { en: "Products", ar: "المنتجات" },
        projects: [
          {
            name: "Radiology Platform",
            meta: { en: "Real medical images, AI stage ahead", ar: "صور طبية حقيقية، ومرحلة ذكاء اصطناعي قادمة" },
          },
          {
            name: "Imaging Centre Systems",
            meta: { en: "Operations", ar: "أنظمة تشغيل" },
          },
          {
            name: "Education Platform",
            meta: { en: "Courses and learning", ar: "دورات وتعلّم" },
          },
          {
            name: "Carbon Accounting",
            meta: { en: "Client in Morocco", ar: "عميل في المغرب" },
          },
        ],
      },
    ],
  },
  {
    slug: "vertex-era",
    company: "Vertex Era",
    period: "Dec 2025 – Feb 2026",
    blurb: {
      en: "Freelance — front end of a radio and broadcast ad-monitoring platform.",
      ar: "عمل حر — واجهة منصة لمراقبة إعلانات الراديو والبث.",
    },
    featuredSlug: "vertex-radio",
    groups: [
      {
        projects: [
          {
            name: "Tag Pro",
            meta: { en: "Broadcast monitoring", ar: "مراقبة البث" },
            href: "https://www.tagpro.ae/",
          },
        ],
      },
    ],
  },
  {
    slug: "neoxero",
    company: "Neoxero",
    period: "Nov 2024 – Dec 2025",
    blurb: {
      en: "Customizing React apps and themes for merchants on the Zid Store platform.",
      ar: "تخصيص تطبيقات React وقوالب لتجار على منصة متجر زد.",
    },
    featuredSlug: "zid-store-apps",
    groups: [
      {
        label: { en: "Component library", ar: "مكتبة مكوّنات" },
        projects: [{ name: "Zid Core Library" }],
      },
      {
        label: { en: "Merchant customizations", ar: "تخصيصات تجار" },
        projects: [
          { name: "Oilmz" },
          { name: "Sattec" },
          { name: "Lighting Address" },
          { name: "Almutlaq Furnitures" },
          { name: "Silverback" },
          { name: "Ejaz Homes" },
        ],
      },
      {
        label: { en: "Zid themes", ar: "قوالب زد" },
        projects: [
          { name: "Asante" },
          { name: "Bare" },
          { name: "Cafee" },
          { name: "El-Der3ya" },
          { name: "Elhelal" },
          { name: "El-Kadseya" },
          { name: "Elsaif" },
          { name: "Elnasr" },
          { name: "Elarat" },
          { name: "Furns" },
          { name: "Insel" },
          { name: "Maden" },
          { name: "Marabina" },
          { name: "Mayar" },
          { name: "Anno-Cae" },
          { name: "Onepage Schools" },
          { name: "Snoor" },
          { name: "Truth" },
        ],
      },
    ],
  },
  {
    slug: "atech",
    company: "Atech",
    period: "Jan 2024 – Nov 2024",
    blurb: {
      en: "Training center platform integrating POS, social, and CRM.",
      ar: "منصة مركز تدريب تربط POS و وسائل التواصل و CRM.",
    },
    groups: [
      { projects: [{ name: "Training Center Platform" }] },
    ],
  },
  {
    slug: "perfect-touch",
    company: "Perfect Touch IT",
    period: "Sep 2023 – Dec 2023",
    blurb: {
      en: "Internal tools across healthcare and real-estate.",
      ar: "أدوات داخلية في قطاعَي الرعاية الصحية والعقارات.",
    },
    groups: [
      {
        projects: [
          { name: "Hospital Dashboard" },
          { name: "Real-Estate CRM" },
        ],
      },
    ],
  },
  {
    slug: "smartivemedia",
    company: "Smartivemedia",
    period: "May 2022 – Dec 2022",
    blurb: {
      en: "Two-sided e-commerce platform.",
      ar: "منصة تجارة إلكترونية ثنائية الجانب.",
    },
    groups: [
      {
        projects: [
          { name: "Dookan — Merchant" },
          { name: "Dookan — Clientside" },
        ],
      },
    ],
  },
  {
    slug: "alefsoftware",
    company: "Alefsoftware",
    period: "Oct 2021 – May 2022",
    blurb: {
      en: "E-commerce dashboard and the company's marketing site.",
      ar: "لوحة تحكم تجارة إلكترونية، وموقع الشركة التسويقي.",
    },
    groups: [
      {
        projects: [
          {
            name: "Productive Families",
            meta: { en: "Delivery dashboard", ar: "لوحة توصيل الطلبات" },
          },
          {
            name: "Alefsoftware Website",
            meta: { en: "Company site (Next.js)", ar: "موقع الشركة (Next.js)" },
          },
        ],
      },
    ],
  },
  {
    slug: "syft-la",
    company: "Syft.la",
    period: "Sep 2020 – Oct 2021",
    blurb: {
      en: "Influencer marketplace built by gamers for gamers.",
      ar: "متجر مؤثرين بُني من قِبَل اللاعبين للاعبين.",
    },
    featuredSlug: "syft-gg-marketplace",
    groups: [
      {
        projects: [
          { name: "Syft.gg v1", meta: { en: "Marketplace", ar: "متجر" } },
          { name: "Syft.gg v2", meta: { en: "Marketplace", ar: "متجر" } },
          { name: "Syft.gg Landing", meta: { en: "Marketing site", ar: "موقع تسويقي" } },
          { name: "App.syft.la", meta: { en: "Influencer platform", ar: "منصة مؤثرين" } },
        ],
      },
    ],
  },
];