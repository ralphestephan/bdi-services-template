import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Metadata } from "next";
import Script from "next/script";
import GlassyImplementationCTA from "@/components/GlassyImplementationCTA";
import {
  HelpCircle,
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  CloudCog,
  Workflow,
  Gauge,
} from "lucide-react";
import { SITE, telHref, whatsappHref } from "@/lib/site";

/* brand */
const ACCENT = SITE.colors.accent;

export const metadata: Metadata = {
  title: `FAQs — Business Intelligence & Integration | ${SITE.name}`,
  description:
    "Straight answers about BI dashboards, integrations, timelines, and support.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: `FAQ — ${SITE.name}`,
    description:
      "Answers about BI dashboards, ERP/CRM integration, timelines, and support.",
    url: `${SITE.baseUrl}/faq`,
    type: "website",
    images: [{ url: "/og/og-faq.jpg", width: 1200, height: 630, alt: `${SITE.name} FAQ` }],
  },
};

const faq = [
  /* ============================= GENERAL ============================= */
  {
    category: "General",
    questions: [
      {
        question: "What is Business Intelligence (BI)?",
        answer:
          "Turning raw data into decisions—via a governed data model, dashboards and alerts. We define KPIs, wire the data, and ship usable insights."
      },
      {
        question: "Do we still need BI if we already have an ERP or CRM?",
        answer:
          "Yes. ERPs/CRMs capture data; BI makes it understandable and shareable with governed metrics and automated reporting."
      },
      {
        question: "Can you integrate with our ERP/CRM?",
        answer:
          "We routinely connect Odoo, SAP, Salesforce and other SaaS/tools into one layer for dashboards and automations."
      },
      {
        question: "Dashboards vs. traditional reports?",
        answer:
          "Dashboards are interactive and near-real-time; reports are static snapshots. We ship dashboards for daily decisions and keep reports for audits."
      },
      {
        question: "How long does a first sprint take?",
        answer:
          "Typical v1 KPI or integration sprints run 2–4 weeks depending on sources and scope. We fix the v1 scope, then iterate."
      },
      {
        question: "Which dashboard tools do you support?",
        answer:
          "Grafana, Looker Studio, Power BI, Tableau—plus a lightweight portal when you need role-based access and alerts."
      }
    ]
  },

  /* ========================== DELIVERY & SCOPE ========================== */
  {
    category: "Delivery & Scope",
    questions: [
      {
        question: "What’s included in a v1 sprint?",
        answer:
          "A small, fixed scope (e.g., KPI model, 1–2 sources, a role-based dashboard, and at least one alert), reviews, and handover."
      },
      {
        question: "How do you scope work?",
        answer:
          "A 60–90 min discovery to confirm use-cases, KPIs and success metrics. You get a brief with timeline, price and fixed scope for v1."
      },
      {
        question: "What do you need from us to start?",
        answer:
          "Stakeholders, sample exports/schemas, sandbox or read-only access, and agreement on KPIs and definitions."
      },
      {
        question: "How do you handle change requests?",
        answer:
          "Minor tweaks that fit v1 go in; new asks land in the backlog and become the next sprint with clear cost/impact."
      },
      {
        question: "Can we pause or split sprints?",
        answer:
          "Yes—pauses are fine, but we’ll re-confirm calendar and dependencies before resuming."
      }
    ]
  },

  /* ======================== DATA & INTEGRATIONS ======================== */
  {
    category: "Data & Integrations",
    questions: [
      {
        question: "What data sources can you connect?",
        answer:
          "ERPs/CRMs, POS/ecommerce, finance, spreadsheets, and databases. We use APIs, vendor connectors or batch pipelines."
      },
      {
        question: "Can you connect on-prem systems securely?",
        answer:
          "Yes—via VPN/SSH tunnels or secure batch to S3/GCS/Azure. We follow least-privilege and don’t require broad inbound rules."
      },
      {
        question: "How often do you sync data?",
        answer:
          "Near real-time via webhooks/streams where available; otherwise scheduled (e.g., every 5–15 min or nightly) agreed per KPI."
      },
      {
        question: "What happens if a vendor changes their schema?",
        answer:
          "We monitor for schema drift and keep regression checks. Breakages are triaged and patched under your support plan."
      },
      {
        question: "Who owns the data and models?",
        answer:
          "You do. We work under NDA and give you exportable assets, documentation and access."
      }
    ]
  },

  /* ===================== DASHBOARDS & ANALYTICS ===================== */
  {
    category: "Dashboards & Analytics",
    questions: [
      {
        question: "How do you choose the right BI tool?",
        answer:
          "Audience, governance needs, cost, and speed to value. We’ll recommend the best fit and won’t push vendor lock-in."
      },
      {
        question: "Can we reuse our existing reports?",
        answer:
          "Yes—where sensible we map fields to a governed model and retire duplicate or conflicting reports."
      },
      {
        question: "Do dashboards work on mobile?",
        answer:
          "Yes—we design mobile-friendly summaries and leverage vendor mobile apps where appropriate."
      },
      {
        question: "Can execs get scheduled digests?",
        answer:
          "Absolutely—daily/weekly PDFs or HTML summaries, plus anomaly alerts via email/Teams/Slack (and WhatsApp where policy allows)."
      },
      {
        question: "How do you ensure one version of truth?",
        answer:
          "A semantic layer + metric catalog with clear, shared definitions and data lineage."
      }
    ]
  },

  /* ======================== AUTOMATION & AI ======================== */
  {
    category: "Automation & AI",
    questions: [
      {
        question: "What processes are best to automate first?",
        answer:
          "Repetitive, high-volume and rule-based flows like approvals, notifications, data quality checks and handoffs."
      },
      {
        question: "Do you build private AI assistants?",
        answer:
          "Yes—retrieval-augmented, access-controlled assistants that run in your cloud tenant where possible."
      },
      {
        question: "How do you control hallucinations?",
        answer:
          "Guardrails, grounding on curated sources, evaluation sets, and fallbacks to citations/search when confidence is low."
      },
      {
        question: "Can we keep a human-in-the-loop?",
        answer:
          "Definitely—approvals and high-risk actions stay human-approved with clear audit trails."
      },
      {
        question: "How do you manage AI costs?",
        answer:
          "Caching, prompt/response budgets, usage caps, and model selection tuned to the use-case."
      }
    ]
  },

  /* ===================== SECURITY & COMPLIANCE ===================== */
  {
    category: "Security & Compliance",
    questions: [
      {
        question: "Where does the solution run?",
        answer:
          "Your cloud or ours. Single-tenant by default with regional hosting options to match your data-residency needs."
      },
      {
        question: "How do you handle access control?",
        answer:
          "Role-based access (RBAC) and SSO where available. We follow least-privilege for service accounts and secrets."
      },
      {
        question: "Do you keep backups and DR?",
        answer:
          "Yes—snapshots and configuration backups with agreed RPO/RTO. Details live in the SoW/MSA."
      },
      {
        question: "Can we run a security review or pentest?",
        answer:
          "We support your vendor risk process and can accommodate testing windows against staging/production by agreement."
      },
      {
        question: "Do you sign NDAs and DPAs?",
        answer:
          "Yes—standard NDAs and data-processing addenda aligned to your compliance requirements."
      }
    ]
  },

  /* ======================== SAAS PORTAL ======================== */
  {
    // TODO(brand-extract): the "BDI portal" Q below references a specific
    // commercial product. Operators cloning the template should rewrite this
    // section to match their own platform offering or remove it entirely.
    category: "SaaS Portal",
    questions: [
      {
        question: "What is the portal?",
        answer:
          "A secure web portal that hosts your dashboards, alerts and simple tools—centralized for your teams."
      },
      {
        question: "Can we bring SSO and manage users?",
        answer:
          "Yes—SSO/SAML where supported and an admin panel for roles, groups and invitations."
      },
      {
        question: "Do you provide audit logs?",
        answer:
          "Yes—access and key actions are logged and can be exported for compliance."
      },
      {
        question: "Can we use a custom domain?",
        answer:
          "We can provision a branded subdomain with TLS and optional IP restrictions."
      },
      {
        question: "Is there a per-user fee?",
        answer:
          "We support per-seat or site-licensed models depending on scale—finalized in your SoW."
      }
    ]
  },

  /* ===================== PRICING & CONTRACTS ===================== */
  {
    category: "Pricing & Contracts",
    questions: [
      {
        question: "How do you price projects?",
        answer:
          "Fixed-scope packs for v1 + time-and-materials for extensions. Retainers cover support and small ongoing changes."
      },
      {
        question: "What are the payment terms?",
        answer:
          "Milestone-based (e.g., kickoff/acceptance) or 50/50—final terms in the SoW. Local currency options available."
      },
      {
        question: "Do you work under an MSA?",
        answer:
          "Yes—MSA + project-level SoWs keeps procurement simple for future sprints."
      },
      {
        question: "Do you work with procurement/legal?",
        answer:
          "We’re used to it—security questionnaires, vendor onboarding and compliance reviews are part of the process."
      },
      {
        question: "Can we start small and scale?",
        answer:
          "That’s the idea—prove value with a small sprint, then iterate with clear ROI."
      }
    ]
  },

  /* =================== SUPPORT & MAINTENANCE (expanded) =================== */
  {
    category: "Support & Maintenance",
    questions: [
      {
        question: "How do we reach support?",
        answer:
          `Email ${SITE.contact.email} or call ${SITE.contact.phone} (Mon–Fri, 9:00–18:00 local). SLAs available.`
      },
      {
        question: "What counts as a bug vs. change request?",
        answer:
          "A bug breaks agreed behaviour or deliverables; new metrics, sources or flows are changes and become the next sprint."
      },
      {
        question: "What response times do SLAs include?",
        answer:
          "Targets vary by tier (e.g., critical/major/minor). We’ll document response and resolution targets in your SLA."
      },
      {
        question: "Do you provide training and handover?",
        answer:
          "Yes—live handover, admin notes, and short clips or docs so the team can operate confidently."
      },
      {
        question: "How are upgrades handled?",
        answer:
          "Vendor version changes are planned windows; we regression-test and communicate user impact ahead of time."
      }
    ]
  }
];


