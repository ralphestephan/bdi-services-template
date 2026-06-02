// Fire-and-forget bridge from the central submissions API to MemberFlow's
// Supabase. The form routes call `forwardToMemberFlow()` after the Prisma
// save; this hits the `receive-website-submission` edge function which inserts
// into `website_submissions` so the org's dashboard sees the row in real time.
//
// Failures are swallowed by design — the caller must NEVER let a sync failure
// block the user response. We log so it shows up in Vercel logs.

const FN_URL = process.env.MEMBERFLOW_INGEST_URL || ""; // e.g. https://xyz.functions.supabase.co/receive-website-submission
const TOKEN = process.env.BDI_SUBMISSIONS_INGEST_TOKEN || "";

export interface ForwardPayload {
  organizationId: string | null;
  formType: "contact" | "booking" | "order" | "quote" | "newsletter" | "custom";
  payload: Record<string, unknown>;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  pageSlug?: string | null;
  websiteProjectId?: string | null;
  request?: Request;
}

export function forwardToMemberFlow(p: ForwardPayload): void {
  if (!FN_URL || !TOKEN || !p.organizationId) return; // nothing to forward to
  const ip = p.request?.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || p.request?.headers.get("x-real-ip")
    || null;
  const userAgent = p.request?.headers.get("user-agent") || null;
  const referrer = p.request?.headers.get("referer") || null;

  const body = JSON.stringify({
    organization_id: p.organizationId,
    website_project_id: p.websiteProjectId ?? null,
    page_slug: p.pageSlug ?? null,
    form_type: p.formType,
    payload: p.payload,
    name: p.name ?? null,
    email: p.email ?? null,
    phone: p.phone ?? null,
    ip_address: ip,
    user_agent: userAgent,
    referrer,
  });

  // Fire-and-forget. We don't await — the user response shouldn't wait on
  // MemberFlow being reachable.
  fetch(FN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body,
  }).catch((err) => {
    console.error("forwardToMemberFlow failed:", err);
  });
}
