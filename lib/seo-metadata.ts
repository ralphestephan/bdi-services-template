import { Metadata } from 'next'
import keywords from '@/seo/keywords.json'

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
  
  const title = config.title || route?.title || 'BDI Corporate - Business Intelligence & Systems Integration'
  const description = config.description || route?.description || 'Leading provider of systems integration, business intelligence, and AI automation solutions in the Middle East.'
  
  const fullTitle = config.path === '/' ? title : title
  
  return {
    title: fullTitle,
    description,
    keywords: config.keywords || route?.secondary || [],
    alternates: {
      canonical: `https://bdicorporate.com${config.path}`,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: `https://bdicorporate.com${config.path}`,
      siteName: 'BDI Corporate',
      images: [
        {
          url: config.image || '/og/og-home.jpg',
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
      images: [config.image || '/og/og-home.jpg'],
      creator: '@bdicorporate',
      site: '@bdicorporate',
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
      item: `https://bdicorporate.com${item.url}`,
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
      name: 'BDI Corporate',
      url: 'https://bdicorporate.com',
    },
    areaServed: ['UAE', 'Lebanon', 'Iraq', 'KSA', 'Middle East'],
    availableLanguage: ['English', 'Arabic'],
    url: `https://bdicorporate.com${url}`,
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
    name: 'BDI Corporate',
    url: 'https://bdicorporate.com',
    logo: 'https://bdicorporate.com/logo.png',
    description: 'Leading provider of business intelligence, systems integration, and AI automation solutions in the Middle East.',
    areaServed: ['UAE', 'Lebanon', 'Iraq', 'KSA', 'Middle East'],
    address: [
      {
        '@type': 'PostalAddress',
        addressCountry: 'AE',
        addressLocality: 'Dubai',
        addressRegion: 'Dubai',
      },
      {
        '@type': 'PostalAddress',
        addressCountry: 'LB',
        addressLocality: 'Beirut',
        addressRegion: 'Beirut',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+971-XXX-XXXX',
      contactType: 'customer service',
      availableLanguage: ['English', 'Arabic'],
    },
    sameAs: [
      'https://www.linkedin.com/company/bdi-corporate',
      'https://twitter.com/bdicorporate',
    ],
  }
}