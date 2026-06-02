import type { Metadata } from "next"
import Script from "next/script"
import { Suspense } from "react"
import ContactClient from "./ContactClient"

export const metadata: Metadata = {
  title: "Contact Us — BDI Corporate | Lebanon & UAE",
  description:
    "Contact BDI Corporate to discuss systems integration, reporting, and automation for your business. Offices in Lebanon and UAE.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact BDI Corporate",
    description:
      "Call, email, or visit our Beirut and Dubai offices for integration, BI, and automation services.",
    url: "https://bdicorporate.com/contact",
    type: "website",
    images: [
      {
        url: "/og/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact BDI Corporate",
      },
    ],
  },
}

export default function ContactPage() {
  return (
    <>
      <Script
        id="ld-contact"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact BDI Corporate",
          url: "https://bdicorporate.com/contact",
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+9613599996",
              contactType: "customer service",
            },
            {
              "@type": "ContactPoint",
              telephone: "+971529798517",
              contactType: "customer service",
            },
          ],
          address: [
            {
              "@type": "PostalAddress",
              addressLocality: "Beirut",
              addressCountry: "LB",
            },
            {
              "@type": "PostalAddress",
              addressLocality: "Dubai",
              addressCountry: "AE",
            },
          ],
        })}
      </Script>
      <Suspense fallback={null}>
        <ContactClient />
      </Suspense>
    </>
  )
}
