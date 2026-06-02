'use client';

import { useEffect, useState, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CloudCog, Users } from 'lucide-react';
import { useSiteBrand } from '@/lib/tenant-brand';

const backgroundImages = [
  { src: '/clients.jpeg',  alt: 'Workshop on data strategy' },
  { src: '/clients2.jpg',  alt: 'Leaders aligning on KPIs' },
  { src: '/business-planning.webp', alt: 'Integration planning session' },
];

function highlightWords(text: string, words: string[], color: string): ReactNode {
  const re = new RegExp(`(${words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const parts = text.split(re);
  return (
    <>
      {parts.map((p, i) =>
        words.some(w => w.toLowerCase() === p.toLowerCase())
          ? <span key={i} style={{ color }}>{p}</span>
          : <span key={i}>{p}</span>
      )}
    </>
  );
}

export default function AboutHero() {
  const brand = useSiteBrand();
  const ACCENT = brand.accentColor || '#5EC6EA';
  const brandName = brand.name;
  const regionLabel = brand.regionLabel;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (backgroundImages.length < 2) return;
    const id = setInterval(
      () => setActive(i => (i + 1) % backgroundImages.length),
      4500
    );
    return () => clearInterval(id);
  }, []);

  const title = highlightWords(
    `${brandName} is a business technology partner for operational clarity`,
    [brandName],
    ACCENT
  );

  return (
    <section aria-label={`About ${brandName}`} className="relative overflow-hidden">
      {/* background carousel */}
      {backgroundImages.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={i === active ? img.alt : ''}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`absolute inset-0 object-cover transition-opacity duration-[1200ms] ease-in-out ${i === active ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden={i !== active}
        />
      ))}

      {/* readability scrims */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.35),rgba(0,0,0,.15))]" />
      <div className="absolute inset-0 [mask-image:radial-gradient(80%_70%_at_25%_40%,black,transparent_70%)] bg-black/25" />

      {/* content */}
      <div className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="container mx-auto max-w-[1200px] px-4 md:px-6">
          <div className="max-w-[820px] text-white">
            {/* badge */}
            <div className="mb-4 inline-flex items-center gap-3 text-xs">
              <span className="rounded-full bg-white/10 text-white/85 px-3 py-1 border border-white/15">About us</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
              {title}
            </h1>

            <p className="mt-3 max-w-[72ch] text-white/85 md:text-lg">
              {brandName} combines business understanding with practical
              implementation — helping organisations improve how systems, data,
              and operations work together.
            </p>

            {/* trust chips */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/85">
              <span className="inline-flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80"><path fill="currentColor" d="M12 2l9 4v6c0 5-3.9 9.74-9 10c-5.1-.26-9-5-9-10V6z"/></svg>
                {regionLabel}
              </span>
              <span className="inline-flex items-center gap-2"><CloudCog className="h-4 w-4 opacity-80" /> Vendor-agnostic</span>
              <span className="inline-flex items-center gap-2"><Users className="h-4 w-4 opacity-80" /> Consultants &amp; engineers</span>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact?from=about"
                className="inline-flex items-center justify-center h-10 md:h-11 lg:h-12 px-4 md:px-5 lg:px-6 rounded-full text-sm font-semibold text-white"
                style={{
                  background: `linear-gradient(#0b0b0b,#0b0b0b) padding-box, linear-gradient(90deg, ${ACCENT}, rgba(94,198,234,.35), ${ACCENT}) border-box`,
                  border: '2px solid transparent',
                  boxShadow: '0 10px 40px -20px rgba(0,0,0,.8)',
                }}
              >
                Talk to us
              </Link>
              <Button
                asChild
                variant="outline"
                className="h-10 md:h-11 lg:h-12 px-4 md:px-5 lg:px-6 rounded-full bg-white/10 text-white hover:bg-white/15 border-white/30"
              >
                <Link href="/services">Our services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
