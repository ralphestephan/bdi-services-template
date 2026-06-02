import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/db";
import { resolveTenant, corsHeaders } from "@/lib/tenant";
import {
  renderContactCustomerEmail,
  renderContactAdminEmail,
} from "@/lib/notifications";
import { forwardToMemberFlow } from "@/lib/sync";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function OPTIONS(req: Request) {
  // Preflight — resolve tenant from query (?org=...) so the CORS allowlist is
  // honored before the body is available.
  const url = new URL(req.url);
  const tenant = await resolveTenant(url.searchParams.get("org"));
  return new NextResponse(null, { status: 204, headers: corsHeaders(req, tenant) });
}

export async function POST(req: Request) {
  const form = await req.json().catch(() => ({}));
  const tenant = await resolveTenant(form.organizationId || form.organization_id);
  const headers = corsHeaders(req, tenant);

  try {
    // Honeypot — silently succeed.
    if (form.hp) return NextResponse.json({ success: true }, { headers });

    const { brand, adminEmail, fromAddress } = tenant;

    // 1) Customer confirmation.
    if (form.email) {
      await resend.emails.send({
        from: fromAddress,
        to: form.email,
        subject: `We received your message — ${brand.name}`,
        html: renderContactCustomerEmail(form, brand),
        replyTo: adminEmail,
      });
    }

    // 2) Admin notification.
    await resend.emails.send({
      from: fromAddress,
      to: adminEmail,
      subject: `New contact: ${form.name || form.email || "Unknown"}`,
      html: renderContactAdminEmail(form, brand),
      replyTo: form.email || adminEmail,
    });

    // 3) Persist to shared Prisma DB (tagged per-tenant).
    try {
      await prisma.contactFormSubmission.create({
        data: {
          name: form.name || "",
          email: form.email || "",
          phone: form.phone || null,
          city: form.city || null,
          reason: form.reason || form.subject || null,
          budget: form.budget || null,
          contact_pref: form.contact_pref || null,
          message: form.message || null,
          status: "new",
          organizationId: tenant.organizationId,
        },
      });
    } catch (dbError: unknown) {
      console.error("contact: db save failed (emails sent):", dbError instanceof Error ? dbError.message : dbError);
    }

    forwardToMemberFlow({
      organizationId: tenant.organizationId,
      formType: form.reason === "quote" ? "quote" : "contact",
      payload: form,
      name: form.name || null,
      email: form.email || null,
      phone: form.phone || null,
      pageSlug: form.page || null,
      websiteProjectId: form.website_project_id || null,
      request: req,
    });

    return NextResponse.json({ success: true }, { headers });
  } catch (err: unknown) {
    console.error("contact: error:", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Failed to send" },
      { status: 500, headers },
    );
  }
}
