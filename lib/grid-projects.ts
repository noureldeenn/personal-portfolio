export type GridProject = {
  slug: string;
  name: string;
  year: string;
  stack: string[];
  outcome: { en: string; ar: string };
  liveUrl: string | null;
};

export const gridProjects: GridProject[] = [
  {
    slug: "tag-pro",
    name: "Tag Pro",
    year: "2026",
    stack: ["React", "Next.js", "TypeScript", "Tailwind"],
    outcome: { en: "Radio & broadcast ad monitoring", ar: "مراقبة إعلانات الراديو والبث" },
    liveUrl: "https://www.tagpro.ae/",
  },
  {
    slug: "oilmz",
    name: "Oilmz",
    year: "2025",
    stack: ["React", "Tailwind", "shadcn/ui"],
    outcome: { en: "E-commerce platform on Zid Store", ar: "متجر إلكتروني على منصة زد" },
    liveUrl: null,
  },
  {
    slug: "sattec",
    name: "Sattec",
    year: "2024",
    stack: ["React", "Tailwind"],
    outcome: { en: "B2B services storefront", ar: "متجر خدمات للشركات" },
    liveUrl: null,
  },
  {
    slug: "lighting-address",
    name: "Lighting Address",
    year: "2024",
    stack: ["React", "Tailwind", "shadcn/ui"],
    outcome: { en: "Lighting retailer customizations", ar: "تخصيصات متجر إنارة" },
    liveUrl: null,
  },
  {
    slug: "almutlaq-furnitures",
    name: "Almutlaq Furnitures",
    year: "2024",
    stack: ["React", "Tailwind"],
    outcome: { en: "Furniture brand storefront", ar: "متجر علامة أثاث" },
    liveUrl: null,
  },
  {
    slug: "silverback",
    name: "Silverback",
    year: "2023",
    stack: ["React", "TypeScript"],
    outcome: { en: "Custom dashboard UI", ar: "واجهة لوحة تحكم مخصصة" },
    liveUrl: null,
  },
  {
    slug: "ejaz-homes",
    name: "Ejaz Homes",
    year: "2023",
    stack: ["React", "Bootstrap", "Formik"],
    outcome: { en: "Real-estate client management", ar: "إدارة عملاء عقارات" },
    liveUrl: null,
  },
];