import { setRequestLocale } from "next-intl/server";
import { Timeline } from "@/components/about/timeline";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/lib/i18n/routing";
import type { Locale } from "@/lib/i18n/routing";

const bio = {
  en: [
    "I'm Nour. I build front-ends for a living and have done so since 2020. My path started in mechatronics engineering at Helwan University, took a hard left through Coursera and Microverse, and landed in production React not long after.",
    "Across eight companies — most recently Craft Crew, where since January 2026 I've owned the front end across four products, among them a radiology platform handling real medical images — I've built e-commerce storefronts and merchant dashboards, hospital scheduling tools, a platform that verifies radio ads actually aired, marketplace UIs for gamers and the brands chasing them, and the everyday things in between: forms that don't lose state, tables that stay fast as they grow, design systems that actually get used.",
    "What still gets me out of bed is the moment a slow-loading interface clicks at 60fps, or a confusing flow becomes obvious after the third user test. The interfaces I'm proudest of look like they were always supposed to work that way.",
  ],
  ar: [
    "أنا نور. أبني واجهات أمامية كعمل أساسي منذ 2020. بدأت طريقي بهندسة الميكاترونيكس في جامعة حلوان، ثم انعطفت بحدّة عبر Coursera و Microverse، ووصلت إلى React في الإنتاج بعد فترة قصيرة.",
    "في ثماني شركات — أحدثها Craft Crew، حيث أتولّى منذ يناير 2026 الواجهة الأمامية عبر أربعة منتجات، من بينها منصة أشعة تتعامل مع صور طبية حقيقية — بنيت متاجر إلكترونية ولوحات تحكم للتجار، وأدوات جدولة لمستشفيات، ومنصة تتحقّق من أن إعلانات الراديو أُذيعت فعلًا، وواجهات أسواق للاعبين وللعلامات التي تلاحقهم، وكل الأشياء اليومية بينها: نماذج لا تفقد حالتها، جداول تظل سريعة كلما كبرت، أنظمة تصميم تُستخدم فعلًا.",
    "ما زال يحرّكني تلك اللحظة حين تتحول واجهة بطيئة إلى 60 إطار في الثانية، أو حين يصبح مسار محيّر بديهيًا بعد ثالث اختبار مع المستخدم. أكثر الواجهات التي أفتخر بها تبدو وكأنها كانت دائمًا يفترض أن تعمل بهذه الطريقة.",
  ],
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  return (
    <article>
      <header className="container-page pt-12 md:pt-20 pb-16 border-b border-[var(--color-rule)]">
        <div className="flex items-center gap-3 mb-8">
          <span className="block w-8 h-px bg-[var(--color-accent)]" />
          <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)]">
            [—] ABOUT
          </span>
        </div>
        <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl md:text-7xl font-semibold tracking-[-0.02em] leading-[1.05] text-[var(--color-text)] max-w-4xl">
          {l === "ar"
            ? "مهندس واجهات أمامية أبني تجارب رقمية منذ 2020."
            : "Front-end engineer building interfaces since 2020."}
        </h1>
      </header>

      <section className="container-page py-20 md:py-28">
        <div className="max-w-3xl">
          {bio[l].map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="font-[var(--font-display)] text-xl md:text-2xl leading-relaxed text-[var(--color-text)] mb-6">
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page pb-20 md:pb-28">
        <div className="flex items-center gap-3 mb-16">
          <span className="block w-8 h-px bg-[var(--color-accent)]" />
          <span className="font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--color-text-muted)]">
            [—] {l === "ar" ? "المسيرة" : "JOURNEY"}
          </span>
        </div>
        <Timeline />
      </section>

      <section className="container-page py-20 border-t border-[var(--color-rule)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-[var(--font-mono)] text-[11px] tracking-widest text-[var(--color-accent)] mb-4">
              {l === "ar" ? "التعليم" : "EDUCATION"}
            </h2>
            <ul className="space-y-4">
              <li>
                <div className="font-[var(--font-display)] text-lg font-semibold">Microverse</div>
                <div className="text-sm text-[var(--color-text-muted)]">Remote Front-End Web Development · 2023</div>
              </li>
              <li>
                <div className="font-[var(--font-display)] text-lg font-semibold">Coursera</div>
                <div className="text-sm text-[var(--color-text-muted)]">Remote Front-End Web Development · 2020</div>
              </li>
              <li>
                <div className="font-[var(--font-display)] text-lg font-semibold">{l === "ar" ? "جامعة حلوان" : "Helwan University"}</div>
                <div className="text-sm text-[var(--color-text-muted)]">B.Sc. Mechatronics Engineering · 2012–2017</div>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-[var(--font-mono)] text-[11px] tracking-widest text-[var(--color-accent)] mb-4">
              {l === "ar" ? "أدوات أعتمد عليها" : "TOOLS I REACH FOR"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {["VS Code", "Figma", "Linear", "Notion", "Vercel", "Netlify", "GitHub", "Storybook", "Postman", "ChatGPT/Claude"].map((tool) => (
                <span
                  key={tool}
                  className="font-[var(--font-mono)] text-xs text-[var(--color-text-muted)] border border-[var(--color-rule)] px-3 py-1.5"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-20 border-t border-[var(--color-rule)]">
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 font-[var(--font-display)] text-3xl md:text-5xl text-[var(--color-accent)] hover:underline underline-offset-8"
          data-cursor="hover"
        >
          {l === "ar" ? "تواصل معي →" : "Reach out →"}
        </Link>
      </section>
    </article>
  );
}