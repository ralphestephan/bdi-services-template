// =============================
// lib/site.ts — Env-driven brand config
//
// This module exports the static `SITE` brand constant used by SEO metadata,
// structured-data generators, the footer, the navbar, etc. It used to be a
// hardcoded BDI Corporate object; it now resolves from `NEXT_PUBLIC_*` env
// vars at build time with BDI Corporate as fallback so an unconfigured
// template still renders.
//
// For runtime (per-request) tenant branding pulled from Supabase, see
// `lib/tenant-brand.ts` and the `useSiteBrand()` hook there. The two layers
// compose: `SITE` is the build-time default, `useSiteBrand()` overrides it
// per request from the `get_tenant_brand` RPC.
//
// Required env (template consumers MUST override these for a non-BDI deploy):
//   NEXT_PUBLIC_BRAND_NAME
//   NEXT_PUBLIC_BRAND_LEGAL_NAME
//   NEXT_PUBLIC_BRAND_TAGLINE
//   NEXT_PUBLIC_BRAND_DESCRIPTION
//   NEXT_PUBLIC_SITE_URL
//   NEXT_PUBLIC_BRAND_SUPPORT_EMAIL
//   NEXT_PUBLIC_BRAND_PHONE
//   NEXT_PUBLIC_BRAND_TWITTER
//   NEXT_PUBLIC_BRAND_LINKEDIN
//   NEXT_PUBLIC_BRAND_OG_IMAGE
//   NEXT_PUBLIC_BRAND_LOGO
//   NEXT_PUBLIC_BRAND_KEYWORDS  (comma-separated)
//
// Multi-tenant runtime (resolved by `useSiteBrand()` / `getTenantBrand()`):
//   NEXT_PUBLIC_BDI_ORGANIZATION_ID
//   NEXT_PUBLIC_SUPABASE_URL
//   NEXT_PUBLIC_SUPABASE_ANON_KEY
// =============================

const env = (key: string, fallback: string): string => {
  const v = process.env[key];
  return v && v.length > 0 ? v : fallback;
};

const csv = (key: string, fallback: string[]): string[] => {
  const raw = process.env[key];
  if (!raw) return fallback;
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
};

const BRAND_NAME = env("NEXT_PUBLIC_BRAND_NAME", "BDI Corporate");
const BRAND_LEGAL = env("NEXT_PUBLIC_BRAND_LEGAL_NAME", BRAND_NAME);
const BRAND_TAGLINE = env(
  "NEXT_PUBLIC_BRAND_TAGLINE",
  "Your Business Intelligence Partner"
);
const BRAND_DESCRIPTION = env(
  "NEXT_PUBLIC_BRAND_DESCRIPTION",
  "BDI Corporate empowers businesses in Lebanon, the UAE, and beyond with business intelligence, systems integration, and digital transformation solutions. From dashboards to AI analytics, we help organizations make smarter decisions, faster."
);
const SITE_URL = env("NEXT_PUBLIC_SITE_URL", "https://bdicorporate.com");
const SUPPORT_EMAIL = env("NEXT_PUBLIC_BRAND_SUPPORT_EMAIL", "info@bdicorporate.com");
const SUPPORT_PHONE = env("NEXT_PUBLIC_BRAND_PHONE", "+961 3 599 996");
const TWITTER = env("NEXT_PUBLIC_BRAND_TWITTER", "@bdicorporate");
const LINKEDIN = env("NEXT_PUBLIC_BRAND_LINKEDIN", "bdicorporate");
const OG_IMAGE = env("NEXT_PUBLIC_BRAND_OG_IMAGE", "/og/bdicorporate-og.jpg");
const LOGO = env("NEXT_PUBLIC_BRAND_LOGO", "/images/logo-bdi.png");
const FAVICON = env("NEXT_PUBLIC_BRAND_FAVICON", "/favicon.ico");
const APPLE_ICON = env("NEXT_PUBLIC_BRAND_APPLE_ICON", "/favicon.png");

const DEFAULT_KEYWORDS = [
  "business intelligence",
  "systems integration",
  "digital transformation",
  "dashboarding",
  "data analytics",
  "AI analytics",
  "ERP CRM integration",
  "Lebanon",
  "UAE",
];

export const SITE = {
  name: BRAND_NAME,
  brand: BRAND_NAME.split(" ")[0],
  tagline: BRAND_TAGLINE,
  baseUrl: SITE_URL,
  description: BRAND_DESCRIPTION,
  icons: {
    icon: FAVICON,
    shortcut: FAVICON,
    apple: APPLE_ICON,
  },
  keywords: csv("NEXT_PUBLIC_BRAND_KEYWORDS", DEFAULT_KEYWORDS),
  ogImage: OG_IMAGE,
  socials: {
    twitter: TWITTER,
    linkedin: LINKEDIN,
  },
  org: {
    legalName: BRAND_LEGAL,
    url: SITE_URL,
    logo: LOGO,
    sameAs: [
      TWITTER.startsWith("http")
        ? TWITTER
        : `https://twitter.com/${TWITTER.replace(/^@/, "")}`,
      LINKEDIN.startsWith("http")
        ? LINKEDIN
        : `https://www.linkedin.com/company/${LINKEDIN}`,
    ],
  },
  contact: {
    email: SUPPORT_EMAIL,
    phone: SUPPORT_PHONE,
  },
} as const;

export type SiteBrand = typeof SITE;
