import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://bdicorporate.com"),
  title: {
    default: "BDI Corporate — Leading Business Intelligence Solutions in Dubai & Lebanon",
    template: "%s | BDI Corporate - UAE & Lebanon",
  },
  description:
    "Premier business intelligence and digital transformation services in Dubai (UAE) and Lebanon. Expert systems integration, AI analytics, and data-driven solutions for Middle East businesses.",
  keywords: [
    "BDI Corporate",
    "business intelligence Dubai",
    "business intelligence Lebanon",
    "systems integration UAE",
    "digital transformation Middle East",
    "dashboarding solutions Dubai",
    "data analytics Lebanon",
    "UAE business solutions",
    "Middle East digital transformation",
    "enterprise solutions Dubai",
    "data visualization Lebanon",
    "business automation UAE",
    "AI analytics Middle East",
    "corporate intelligence Lebanon",
    "dashboard advisory UAE",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://bdicorporate.com/",
    title: "BDI Corporate — Leading Business Intelligence in Dubai & Lebanon",
    description:
      "Transform your business with cutting-edge BI solutions, AI analytics, and digital transformation services in Dubai (UAE) and Lebanon. Expert systems integration and data-driven operations.",
    siteName: "BDI Corporate",
    images: [
      {
        url: "/og/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "BDI Corporate — Premier Business Intelligence Solutions in Dubai & Lebanon",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BDI Corporate — Leading Business Intelligence in Dubai & Lebanon",
    description:
      "Premier business intelligence and digital transformation services in Dubai (UAE) and Lebanon. Expert systems integration and AI analytics for Middle East businesses.",
    images: ["/og/og-home.jpg"],
    creator: "@bdicorporate",
    site: "@bdicorporate",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
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
  return (
    <html lang="en" dir="ltr">
      <head>
        <GoogleAnalytics />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          rel="alternate" 
          hrefLang="ar" 
          href={`https://bdicorporate.com/ar${pathname}`} 
        />
        <link 
          rel="alternate" 
          hrefLang="en" 
          href={`https://bdicorporate.com${pathname.replace(/^\/[a-z]{2}/, '')}`} 
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BDI Corporate",
              url: "https://bdicorporate.com",
              logo: "https://bdicorporate.com/logo.png",
              description: "Leading provider of business intelligence, systems integration, and AI automation solutions in the Middle East.",
              areaServed: ["UAE", "Lebanon", "Iraq", "KSA", "Middle East"],
              address: [{
                "@type": "PostalAddress",
                addressCountry: "AE",
                addressLocality: "Dubai",
                addressRegion: "Dubai"
              }, {
                "@type": "PostalAddress",
                addressCountry: "LB",
                addressLocality: "Beirut",
                addressRegion: "Beirut"
              }],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+971-XXX-XXXX",
                contactType: "customer service",
                availableLanguage: ["English", "Arabic"]
              },
              sameAs: [
                "https://www.linkedin.com/company/bdi-corporate",
                "https://twitter.com/bdicorporate"
              ],
              foundingDate: "2018",
              numberOfEmployees: "10-50",
              industry: "Business Intelligence and Systems Integration",
              serviceArea: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: "25.2048",
                  longitude: "55.2708"
                },
                geoRadius: "2000000"
              }
            })
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