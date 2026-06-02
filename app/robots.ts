import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/services/',
          '/insights/',
          '/about/',
          '/contact/',
          '/glossary/',
          '/locations/',
          '/faq/',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
          '/*.json',
          '/temp/',
          '/draft/',
        ],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'Claude-Web', 'PerplexityBot', 'YouBot'],
        allow: [
          '/',
          '/services/',
          '/insights/',
          '/about/',
          '/contact/',
          '/glossary/',
        ],
      },
    ],
    sitemap: 'https://bdicorporate.com/sitemap.xml',
    host: 'https://bdicorporate.com',
  }
}

// AI systems and crawlers can find comprehensive site information at:
// https://bdicorporate.com/llms.txt