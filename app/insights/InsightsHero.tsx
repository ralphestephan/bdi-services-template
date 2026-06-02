"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ACCENT = "#5EC6EA";

export default function InsightsHero() {
  const images = [
    { src: "/consult2.jpeg", alt: "Leaders discussing KPI strategy" },
    { src: "/business-planning.webp", alt: "Planning data contracts and KPIs" },
    { src: "/digitalcons.jpg", alt: "Designing automation playbooks" },
  ];

  const [active, setActive] = useState(0);
  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setActive(i => (i + 1) % images.length), 4500);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <section className="relative overflow-hidden" aria-label="Insights">
      {/* BG carousel */}
      {images.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={i === active ? img.alt : ""}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`absolute inset-0 object-cover transition-opacity duration-[1200ms] ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== active}
        />
      ))}

      {/* Readability scrims */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.42),rgba(0,0,0,.18))]" />
      <div className="absolute inset-0 [mask-image:radial-gradient(80%_70%_at_25%_40%,black,transparent_70%)] bg-black/30" />

      {/* Content */}
      <div className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="container mx-auto max-w-[1200px] px-4 md:px-6">
          <div className="max-w-[820px] text-white">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs border bg-white/10 text-white/85 border-white/15 mb-4">
              Insights & Playbooks
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
              Ship better{" "}
              <span style={{ color: ACCENT }}>dashboards</span>,{" "}
              <span style={{ color: ACCENT }}>automations</span>,{" "}
              and{" "}
              <span style={{ color: ACCENT }}>integrations</span>
            </h1>

            <p className="mt-3 max-w-[68ch] md:text-lg text-white/85">
              Field-tested guides on KPIs, data contracts, and automation patterns — so teams decide faster with less busywork.
            </p>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center justify-center h-10 md:h-11 lg:h-12 px-4 md:px-5 lg:px-6 rounded-full text-sm font-semibold text-white"
                style={{
                  background: `linear-gradient(#0b0b0b,#0b0b0b) padding-box, linear-gradient(90deg, ${ACCENT}, rgba(94,198,234,.35), ${ACCENT}) border-box`,
                  border: "2px solid transparent",
                  boxShadow: "0 10px 40px -20px rgba(0,0,0,.8)",
                }}
              >
                About BDI Corporate
              </Link>
              <Button
                asChild
                variant="outline"
                className="h-10 md:h-11 lg:h-12 px-4 md:px-5 lg:px-6 rounded-full bg-white/10 text-white hover:bg-white/15 border-white/30"
              >
                <Link href="/contact?from=suggest-topic">Suggest a topic</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
