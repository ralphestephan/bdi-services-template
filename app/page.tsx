import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Cable,
  Check,
  CheckCircle2,
  LayoutDashboard,
  LineChart,
  Plug,
  Workflow,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import HomeHero from "@/components/Homepage/HomeHero";
import IntegrationsConstellation from "@/components/Homepage/IntegrationsConstellation";
import StructuredData from "@/components/StructuredData";
import { generateOrganizationSchema } from "@/lib/seo-metadata";
import { generateMetadata as createMetadata } from "@/lib/seo-metadata";

export const metadata = createMetadata({
  path: "/",
  schemaType: "Organization",
});

const ACCENT = "#5EC6EA";

export default function Page() {
  const heroImages = [
    { src: "/digitalcons.jpg", alt: "Digital transformation workshop" },
    { src: "/businessplan.jpg", alt: "Business planning and analytics" },
    { src: "/consult2.jpeg", alt: "Systems integrations session" },
    { src: "/data.jpeg", alt: "Dashboards and KPIs" },
  ];

  return (
    <>
      <StructuredData schema={generateOrganizationSchema()} id="organization-schema" />
      <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
        <HomeHero
          images={heroImages}
          accent={ACCENT}
          title="BDI Corporate helps businesses connect systems, centralize reporting, and automate operations."
          accentWords={["BDI Corporate"]}
          summary="Through BDI Systems, we help startups and SMEs run operations, connect business tools, support marketing execution, build digital storefronts, and work with AI in plain language through one structured environment."
          buzz={["Lebanon and UAE delivery", "connected business systems", "practical automation"]}
          ctaPrimary={{ href: "/contact", label: "Book a discovery call" }}
          ctaSecondary={{ href: "/services", label: "View services" }}
          wordIntervalMs={2500}
          imageIntervalMs={4200}
        />

        <TrustStrip />
        <StatBand />
        <ServicesSnapshot />
        <IntegrationsConstellation />
        <HowItWorks />
        <WhyBDI />
        <Comparison />
        <HomeFinalCTA />
      </main>
    </>
  );
}

