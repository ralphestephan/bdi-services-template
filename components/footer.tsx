"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { toast } from "sonner";
//import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Linkedin,
  Twitter,
  Cable,
  LineChart,
  Bot,
  ShieldCheck,
} from "lucide-react";
import { routes } from "@/lib/constants";

const ACCENT = "#5EC6EA";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast("Subscribed successfully");
        setEmail("");
      } else {
        toast(data.message || "Subscription failed");
      }
    } catch {
      toast("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const quickLinks = routes.map(({ href, label }) => (
      <li key={href}>
        <Link href={href} className="text-sm text-white/70 hover:text-white">
          {label}
        </Link>
      </li>
    ));

  const serviceLinks = [
    { href: "/services/systems-integration", label: "Systems Integration", Icon: Cable },
    { href: "/services/business-intelligence", label: "Business Intelligence", Icon: LineChart },
    { href: "/services/automation", label: "AI & Automation", Icon: Bot },
  ];

  return (
    <footer role="contentinfo" className="relative mt-0 bg-black text-white overflow-hidden">
      {/* soft brand glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: `${ACCENT}22` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: `${ACCENT}18` }}
      />

      {/* Organization JSON-LD */}
      <Script id="ld-org" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "BDI Corporate",
          url: "https://bdicorporate.com",
          logo: "https://bdicorporate.com/whitelogo.jpg",
          sameAs: [],
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+9613599996",
              contactType: "customer service",
              areaServed: ["LB", "AE"],
              availableLanguage: ["English", "Arabic"],
            },
            {
              "@type": "ContactPoint",
              telephone: "+971529798517",
              contactType: "customer service",
              areaServed: ["AE", "LB"],
              availableLanguage: ["English", "Arabic"],
            },
          ],
          address: [
            { "@type": "PostalAddress", addressLocality: "Beirut", addressCountry: "LB" },
            { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
          ],
        })}
      </Script>

      <div className="container mx-auto max-w-[1200px] px-4 md:px-6 pb-10 pt-8">
        {/* thin creative divider */}
        <div className="mb-8 flex items-center gap-2 text-xs text-white/40">
          <span className="h-[2px] w-10 rounded-full" style={{ background: ACCENT }} />
          <span>Lebanon • UAE</span>
          <span className="h-[2px] w-full rounded-full bg-white/10" />
        </div>

        {/* Responsive 12-col grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-6 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 space-y-4">
            <Link href="/" className="flex items-center gap-3" aria-label="BDI Corporate home">
              <Image src="/whitelogo.jpg" alt="BDI Corporate logo" width={40} height={60} className="h-12 w-8" />
              <span className="text-2xl font-bold">
                BDI <span style={{ color: ACCENT }}>Corporate</span>
              </span>
            </Link>
            <p className="text-sm text-white/70 max-w-xs">Connecting systems, centralising reporting, and automating operations for businesses across Lebanon and the UAE.</p>

            <div className="flex items-center gap-3 pt-1">
              <a href="https://www.linkedin.com" aria-label="LinkedIn" className="rounded-full p-2 hover:bg-white/10">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="rounded-full p-2 hover:bg-white/10">
                <Twitter className="h-5 w-5" />
              </a>
            </div>

            {/* tiny credibility chips */}
            <div className="mt-3 flex flex-wrap gap-2">

              <Link href="/locations/lebanon" className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/80 hover:border-white/30 hover:text-white transition-colors">🇱🇧 Beirut</Link>
              <Link href="/locations/dubai" className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/80 hover:border-white/30 hover:text-white transition-colors">🇦🇪 Dubai</Link>
                          <span className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1 text-xs text-white/80">
                <ShieldCheck className="h-3.5 w-3.5 text-white/70" /> ISO-friendly
              </span>
            </div>
          </div>

          {/* Services with icons (new) */}
          <div className="col-span-1 md:col-span-3 space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map(({ href, label, Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
                    aria-label={label}
                  >
                    <Icon className="h-4.5 w-4.5 text-white/70 group-hover:text-white" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div className="col-span-1 md:col-span-3 space-y-4">
            <h3 className="text-lg font-semibold">Pages</h3>
            <ul className="space-y-2">{quickLinks}</ul>
          </div>

          {/* Contact — right-sized, no crowding */}
          <div className="col-span-2 md:col-span-3 space-y-4 md:-ml-1">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-6 w-6 text-white/90" aria-hidden />
                <span className="text-white/70">Beirut, Lebanon • Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-6 w-6 text-white/90" aria-hidden />
                <a className="text-white/70 hover:underline whitespace-nowrap" href="tel:+9613599996">
                  +961&nbsp;3&nbsp;599&nbsp;996
                </a>
                <span className="px-1.5 text-white/30">|</span>
                <a className="text-white/70 hover:underline whitespace-nowrap" href="tel:+971529798517">
                  +971&nbsp;52&nbsp;979&nbsp;8517
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-white/90" aria-hidden />
                <a className="text-white/70 hover:underline" href="mailto:info@bdicorporate.com">
                  info@bdicorporate.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter — shiny bordered CTA button */}
          <div className="col-span-2 md:col-span-4 space-y-5">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-sm text-white/70">Practical insights on systems, reporting, and operations — delivered monthly.</p>
            <form onSubmit={handleSubscribe} className="space-y-2" aria-label="Newsletter subscribe">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="bg-white text-black flex-1"
                  required
                  autoComplete="email"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Subscribe to newsletter"
                  className="relative inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap transition-transform hover:-translate-y-[1px] disabled:opacity-70"
                  style={{
                    background:
                      `linear-gradient(#0b0b0b,#0b0b0b) padding-box,
                       linear-gradient(90deg, ${ACCENT}, rgba(94,198,234,.35), ${ACCENT}) border-box`,
                    border: "2px solid transparent",
                    boxShadow: "0 8px 18px rgba(0,0,0,.08)",
                  }}
                >
                  <span className="relative z-10 flex items-center">
                    {loading ? "Subscribing…" : "Subscribe"}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                  {/* gentle sweep */}
                  <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full overflow-hidden">
                    <span
                      className="absolute top-0 h-full w-[60%]"
                      style={{
                        left: "-120%",
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,.30), transparent)",
                        transform: "skewX(-16deg)",
                        animation: "bdiSweep 3.2s ease-in-out infinite",
                      }}
                    />
                  </span>
                </button>
              </div>
              <p className="text-xs text-white/50">No spam. Unsubscribe anytime.</p>
            </form>
          </div>
        </div>

        {/* bottom line */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col items-center justify-between gap-3 md:flex-row">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} BDI Corporate. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/privacy" className="text-white/60 hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="text-white/60 hover:text-white">
              Terms
            </Link>
            <Link href="/glossary" className="text-white/60 hover:text-white">
              Glossary
            </Link>
            <span className="text-white/40">•</span>
            <span className="text-white/60">Made in Lebanon & UAE</span>
          </div>
        </div>
      </div>

      {/* Scoped keyframes for button sweep */}
      <style>{`
        @keyframes bdiSweep {
          0% { left:-120%; }
          50% { left:120%; }
          100% { left:120%; }
        }
      `}</style>
    </footer>
  );
}
