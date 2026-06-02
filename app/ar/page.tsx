import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'بي دي آي كوربوريت - حلول ذكاء الأعمال الرائدة',
  description: 'شريكك في التحول الرقمي وذكاء الأعمال في دبي ولبنان. خدمات متكاملة في تحليل البيانات والذكاء الاصطناعي وحلول الأعمال.',
  path: '/ar',
  locale: 'ar_AE',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BDI Corporate',
    url: 'https://bdicorporate.com/ar',
    logo: 'https://bdicorporate.com/logo.png',
    description: 'خدمات ذكاء الأعمال والتحول الرقمي في دبي ولبنان',
    areaServed: ['الإمارات العربية المتحدة', 'لبنان', 'الشرق الأوسط'],
  },
});

export default function ArabicHomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Arabic content will go here */}
    </main>
  );
}