export default function FAQPage() {
  return (
    <>
      {/* JSON-LD for rich result */}
      <Script id="ld-faq" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is Business Intelligence (BI)?",
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  "Business Intelligence turns raw data into decisions with models, dashboards and alerts.",
              },
            },
            {
              "@type": "Question",
              name: "Can you integrate with our ERP or CRM?",
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  "Yes — we connect systems like Odoo, SAP and Salesforce into a unified insights layer.",
              },
            },
          ],
        })}
      </Script>

      <main className="min-h-screen bg-[#0b0b0b] text-white">
        {/* ============================ HERO (dark, no image) ============================ */}
        <section className="relative overflow-hidden">
          {/* ambient glow */}
          <div
            className="pointer-events-none absolute -top-24 -right-10 h-72 w-72 rounded-full opacity-25"
            style={{ background: ACCENT, filter: "blur(90px)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-28 -left-10 h-80 w-80 rounded-full opacity-10"
            style={{ background: "#a6e3f7", filter: "blur(100px)" }}
          />

          <div className="container mx-auto max-w-[1200px] px-4 md:px-6 py-14 md:py-18">
            <div className="text-center">
              <Badge
                className="bg-white/10 text-white border"
                style={{ borderColor: "rgba(255,255,255,.18)" }}
              >
                FAQ
              </Badge>

              <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">
                Answers that get you{" "}
                <span
                  className="px-2 rounded-lg"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(94,198,234,.25), rgba(94,198,234,.12))",
                  }}
                >
                  shipping faster
                </span>
              </h1>

              <p className="mt-3 md:text-lg text-white/85 max-w-[68ch] mx-auto">
                Clear scope, short sprints, real outcomes — dashboards, integrations, and
                automations that actually land.
              </p>
            </div>

            {/* mini stats/specs */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <SpecCard
                icon={<Clock className="h-4 w-4" />}
                label="Avg first response"
                value="< 24h"
              />
              <SpecCard
                icon={<Workflow className="h-4 w-4" />}
                label="Integrations shipped"
                value="15+"
              />
              <SpecCard
                icon={<ShieldCheck className="h-4 w-4" />}
                label="SLA options"
                value="Bronze / Silver / Gold"
              />
            </div>
          </div>
        </section>

        {/* ============================ CONTENT ============================ */}
        <section className="relative bg-white text-black rounded-t-[28px]">
          <div className="container mx-auto max-w-[1200px] px-4 md:px-6 py-14 md:py-18">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left rail */}
              <aside className="lg:col-span-1">
                <div className="lg:sticky lg:top-24 space-y-6">
                  <div
                    className="rounded-2xl border bg-white p-5"
                    style={{ borderColor: "rgba(0,0,0,.08)" }}
                  >
                    <h2 className="text-sm font-semibold">Browse</h2>
                    <nav className="mt-2 space-y-1">
                      {faq.map((c) => {
                        const id = idFor(c.category);
                        return (
                          <a
                            key={id}
                            href={`#${id}`}
                            className="block rounded-lg px-3 py-2 text-sm hover:bg-zinc-50"
                          >
                            {c.category}
                          </a>
                        );
                      })}
                    </nav>
                  </div>

                  {/* quick contact */}
                  <div
                    className="rounded-2xl border bg-white p-5"
                    style={{ borderColor: "rgba(0,0,0,.08)" }}
                  >
                    <h3 className="text-sm font-semibold">Still need help?</h3>
                    <p className="mt-1 text-sm text-zinc-600">
                      We’ll scope a small first sprint and get you to value fast.
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <Button asChild variant="outline" className="w-full">
                        <a href={`mailto:${SITE.contact.email}`}>
                          <Mail className="mr-2 h-4 w-4" />
                          Email
                        </a>
                      </Button>
                      <Button asChild className="w-full">
                        <a
                          href={whatsappHref(`Hi ${SITE.brand}, I have a question.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Phone className=" h-1 w-2" />
                          WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* specs block */}
                  <div
                    className="rounded-2xl border bg-white p-5"
                    style={{ borderColor: "rgba(0,0,0,.08)" }}
                  >
                    <h3 className="text-sm font-semibold">Delivery model</h3>
                    <ul className="mt-2 space-y-2 text-sm text-zinc-700">
                      <li className="flex items-center gap-2">
                        <Gauge className="h-4 w-4" style={{ color: ACCENT }} />
                        Fixed-scope sprint v1
                      </li>
                      <li className="flex items-center gap-2">
                        <CloudCog className="h-4 w-4" style={{ color: ACCENT }} />
                        Role-based portal + alerts
                      </li>
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" style={{ color: ACCENT }} />
                        ISO/ESG friendly practices
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>

              {/* Right: FAQs with rounded “bubble” items (no square glitch) */}
              <div className="lg:col-span-3 space-y-12">
                {faq.map((cat) => {
                  const id = idFor(cat.category);
                  return (
                    <section key={id} id={id} className="scroll-mt-24">
                      <h2 className="text-2xl font-bold">{cat.category}</h2>

                      <Accordion type="single" collapsible className="mt-4 space-y-4">
                        {cat.questions.map((f, i) => (
                          <AccordionItem key={i} value={`${id}-${i}`} className="border-0">
                            {/* wrapper gives one continuous rounded border */}
                            <div
                              className="rounded-2xl border overflow-hidden bg-white"
                              style={{ borderColor: "rgba(0,0,0,.10)" }}
                            >
                              <AccordionTrigger className="px-5 text-left">
                                <span className="inline-flex items-center gap-2">
                                  <HelpCircle className="h-4 w-4" style={{ color: ACCENT }} />
                                  {f.question}
                                </span>
                              </AccordionTrigger>

                              <AccordionContent className="px-5 pb-5 pt-0 text-zinc-700 border-t"
                                style={{ borderColor: "rgba(0,0,0,.06)" }}>
                                {f.answer}
                              </AccordionContent>
                            </div>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </section>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <GlassyImplementationCTA />
      </main>
    </>
  );
}

/* ---------- components ---------- */
function SpecCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="rounded-2xl border bg-white/5 backdrop-blur-sm px-4 py-3 text-white"
      style={{ borderColor: "rgba(255,255,255,.14)" }}
    >
      <div className="flex items-center gap-2 text-sm text-white/90">
        <span style={{ color: ACCENT }}>{icon}</span>
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}

function idFor(s: string) {
  return s.toLowerCase().replace(/\s+/g, "-");
}
