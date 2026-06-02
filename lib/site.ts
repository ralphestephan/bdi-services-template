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
//   NEXT_PUBLIC_BRAND_LEGAL_EMAIL    (defaults to SUPPORT_EMAIL)
//   NEXT_PUBLIC_BRAND_PHONE
//   NEXT_PUBLIC_BRAND_PHONE_SECONDARY (optional second phone for footer/contact)
//   NEXT_PUBLIC_BRAND_WHATSAPP        (international format w/o +)
//   NEXT_PUBLIC_BRAND_TWITTER
//   NEXT_PUBLIC_BRAND_LINKEDIN
//   NEXT_PUBLIC_BRAND_LINKEDIN_URL    (full URL override; computed otherwise)
//   NEXT_PUBLIC_BRAND_TWITTER_URL     (full URL override; computed otherwise)
//   NEXT_PUBLIC_BRAND_OG_IMAGE
//   NEXT_PUBLIC_BRAND_LOGO
//   NEXT_PUBLIC_BRAND_LOGO_LIGHT      (light/footer variant; defaults to LOGO)
//   NEXT_PUBLIC_BRAND_KEYWORDS         (comma-separated)
//   NEXT_PUBLIC_BRAND_PRIMARY_COLOR    (hex; structured-data / email shells)
//   NEXT_PUBLIC_BRAND_ACCENT_COLOR     (hex; structured-data / email shells)
//   NEXT_PUBLIC_BRAND_ADDRESS_LOCALITIES (comma-separated, e.g. "Beirut,Dubai")
//   NEXT_PUBLIC_BRAND_ADDRESS_COUNTRIES  (comma-separated ISO codes, e.g. "LB,AE")
//   NEXT_PUBLIC_BRAND_AREAS_SERVED       (comma-separated, e.g. "UAE,Lebanon")
//   NEXT_PUBLIC_BRAND_LANGUAGES          (comma-separated, defaults to "English,Arabic")
//   NEXT_PUBLIC_BRAND_OFFICES            (`|` separates offices, `,` separates fields:
//                                         "Sin El Fil, Beirut|Dubai Internet City")
//   NEXT_PUBLIC_BRAND_REGION_LABEL       (e.g. "Lebanon & UAE", "Lebanon • UAE")
//   NEXT_PUBLIC_BRAND_LEGAL_JURISDICTION (e.g. "Lebanon (Beirut courts) or UAE (Dubai courts)")
//   NEXT_PUBLIC_BRAND_FOUNDING_YEAR
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
const LEGAL_EMAIL = env("NEXT_PUBLIC_BRAND_LEGAL_EMAIL", SUPPORT_EMAIL);
const SUPPORT_PHONE = env("NEXT_PUBLIC_BRAND_PHONE", "+961 3 599 996");
const SUPPORT_PHONE_SECONDARY = env("NEXT_PUBLIC_BRAND_PHONE_SECONDARY", "");
const WHATSAPP = env("NEXT_PUBLIC_BRAND_WHATSAPP", "9613599996");
const TWITTER = env("NEXT_PUBLIC_BRAND_TWITTER", "@bdicorporate");
const LINKEDIN = env("NEXT_PUBLIC_BRAND_LINKEDIN", "bdicorporate");
const OG_IMAGE = env("NEXT_PUBLIC_BRAND_OG_IMAGE", "/og/bdicorporate-og.jpg");
const LOGO = env("NEXT_PUBLIC_BRAND_LOGO", "/images/logo-bdi.png");
const LOGO_LIGHT = env("NEXT_PUBLIC_BRAND_LOGO_LIGHT", LOGO);
const FAVICON = env("NEXT_PUBLIC_BRAND_FAVICON", "/favicon.ico");
const APPLE_ICON = env("NEXT_PUBLIC_BRAND_APPLE_ICON", "/favicon.png");
const PRIMARY_COLOR = env("NEXT_PUBLIC_BRAND_PRIMARY_COLOR", "#0019FF");
const ACCENT_COLOR = env("NEXT_PUBLIC_BRAND_ACCENT_COLOR", "#5EC6EA");
const REGION_LABEL = env("NEXT_PUBLIC_BRAND_REGION_LABEL", "Lebanon & UAE");
const LEGAL_JURISDICTION = env(
  "NEXT_PUBLIC_BRAND_LEGAL_JURISDICTION",
  "Lebanon (Beirut courts) or the UAE (Dubai courts)"
);
const FOUNDING_YEAR = env("NEXT_PUBLIC_BRAND_FOUNDING_YEAR", "2018");

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

