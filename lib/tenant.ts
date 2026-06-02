// Tenant brand resolver + CORS helper for the central submissions API.
//
// Every form-submission route on this website (contact / newsletter / order /
// booking) accepts an optional `organizationId` in the body. When present, we
// look up the tenant's brand config and use it for confirmation + admin
// emails. When absent, we fall back to the template's own SITE brand
// (env-driven via `lib/site.ts`).
//
// CORS: each tenant carries an `allowedOrigins` allowlist. Generated sites
// posting cross-origin must match. Same-origin (template) requests bypass.
//
// NOTE: the `BDI_*` env var names below (BDI_ORGANIZATION_ID, BDI_SUBMISSIONS_INGEST_TOKEN)
// are kept for back-compat with deployed templates. They are *not* brand-
// specific; rename via Vercel env var aliases if a tenant prefers.
import { prisma } from "@/lib/db";
import { BDI_BRAND, type Brand } from "@/lib/notifications";

export interface ResolvedTenant {
  organizationId: string | null;
  brand: Brand;
  adminEmail: string;
  fromAddress: string;
  allowedOrigins: string[];
}

const DEFAULT_FROM = process.env.RESEND_FROM || `${BDI_BRAND.name} <${BDI_BRAND.supportEmail}>`;
const DEFAULT_ADMIN = process.env.ADMIN_EMAIL || BDI_BRAND.supportEmail;

const SITE_DEFAULT: ResolvedTenant = {
  organizationId: process.env.BDI_ORGANIZATION_ID || null,
  brand: BDI_BRAND,
  adminEmail: DEFAULT_ADMIN,
  fromAddress: DEFAULT_FROM,
  allowedOrigins: ["*"],
};

export async function resolveTenant(organizationId: string | null | undefined): Promise<ResolvedTenant> {
  if (!organizationId) return SITE_DEFAULT;
  // The host site's own org id resolves to defaults without a DB hit.
  if (process.env.BDI_ORGANIZATION_ID && organizationId === process.env.BDI_ORGANIZATION_ID) {
    return SITE_DEFAULT;
  }
  try {
    const t = await prisma.tenant.findUnique({ where: { organizationId } });
    if (!t) return SITE_DEFAULT;
    const brand: Brand = {
      name: t.name,
      siteUrl: t.siteUrl,
      supportEmail: t.supportEmail,
      phone: t.phone || undefined,
      primaryColor: t.primaryColor || undefined,
      accentColor: t.accentColor || undefined,
      logoUrl: t.logoUrl || undefined,
    };
    return {
      organizationId,
      brand,
      adminEmail: t.adminEmail,
      fromAddress: t.resendFrom || `${t.name} <${t.supportEmail}>`,
      allowedOrigins: t.allowedOrigins?.length ? t.allowedOrigins : ["*"],
    };
  } catch (err) {
    console.error("resolveTenant: lookup failed, using SITE defaults:", err);
    return SITE_DEFAULT;
  }
}

// Build CORS headers for a given request + tenant. Returns headers object
// that should be merged into every response.
export function corsHeaders(req: Request, tenant: ResolvedTenant): Record<string, string> {
  const origin = req.headers.get("origin") || "";
  const allowed = tenant.allowedOrigins;
  const match = allowed.includes("*") || allowed.includes(origin);
  return {
    "Access-Control-Allow-Origin": match ? (origin || "*") : "",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}
