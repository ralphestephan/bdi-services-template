import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/db";
import { resolveTenant, corsHeaders } from "@/lib/tenant";
import {
  renderNewsletterCustomerEmail,
  renderNewsletterAdminEmail,
} from "@/lib/notifications";
import { forwardToMemberFlow } from "@/lib/sync";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function OPTIONS(req: Request) {
  const url = new URL(req.url);
  const tenant = await resolveTenant(url.searchParams.get("org"));
  return new NextResponse(null, { status: 204, headers: corsHeaders(req, tenant) });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { email, organizationId, organization_id, hp } = body as {
    email?: string; organizationId?: string; organization_id?: string; hp?: string;
  };

  const tenant = await resolveTenant(organizationId || organization_id);
  const headers = corsHeaders(req, tenant);

  try {
    if (hp) return NextResponse.json({ success: true }, { headers });

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400, headers });
    }

    const { brand, adminEmail, fromAddress } = tenant;

    // 1) Subscriber welcome.
    await resend.emails.send({
      from: fromAddress,
      to: email,
      subject: `Welcome to ${brand.name}`,
      html: renderNewsletterCustomerEmail(email, brand),
    });

    // 2) Admin notification.
    await resend.emails.send({
      from: fromAddress,
      to: adminEmail,
      subject: "📬 New newsletter subscriber",
      html: renderNewsletterAdminEmail(email, brand),
    });

    // 3) Upsert keeps re-subscribers idempotent.
    try {
      await prisma.newsletterSubscriber.upsert({
        where: { email },
        update: { status: "active", subscribedAt: new Date() },
        create: {
          email,
          status: "active",
          organizationId: tenant.organizationId,
        },
      });
    } catch (dbError: unknown) {
      console.error("newsletter: db save failed (emails sent):", dbError instanceof Error ? dbError.message : dbError);
    }

    forwardToMemberFlow({
      organizationId: tenant.organizationId,
      formType: "newsletter",
      payload: { email },
      email,
      request: req,
    });

    return NextResponse.json({ success: true }, { headers });
  } catch (err: unknown) {
    console.error("newsletter: error:", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Failed to subscribe" },
      { status: 500, headers },
    );
  }
}
