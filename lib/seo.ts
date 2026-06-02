import { Metadata } from 'next';
import { SITE } from './site';

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
    url: SITE.ogImage,
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
        'en': `${SITE.baseUrl}${path}`,
        'ar': `${SITE.baseUrl}/ar${path}`,
      },
    },
    openGraph: {
      type,
      url: `${SITE.baseUrl}${path}`,
      title,
      description,
      siteName: SITE.name,
      images: images || [defaultImage],
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images?.map(img => img.url) || [defaultImage.url],
      creator: SITE.socials.twitter,
      site: SITE.socials.twitter,
    },
  };

  if (jsonLd) {
    metadata.other = {
      'script:ld+json': JSON.stringify(jsonLd),
    };
  }

  return metadata;
}
