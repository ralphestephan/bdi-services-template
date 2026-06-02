import { Metadata } from 'next'
import keywords from '@/seo/keywords.json'
import { SITE } from './site'

interface SEOConfig {
  title?: string
  description?: string
  path: string
  keywords?: string[]
  schemaType?: 'Organization' | 'Service' | 'Article' | 'FAQPage' | 'BreadcrumbList' | 'DefinedTerm'
  image?: string
  noIndex?: boolean
}

export function generateMetadata(config: SEOConfig): Metadata {
  const route = keywords.routes[config.path as keyof typeof keywords.routes]

  const title =
    config.title ||
    route?.title ||
    `${SITE.name} - ${SITE.tagline}`
  const description =
    config.description ||
    route?.description ||
    SITE.description

  const fullTitle = config.path === '/' ? title : title

  return {
    title: fullTitle,
    description,
    keywords: config.keywords || route?.secondary || [],
    alternates: {
      canonical: `${SITE.baseUrl}${config.path}`,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: `${SITE.baseUrl}${config.path}`,
      siteName: SITE.name,
      images: [
        {
          url: config.image || SITE.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: config.schemaType === 'Article' ? 'article' : 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [config.image || SITE.ogImage],
      creator: SITE.socials.twitter,
      site: SITE.socials.twitter,
    },
    robots: {
      index: !config.noIndex,
      follow: !config.noIndex,
      googleBot: {
        index: !config.noIndex,
        follow: !config.noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE.baseUrl}${item.url}`,
    })),
  }
}

export function generateServiceSchema(
  name: string,
  description: string,
  serviceType: string,
  url: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    provider: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.baseUrl,
    },
    areaServed: SITE.org.areasServed,
    availableLanguage: SITE.org.languages,
    url: `${SITE.baseUrl}${url}`,
  }
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.baseUrl,
    logo: `${SITE.baseUrl}${SITE.org.logo}`,
    description: SITE.description,
    areaServed: SITE.org.areasServed,
    address: SITE.org.addresses.map((addr) => ({
      '@type': 'PostalAddress',
      addressCountry: addr.country,
      addressLocality: addr.locality,
      addressRegion: addr.locality,
    })),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.contact.phone,
      contactType: 'customer service',
      availableLanguage: SITE.org.languages,
    },
    sameAs: [...SITE.org.sameAs],
  }
}
