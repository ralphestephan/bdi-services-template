import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { SITE } from "@/lib/site";
import { generateOrganizationSchema } from "@/lib/seo-metadata";

const titleDefault = `${SITE.name} — ${SITE.tagline}`;
const titleTemplate = `%s | ${SITE.name}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.baseUrl),
  title: {
    default: titleDefault,
    template: titleTemplate,
  },
  description: SITE.description,
  keywords: [SITE.name, ...SITE.keywords],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: `${SITE.baseUrl}/`,
    title: titleDefault,
    description: SITE.description,
    siteName: SITE.name,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.tagline}`,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description: SITE.description,
    images: [SITE.ogImage],
    creator: SITE.socials.twitter,
    site: SITE.socials.twitter,
  },
  icons: {
    icon: SITE.icons.icon,
    apple: SITE.icons.apple,
    shortcut: SITE.icons.shortcut,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const orgSchema = generateOrganizationSchema();
  return (
    <html lang="en" dir="ltr">
      <head>
        <GoogleAnalytics />
        <link rel="icon" href={SITE.icons.icon} />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="alternate"
          hrefLang="ar"
          href={`${SITE.baseUrl}/ar${pathname}`}
        />
        <link
          rel="alternate"
          hrefLang="en"
          href={`${SITE.baseUrl}${pathname.replace(/^\/[a-z]{2}/, "")}`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              ...orgSchema,
              foundingDate: SITE.foundingYear,
              numberOfEmployees: "10-50",
              industry: "Business Intelligence and Systems Integration",
            }),
          }}
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        <Toaster theme="system" richColors position="bottom-right" />
      </body>
    </html>
  );
}
