// TODO(brand-extract): This file contains hardcoded references to the BDI
// Systems sub-product (e.g. "BDI Systems unified portal", "systems.bdicorporate.com").
// These are product-marketing copy that operators cloning the template MUST
// rewrite by hand for their own offering — they describe a specific commercial
// product, not just a brand identity. The hero copy and structural sections
// are kept intact so the template still renders meaningfully; replace the
// strings with your own product narrative before going live.
//
// Brand-name-only references have been switched to `SITE.name` where it makes
// sense; product-name references ("BDI Systems") are intentionally left as
// literals with this TODO so they show up in audit greps.

import { SITE } from "@/lib/site";

export const ACCENT = SITE.colors.accent;

/** Icon keys mapped in the page file */
export type IconKey =
  | "BarChart3" | "LayoutGrid" | "Database" | "Gauge" | "Megaphone" | "FileSpreadsheet"
  | "Boxes" | "Layers" | "Settings" | "ShoppingCart" | "CreditCard" | "Calendar" | "CloudCog"
  | "Zap" | "SlidersHorizontal" | "Cloud" | "MessageCircle" | "Table";

export type Section = {
  title: string;
  desc: string;
  bullets: string[];
  img: string;
};

export type Tech = { label: string; icon: IconKey };

export type Service = {
  slug: "business-intelligence" | "systems-integration" | "automation";
  title: string;
  keyword: string;
  summary: string;
  pitch: string;
  ctaLabel: string;
  ctaHref: string;
  heroImages: string[];
  /** STAT STRIP under hero */
  stats: { label: string; value: string }[];
  /** SNAPSHOT chips (more operational than stats) */
  snapshot: { label: string; value: string }[];
  /** Tech stack chips (shown once) */
  tech: Tech[];
  /** Highlights cards (3+) */
  highlights: string[];
  /** Alternating rich sections */
  sections: Section[];
  /** Deliverables + Outcomes */
  features: string[];
  outcomes: string[];
  /** Expect + Getting started + FAQ */
  expect: string[];
  gettingStarted: string;
  faq: { q: string; a: string }[];
};

