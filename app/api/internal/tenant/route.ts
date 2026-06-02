// Internal endpoint: upsert a Tenant row from MemberFlow's `deploy-website`
// edge function so that the central submissions API can render the right
// brand for confirmation + admin emails on every form submission.
//
// Auth: header `Authorization: Bearer <BDI_TENANT_UPSERT_TOKEN>`. Set the
// same token here and on `deploy-website` (Supabase function env).
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const TOKEN = process.env.BDI_TENANT_UPSERT_TOKEN || "";

interface TenantUpsertBody {
  organizationId: string;
  name: string;
  siteUrl: string;
  supportEmail: string;
  adminEmail: string;
  phone?: string | null;
  primaryColor?: string | null;
  accentColor?: string | null;
  logoUrl?: string | null;
  resendFrom?: string | null;
  fromDomainVerified?: boolean;
  allowedOrigins?: string[];
}

export async function POST(req: Request) {
  if (!TOKEN) {
    return NextResponse.json({ error: "tenant upsert token not configured" }, { status: 503 });
  }
  const auth = req.headers.get("authorization") || "";
  const supplied = auth.toLowerCase().startsWith("bearer ") ? auth.slice(7).trim() : "";
  if (supplied !== TOKEN) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as TenantUpsertBody | null;
  if (!body?.organizationId || !body.name || !body.siteUrl || !body.supportEmail || !body.adminEmail) {
    return NextResponse.json(
      { error: "organizationId, name, siteUrl, supportEmail, adminEmail required" },
      { status: 400 },
    );
  }

  try {
    const data = {
      name: body.name,
      siteUrl: body.siteUrl,
      supportEmail: body.supportEmail,
      adminEmail: body.adminEmail,
      phone: body.phone ?? null,
      primaryColor: body.primaryColor ?? null,
      accentColor: body.accentColor ?? null,
      logoUrl: body.logoUrl ?? null,
      resendFrom: body.resendFrom ?? null,
      fromDomainVerified: body.fromDomainVerified ?? false,
      allowedOrigins: body.allowedOrigins ?? [],
    };
    const tenant = await prisma.tenant.upsert({
      where: { organizationId: body.organizationId },
      update: data,
      create: { organizationId: body.organizationId, ...data },
    });
    return NextResponse.json({ success: true, organizationId: tenant.organizationId });
  } catch (err: unknown) {
    console.error("tenant upsert: error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to upsert tenant" },
      { status: 500 },
    );
  }
}
