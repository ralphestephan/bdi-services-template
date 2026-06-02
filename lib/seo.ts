import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  images?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  }[];
  type?: 'website' | 'article';
  locale?: string;
  jsonLd?: Record<string, unknown>;
}

export function generateSEO({
  title,
  description,
  path,
  images,
  type = 'website',
  locale = 'en_US',
  jsonLd,
}: SEOProps): Metadata {
  const defaultImage = {
    url: '/og/og-home.jpg',
    width: 1200,
    height: 630,
    alt: title,
  };

  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        'en': `https://bdicorporate.com${path}`,
        'ar': `https://bdicorporate.com/ar${path}`,
      },
    },
    openGraph: {
      type,
      url: `https://bdicorporate.com${path}`,
      title,
      description,
      siteName: 'BDI Corporate',
      images: images || [defaultImage],
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images?.map(img => img.url) || [defaultImage.url],
      creator: '@bdicorporate',
      site: '@bdicorporate',
    },
  };

  if (jsonLd) {
    metadata.other = {
      'script:ld+json': JSON.stringify(jsonLd),
    };
  }

  return metadata;
}