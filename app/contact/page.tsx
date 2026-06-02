import type { Metadata } from "next"
import Script from "next/script"
import { Suspense } from "react"
import ContactClient from "./ContactClient"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: `Contact Us — ${SITE.name} | ${SITE.contact.regionLabel}`,
  description: `Contact ${SITE.name} to discuss systems integration, reporting, and automation for your business. Operating in ${SITE.contact.regionLabel}.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact ${SITE.name}`,
    description: `Reach our team for integration, BI, and automation services in ${SITE.contact.regionLabel}.`,
    url: `${SITE.baseUrl}/contact`,
    type: "website",
    images: [
      {
        url: "/og/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: `Contact ${SITE.name}`,
      },
    ],
  },
}

export default function ContactPage() {
  const contactPoints = [
    {
      "@type": "ContactPoint",
      telephone: SITE.contact.phone,
      contactType: "customer service",
    },
    ...(SITE.contact.phoneSecondary
      ? [
          {
            "@type": "ContactPoint",
            telephone: SITE.contact.phoneSecondary,
            contactType: "customer service",
          },
        ]
      : []),
  ];
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
          name: `Contact ${SITE.name}`,
          url: `${SITE.baseUrl}/contact`,
          contactPoint: contactPoints,
          address: SITE.org.addresses.map((a) => ({
            "@type": "PostalAddress",
            addressLocality: a.locality,
            addressCountry: a.country,
          })),
        })}
      </Script>
      <Suspense fallback={null}>
        <ContactClient />
      </Suspense>
    </>
  )
}
