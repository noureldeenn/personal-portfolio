import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { DotGrid } from "@/components/decorative/dot-grid";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "ar")) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <NextIntlClientProvider messages={messages}>
      <div lang={locale} dir={dir} className="relative min-h-screen">
        <DotGrid />
        <Header />
        <main className="relative z-10">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}