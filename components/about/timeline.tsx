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
      en: "Customized React apps for Zid Store. Built a Tailwind + shadcn/ui design system that cut UI inconsistencies 40%. Integrated Redux Toolkit, dropping API errors 20%.",
      ar: "خصصت تطبيقات React لمنصة زد. بنيت نظام تصميم بـ Tailwind و shadcn/ui قلّل عدم الاتساق بنسبة 40%. ودمجت Redux Toolkit مما خفّض أخطاء API بنسبة 20%.",
    },
  },
  {
    company: "Atech",
    dates: "Jan 2024 – Nov 2024",
    role: "Front-End Developer (Zoho)",
    description: {
      en: "Training center platform integrating POS, social, and CRM. Reduced manual tasks 35%, generated 200+ leads monthly via automated campaigns.",
      ar: "منصة مركز تدريب تربط POS و وسائل التواصل و CRM. خفّضت المهام اليدوية 35%، وولّدت أكثر من 200 عميل شهريًا.",
    },
  },
  {
    company: "Perfect Touch IT",
    dates: "Sep 2023 – Dec 2023",
    role: "Front-End Developer",
    description: {
      en: "Hospital dashboard used by 150+ staff (40% scheduling time cut). Real-estate client management with advanced reporting.",
      ar: "لوحة تحكم مستشفى يستخدمها أكثر من 150 موظفًا (تقليل وقت الجدولة بنسبة 40%). نظام إدارة عملاء عقارات بتقارير متقدمة.",
    },
  },
  {
    company: "Smartivemedia",
    dates: "May 2022 – Dec 2022",
    role: "Front-End Developer",
    description: {
      en: "Dookan e-commerce: 10k+ monthly transactions. Reduced cart abandonment 15% by reworking checkout and search filters.",
      ar: "متجر دكان: أكثر من 10 آلاف معاملة شهرية. خفّضت معدل التخلي عن السلة 15% بإعادة بناء الدفع وفلاتر البحث.",
    },
  },
  {
    company: "Alefsoftware",
    dates: "Oct 2021 – May 2022",
    role: "Front-End Developer",
    description: {
      en: "Productive-Families platform serving 5k+ users. Company Next.js site lifted client engagement 30%.",
      ar: "منصة الأسر المنتجة تخدم أكثر من 5 آلاف مستخدم. موقع الشركة بـ Next.js رفع تفاعل العملاء 30%.",
    },
  },
  {
    company: "Syft.la",
    dates: "Sep 2020 – Oct 2021",
    role: "Front-End Developer",
    description: {
      en: "Syft.gg marketplace reaching 50k+ gamers/brands. App.syft.la social platform linking influencers with campaigns (+60% ad reach).",
      ar: "متجر Syft.gg وصل إلى أكثر من 50 ألف لاعب وعلامة تجارية. منصة App.syft.la الاجتماعية تربط المؤثرين بالحملات (+60% وصول).",
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