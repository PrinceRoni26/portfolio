import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/layout/Providers";
import { Cursor } from "@/components/ui/Cursor";
import { getGithubUrl, site } from "@/data/site";
import { getResumeLink } from "@/lib/resume";
import "./globals.css";

// Self-hosted fonts (SIL Open Font License): no runtime requests to Google.
const body = localFont({
  src: "../fonts/Geist-Variable.woff2",
  variable: "--font-body",
  weight: "100 900",
  display: "swap",
});
const code = localFont({
  src: "../fonts/GeistMono-Variable.woff2",
  variable: "--font-code",
  weight: "100 900",
  display: "swap",
});
const grotesk = localFont({
  src: "../fonts/SpaceGrotesk-Variable.woff2",
  variable: "--font-grotesk",
  weight: "300 700",
  display: "swap",
});
const instrument = localFont({
  src: [
    { path: "../fonts/InstrumentSerif-Regular.woff2", style: "normal" },
    { path: "../fonts/InstrumentSerif-Italic.woff2", style: "italic" },
  ],
  variable: "--font-instrument",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.shortName}`,
  },
  description: site.description,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "Prince Roniver Magsalos",
    "software developer",
    "business systems",
    "workflow automation",
    "Cagayan de Oro",
    "Philippines",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "/",
    siteName: site.shortName,
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F5F4F0",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const resume = getResumeLink();
  return (
    <html lang="en" className={`${body.variable} ${code.variable} ${grotesk.variable} ${instrument.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <Providers>
          <Header resume={resume} github={getGithubUrl()} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <Cursor />
        </Providers>
      </body>
    </html>
  );
}
