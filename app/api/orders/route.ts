import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/db";
import { resolveTenant, corsHeaders } from "@/lib/tenant";
import {
  renderOrderCustomerEmail,
  renderOrderAdminEmail,
  type OrderItem,
} from "@/lib/notifications";
import { forwardToMemberFlow } from "@/lib/sync";

const resend = new Resend(process.env.RESEND_API_KEY);

function brandedNumber(brandName: string, id: number): string {
  const prefix = brandName.replace(/[^A-Za-z]/g, "").slice(0, 4).toUpperCase() || "ORD";
  return `${prefix}-${String(id).padStart(5, "0")}`;
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

    const items: OrderItem[] = Array.isArray(body.items) ? body.items : [];
    const subtotal = Number(body.subtotal ?? items.reduce((s, it) => s + (it.price ?? 0) * (it.quantity ?? 1), 0));
    const deliveryFee = Number(body.deliveryFee ?? 0);
    const total = Number(body.total ?? subtotal + deliveryFee);
    const currency = String(body.currency || "USD").toUpperCase();
    const method = String(body.method || "cash");
    const deliveryMethod = String(body.deliveryMethod || (body.address1 ? "delivery" : "pickup"));

    // Insert with placeholder number, then patch with branded number.
    const created = await prisma.order.create({
      data: {
        number: `TMP-${Date.now()}`,
        status: method === "stripe" ? "paid" : "new",
        method,
        email: body.email || null,
        phone: body.phone || null,
        name: body.name || null,
        address1: body.address1 || null,
        address2: body.address2 || null,
        city: body.city || null,
        postal: body.postal || null,
        country: body.country || null,
        items: items as unknown as object,
        subtotal,
        total,
        currency,
        deliveryFee,
        deliveryMethod,
        stripePaymentIntentId: body.stripePaymentIntentId || null,
        stripeSessionId: body.stripeSessionId || null,
        organizationId: tenant.organizationId,
      },
    });
    const number = brandedNumber(brand.name, created.id);
    await prisma.order.update({ where: { id: created.id }, data: { number } });

    const view = {
      number,
      status: created.status,
      method,
      email: created.email ?? undefined,
      phone: created.phone ?? undefined,
      name: created.name ?? undefined,
      address1: created.address1 ?? undefined,
      address2: created.address2 ?? undefined,
      city: created.city ?? undefined,
      postal: created.postal ?? undefined,
      country: created.country ?? undefined,
      items,
      subtotal,
      total,
      currency,
      deliveryFee,
      deliveryMethod,
    };

    // 1) Customer confirmation.
    if (created.email) {
      await resend.emails.send({
        from: fromAddress,
        to: created.email,
        subject: `Order ${number} confirmed — ${brand.name}`,
        html: renderOrderCustomerEmail(view, brand),
        replyTo: adminEmail,
      });
    }

    // 2) Admin notification.
    await resend.emails.send({
      from: fromAddress,
      to: adminEmail,
      subject: `🛒 New order ${number} — ${brand.name}`,
      html: renderOrderAdminEmail(view, brand),
      replyTo: created.email || adminEmail,
    });

    forwardToMemberFlow({
      organizationId: tenant.organizationId,
      formType: "order",
      payload: { ...body, number, total, currency, items },
      name: created.name,
      email: created.email,
      phone: created.phone,
      pageSlug: body.page || null,
      websiteProjectId: body.website_project_id || null,
      request: req,
    });

    return NextResponse.json({ success: true, number, id: created.id }, { headers });
  } catch (err: unknown) {
    console.error("orders: error:", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Failed to create order" },
      { status: 500, headers },
    );
  }
}
