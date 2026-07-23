import type { Metadata, Viewport } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const display = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Agency Foundry — Websites that earn their keep", template: "%s — Agency Foundry" },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  keywords: ["web design Niagara", "service business website", "website agency Niagara Falls", "local business web design"],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    title: "Agency Foundry — Websites that earn their keep",
    description: site.description,
    url: "/",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Agency Foundry — websites that earn their keep" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Agency Foundry — Websites that earn their keep",
    description: site.description,
    images: ["/og.png"]
  }
};

export const viewport: Viewport = { themeColor: "#152c27", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
