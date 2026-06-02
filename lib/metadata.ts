import { Metadata } from "next";
import { SITE } from "./site";

export function generateMetadata(
  title: string,
  description: string,
  path: string,
  imageUrl?: string,
): Metadata {
  const fullTitle = `${title} | ${SITE.name}`;
  const fullUrl = `${SITE.baseUrl}${path}`;

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
          url: imageUrl || SITE.ogImage,
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
      images: [imageUrl || SITE.ogImage],
      creator: SITE.socials.twitter,
      site: SITE.socials.twitter,
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
      name: SITE.name,
      url: SITE.baseUrl,
    },
    areaServed: SITE.org.areasServed,
    availableLanguage: SITE.org.languages,
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
      item: `${SITE.baseUrl}${item.url}`
    }))
  };
}