function StatBand() {
  const stats = [
    { value: "5", label: "Business models — membership, commerce, services, rental & billing" },
    { value: "20+", label: "Tools & integrations connected in one workflow" },
    { value: "2", label: "Markets delivered end-to-end — Lebanon & UAE" },
    { value: "1", label: "Platform replacing a stack of disconnected apps" },
  ];
  return (
    <section className="relative overflow-hidden bg-[#070912] text-white">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(50%_70%_at_50%_50%,rgba(94,198,234,0.10),transparent_70%)]" />
      <div className="relative z-10 container mx-auto max-w-[1200px] px-4 md:px-6 py-14 md:py-20">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <div className="bg-gradient-to-r from-[#5EC6EA] to-[#8B7CF6] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
                {s.value}
              </div>
              <p className="mt-2 text-sm leading-snug text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      icon: <Plug className="h-6 w-6" aria-hidden />,
      title: "Connect",
      desc: "Link your storefront, payments, calendar and messaging tools — no rip-and-replace.",
    },
    {
      n: "02",
      icon: <LayoutDashboard className="h-6 w-6" aria-hidden />,
      title: "Centralize",
      desc: "One dashboard for reporting and day-to-day operations across every business line.",
    },
    {
      n: "03",
      icon: <Workflow className="h-6 w-6" aria-hidden />,
      title: "Automate",
      desc: "Workflows and plain-language AI handle the repetitive work, so your team doesn't.",
    },
  ];
  return (
    <section className="container mx-auto max-w-[1200px] px-4 md:px-6 py-16 md:py-20">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <Badge
          className="mb-3 rounded-full border text-foreground"
          style={{ background: `${ACCENT}1A`, borderColor: `${ACCENT}33` }}
        >
          How it works
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          From scattered tools to one <span style={{ color: ACCENT }}>connected</span> operation
        </h2>
        <p className="mt-3 text-muted-foreground">
          Three steps to run your business from a single, structured environment.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <Card key={s.n} className="h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {s.icon}
                </span>
                <span className="text-3xl font-extrabold text-muted-foreground/25">{s.n}</span>
              </div>
              <CardTitle className="mt-5 text-xl">{s.title}</CardTitle>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Comparison() {
  const rows = [
    { without: "Ten logins and ten spreadsheets", with: "One live dashboard across every line" },
    { without: "Disconnected apps that don't talk", with: "Connected in one intelligent workflow" },
    { without: "A separate build and another agency", with: "A storefront built in, live on your domain" },
    { without: "Repetitive work done by hand", with: "Automated and AI-assisted" },
    { without: "Months and a room of consultants", with: "Weeks, guided end-to-end" },
  ];
  return (
    <section className="relative overflow-hidden bg-[#070912] text-white">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_60%_at_75%_45%,rgba(94,198,234,0.10),transparent_70%),radial-gradient(50%_50%_at_15%_20%,rgba(139,124,246,0.10),transparent_70%)]" />
      <div className="relative z-10 container mx-auto max-w-[1200px] px-4 md:px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5EC6EA]" />
            Why teams switch
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-4xl">
            Stop running your business across a{" "}
            <span className="bg-gradient-to-r from-[#5EC6EA] via-[#7CC7F0] to-[#8B7CF6] bg-clip-text text-transparent">
              dozen tabs
            </span>
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h3 className="text-lg font-semibold text-white/60">Without BDI</h3>
            <ul className="mt-5 space-y-4">
              {rows.map((r) => (
                <li key={r.without} className="flex items-start gap-3 text-sm">
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-white/40" aria-hidden />
                  <span className="text-white/65">{r.without}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#5EC6EA]/30 bg-gradient-to-br from-[#5EC6EA]/[0.10] to-[#8B7CF6]/[0.08] p-6 md:p-8 shadow-[0_0_40px_rgba(94,198,234,0.10)]">
            <h3 className="text-lg font-semibold text-[#5EC6EA]">With BDI</h3>
            <ul className="mt-5 space-y-4">
              {rows.map((r) => (
                <li key={r.with} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#5EC6EA]" aria-hidden />
                  <span className="font-medium text-white">{r.with}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { label: "Lebanon & UAE" },
    { label: "Vendor-agnostic" },
    { label: "Fixed-scope delivery" },
    { label: "No vendor lock-in" },
  ];

  return (
    <section aria-label="Trust signals" className="border-y bg-muted/20 py-8">
      <div className="container mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" style={{ color: ACCENT }} />
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSnapshot() {
  const services = [
    {
      icon: <Cable className="h-6 w-6" aria-hidden />,
      title: "Systems Integration",
      desc: "Connect HubSpot, Zoho, storefronts, internal tools, and operational systems into one connected environment.",
      href: "/services/systems-integration",
    },
    {
      icon: <LineChart className="h-6 w-6" aria-hidden />,
      title: "Business Intelligence",
      desc: "Turn business data into dashboards, KPIs, Looker Studio reporting, Excel analysis, and clearer planning.",
      href: "/services/business-intelligence",
    },
    {
      icon: <Bot className="h-6 w-6" aria-hidden />,
      title: "Automation",
      desc: "Reduce manual work with AI-assisted workflows for operations, content, marketing activity, and execution.",
      href: "/services/automation",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Badge
            className="mb-3 rounded-full border text-foreground"
            style={{ background: `${ACCENT}1A`, borderColor: `${ACCENT}33` }}
          >
            Services
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Three core services behind the system
          </h2>
          <p className="mt-3 text-muted-foreground">
            We combine systems integration, business intelligence, and automation into one practical operating model for
            growing businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.title}
              className="rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <CardContent className="flex h-full flex-col items-start p-6">
                <div
                  className="mb-4 rounded-xl p-3"
                  style={{ background: `${ACCENT}1A`, color: ACCENT }}
                >
                  {service.icon}
                </div>
                <CardTitle className="mb-2 text-xl">{service.title}</CardTitle>
                <p className="flex-1 text-sm text-muted-foreground">{service.desc}</p>
                <Button asChild variant="ghost" size="sm" className="mt-4 px-0 hover:bg-transparent">
                  <Link
                    href={service.href}
                    className="flex items-center gap-1 text-sm font-medium"
                    style={{ color: ACCENT }}
                  >
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/services">Explore all services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function WhyBDI() {
  const points = [
    { title: "Manage from one layer", desc: "Bring operations, reporting, and execution into a system that is easier to run." },
    { title: "Integrate key services", desc: "Connect tools such as GitHub, Vercel, HubSpot, Zoho, and other business platforms." },
    { title: "Support digital growth", desc: "Build storefronts, manage marketing activity, and strengthen SEO and content operations." },
    { title: "Use practical AI", desc: "Work with AI in plain language to simplify workflows, content support, and routine execution." },
  ];

  return (
    <section className="bg-muted/20 py-16 md:py-20">
      <div className="container mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <Badge
              className="mb-3 rounded-full border text-foreground"
              style={{ background: `${ACCENT}1A`, borderColor: `${ACCENT}33` }}
            >
              Why BDI Corporate
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Practical delivery. <span style={{ color: ACCENT }}>Clear outcomes.</span>
            </h2>
            <p className="mt-4 max-w-[58ch] text-muted-foreground">
              We help companies across Lebanon and the UAE improve how systems, data, teams, and digital channels work
              together. The result is stronger visibility, less manual friction, and a more usable operating structure
              for startups and SMEs.
            </p>
            <Button asChild className="mt-6" variant="outline">
              <Link href="/clients">See who we work with</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {points.map((point) => (
              <div key={point.title} className="rounded-xl border bg-white p-5">
                <div className="mb-2 h-1 w-8 rounded-full" style={{ background: ACCENT }} />
                <div className="text-sm font-semibold">{point.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">{point.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeFinalCTA() {
  return (
    <section aria-label="Final call to action" className="bg-muted/20 py-16 md:py-20">
      <div className="container mx-auto max-w-[1000px] px-4 text-center md:px-6">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Ready to improve visibility and reduce operational friction?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Let&apos;s define the right starting point for your business across integration, reporting, automation, and
          digital transformation.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/contact">Contact us</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Book a discovery call</Link>
          </Button>
        </div>
        <div className="mt-4">
          <Link href="/clients" className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline">
            See who we work with
          </Link>
        </div>
      </div>
    </section>
  );
}
