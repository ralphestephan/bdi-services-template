import React from "react";
import Link from "next/link";
import Script from "next/script";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  BarChart4,
  Building2,
  Cable,
  CheckCircle2,
  GitBranch,
  Users,
  Workflow,
} from "lucide-react";
import { ACCENT, SERVICES, ALL_SLUGS } from "./_data";
import ServiceHero from "./ServiceHero";
import Reveal from "@/components/Reveal";
import BdiSystemsSection from "@/components/BdiSystemsSection";

import { generateMetadata as createMetadata } from "@/lib/seo-metadata";

export const metadata = createMetadata({
  path: "/services",
  schemaType: "Service",
});

function EmphasizeWord({
  title,
  keyword,
  color,
}: {
  title: string;
  keyword: string;
  color: string;
}) {
  const re = new RegExp(
    `(${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "i"
  );
  const parts = title.split(re);
  return (
    <>
      {parts[0]?.trimEnd()}
      {" "}
      {parts[1] ? <span style={{ color }}>{parts[1]}</span> : null}
      {parts[2] ? <> {parts[2].trimStart()}</> : null}
    </>
  );
}

const ICONS: Record<string, React.ReactElement> = {
  "systems-integration": <Cable className="h-6 w-6 text-primary" />,
  "business-intelligence": <BarChart4 className="h-6 w-6 text-primary" />,
  automation: <Workflow className="h-6 w-6 text-primary" />,
};

const CLIENT_PROFILE = [
  {
    icon: Building2,
    title: "Multi-branch businesses",
    desc: "Companies operating across multiple locations that need unified reporting and consistent operational visibility.",
  },
  {
    icon: Workflow,
    title: "Operations-driven companies",
    desc: "Businesses where execution, logistics, or service delivery is central and operational clarity matters.",
  },
  {
    icon: Cable,
    title: "Companies with disconnected systems",
    desc: "Organizations with ERP, CRM, POS, or finance tools that are not properly connected or aligned.",
  },
  {
    icon: BarChart4,
    title: "Leadership teams needing KPI visibility",
    desc: "Executive and management teams that lack structured dashboards and reliable reporting.",
  },
  {
    icon: GitBranch,
    title: "Businesses improving ERP / CRM / POS",
    desc: "Companies implementing, improving, or replacing core business systems.",
  },
  {
    icon: Users,
    title: "Companies reducing manual work",
    desc: "Businesses looking to replace spreadsheet dependency and manual reporting with structured automation.",
  },
];

export default function ServicesPage() {
  const images = [
    "/analysis.jpeg",
    "/bi.webp",
    "/digital-transformation-solutions.webp",
    "/dashboardjpeg.jpeg",
  ];

  return (
    <>
      <Script id="ld-services" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Business Intelligence & Digital Transformation",
          provider: {
            "@type": "Organization",
            name: "BDI Corporate",
            url: "https://bdicorporate.com",
          },
          areaServed: ["LB", "AE", "EMEA"],
        })}
      </Script>

      <main className="flex flex-col min-h-screen overflow-x-hidden">
        <ServiceHero
          images={images}
          title="Services designed to improve visibility, efficiency, and execution."
          accentWords={["visibility", "efficiency", "execution"]}
          summary="BDI Corporate helps businesses connect systems, centralize reporting, and automate operations through focused, practical delivery."
          accent={ACCENT}
          ctaPrimary={{ href: "/contact?from=services", label: "Contact Us" }}
          ctaSecondary={{ href: "/contact?from=discovery", label: "Book a discovery call" }}
          stats={[]}
          intervalMs={5000}
        />

        <section className="py-10 md:py-16 px-4 md:px-6 bg-muted/20">
          <div className="container mx-auto max-w-[1200px]">
            <div className="max-w-2xl mb-10">
              <Badge
                className="rounded-full border text-foreground mb-3"
                style={{ background: `${ACCENT}1A`, borderColor: `${ACCENT}33` }}
              >
                Client profile
              </Badge>
              <h2 className="mt-1 text-3xl md:text-4xl font-bold tracking-tight">
                Types of businesses we work with
              </h2>
              <p className="mt-3 text-muted-foreground">
                Beyond specific companies, we work with business types that
                share common needs around visibility, coordination, and
                efficiency.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CLIENT_PROFILE.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-xl border bg-card p-4 hover:shadow-md hover:shadow-primary/5 transition-shadow duration-200"
                >
                  <item.icon className="h-5 w-5 mt-0.5 shrink-0" style={{ color: ACCENT }} />
                  <div>
                    <div className="font-semibold text-sm">{item.title}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="catalog" className="py-10 md:py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-[1200px]">
            <div className="max-w-2xl mb-10">
              <Badge
                className="rounded-full border text-foreground mb-3"
                style={{ background: `${ACCENT}1A`, borderColor: `${ACCENT}33` }}
              >
                Core services
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Our core services
              </h2>
              <p className="mt-3 text-muted-foreground">
                Three focused services, each with clear business value and
                defined outcomes.
              </p>
            </div>

            <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ALL_SLUGS.map((slug) => {
                const s = SERVICES[slug];
                const Icon = ICONS[slug];
                const outcomes: Record<string, string[]> = {
                  "systems-integration": ["Reduced silos", "Better data flow", "Cleaner operations"],
                  "business-intelligence": ["Clear executive visibility", "Better reporting", "Faster decisions"],
                  automation: ["Less manual work", "Better consistency", "Higher execution speed"],
                };

                return (
                  <Link key={slug} href={`/services/${slug}`} className="group">
                    <Card className="h-full rounded-2xl border bg-card shadow-sm transition-all duration-200 hover:shadow-md">
                      <CardContent className="p-4 md:p-5 flex h-full flex-col gap-3">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 p-3 rounded-2xl shrink-0">{Icon}</div>
                          <div className="min-w-0">
                            <h3 className="text-xl font-bold">
                              <EmphasizeWord title={s.title} keyword={s.keyword} color={ACCENT} />
                            </h3>
                            <p className="mt-2 text-muted-foreground text-sm">{s.summary}</p>
                          </div>
                        </div>
                        <ul className="space-y-1.5 mt-auto">
                          {outcomes[slug]?.map((outcome) => (
                            <li key={outcome} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: ACCENT }} />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                        <div className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: ACCENT }}>
                          Learn more
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </Reveal>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#070912] text-white px-4 md:px-6 py-16 md:py-20">
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_60%_at_75%_45%,rgba(94,198,234,0.10),transparent_70%),radial-gradient(50%_50%_at_15%_20%,rgba(139,124,246,0.10),transparent_70%)]" />
          <div className="relative z-10 container mx-auto max-w-[1200px]">
            <div className="max-w-2xl mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5EC6EA]" />
                Challenges
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
                Common business challenges we{" "}
                <span className="bg-gradient-to-r from-[#5EC6EA] via-[#7CC7F0] to-[#8B7CF6] bg-clip-text text-transparent">
                  solve
                </span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Disconnected tools and inconsistent data",
                "Manual reporting and spreadsheet dependency",
                "Weak visibility across departments",
                "Slow approvals and repetitive admin work",
                "Lack of structured dashboards and KPI tracking",
              ].map((challenge) => (
                <div
                  key={challenge}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <div className="mt-1.5 h-2 w-2 rounded-full shrink-0 bg-[#5EC6EA]" />
                  <span className="text-sm text-white/70">{challenge}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BdiSystemsSection />
      </main>
    </>
  );
}
