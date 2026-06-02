import { Metadata } from "next";

export function generateMetadata(
  title: string,
  description: string,
  path: string,
  imageUrl?: string,
): Metadata {
  const fullTitle = `${title} | BDI Corporate`;
  const fullUrl = `https://bdicorporate.com${path}`;
  
  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      images: [
        {
          url: imageUrl || "/og/og-home.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl || "/og/og-home.jpg"],
      creator: "@bdicorporate",
      site: "@bdicorporate",
    },
  };
}

export function generateServiceSchema(
  name: string,
  description: string,
  url: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: "BDI Corporate",
      url: "https://bdicorporate.com"
    },
    areaServed: ["UAE", "Lebanon", "Middle East"],
    availableLanguage: ["English", "Arabic"],
    url,
  };
}

export function generateFAQSchema(questions: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(q => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://bdicorporate.com${item.url}`
    }))
  };
}