export const SERVICES: Record<Service["slug"], Service> = {
  "business-intelligence": {
    slug: "business-intelligence",
    title: "Business Intelligence & Analytics",
    keyword: "Intelligence",
    summary:
      "We build an intelligent data ecosystem — from pipelines and models to executive dashboards and governed KPIs.",
    pitch:
      "BI is a culture, not just charts. We align KPI trees with your operating model, model your entities, and deliver governed metrics your teams can trust.",
    ctaLabel: "Start my BI project",
    ctaHref: "/contact",
    heroImages: ["/bi.webp", "/dashboardjpeg.jpeg", "/analysis.jpeg"],

    stats: [
      { label: "Adoption", value: "90% teams" },
      { label: "Automations", value: "120k ops" },
      { label: "Integrations", value: "15+ SaaS" },
      { label: "Exec time saved", value: "8h/wk" },
    ],
    snapshot: [
      { label: "Setup", value: "Sprint-1 in 2–4w" },
      { label: "Reliability", value: "Governed KPIs" },
      { label: "Access", value: "Role-based" },
      { label: "SaaS", value: "Portal-ready" },
    ],

    tech: [
      { label: "Power BI", icon: "BarChart3" },
      { label: "Looker", icon: "LayoutGrid" },
      { label: "BigQuery", icon: "Database" },
      { label: "Grafana", icon: "Gauge" },
      { label: "GA4", icon: "Megaphone" },
      { label: "Sheets / Excel", icon: "FileSpreadsheet" },
    ],

    highlights: [
      "Governed KPIs your teams trust",
      "Drilldowns and role-based views",
      "Models prepared for forecasting",
    ],

    sections: [
      {
        title: "BI Strategy & Data Architecture",
        desc:
          "We define KPI trees, model entities, and put the semantic layer in place so metrics are consistent and trusted.",
        bullets: [
          "KPI governance & ownership",
          "Pipelines for collection/cleaning",
          "ERDs & semantic models",
          "Cloud cost/perf planning",
        ],
        img: "/strategy.png",
      },
      {
        title: "Interactive Dashboards & Smart Reporting",
        desc:
          "Role-based views with drilldowns and automated summaries — built for decisions, not screenshots.",
        bullets: [
          "Sales & marketing performance",
          "Realtime inventory & production",
          "Finance models linked to Sheets",
          "RLS and drilldowns",
        ],
        img: "/dashboards2.png",
      },
      {
        title: "Advanced Analytics & Business Modeling",
        desc:
          "From trends to forecasts: segmentation, churn risks, anomaly detection, and scenario planning that informs action.",
        bullets: [
          "Correlation & trend analysis",
          "Churn prediction & segmentation",
          "Scenario modeling (ROI, targets)",
          "Live links to GA/Ads/GBM",
        ],
        img: "/dashboards1.png",
      },
    ],

    features: [
      "KPI discovery workshops",
      "Pipelines (collect/clean/structure)",
      "ERD & dimensional models",
      "Cloud BI stack planning",
    ],
    outcomes: [
      "Role-based dashboards",
      "Automated reporting",
      "Forecasts & scenarios",
      "Single source of truth",
    ],

    expect: [
      "Clear KPI tree and ownership",
      "Consistent semantic layer",
      "Automated summaries & alerts",
    ],
    gettingStarted:
      "Fixed-scope Sprint 1 (2–4 weeks): model + core KPIs + one executive dashboard.",
    faq: [
      {
        q: "How fast can we go live?",
        a: "We target a first ‘executive slice’ in 2–4 weeks while laying the semantic layer.",
      },
      { q: "Can we keep Excel workflows?", a: "Yes — connect spreadsheets to governed data for reliability." },
    ],
  },

  "systems-integration": {
    slug: "systems-integration",
    title: "Systems Integration & Platforms",
    keyword: "Integration",
    summary:
      "Integrate ERP, CRM, ecommerce, POS and custom apps into one operating platform — with CEO BI dashboards, micro-app automations, and role-based employee pages.",
    pitch:
      "True transformation is harmony. We unify tools, teams, and data into one cohesive engine — and we can deploy it in BDI Systems (from $100 at systems.bdicorporate.com) with dashboards for the CEO, micro-apps for teams, and view restrictions by role.",
    ctaLabel: "Streamline my operations",
    ctaHref: "/contact",
    heroImages: ["/digital-transformation-solutions.webp", "/odoo.webp", "/shopify.png"],

    stats: [
      { label: "Lead capture", value: "100% synced" },
      { label: "Handoffs", value: "-60% manual" },
      { label: "Uptime", value: "99.9%" },
      { label: "Latency", value: "<2s" },
    ],
    snapshot: [
      { label: "Flow", value: "ERP↔CRM↔Shopify" },
      { label: "Resilience", value: "Retries + alerts" },
      { label: "IDs", value: "Clean entity maps" },
      { label: "Platform", value: "BDI Systems" },
    ],

    tech: [
      { label: "Odoo", icon: "Boxes" },
      { label: "SAP", icon: "Layers" },
      { label: "Zoho", icon: "Settings" },
      { label: "HubSpot", icon: "Settings" },
      { label: "Shopify", icon: "ShoppingCart" },
      { label: "Stripe", icon: "CreditCard" },
      { label: "Calendly", icon: "Calendar" },
      { label: "REST/Webhooks", icon: "CloudCog" },
    ],

    highlights: [
      "BDI Systems unified portal",
      "Unified ERP↔CRM journey",
      "Observability & retries",
      "SLA dashboards & fulfillment views",
    ],

    sections: [
      {
        title: "BDI Systems (Unified Business Platform)",
        desc:
          "A single portal that integrates your business systems into one—so leaders see the same KPIs and teams work from the same workflows.",
        bullets: [
          "CEO BI dashboards with governed KPIs",
          "Micro-apps & automations for daily ops",
          "Employee pages with view restrictions",
          "Unified identities, entities, and audit trails",
        ],
        img: "/digital-transformation-solutions.webp",
      },
      {
        title: "Platforms Implementation",
        desc:
          "ERP, CRM, ecommerce, POS — implemented to your processes and wired for clean data flow.",
        bullets: [
          "ERP design to finance/ops",
          "CRM pipelines & SLAs",
          "Dashboards for leads & KPIs",
          "ERP↔CRM unification",
        ],
        img: "/odoo.webp",
      },
      {
        title: "Website & E-commerce Development",
        desc:
          "Shopify setups and headless sites connected to analytics, payments, and fulfillment.",
        bullets: ["Custom theme & taxonomy", "Payments/CRM/analytics", "SEO, conversion & pixels"],
        img: "/shopify.png",
      },
      {
        title: "POS, Booking & Scheduling",
        desc:
          "Retail & service flows with calendars, tickets, invoicing and messaging all connected.",
        bullets: ["POS selection & setup", "Calendar booking flows", "CRM/invoicing/notifications"],
        img: "/pos.png",
      },
      {
        title: "Custom API & Platform Integrations",
        desc: "We bridge tools via REST & webhooks for realtime sync and automation.",
        bullets: ["Auth & secure endpoints", "Webhook design & retries", "Cross-platform reporting"],
        img: "/apigif.gif",
      },
    ],

    features: [
      "BDI Systems portal (from $100) — dashboards + micro-apps",
      "ERP architecture aligned to finance/ops",
      "CRM workflows for sales/support",
      "ERP↔CRM data unification",
      "Pipelines & SLA dashboards",
    ],
    outcomes: [
      "Fewer manual handoffs",
      "Realtime journey visibility",
      "Lower cycle times & errors",
      "Better forecasting & fulfillment",
      "Role-based employee experiences",
    ],

    expect: ["Mapped entities & clean IDs", "Idempotent integrations", "Alerted failures with retries"],
    gettingStarted:
      "Share systems in scope; we draft an integration map and ship the highest-ROI flow first.",
    faq: [
      { q: "Do you migrate legacy data?", a: "Yes — mappings, de-dupe, sampling, then full migration with rollback safety." },
      { q: "How is monitoring handled?", a: "We add observability (alerts & retry queues) so failures are visible and recoverable." },
    ],
  },

  automation: {
    slug: "automation",
    title: "Digital Transformation & Automation",
    keyword: "Transformation",
    summary:
      "Replace manual work with cloud workflows, agents, and realtime data. Capture once, reuse everywhere.",
    pitch:
      "We connect forms, calendars, inboxes and ops to your stack with n8n and AI agents. You get live KPIs, alerts, and automations that move data between tools.",
    ctaLabel: "Start my transformation",
    ctaHref: "/contact",
    heroImages: ["/n8nflow.webp", "/paperless.png", "/agents.png"],

    stats: [
      { label: "Manual steps", value: "-70%" },
      { label: "Response time", value: "-40%" },
      { label: "Coverage", value: "24/7" },
      { label: "Teams onboarded", value: "5+" },
    ],
    snapshot: [
      { label: "Triggering", value: "Events & webhooks" },
      { label: "Agents", value: "Ops/Support/Sales" },
      { label: "Recovery", value: "Retries + logs" },
      { label: "SaaS", value: "Portal-ready" },
    ],

    tech: [
      { label: "n8n", icon: "Zap" },
      { label: "Make", icon: "SlidersHorizontal" },
      { label: "Workspace", icon: "Cloud" },
      { label: "Slack / Teams", icon: "MessageCircle" },
      { label: "Airtable", icon: "Table" },
      { label: "Zapier", icon: "Zap" },
      { label: "Twilio / WhatsApp", icon: "MessageCircle" },
    ],

    highlights: [
      "Capture once, reuse everywhere",
      "Agents for ops, support, sales",
      "Exec digests & anomaly alerts",
    ],

    sections: [
      {
        title: "Step into the Era of Digital Transformation",
        desc:
          "Cloud workflows & agents replace manual work and keep teams in flow — with live context everywhere.",
        bullets: ["Live KPIs", "Automated reports/alerts", "Continuity/DR", "ERP/CRM integrations"],
        img: "/n8nflow.webp",
      },
      {
        title: "From Paper to Real-Time Precision",
        desc:
          "Single source of truth with governed datasets and self-service forms/approvals.",
        bullets: ["Sheets/Airtable truth + BI", "Stock/invoice/SLA alerts", "Digital approvals", "Audit logs & exec digests"],
        img: "/paperless.png",
      },
      {
        title: "Workflow & Call Center Automation",
        desc:
          "Connect WhatsApp/Instagram DMs and calendars to CRM with agents that route and summarize.",
        bullets: ["DM→CRM capture & routing", "AI replies & qualification", "Calendar booking flows", "Order-to-cash automations"],
        img: "/agents.png",
      },
      {
        title: "Data Science Agents",
        desc:
          "Assistants that summarize, forecast, and surface anomalies — on your governed data.",
        bullets: ["Support/sales assistants", "Conversation summaries", "Forecasts & anomalies", "Smart routing & prioritization"],
        img: "/AIdata.png",
      },
    ],

    features: [
      "Live KPIs (sales/ops/finance/service)",
      "Automated reporting & alerts",
      "Continuity & backups",
      "ERP/CRM + productivity integrations",
    ],
    outcomes: [
      "Faster decisions on clean data",
      "Lower costs per transaction",
      "Shorter SLAs & fewer errors",
      "Audit-ready trails & governance",
    ],

    expect: [
      "Workflow audit & quick wins",
      "Event-driven automations",
      "KPIs visible in real-time",
    ],
    gettingStarted:
      "Pick one painful workflow; we automate it in a sprint, measure impact, then scale sideways.",
    faq: [
      { q: "Do agents replace staff?", a: "They augment staff and remove busywork; focus shifts to higher-value tasks." },
      { q: "How do we start small?", a: "Automate a single flow with clear ROI, then iterate to adjacent flows." },
    ],
  },

};

export const ALL_SLUGS = Object.keys(SERVICES) as Service["slug"][];
