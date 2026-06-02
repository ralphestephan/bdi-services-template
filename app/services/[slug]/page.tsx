// app/services/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import BdiSystemsSection from "@/components/BdiSystemsSection";
import type { LucideIcon } from "lucide-react";
import {
  CheckCircle2, ShieldCheck, BarChart3, LayoutGrid, Database, Gauge, Megaphone,
  FileSpreadsheet, Boxes, Layers, Settings, ShoppingCart, CreditCard, Calendar,
  CloudCog, Zap, SlidersHorizontal, Cloud, MessageCircle, Table,
  ChevronRight,
} from "lucide-react";

import { ACCENT, SERVICES, ALL_SLUGS, type Service, type IconKey } from "../_data";
import { SITE } from "@/lib/site";
/* ---------- helpers ---------- */

/* ---------- ICONS (typed) ---------- */
const ICON_MAP: Record<IconKey, LucideIcon> = {
  BarChart3, LayoutGrid, Database, Gauge, Megaphone, FileSpreadsheet,
  Boxes, Layers, Settings, ShoppingCart, CreditCard, Calendar, CloudCog,
  Zap, SlidersHorizontal, Cloud, MessageCircle, Table,
};

/* ---------- SSG + SEO ---------- */
export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

/* ---------- SEO ---------- */
export async function generateMetadata(
  { params }: { params?: Promise<{ slug: Service["slug"] }> }
): Promise<Metadata> {
  if (!params) return {};
  const { slug } = await params;

  const s = SERVICES[slug];
  if (!s) return {};

  return {
    title: `${s.title} | ${SITE.name}`,
    description: s.summary,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      title: s.title,
      description: s.summary,
      url: `${SITE.baseUrl}/services/${s.slug}`,
      type: "article",
      images: [{ url: s.heroImages[0] || "/og/og-services.jpg", width: 1200, height: 630, alt: s.title }],
    },
  };
}
/* ---------- PAGE ---------- */
export default async function Page(
  { params }: { params?: Promise<{ slug: Service["slug"] }> }
) {
  if (!params) return notFound();
  const { slug } = await params;

  const s = SERVICES[slug];
  if (!s) return notFound();

  const highlight = (full: string, key: string) => {
    const i = full.indexOf(key);
    if (i < 0) return full;
    return (
      <>
        {full.slice(0, i)}
        <span style={{ color: ACCENT }}>{key}</span>
        {full.slice(i + key.length)}
      </>
    );
  };

  return (
    <main className="flex flex-col min-h-screen w-full overflow-x-clip">
      {/* ============================== HERO ============================== */}
      <section className="relative overflow-hidden" aria-label={`${s.title} hero`}>
        {s.heroImages.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={i === 0 ? s.title : ""}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`absolute inset-0 object-cover transition-opacity duration-1000 ${i === 0 ? "opacity-100" : "opacity-0"}`}
          />
        ))}

        {/* readability scrims */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.35),rgba(0,0,0,.15))]" />
        <div className="absolute inset-0 [mask-image:radial-gradient(80%_70%_at_25%_40%,black,transparent_70%)] bg-black/30" />

        <div className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-24">
          <div className="container mx-auto max-w-[1200px] px-4 md:px-6 grid lg:grid-cols-[1fr_520px] items-center gap-6">
            {/* LEFT: headline + actions */}
            <div className="max-w-[900px] text-white">
              {/* breadcrumb */}
              <div className="mb-4 inline-flex items-center gap-2 text-xs">
                <Link
                  href="/services"
                  className="rounded-full bg-white/10 text-white/80 px-3 py-1 border border-white/15 hover:bg-white/15"
                >
                  Services
                </Link>
                <span className="text-white/50">/</span>
                <span className="rounded-full bg-white/8 text-white/70 px-3 py-1 border border-white/10">
                  {s.title}
                </span>
              </div>

              <h1 className="text-[40px] sm:text-6xl font-extrabold leading-[1.03] tracking-tight">
                {highlight(s.title, s.keyword)}
              </h1>

              <p className="mt-3 max-w-[72ch] text-white/85 md:text-lg">{s.summary}</p>

              {/* little trust row */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/85">
                <span className="inline-flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80"><path fill="currentColor" d="M12 2l9 4v6c0 5-3.9 9.74-9 10c-5.1-.26-9-5-9-10V6z"/></svg>
                  Lebanon & UAE
                </span>
                <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 opacity-80" /> ISO-friendly</span>
                <span className="inline-flex items-center gap-2"><CloudCog className="h-4 w-4 opacity-80" /> Fixed-scope options</span>
              </div>

              {/* CTAs — symmetric */}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={s.ctaHref}
                  className="inline-flex items-center justify-center h-12 px-6 rounded-full text-sm font-semibold text-white border-2"
                  style={{
                    background: `linear-gradient(#0b0b0b,#0b0b0b) padding-box, linear-gradient(90deg, ${ACCENT}, rgba(94,198,234,.35), ${ACCENT}) border-box`,
                    border: "2px solid transparent",
                    boxShadow: "0 10px 40px -20px rgba(0,0,0,.8)",
                  }}
                >
                  {s.ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================== WHY IT MATTERS + SNAPSHOT + TECH ================== */}
      <section className="py-14 md:py-20 px-4 md:px-6" aria-labelledby="why">
        <div className="container mx-auto max-w-[1200px] grid lg:grid-cols-3 gap-8">
          {/* LEFT column */}
          <div className="lg:col-span-2 space-y-10">
            <div className="space-y-4">
              <h2 id="why" className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Why <span style={{ color: ACCENT }}>{s.keyword}</span> with {SITE.brand}
              </h2>
              <span className="block h-1 w-16 rounded-full" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}55)` }} />
              <p className="text-muted-foreground md:text-lg max-w-[72ch]">{s.pitch}</p>
            </div>

            {/* Tech stack — animated chips */}
            <div className="rounded-3xl border bg-card shadow-sm p-5 relative overflow-hidden">
              <div className="absolute inset-x-0 -top-10 h-16" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}20, transparent)` }} />
              <h3 className="text-lg font-semibold">Tech stack we typically use</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {s.tech.map(({ label, icon }) => {
                  const Icon = ICON_MAP[icon];
                  return (
                    <span
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs bg-muted/30 hover:bg-muted/20 transition"
                    >
                      <Icon className="h-4 w-4 opacity-80" />
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Alternating rich sections */}
            <div className="space-y-10">
              {s.sections.map((sec, i) => (
                <div
                  key={sec.title}
                  className={`grid gap-6 items-center ${i % 2 === 0 ? "lg:grid-cols-2" : "lg:grid-cols-2 lg:[&>*:first-child]:order-2"}`}
                >
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold">{sec.title}</h3>
                    <p className="text-muted-foreground">{sec.desc}</p>
                    <ul className="mt-2 space-y-2 text-sm">
                      {sec.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 mt-0.5" style={{ color: ACCENT }} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative rounded-xl overflow-hidden ring-1 ring-border bg-card">
                    <Image src={sec.img} alt={sec.title} width={800} height={600} sizes="(max-width:1024px) 100vw, 600px" className="w-full h-auto object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>

<aside className="lg:col-span-1">
  <div className="sticky top-24 space-y-4">
    <section className="rounded-2xl border bg-card p-5" aria-label="Scope">
      <h3 className="text-base font-semibold">Included in scope</h3>
      <ul className="mt-3 space-y-2">
        {s.features.slice(0, 5).map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 mt-0.5" style={{ color: ACCENT }} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </section>

    <section className="rounded-2xl border bg-card p-5">
      <h4 className="text-base font-semibold">Outcomes</h4>
      <ul className="mt-3 space-y-2">
        {s.outcomes.slice(0, 4).map((o) => (
          <li key={o} className="text-sm text-muted-foreground">- {o}</li>
        ))}
      </ul>
    </section>

    <section className="rounded-2xl border bg-card p-5">
      <h4 className="text-base font-semibold">Other services</h4>
      <div className="mt-3 grid gap-2">
        {ALL_SLUGS.filter((x) => x !== s.slug).map((slug) => (
          <Link
            key={slug}
            href={`/services/${slug}`}
            className="group flex items-center justify-between rounded-xl border px-3 py-2 text-sm hover:bg-muted/30 transition"
          >
            <span>{SERVICES[slug].title}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </section>
  </div>
</aside>

        </div>
      </section>

      <section className="py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-[1200px]">
          <div className="rounded-2xl border bg-muted/20 p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">Delivery model</h3>
            <p className="mt-2 text-muted-foreground max-w-[70ch]">
              We start with a fixed initial scope, implement quickly, and then expand
              based on measurable outcomes and operational priorities.
            </p>
            <ul className="mt-4 space-y-2">
              {s.expect.slice(0, 3).map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 mt-0.5" style={{ color: ACCENT }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <BdiSystemsSection />

      <section className="py-14 md:py-16 bg-muted/20 px-4 md:px-6">
        <div className="container mx-auto max-w-[1000px] text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Discuss your priorities with our team
          </h2>
          <p className="mt-3 text-muted-foreground">
            We will define a practical service scope and clear next step.
          </p>
          <div className="mt-6">
            <Button asChild size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
