// =============================
// lib/tenant-brand.ts — Runtime tenant brand resolution
//
// `lib/site.ts` exports the build-time SITE constant resolved from env vars.
// This module layers on top: it pulls the live tenant brand row from
// Supabase (organizations.settings.brand) via the `get_tenant_brand` RPC and
// merges it with the env defaults.
//
// Usage:
//   - Server components / route handlers: `await getTenantBrand()`
//   - Client components: `const brand = useSiteBrand()`
//
// Both helpers return a `TenantBrand` shape. ISR-cached for 60 s so live
// edits to the brand in MemberFlow propagate within a minute without
// rebuilding the site.
// =============================

import { SITE } from "./site";

export interface TenantBrand {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  siteUrl: string;
  supportEmail: string;
  phone: string;
  primaryColor?: string;
  accentColor?: string;
  logoUrl?: string;
  ogImage?: string;
  twitter?: string;
  linkedin?: string;
  organizationId?: string;
  enabledSections?: string[];
}

const DEFAULT_BRAND: TenantBrand = {
  name: SITE.name,
  legalName: SITE.org.legalName,
  tagline: SITE.tagline,
  description: SITE.description,
  siteUrl: SITE.baseUrl,
  supportEmail: SITE.contact.email,
  phone: SITE.contact.phone,
  logoUrl: SITE.org.logo,
  ogImage: SITE.ogImage,
  twitter: SITE.socials.twitter,
  linkedin: SITE.socials.linkedin,
  organizationId: process.env.NEXT_PUBLIC_BDI_ORGANIZATION_ID || undefined,
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const ORG_ID = process.env.NEXT_PUBLIC_BDI_ORGANIZATION_ID || "";

type BrandRow = {
  name?: string | null;
  legal_name?: string | null;
  tagline?: string | null;
  description?: string | null;
  site_url?: string | null;
  support_email?: string | null;
  phone?: string | null;
  primary_color?: string | null;
  accent_color?: string | null;
  logo_url?: string | null;
  og_image?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  enabled_sections?: string[] | null;
};

function mergeBrand(row: BrandRow | null | undefined): TenantBrand {
  if (!row) return DEFAULT_BRAND;
  return {
    name: row.name || DEFAULT_BRAND.name,
    legalName: row.legal_name || DEFAULT_BRAND.legalName,
    tagline: row.tagline || DEFAULT_BRAND.tagline,
    description: row.description || DEFAULT_BRAND.description,
    siteUrl: row.site_url || DEFAULT_BRAND.siteUrl,
    supportEmail: row.support_email || DEFAULT_BRAND.supportEmail,
    phone: row.phone || DEFAULT_BRAND.phone,
    primaryColor: row.primary_color || undefined,
    accentColor: row.accent_color || undefined,
    logoUrl: row.logo_url || DEFAULT_BRAND.logoUrl,
    ogImage: row.og_image || DEFAULT_BRAND.ogImage,
    twitter: row.twitter || DEFAULT_BRAND.twitter,
    linkedin: row.linkedin || DEFAULT_BRAND.linkedin,
    organizationId: ORG_ID || DEFAULT_BRAND.organizationId,
    enabledSections: row.enabled_sections || undefined,
  };
}

// Server-side resolver. Uses Next's native fetch with `revalidate: 60` so the
// brand is ISR-cached at the page level (no redeploy needed for brand edits).
export async function getTenantBrand(): Promise<TenantBrand> {
  if (!SUPABASE_URL || !SUPABASE_ANON || !ORG_ID) {
    return DEFAULT_BRAND;
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_tenant_brand`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON,
        Authorization: `Bearer ${SUPABASE_ANON}`,
      },
      body: JSON.stringify({ p_organization_id: ORG_ID }),
      next: { revalidate: 60, tags: [`tenant-brand:${ORG_ID}`] },
    });
    if (!res.ok) return DEFAULT_BRAND;
    const data = (await res.json()) as BrandRow | BrandRow[] | null;
    const row = Array.isArray(data) ? data[0] : data;
    return mergeBrand(row);
  } catch (err) {
    console.error("getTenantBrand: RPC failed, using env defaults:", err);
    return DEFAULT_BRAND;
  }
}

// Client hook. Returns the env-default brand synchronously (no Supabase JS
// client dependency baked in); pages that need the live brand on the client
// should pass the result of `getTenantBrand()` down as a prop / context.
export function useSiteBrand(): TenantBrand {
  return DEFAULT_BRAND;
}

export { DEFAULT_BRAND };
