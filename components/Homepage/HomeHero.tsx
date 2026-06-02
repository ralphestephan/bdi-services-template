// components/Homepage/HomeHero.tsx
'use client';

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, CloudCog } from "lucide-react";

export interface HomeHeroProps {
  images: { src: string; alt: string }[];
  accent: string;
  title: string;
  accentWords?: string[];
  summary: string;
  buzz?: string[];
  ctaPrimary: { href: string; label: string };
  ctaSecondary?: { href: string; label: string };
  wordIntervalMs?: number;
  imageIntervalMs?: number;
}

export default function HomeHero({
  images,
  accent,
  title,
  accentWords = [],
  summary,
  buzz = [],
  ctaPrimary,
  ctaSecondary,
  wordIntervalMs = 2200,
  imageIntervalMs = 4200,
}: HomeHeroProps) {
  const [activeImg, setActiveImg] = useState(0);
  const [buzzIdx, setBuzzIdx] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setActiveImg(i => (i + 1) % images.length), imageIntervalMs);
    return () => clearInterval(id);
  }, [images.length, imageIntervalMs]);

  useEffect(() => {
    if (buzz.length < 2) return;
    const id = setInterval(() => setBuzzIdx(i => (i + 1) % buzz.length), wordIntervalMs);
    return () => clearInterval(id);
  }, [buzz.length, wordIntervalMs]);

  const renderedTitle: ReactNode =
    accentWords.length ? highlightWords(title, accentWords, accent) : title;

  return (
    <section aria-label="Home hero" className="relative overflow-hidden">
      {/* background carousel */}
      {images.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={i === activeImg ? img.alt : ""}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`absolute inset-0 object-cover transition-opacity duration-[1100ms] ease-in-out ${i === activeImg ? "opacity-100" : "opacity-0"}`}
          aria-hidden={i !== activeImg}
        />
      ))}

      {/* readability scrims */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.35),rgba(0,0,0,.15))]" />
      <div className="absolute inset-0 [mask-image:radial-gradient(80%_70%_at_25%_40%,black,transparent_70%)] bg-black/25" />

      <div className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="container mx-auto max-w-[1200px] px-4 md:px-6">
          <div className="max-w-[820px] text-white">
            {/* trust chips */}
            <div className="mb-3 md:mb-4 inline-flex flex-wrap items-center gap-2 md:gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 md:gap-2 rounded-full bg-white/10 text-white/85 px-2.5 md:px-3 py-1 border border-white/15">
                <ShieldCheck className="h-3 w-3 md:h-4 md:w-4 opacity-80" /> ISO-ready practices
              </span>
              <span className="inline-flex items-center gap-1.5 md:gap-2 rounded-full bg-white/10 text-white/85 px-2.5 md:px-3 py-1 border border-white/15">
                <CloudCog className="h-3 w-3 md:h-4 md:w-4 opacity-80" /> Vendor-agnostic
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight">
              {renderedTitle}
              {buzz.length > 0 && (
                <span className="block sm:inline sm:ml-2 text-white/85">
                  <em className="not-italic opacity-80">— </em>
                  <span style={{ color: accent }}>{buzz[buzzIdx]}</span>
                </span>
              )}
            </h1>

            <p className="mt-3 md:mt-4 max-w-[65ch] text-white/85 text-base md:text-lg leading-relaxed">
              {summary}
            </p>

            <div className="mt-5 md:mt-6 flex flex-row flex-wrap gap-3">
              <Link
                href={ctaPrimary.href}
                className="inline-flex items-center justify-center h-10 md:h-11 lg:h-12 px-4 md:px-5 lg:px-6 rounded-full text-sm font-semibold text-white min-w-[120px] md:min-w-[140px]"
                style={{
                  background: `linear-gradient(#0b0b0b,#0b0b0b) padding-box, linear-gradient(90deg, ${accent}, rgba(94,198,234,.35), ${accent}) border-box`,
                  border: "2px solid transparent",
                  boxShadow: "0 10px 40px -20px rgba(0,0,0,.8)",
                }}
              >
                {ctaPrimary.label}
              </Link>
              {ctaSecondary && (
                <Button
                  asChild
                  variant="outline"
                  className="h-10 md:h-11 lg:h-12 px-4 md:px-5 lg:px-6 rounded-full bg-white/10 text-white hover:bg-white/15 border-white/30 min-w-[120px] md:min-w-[140px]"
                >
                  <Link href={ctaSecondary.href}>{ctaSecondary.label}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* helpers */
function highlightWords(text: string, words: string[], color: string) {
  const re = new RegExp(`(${words.map(escape).join('|')})`, 'gi');
  return (
    <>
      {text.split(re).map((p, i) =>
        words.some(w => w.toLowerCase() === p.toLowerCase())
          ? <span key={i} style={{ color }}>{p}</span>
          : <span key={i}>{p}</span>
      )}
    </>
  );
}
function escape(s: string) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
