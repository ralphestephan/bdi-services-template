/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["placehold.co"],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year
  },
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, s-maxage=86400' },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, s-maxage=86400' },
        ],
      },
      {
        source: '/ai.txt',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, s-maxage=86400' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // Legacy redirects from migration map
      {
        source: '/old-services',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/consulting',
        destination: '/services/systems-integration',
        permanent: true,
      },
      {
        source: '/digital-transformation',
        destination: '/services/ai-automation',
        permanent: true,
      },
      {
        source: '/dashboards',
        destination: '/services/financial-analysis',
        permanent: true,
      },
      {
        source: '/integrations',
        destination: '/services/systems-integration',
        permanent: true,
      },
      {
        source: '/crm',
        destination: '/services/crm-pos',
        permanent: true,
      },
      {
        source: '/erp-implementation',
        destination: '/services/erp',
        permanent: true,
      },
      {
        source: '/case-studies',
        destination: '/insights',
        permanent: true,
      },
      {
        source: '/resources',
        destination: '/insights',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/insights',
        permanent: true,
      },
    ]
  },
   experimental: {
     optimizeCss: true,
   },
}

module.exports = nextConfig
