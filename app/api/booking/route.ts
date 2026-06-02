import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/db";
import { resolveTenant, corsHeaders } from "@/lib/tenant";
import {
  renderBookingCustomerEmail,
  renderBookingAdminEmail,
} from "@/lib/notifications";
import { forwardToMemberFlow } from "@/lib/sync";

const resend = new Resend(process.env.RESEND_API_KEY);

function generateRef(): string {
  const t = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `BK-${t}-${r}`;
}

export async function OPTIONS(req: Request) {
  const url = new URL(req.url);
  const tenant = await resolveTenant(url.searchParams.get("org"));
  return new NextResponse(null, { status: 204, headers: corsHeaders(req, tenant) });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const tenant = await resolveTenant(body.organizationId || body.organization_id);
  const headers = corsHeaders(req, tenant);

  try {
    if (body.hp) return NextResponse.json({ success: true }, { headers });

    const { brand, adminEmail, fromAddress } = tenant;

    const reference = generateRef();
    const startsAt = body.startsAt ? new Date(body.startsAt) : null;
    const booking = {
      reference,
      serviceName: body.service || body.serviceName || null,
      serviceId: body.serviceId || null,
      startsAt,
      durationMinutes: body.durationMinutes ? Number(body.durationMinutes) : null,
      name: body.name || null,
      email: body.email || null,
      phone: body.phone || null,
      notes: body.notes || null,
      payload: body,
      status: "new" as const,
      organizationId: tenant.organizationId,
    };

    const view = {
      reference,
      serviceName: booking.serviceName ?? undefined,
      startsAt: startsAt || undefined,
      durationMinutes: booking.durationMinutes ?? undefined,
      name: booking.name ?? undefined,
      email: booking.email ?? undefined,
      phone: booking.phone ?? undefined,
      notes: booking.notes ?? undefined,
    };

    // 1) Customer confirmation.
    if (booking.email) {
      await resend.emails.send({
        from: fromAddress,
        to: booking.email,
        subject: `Booking request received — ${brand.name}`,
        html: renderBookingCustomerEmail(view, brand),
        replyTo: adminEmail,
      });
    }

    // 2) Admin notification.
    await resend.emails.send({
      from: fromAddress,
      to: adminEmail,
      subject: `📅 New booking: ${booking.serviceName || "Service"} — ${booking.name || "Unknown"}`,
      html: renderBookingAdminEmail(view, brand),
      replyTo: booking.email || adminEmail,
    });

    // 3) Persist.
    try {
      await prisma.booking.create({ data: booking });
    } catch (dbError: unknown) {
      console.error("booking: db save failed (emails sent):", dbError instanceof Error ? dbError.message : dbError);
    }

    forwardToMemberFlow({
      organizationId: tenant.organizationId,
      formType: "booking",
      payload: body,
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      pageSlug: body.page || null,
      websiteProjectId: body.website_project_id || null,
      request: req,
    });

    return NextResponse.json({ success: true, reference }, { headers });
  } catch (err: unknown) {
    console.error("booking: error:", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Failed to book" },
      { status: 500, headers },
    );
  }
}
