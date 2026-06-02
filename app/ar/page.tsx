import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata: Metadata = generateSEO({
  title: SITE.name,
  description: SITE.description,
  path: '/ar',
  locale: 'ar_AE',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: `${SITE.baseUrl}/ar`,
    logo: `${SITE.baseUrl}${SITE.org.logo}`,
    description: SITE.description,
    areaServed: SITE.org.areasServed,
  },
});

export default function ArabicHomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Arabic content will go here */}
    </main>
  );
}
