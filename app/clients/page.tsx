import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  Building2,
  BarChart4,
  Cable,
  GitBranch,
  Users,
  Workflow,
} from "lucide-react";
import type { Metadata } from "next";
import ClientsHero from "./ClientsHero";
import ClientsMarquee from "@/components/Homepage/ClientsMarquee";
import GlassyImplementationCTA from "@/components/GlassyImplementationCTA";

export const metadata: Metadata = {
  title: "Our Clients — BDI Corporate",
  description:
    "BDI Corporate works with businesses across Lebanon and the UAE on systems integration, BI dashboards, and operational automation.",
  alternates: { canonical: "/clients" },
  openGraph: {
    title: "Our Clients — BDI Corporate",
    description:
      "BDI Corporate supports multi-branch businesses, operations-driven companies, and leadership teams needing KPI visibility.",
    url: "https://bdicorporate.com/clients",
    type: "website",
  },
};

const ACCENT = "#5EC6EA";

/* ─── Real client data ─────────────────────────────────────────────── */
const clients = [
  {
    logo: "/logos/bounce.png",
    name: "Bounce INC.",
    industry: "Entertainment & Leisure",
    headline: "Business Intelligence & KPI Reporting",
    description:
      "Developed a centralized BI platform consolidating operational data from multiple venues. Enabled leadership to track attendance, revenue, and performance KPIs across locations in real time.",
    tags: ["Business Intelligence", "Multi-location", "KPI Dashboards"],
  },
  {
    logo: "/logos/racket.png",
    name: "Racket Concept",
    industry: "Sports & Recreation",
    headline: "Systems Integration & Data Centralisation",
    description:
      "Connected booking, CRM, and finance systems into a unified operational environment. Replaced manual spreadsheet workflows with live dashboards and automated reporting.",
    tags: ["Systems Integration", "Automation", "Reporting"],
  },
  {
    logo: "/logos/ADM.png",
    name: "Abu Dhabi Media",
    industry: "Media & Broadcasting",
    headline: "Operational Reporting & Process Improvement",
    description:
      "Supported structured reporting and operational process improvement initiatives. Built executive dashboards aligned to KPI frameworks and organisational reporting requirements.",
    tags: ["Business Intelligence", "Process Improvement", "Dashboards"],
  },
  {
    logo: "/logos/seven.webp",
    name: "Seven Management",
    industry: "Retail & Consumer",
    headline: "Retail Operations & Inventory Intelligence",
    description:
      "Integrated POS, inventory, and ecommerce platforms to deliver a single view of retail performance. Automated stock reporting and reduced manual reconciliation across branches.",
    tags: ["Systems Integration", "Retail", "POS Integration"],
  },
  {
    logo: "/logos/sunset.png",
    name: "Sunset Hospitality Group",
    industry: "Hospitality & Services",
    headline: "Hospitality Operations & Revenue Reporting",
    description:
      "Unified hospitality management systems to improve revenue tracking and operational visibility. Delivered custom dashboards for management reporting and service performance.",
    tags: ["Business Intelligence", "Hospitality", "Revenue Reporting"],
  },
  {
    logo: "/logos/promofix.png",
    name: "Promofix",
    industry: "Marketing & Promotions",
    headline: "Campaign & Performance Reporting Automation",
    description:
      "Built automated reporting workflows for campaign performance and client deliverables. Reduced manual reporting time and improved consistency across client accounts.",
    tags: ["Automation", "Reporting", "Workflow Design"],
  },
  {
    logo: "/logos/broadcast.png",
    name: "Broadcast Solutions",
    industry: "Media & Technology",
    headline: "Content Operations & Workflow Automation",
    description:
      "Streamlined internal content workflows and operational processes. Implemented structured automation to reduce manual coordination across production and distribution teams.",
    tags: ["Automation", "Operations", "Process Design"],
  },
  {
    logo: "/logos/pancrop.jpg",
    name: "Pancrop",
    industry: "Food & Distribution",
    headline: "Distribution Operations & Supply Chain Reporting",
    description:
      "Improved supply chain visibility with connected inventory, procurement, and distribution systems. Enabled management to track operations across the full distribution cycle.",
    tags: ["Systems Integration", "Supply Chain", "Operations"],
  },
  {
    logo: "/logos/swat.png",
    name: "SWAT Research",
    industry: "Research & Professional Services",
    headline: "Operations Efficiency & Internal Reporting",
    description:
      "Supported internal process improvement and reporting structure for a growing services business. Automated key internal workflows and built operational dashboards for leadership.",
    tags: ["Automation", "Business Intelligence", "Process Improvement"],
  },
  {
    logo: "/logos/in2.png",
    name: "In2",
    industry: "Technology & Digital",
    headline: "Platform Integration & Data Architecture",
    description:
      "Designed and implemented a data integration layer connecting multiple business platforms. Delivered structured reporting and dashboards enabling better product and business decisions.",
    tags: ["Systems Integration", "Data Architecture", "Dashboards"],
  },
  {
    logo: "/logos/home.png",
    name: "HomeCare",
    industry: "Home Services & Real Estate",
    headline: "Property Portfolio Reporting & CRM Integration",
    description:
      "Connected CRM, property management, and finance systems for a real estate portfolio. Enabled clear visibility across listings, inquiries, and revenue performance.",
    tags: ["Systems Integration", "CRM", "Real Estate"],
  },
];

