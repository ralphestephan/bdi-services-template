'use client';

import { useEffect, useState, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ShieldCheck, CloudCog, Gauge, Zap, Workflow, Clock,
  LayoutGrid, Timer, ArrowUpRight, type LucideIcon
} from 'lucide-react';

const ICONS = {
  grid: LayoutGrid,
  timer: Timer,
  workflow: Workflow,
  clock: Clock,
  bolt: Zap,
  gauge: Gauge,
};
export type IconName = keyof typeof ICONS;

export type Stat = {
  label: string;
  value: string;
  icon?: IconName;
  hint?: string;
  delta?: string;
};

export interface ServiceHeroProps {
  images: string[];
  title: ReactNode;
  accentWords?: string[];
  summary: string;
  accent: string;
  ctaPrimary: { href: string; label: string };
  ctaSecondary?: { href: string; label: string };
  stats?: Stat[];
  intervalMs?: number;
}

function defaultIcon(label: string): LucideIcon {
  const l = label.toLowerCase();
  if (l.includes('adoption') || l.includes('uptime') || l.includes('coverage')) return Gauge;
  if (l.includes('automation') || l.includes('ops') || l.includes('manual'))  return Zap;
  if (l.includes('integration') || l.includes('saas'))                         return Workflow;
  if (l.includes('time') || l.includes('latency') || l.includes('draft'))      return Clock;
  return Gauge;
}

export default function ServiceHero(props: ServiceHeroProps) {
  const {
    images, title, accentWords = [], summary, accent,
    ctaPrimary, ctaSecondary, stats = [], intervalMs = 5000
  } = props;

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setActive(i => (i + 1) % images.length), intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  const renderedTitle =
    typeof title === 'string' && accentWords.length
      ? highlightWords(title, accentWords, accent)
      : title;

  return (
    <section className="relative overflow-hidden" aria-label="Services hero">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === active ? 'Services hero' : ''}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`absolute inset-0 object-cover transition-opacity duration-[1200ms] ease-in-out ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={i !== active}
        />
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.35),rgba(0,0,0,.15))]" />
      <div className="absolute inset-0 [mask-image:radial-gradient(80%_70%_at_25%_40%,black,transparent_70%)] bg-black/30" />

      <div className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="container mx-auto max-w-[1200px] px-4 md:px-6 grid lg:grid-cols-[1fr_520px] items-center gap-6">
          {/* LEFT */}
          <div className="max-w-[900px] text-white">
            <div className="mb-4 inline-flex items-center gap-3 text-xs">
              <span className="rounded-full bg-white/10 text-white/85 px-3 py-1 border border-white/15">Our Services</span>
            </div>
            <h1 className="text-[40px] sm:text-6xl font-extrabold leading-[1.03] tracking-tight">
              {renderedTitle}
            </h1>

            <p className="mt-3 max-w-[72ch] text-white/85 md:text-lg">{summary}</p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/85">
              <span className="inline-flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80">
                  <path fill="currentColor" d="M12 2l9 4v6c0 5-3.9 9.74-9 10c-5.1-.26-9-5-9-10V6z"/>
                </svg>
                Lebanon &amp; UAE
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 opacity-80" /> ISO-friendly
              </span>
              <span className="inline-flex items-center gap-2">
                <CloudCog className="h-4 w-4 opacity-80" /> Fixed-scope options
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={ctaPrimary.href}
                className="inline-flex items-center justify-center h-12 px-6 rounded-full text-sm font-semibold text-white border-2"
                style={{
                  background: `linear-gradient(#0b0b0b,#0b0b0b) padding-box, linear-gradient(90deg, ${accent}, rgba(94,198,234,.35), ${accent}) border-box`,
                  border: '2px solid transparent',
                  boxShadow: '0 10px 40px -20px rgba(0,0,0,.8)',
                }}
              >
                {ctaPrimary.label}
              </Link>

              {ctaSecondary && (
                <Button
                  asChild
                  variant="outline"
                  className="h-12 px-6 rounded-full bg-white/10 text-white hover:bg-white/15 border-white/30"
                >
                  <Link href={ctaSecondary.href}>{ctaSecondary.label}</Link>
                </Button>
              )}
            </div>
          </div>

          {/* RIGHT: Stats Dock — clean, no sparklines */}
          {!!stats.length && (
            <aside className="relative mt-6 lg:mt-0">
              <div className="relative rounded-[28px] border border-white/25 bg-white/18 backdrop-blur-md p-5 sm:p-6 shadow-[0_40px_120px_-30px_rgba(0,0,0,.6)]">
                <div
                  className="pointer-events-none absolute -top-20 -right-12 h-64 w-64 rounded-full opacity-30"
                  style={{ background: accent, filter: 'blur(60px)' }}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stats.slice(0, 4).map(({ label, value, icon, hint, delta }) => {
                    const Icon = icon ? ICONS[icon] : defaultIcon(label);
                    const pos = !(delta || '').trim().startsWith('-');
                    return (
                      <div key={label} className="rounded-2xl bg-background/90 text-foreground p-4 border border-border shadow-inner">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ background: `${accent}22`, color: accent }}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
                            {hint && <div className="text-[11px] text-muted-foreground">{hint}</div>}
                          </div>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="text-xl font-semibold">{value}</div>
                          {delta && (
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${pos ? '' : 'text-destructive'}`}
                              style={pos ? { background: `${accent}1A`, color: accent } : { background: `${accent}1A` }}
                            >
                              <ArrowUpRight className={`h-3 w-3 ${pos ? '' : 'rotate-180'}`} />
                              {delta}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}

/* helpers */
function highlightWords(text: string, words: string[], color: string) {
  const parts = text.split(new RegExp(`(${words.map(escapeRegExp).join('|')})`, 'gi'));
  return (
    <>
      {parts.map((p, i) =>
        words.some(w => w.toLowerCase() === p.toLowerCase()) ? (
          <span key={i} style={{ color }}>{p}</span>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}
function escapeRegExp(s: string) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
