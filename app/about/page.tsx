import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Target,
  Lightbulb,
  Users,
  ShieldCheck,
  Globe2,
  Building2,
} from "lucide-react";
import type { Metadata } from "next";
import Script from "next/script";
import GlassyImplementationCTA from "@/components/GlassyImplementationCTA";
import AboutHero from "./AboutHero";
import { SITE } from "@/lib/site";

const ACCENT = SITE.colors.accent;

export const metadata: Metadata = {
  title: `About ${SITE.name} — Business Technology & Transformation Partner`,
  description: `${SITE.name} works with businesses that need better system coordination, clearer reporting, and more efficient operations. Learn who we are and how we work.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About ${SITE.name}`,
    description: `${SITE.name} is a business technology and transformation partner helping companies improve operations, reporting, and decision-making.`,
    url: `${SITE.baseUrl}/about`,
    type: "profile",
    images: [
      {
        url: "/og/og-about.jpg",
        width: 1200,
        height: 630,
        alt: `About ${SITE.name}`,
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <Script id="ld-about" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: `About ${SITE.name}`,
          url: `${SITE.baseUrl}/about`,
          description: `${SITE.name} is a business technology and transformation partner helping companies improve operations, reporting, and decision-making through systems integration, business intelligence, and practical automation.`,
        })}
      </Script>

      <div className="flex flex-col min-h-screen overflow-x-hidden">
        {/* ========================= HERO (photo background carousel) ========================= */}
        <AboutHero />

        {/* ====================== WHO WE ARE ====================== */}
        <section className="py-10 md:py-16 bg-muted/20">
          <div className="container mx-auto max-w-[1200px] px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <Badge
                  className="rounded-full border text-foreground mb-3"
                  style={{ background: `${ACCENT}1A`, borderColor: `${ACCENT}33` }}
                >
                  Who we are
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Who we are</h2>
                <p className="mt-4 text-muted-foreground">
                  {SITE.name} works with businesses that need better system
                  coordination, clearer reporting, and more efficient operations.
                  We combine business understanding with practical implementation
                  to help organisations improve how they work.
                </p>
                <p className="mt-3 text-muted-foreground">
                  We focus on solutions that are usable, measurable, and aligned
                  with business priorities rather than unnecessary complexity.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                    ISO-friendly practices and structured delivery
                  </li>
                  <li className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                    Retail, professional services, and operations businesses
                  </li>
                  <li className="flex items-center gap-2">
                    <Globe2 className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                    Lebanon and UAE with remote-first delivery
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <div className="rounded-xl border bg-white p-4 hover:shadow-md hover:shadow-primary/5 transition-shadow duration-200">
                  <div className="font-semibold text-sm mb-1">Vendor-agnostic</div>
                  <p className="text-xs text-muted-foreground">
                    We work with your existing systems and recommend what is
                    genuinely right for your business, not what is tied to a
                    vendor relationship.
                  </p>
                </div>
                <div className="rounded-xl border bg-white p-4 hover:shadow-md hover:shadow-primary/5 transition-shadow duration-200">
                  <div className="font-semibold text-sm mb-1">Clear scope</div>
                  <p className="text-xs text-muted-foreground">
                    Every engagement starts with defined deliverables and
                    priorities agreed before work begins.
                  </p>
                </div>
                <div className="rounded-xl border bg-white p-4 hover:shadow-md hover:shadow-primary/5 transition-shadow duration-200">
                  <div className="font-semibold text-sm mb-1">No vendor lock-in</div>
                  <p className="text-xs text-muted-foreground">
                    We document everything and deliver solutions your team owns
                    and can maintain independently.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================ WHAT WE HELP CLIENTS ACHIEVE ================ */}
        <section className="py-10 md:py-16">
          <div className="container mx-auto max-w-[1200px] px-4 md:px-6">
            <div className="max-w-2xl mb-10">
              <Badge
                className="rounded-full border text-foreground mb-3"
                style={{ background: `${ACCENT}1A`, borderColor: `${ACCENT}33` }}
              >
                Outcomes
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                What we help clients achieve
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Better visibility across the business", desc: "Dashboards and reports that give leadership a clear, reliable picture." },
                { title: "More reliable reporting and KPI tracking", desc: "Structured KPI frameworks that teams can trust and act on." },
                { title: "Better coordination between systems and teams", desc: "Connected tools that share data cleanly without manual effort." },
                { title: "Less manual work and operational friction", desc: "Automated workflows that remove repetitive tasks and reduce errors." },
                { title: "More structured execution and decision-making", desc: "Clearer processes, better data flow, and faster responses to change." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border bg-white p-4 hover:shadow-md hover:shadow-primary/5 transition-shadow duration-200">
                  <CheckCircle2
                    className="h-4 w-4 mt-0.5 shrink-0"
                    style={{ color: ACCENT }}
                  />
                  <div>
                    <div className="font-semibold text-sm">{item.title}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================= HOW WE WORK ======================= */}
        <section className="relative overflow-hidden bg-[#070912] text-white py-16 md:py-20">
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_60%_at_25%_50%,rgba(94,198,234,0.10),transparent_70%),radial-gradient(50%_50%_at_80%_60%,rgba(139,124,246,0.10),transparent_70%)]" />
          <div className="relative z-10 container mx-auto max-w-[1200px] px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5EC6EA]" />
                How we work
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
                Structured, business-led, focused on{" "}
                <span className="bg-gradient-to-r from-[#5EC6EA] via-[#7CC7F0] to-[#8B7CF6] bg-clip-text text-transparent">
                  what teams use
                </span>
              </h2>
              <p className="mt-3 text-white/65">
                Our approach is built around clear scope, practical outputs and
                handover that sticks.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Understand the business context",
                  desc: "We start by understanding your priorities, current systems, and the outcomes that matter most to your team.",
                },
                {
                  step: "02",
                  title: "Define focused scope and priorities",
                  desc: "We agree on a clear, practical scope with defined deliverables before any work begins.",
                },
                {
                  step: "03",
                  title: "Deliver practical, usable solutions",
                  desc: "We implement solutions your team can rely on, with structured handover and training included.",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <div className="text-2xl font-bold tracking-tighter mb-2 text-[#5EC6EA]">
                    {s.step}
                  </div>
                  <h3 className="text-base font-semibold text-white">{s.title}</h3>
                  <p className="mt-1.5 text-xs text-white/65">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============= WHY CLIENTS CHOOSE THE BRAND ============= */}
        <section className="py-10 md:py-16">
          <div className="container mx-auto max-w-[1200px] px-4 md:px-6">
            <div className="max-w-2xl mb-10">
              <Badge
                className="rounded-full border text-foreground mb-3"
                style={{ background: `${ACCENT}1A`, borderColor: `${ACCENT}33` }}
              >
                Why {SITE.name}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Why clients choose {SITE.name}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Target, title: "Business-first approach", desc: "We start with your goals and priorities, not with technology or vendor preferences." },
                { icon: CheckCircle2, title: "Practical implementation mindset", desc: "Our focus is on solutions that work in practice, not just on paper." },
                { icon: ShieldCheck, title: "Clear scope and deliverables", desc: "Defined outputs agreed upfront — no scope creep, no ambiguity." },
                { icon: Users, title: "Strong focus on usability and adoption", desc: "Solutions built so your teams can actually use them from day one." },
                { icon: Globe2, title: "Vendor-agnostic thinking", desc: "We recommend what is right for your business, not what benefits a vendor." },
                { icon: Lightbulb, title: "Regional understanding", desc: `Experienced in ${SITE.contact.regionLabel} business environments and working practices.` },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border bg-white p-4 hover:shadow-md hover:shadow-primary/5 transition-shadow duration-200">
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

        {/* ============== EXPERTISE / TEAM CREDIBILITY ============== */}
        <section className="py-10 md:py-16 bg-muted/20">
          <div className="container mx-auto max-w-[1200px] px-4 md:px-6">
            <div className="rounded-2xl border bg-white p-8 md:p-10">
              <Badge
                className="rounded-full border text-foreground mb-3"
                style={{ background: `${ACCENT}1A`, borderColor: `${ACCENT}33` }}
              >
                Our expertise
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                Built around practical expertise
              </h2>
              <p className="text-muted-foreground max-w-[65ch]">
                Our team brings a cross-functional business and technology
                mindset, with a focus on implementation, structure, and
                measurable improvement. We have experience supporting
                operational and reporting needs across different business
                contexts in Lebanon, UAE, and the wider region.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl bg-muted/30 border p-4 text-sm">
                  <div className="font-semibold mb-1">Systems integration</div>
                  <div className="text-muted-foreground text-xs">ERP, CRM, POS, ecommerce, finance tools</div>
                </div>
                <div className="rounded-xl bg-muted/30 border p-4 text-sm">
                  <div className="font-semibold mb-1">Business intelligence</div>
                  <div className="text-muted-foreground text-xs">KPI frameworks, dashboards, executive reporting</div>
                </div>
                <div className="rounded-xl bg-muted/30 border p-4 text-sm">
                  <div className="font-semibold mb-1">Process automation</div>
                  <div className="text-muted-foreground text-xs">Workflow design, approvals, operational efficiency</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <GlassyImplementationCTA />
      </div>
    </>
  );
}