export default function OurClientsPage() {
  const logos = [
    "/logos/racket.png", "/logos/bounce.png",  "/logos/pancrop.jpg",
    "/logos/home.png",   "/logos/in2.png",     "/logos/broadcast.png",
    "/logos/promofix.png","/logos/seven.webp", "/logos/swat.png",
    "/logos/ADM.png",    "/logos/sunset.png",  "/logos/sunset.jpg",
  ];

  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">

      {/* ========================= HERO ========================= */}
      <ClientsHero />

      {/* ====================== SELECTED CLIENT LOGOS ====================== */}
      <section className="py-8 md:py-10">
        <div className="container mx-auto max-w-[1200px] px-4 md:px-6">
          <p className="text-sm text-muted-foreground mb-4">
            Selected client organizations
          </p>
        </div>
        <ClientsMarquee logos={logos} accent={ACCENT} />
      </section>

      {/* ====================== CLIENT PROJECTS ====================== */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto max-w-[1200px] px-4 md:px-6">
          <div className="max-w-2xl mb-12">
            <Badge
              className="rounded-full border text-foreground mb-3"
              style={{ background: `${ACCENT}1A`, borderColor: `${ACCENT}33` }}
            >
              Client work
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              What we worked on
            </h2>
            <p className="mt-3 text-muted-foreground">
              A look at the types of engagements and projects we have delivered
              for our clients across different sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {clients.map((c) => (
              <Card
                key={c.name}
                className="rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    {/* Logo */}
                    <div className="relative w-14 h-10 shrink-0 rounded-lg border bg-muted/30 overflow-hidden">
                      <Image
                        src={c.logo}
                        alt={c.name}
                        fill
                        className="object-contain p-1"
                        sizes="56px"
                      />
                    </div>
                    {/* Header */}
                    <div className="min-w-0">
                      <div className="font-bold text-sm">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.industry}</div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div
                      className="mb-1.5 h-0.5 w-6 rounded-full"
                      style={{ background: ACCENT }}
                    />
                    <div className="font-semibold text-sm">{c.headline}</div>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      {c.description}
                    </p>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border px-2.5 py-0.5 text-[11px] text-muted-foreground"
                        style={{ borderColor: `${ACCENT}44`, background: `${ACCENT}0D` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== CLIENT PROFILE ====================== */}
      <section className="relative overflow-hidden bg-[#070912] text-white py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_60%_at_75%_45%,rgba(94,198,234,0.10),transparent_70%),radial-gradient(50%_50%_at_15%_20%,rgba(139,124,246,0.10),transparent_70%)]" />
        <div className="relative z-10 container mx-auto max-w-[1200px] px-4 md:px-6">
          <div className="max-w-2xl mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5EC6EA]" />
              Client profile
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
              Types of businesses we{" "}
              <span className="bg-gradient-to-r from-[#5EC6EA] via-[#7CC7F0] to-[#8B7CF6] bg-clip-text text-transparent">
                work with
              </span>
            </h2>
            <p className="mt-3 text-white/65">
              Beyond specific companies, we work with a range of business types
              that share common needs around visibility, coordination, and
              efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
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
                desc: "Organisations with ERP, CRM, POS, or finance tools that are not properly connected or aligned.",
              },
              {
                icon: BarChart4,
                title: "Leadership teams needing KPI visibility",
                desc: "Executive and management teams that lack structured dashboards and reliable reporting.",
              },
              {
                icon: GitBranch,
                title: "Businesses improving ERP / CRM / POS",
                desc: "Companies in the process of implementing, improving, or replacing core business systems.",
              },
              {
                icon: Users,
                title: "Companies reducing manual work",
                desc: "Businesses looking to replace spreadsheet dependency and manual reporting with structured automation.",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <item.icon className="h-5 w-5 mt-0.5 shrink-0 text-[#5EC6EA]" />
                <div>
                  <div className="font-semibold text-sm text-white">{item.title}</div>
                  <div className="mt-1 text-xs text-white/65">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== COMMON CHALLENGES ==================== */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto max-w-[1200px] px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <Badge
                className="rounded-full border text-foreground mb-3"
                style={{ background: `${ACCENT}1A`, borderColor: `${ACCENT}33` }}
              >
                Challenges
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Common challenges our clients face
              </h2>
              <p className="mt-3 text-muted-foreground">
                Our clients typically come to us with one or more of these
                issues that are slowing down operations or decision-making.
              </p>
            </div>
            <div className="space-y-3">
              {[
                "Disconnected business tools with no shared data layer",
                "Manual reporting and heavy spreadsheet dependency",
                "Weak visibility across departments and locations",
                "Inconsistent KPI tracking and executive reporting",
                "Slow internal processes and repetitive admin work",
                "Lack of structure in operational data and workflows",
              ].map((ch, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    className="h-4 w-4 mt-0.5 shrink-0"
                    style={{ color: ACCENT }}
                  />
                  <span className="text-sm text-muted-foreground">{ch}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GlassyImplementationCTA />
    </main>
  );
}
