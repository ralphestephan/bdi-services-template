import { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

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
    sitemap: `${SITE.baseUrl}/sitemap.xml`,
    host: SITE.baseUrl,
  }
}

// AI systems and crawlers can find comprehensive site information at:
// `${SITE.baseUrl}/llms.txt`