const ADDRESS_LOCALITIES = csv("NEXT_PUBLIC_BRAND_ADDRESS_LOCALITIES", ["Beirut", "Dubai"]);
const ADDRESS_COUNTRIES = csv("NEXT_PUBLIC_BRAND_ADDRESS_COUNTRIES", ["LB", "AE"]);
const AREAS_SERVED = csv("NEXT_PUBLIC_BRAND_AREAS_SERVED", ["UAE", "Lebanon", "Middle East"]);
const LANGUAGES = csv("NEXT_PUBLIC_BRAND_LANGUAGES", ["English", "Arabic"]);

// Offices: `|` separates offices, `,` separates fields inside each office.
const OFFICES = (env(
  "NEXT_PUBLIC_BRAND_OFFICES",
  "Sin El Fil, Beirut|Dubai Internet City"
))
  .split("|")
  .map((s) => s.trim())
  .filter(Boolean);

const computeSocialUrl = (handle: string, baseTwitter: string, baseLinkedin: string): string => {
  if (handle.startsWith("http")) return handle;
  return handle;
};

const TWITTER_URL = env(
  "NEXT_PUBLIC_BRAND_TWITTER_URL",
  TWITTER.startsWith("http")
    ? TWITTER
    : `https://twitter.com/${TWITTER.replace(/^@/, "")}`
);
const LINKEDIN_URL = env(
  "NEXT_PUBLIC_BRAND_LINKEDIN_URL",
  LINKEDIN.startsWith("http")
    ? LINKEDIN
    : `https://www.linkedin.com/company/${LINKEDIN}`
);

// Build paired addresses from locality+country lists (zipped pairwise).
const ADDRESSES = ADDRESS_LOCALITIES.map((locality, i) => ({
  locality,
  country: ADDRESS_COUNTRIES[i] || ADDRESS_COUNTRIES[ADDRESS_COUNTRIES.length - 1] || "",
}));

export const SITE = {
  name: BRAND_NAME,
  brand: BRAND_NAME.split(" ")[0],
  tagline: BRAND_TAGLINE,
  baseUrl: SITE_URL,
  description: BRAND_DESCRIPTION,
  foundingYear: FOUNDING_YEAR,
  icons: {
    icon: FAVICON,
    shortcut: FAVICON,
    apple: APPLE_ICON,
  },
  keywords: csv("NEXT_PUBLIC_BRAND_KEYWORDS", DEFAULT_KEYWORDS),
  ogImage: OG_IMAGE,
  colors: {
    primary: PRIMARY_COLOR,
    accent: ACCENT_COLOR,
  },
  socials: {
    twitter: TWITTER,
    linkedin: LINKEDIN,
    twitterUrl: TWITTER_URL,
    linkedinUrl: LINKEDIN_URL,
  },
  org: {
    legalName: BRAND_LEGAL,
    url: SITE_URL,
    logo: LOGO,
    logoLight: LOGO_LIGHT,
    sameAs: [TWITTER_URL, LINKEDIN_URL],
    areasServed: AREAS_SERVED,
    addressCountries: ADDRESS_COUNTRIES,
    addresses: ADDRESSES,
    offices: OFFICES,
    languages: LANGUAGES,
  },
  contact: {
    email: SUPPORT_EMAIL,
    legalEmail: LEGAL_EMAIL,
    phone: SUPPORT_PHONE,
    phoneSecondary: SUPPORT_PHONE_SECONDARY,
    whatsapp: WHATSAPP,
    regionLabel: REGION_LABEL,
    legalJurisdiction: LEGAL_JURISDICTION,
  },
} as const;

export type SiteBrand = typeof SITE;

// Convenience: tel: href (compact form, no spaces).
export const telHref = (phone: string): string =>
  `tel:${phone.replace(/[^\d+]/g, "")}`;

// Convenience: wa.me href for the configured WhatsApp number with optional text.
export const whatsappHref = (text?: string): string => {
  const base = `https://wa.me/${WHATSAPP.replace(/[^\d]/g, "")}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
};
