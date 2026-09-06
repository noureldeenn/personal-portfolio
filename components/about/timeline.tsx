"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

type Entry = {
  company: string;
  dates: string;
  role: string;
  description: { en: string; ar: string };
};

const entries: Entry[] = [
  {
    company: "Craft Crew",
    dates: "Jan 2026 – Present",
    role: "Senior Front-End Engineer",
    description: {
      en: "Own every front-end decision across four products — a radiology platform handling real medical images, operational systems for imaging centres, an education platform, and a carbon-accounting platform — and work on the backend in Nest.js. Chose the stack, put the standards into the tooling, and took on the intern team.",
      ar: "أتولّى كل قرارات الواجهة عبر أربعة منتجات — منصة أشعة تتعامل مع صور طبية حقيقية، وأنظمة تشغيل لمراكز الأشعة، ومنصة تعليمية، ومنصة محاسبة كربونية — وأعمل على الباك-إند بـ Nest.js. اخترت التقنيات، ووضعت المعايير داخل الأدوات، وتولّيت فريق المتدربين.",
    },
  },
  {
    company: "Vertex Era",
    dates: "Dec 2025 – Feb 2026",
    role: "Freelance Front-End Developer",
    description: {
      en: "Built the front end of Tag Pro, a UAE platform for monitoring and verifying radio and broadcast advertising. Live dashboard that updates while a broadcast is still running, and audio that survives navigation.",
      ar: "بنيت واجهة Tag Pro، منصة إماراتية لمراقبة إعلانات الراديو والبث والتحقق منها. لوحة تحكم مباشرة تتحدّث أثناء استمرار البث، وصوت يستمر عبر التنقّل.",
    },
  },
  {
    company: "Neoxero",
    dates: "Nov 2024 – Dec 2025",
    role: "Front-End Developer",
    description: {
      en: "Customized React apps and themes for merchants on Zid Store. Built a Tailwind + shadcn/ui design system so every merchant build started from one set of components, and moved cart and session state onto Redux Toolkit.",
      ar: "خصصت تطبيقات React وقوالب لتجار على منصة زد. بنيت نظام تصميم بـ Tailwind و shadcn/ui ليبدأ كل متجر من مجموعة مكوّنات واحدة، ونقلت حالة السلة والجلسة إلى Redux Toolkit.",
    },
  },
  {
    company: "Atech",
    dates: "Jan 2024 – Nov 2024",
    role: "Front-End Developer (Zoho)",
    description: {
      en: "Training centre platform joining POS, social channels, and CRM into one system, so enrolments and payments stopped being reconciled by hand. Automated campaigns delivered enquiries straight into the CRM.",
      ar: "منصة مركز تدريب تربط POS ووسائل التواصل و CRM في نظام واحد، فتوقّفت تسوية التسجيلات والمدفوعات يدويًا. وحملات آلية تُوصِل الاستفسارات مباشرة إلى الـ CRM.",
    },
  },
  {
    company: "Perfect Touch IT",
    dates: "Sep 2023 – Dec 2023",
    role: "Front-End Developer",
    description: {
      en: "Hospital dashboard for scheduling staff and clinics, designed around how the scheduling team already worked. Real-estate client management with reporting agents could query themselves.",
      ar: "لوحة تحكم مستشفى لجدولة الطواقم والعيادات، مبنية على طريقة عمل فريق الجدولة نفسها. ونظام إدارة عملاء عقارات بتقارير يستعلم عنها الوكيل بنفسه.",
    },
  },
  {
    company: "Smartivemedia",
    dates: "May 2022 – Dec 2022",
    role: "Front-End Developer",
    description: {
      en: "Built both sides of Dookan — the merchant dashboard and the customer storefront — and reworked checkout and search filtering so a purchase finished in one flow.",
      ar: "بنيت جانبَي دكان — لوحة التاجر وواجهة العميل — وأعدت بناء الدفع وفلاتر البحث ليكتمل الشراء في مسار واحد.",
    },
  },
  {
    company: "Alefsoftware",
    dates: "Oct 2021 – May 2022",
    role: "Front-End Developer",
    description: {
      en: "Productive Families — a platform and delivery dashboard letting home producers sell online and follow an order through to delivery. Also delivered the company's own Next.js site.",
      ar: "منصة الأسر المنتجة — منصة ولوحة توصيل تتيح للمنتجين المنزليين البيع أونلاين ومتابعة الطلب حتى التسليم. وسلّمت أيضًا موقع الشركة بـ Next.js.",
    },
  },
  {
    company: "Syft.la",
    dates: "Sep 2020 – Oct 2021",
    role: "Front-End Developer",
    description: {
      en: "Syft.gg — an influencer marketplace built by gamers for gamers and the brands reaching them — across two versions and its marketing site, plus App.syft.la where influencers found and joined campaigns.",
      ar: "متجر Syft.gg — سوق مؤثرين بناه لاعبون للاعبين وللعلامات التي تريد الوصول إليهم — عبر نسختين وموقعه التسويقي، إضافة إلى App.syft.la حيث يجد المؤثرون الحملات وينضمّون إليها.",
    },
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
          </li>
        ))}
      </ol>
    </div>
  );
}