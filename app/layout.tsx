import type { Metadata } from "next";
import {
  Fraunces,
  Inter,
  JetBrains_Mono,
  Reem_Kufi,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import { ThemeProvider } from "next-themes";
import { LenisProvider } from "@/components/motion/lenis-provider";
import { CustomCursor } from "@/components/motion/custom-cursor";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
  display: "swap",
});

const reemKufi = Reem_Kufi({
  subsets: ["arabic", "latin"],
  variable: "--font-reem-kufi",
  weight: ["400", "500", "700"],
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-plex-arabic",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nour-badr.netlify.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} ${reemKufi.variable} ${plexArabic.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LenisProvider>
            <CustomCursor />
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}