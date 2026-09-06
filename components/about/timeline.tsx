"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

type Project = {
  name: string;
  /** Only set when the site is actually reachable — dead links stay plain text. */
  href?: string;
};

type Group = {
  label?: { en: string; ar: string };
  projects: Project[];
};

type Entry = {
  company: string;
  dates: string;
  role: string;
  description: { en: string; ar: string };
  groups?: Group[];
};

const entries: Entry[] = [
  {
    company: "Craft Crew",
    dates: "Jan 2026 – Present",
    role: "Senior Front-End Engineer",
    description: {
      en: "Own every front-end decision across four products, and work on the backend in Nest.js. Chose Next.js and TypeScript on the front end and Nest.js on the back for one reason: a single language across the system lets a small team move between products without changing how it thinks. Put the standards into the tooling rather than into documents nobody reads, and took on the intern team.",
      ar: "أتولّى كل قرارات الواجهة عبر أربعة منتجات، وأعمل على الباك-إند بـ Nest.js. اخترت Next.js و TypeScript في الواجهة و Nest.js في الخلفية لسبب واحد: لغة واحدة عبر النظام تتيح لفريق صغير الانتقال بين المنتجات دون تغيير طريقة تفكيره. ووضعت المعايير داخل الأدوات بدل مستندات لا يقرأها أحد، وتولّيت فريق المتدربين.",
    },
    groups: [
      {
        label: { en: "Products", ar: "المنتجات" },
        projects: [
          { name: "Radiology Platform" },
          { name: "Imaging Centre Systems" },
          { name: "Education Platform" },
          { name: "Carbon Accounting" },
        ],
      },
    ],
  },
  {
    company: "Vertex Era",
    dates: "Dec 2025 – Feb 2026",
    role: "Freelance Front-End Developer",
    description: {
      en: "Built the front end of Tag Pro, a UAE platform for monitoring and verifying radio and broadcast advertising: it listens to campaigns as they air, checks the spots a client paid for actually ran, and reports back where and when they did. Built the dashboard around live status, and kept audio alive across navigation.",
      ar: "بنيت واجهة Tag Pro، منصة إماراتية لمراقبة إعلانات الراديو والبث والتحقق منها: تستمع إلى الحملات أثناء بثّها، وتتحقّق من أن الإعلانات المدفوعة أُذيعت فعلًا، وتُبلّغ عن مكانها وزمانها. بنيت لوحة التحكم حول الحالة المباشرة، وأبقيت الصوت مستمرًا عبر التنقّل.",
    },
    groups: [
      {
        label: { en: "Product", ar: "المنتج" },
        projects: [{ name: "Tag Pro", href: "https://www.tagpro.ae/" }],
      },
    ],
  },
  {
    company: "Neoxero",
    dates: "Nov 2024 – Dec 2025",
    role: "Front-End Developer",
    description: {
      en: "Customized React applications and built themes for merchants on Zid, the largest e-commerce platform in Saudi Arabia — translating each merchant's brand into the shared app shell without forking the core code. Built a token-driven theme layer on Tailwind, rebuilt the component library on shadcn/ui, and moved cart and session state onto Redux Toolkit.",
      ar: "خصصت تطبيقات React وبنيت قوالب لتجار على منصة زد، أكبر منصة تجارة إلكترونية في السعودية — أترجم هوية كل تاجر داخل الهيكل المشترك دون نسخ الكود الأساسي. بنيت طبقة قوالب قائمة على التوكنات فوق Tailwind، وأعدت بناء مكتبة المكوّنات على shadcn/ui، ونقلت حالة السلة والجلسة إلى Redux Toolkit.",
    },
    groups: [
      {
        label: { en: "Library", ar: "مكتبة" },
        projects: [{ name: "Zid Core Library" }],
      },
      {
        label: { en: "Merchant apps", ar: "تطبيقات التجار" },
        projects: [
          { name: "Oilmz" },
          { name: "Sattec" },
          { name: "Lighting Address", href: "https://lightingaddress.com/" },
          { name: "Almutlaq Furnitures", href: "https://almutlaqfurnitures.com/" },
          { name: "Silverback", href: "https://silverback.sa/" },
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
    company: "Atech",
    dates: "Jan 2024 – Nov 2024",
    role: "Front-End Developer (Zoho)",
    description: {
      en: "Built a platform for a training centre that joined its point-of-sale, its social channels, and its CRM into one system, so enrolments and payments stopped being reconciled by hand across separate tools. Automated the centre's campaigns so an enquiry arrived in the CRM already attached to the campaign that produced it, and rebuilt course registration and payment as a single flow.",
      ar: "بنيت منصة لمركز تدريب تربط نقاط البيع وقنوات التواصل والـ CRM في نظام واحد، فتوقّفت تسوية التسجيلات والمدفوعات يدويًا عبر أدوات منفصلة. وأتمتت حملات المركز بحيث يصل الاستفسار إلى الـ CRM مرتبطًا مسبقًا بالحملة التي أنتجته، وأعدت بناء التسجيل والدفع في مسار واحد.",
    },
    groups: [{ projects: [{ name: "Training Center Platform" }] }],
  },
  {
    company: "Perfect Touch IT",
    dates: "Sep 2023 – Dec 2023",
    role: "Front-End Developer",
    description: {
      en: "Built a hospital dashboard for scheduling staff and clinics, designed around how the scheduling team already worked rather than around the shape of the database behind it. Built a real-estate client-management system with reporting that let an agent answer questions about their own pipeline directly, instead of asking someone else for an export.",
      ar: "بنيت لوحة تحكم لمستشفى لجدولة الطواقم والعيادات، مصمّمة على طريقة عمل فريق الجدولة نفسها لا على شكل قاعدة البيانات خلفها. وبنيت نظام إدارة عملاء عقارات بتقارير تتيح للوكيل الإجابة عن أسئلة خطّ عملائه بنفسه، بدل طلب تصدير من شخص آخر.",
    },
    groups: [
      {
        projects: [{ name: "Hospital Dashboard" }, { name: "Real-Estate CRM" }],
      },
    ],
  },
  {
    company: "Smartivemedia",
    dates: "May 2022 – Dec 2022",
    role: "Front-End Developer",
    description: {
      en: "Built both sides of Dookan, an e-commerce platform: the merchant dashboard where sellers manage catalogue and orders, and the customer storefront they sell through. Reworked checkout and search filtering so a customer could narrow a large catalogue down to the thing they actually wanted and finish the purchase in the same flow.",
      ar: "بنيت جانبَي دكان، منصة تجارة إلكترونية: لوحة التاجر التي يدير منها الكتالوج والطلبات، وواجهة العميل التي يبيع من خلالها. وأعدت بناء الدفع وفلاتر البحث ليتمكّن العميل من تضييق كتالوج كبير وصولًا إلى ما يريده فعلًا، وإتمام الشراء في المسار نفسه.",
    },
    groups: [
      {
        projects: [{ name: "Dookan — Merchant" }, { name: "Dookan — Clientside" }],
      },
    ],
  },
  {
    company: "Alefsoftware",
    dates: "Oct 2021 – May 2022",
    role: "Front-End Developer",
    description: {
      en: "Built Productive Families, a platform and delivery dashboard letting home producers sell what they make online and follow an order through to delivery — for sellers who had been running the whole business through messaging apps. Delivered the company's own site in Next.js.",
      ar: "بنيت منصة الأسر المنتجة، منصة ولوحة توصيل تتيح للمنتجين المنزليين بيع ما يصنعونه أونلاين ومتابعة الطلب حتى التسليم — لبائعين كانوا يديرون العمل كلّه عبر تطبيقات المراسلة. وسلّمت موقع الشركة نفسه بـ Next.js.",
    },
    groups: [
      {
        projects: [
          { name: "Productive Families" },
          { name: "Alefsoftware Website", href: "https://alefsoftware.com/" },
        ],
      },
    ],
  },
  {
    company: "Syft.la",
    dates: "Sep 2020 – Oct 2021",
    role: "Front-End Developer",
    description: {
      en: "Built Syft.gg, an influencer marketplace made by gamers for gamers and the brands trying to reach them, through two versions of the product and its marketing site. Built App.syft.la, where influencers found brand campaigns, joined them, and tracked what they had agreed to deliver — the side of the marketplace that made the listings worth browsing.",
      ar: "بنيت Syft.gg، سوق مؤثرين صنعه لاعبون للاعبين وللعلامات التي تحاول الوصول إليهم، عبر نسختين من المنتج وموقعه التسويقي. وبنيت App.syft.la، حيث يجد المؤثرون حملات العلامات وينضمّون إليها ويتابعون ما التزموا بتسليمه — الجانب الذي جعل القوائم تستحق التصفّح.",
    },
    groups: [
      {
        projects: [
          { name: "Syft.gg v1" },
          { name: "Syft.gg v2" },
          { name: "Syft.gg Landing" },
          { name: "App.syft.la" },
        ],
      },
    ],
  },
];

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const locale = useLocale() as "en" | "ar";

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (lineRef.current) lineRef.current.style.transform = "scaleY(1)";
      return;
    }

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      const gsap = gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const trigger = ScrollTrigger.create({
        trigger: ref.current!,
        start: "top center",
        end: "bottom center",
        onUpdate: (self) => {
          if (lineRef.current) lineRef.current.style.transform = `scaleY(${self.progress})`;
        },
      });

      cleanup = () => trigger.kill();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={ref} className="relative ps-8 md:ps-12">
      <div className="absolute start-0 top-0 bottom-0 w-px bg-[var(--color-rule)]" />
      <div
        ref={lineRef}
        className="absolute start-0 top-0 bottom-0 w-px bg-[var(--color-accent)] origin-top scale-y-0 transition-transform duration-200"
      />
      <ol className="space-y-16">
        {entries.map((e) => (
          <li key={e.company} className="relative">
            <span className="absolute -start-[37px] md:-start-[49px] top-1.5 block w-3 h-3 rounded-full bg-[var(--color-bg)] border-2 border-[var(--color-accent)]" />
            <div className="font-[var(--font-mono)] text-[11px] tracking-widest text-[var(--color-text-muted)]">
              {e.dates}
            </div>
            <h3 className="font-[var(--font-display)] text-2xl md:text-3xl font-semibold text-[var(--color-text)] mt-2">
              {e.company}
            </h3>
            <div className="font-[var(--font-mono)] text-sm text-[var(--color-accent)] mt-1">
              {e.role}
            </div>
            <p className="mt-3 text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
              {e.description[locale]}
            </p>

            {e.groups && (
              <div className="mt-5 space-y-3 max-w-2xl">
                {e.groups.map((g, gi) => (
                  <div key={gi} className="sm:flex sm:gap-4">
                    {g.label && (
                      <div className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-accent)] uppercase pt-1.5 sm:w-32 sm:shrink-0 mb-1 sm:mb-0">
                        {g.label[locale]}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-x-2 gap-y-1.5">
                      {g.projects.map((p) =>
                        p.href ? (
                          <a
                            key={p.name}
                            href={p.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-[var(--font-mono)] text-xs text-[var(--color-text-muted)] border border-[var(--color-rule)] px-2.5 py-1 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
                            data-cursor="hover"
                          >
                            {p.name} ↗
                          </a>
                        ) : (
                          <span
                            key={p.name}
                            className="font-[var(--font-mono)] text-xs text-[var(--color-text-muted)] border border-[var(--color-rule)] px-2.5 py-1"
                          >
                            {p.name}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
