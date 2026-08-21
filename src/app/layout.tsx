import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Script from "next/script";
import { Navbar } from "@/components/navigation/Navbar";
import { AppProviders } from "@/components/providers/AppProviders";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { OdysseyCompanion } from "@/components/companion/OdysseyCompanion";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://odyssey.vercel.app";
const title = "ODYSSEY — Interactive Travel Experience";
const description =
  "A cinematic, interactive exploration of the places that make our planet extraordinary. Built with Next.js, React, TypeScript and Motion.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — ODYSSEY",
  },
  description,
  keywords: [
    "travel",
    "interactive experience",
    "destinations",
    "frontend engineering",
    "Next.js",
  ],
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "ODYSSEY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeInitScript = `(function(){try{var raw=localStorage.getItem('odyssey-store');var theme='auto';if(raw){var parsed=JSON.parse(raw);theme=(parsed&&parsed.state&&parsed.state.theme)||'auto';}var resolved=theme==='auto'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):theme;document.documentElement.setAttribute('data-theme',resolved);}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <AppProviders />
        <MotionProvider>
          <a
            href="#main-content"
            className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[60] focus-visible:rounded-full focus-visible:bg-paper focus-visible:px-6 focus-visible:py-3 focus-visible:text-sm focus-visible:font-medium focus-visible:uppercase focus-visible:tracking-[0.2em] focus-visible:text-ink"
          >
            Skip to content
          </a>
          <Navbar />
          {children}
          <OdysseyCompanion />
          <CustomCursor />
        </MotionProvider>
      </body>
    </html>
  );
}
