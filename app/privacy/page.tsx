
"use client";

import * as React from "react";

/** ── tiny client TOC with scroll-spy ───────────────────────────────────── */
function TOC({ items }: { items: { id: string; label: string }[] }) {

  const [active, setActive] = React.useState(items[0]?.id);

  React.useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  return (
    <aside className="lg:sticky lg:top-20 h-fit">
      <nav className="p-5 rounded-[22px] bg-white border border-zinc-100 shadow-[0_20px_60px_-20px_rgba(0,0,0,.15)]">
        <h2 className="text-sm font-semibold mb-3">On this page</h2>
        <ul className="space-y-2 text-sm">
          {items.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`block rounded-md px-2 py-1 transition ${
                  active === id
                    ? "text-black bg-zinc-100"
                    : "text-zinc-700 hover:text-black"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
/** ─────────────────────────────────────────────────────────────────────── */

export default function PrivacyPage() {
  const updated = "September 30, 2025";

  const toc = [
    { label: "Overview", id: "overview" },
    { label: "Information We Collect", id: "collect" },
    { label: "How We Use Information", id: "use" },
    { label: "Legal Bases (GDPR/UK)", id: "legal" },
    { label: "Sharing & Processors", id: "sharing" },
    { label: "International Transfers", id: "transfers" },
    { label: "Retention", id: "retention" },
    { label: "Security", id: "security" },
    { label: "Your Rights & Choices", id: "rights" },
    { label: "Cookies & Analytics", id: "cookies" },
    { label: "AI & Automations", id: "ai" },
    { label: "Children’s Privacy", id: "children" },
    { label: "Changes", id: "changes" },
    { label: "Contact Us", id: "contact" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy - BDI Corporate",
            "description": "Privacy policy for BDI Corporate's data handling, GDPR compliance, and user rights protection.",
            "url": "https://bdicorporate.com/privacy",
            "isPartOf": {
              "@type": "WebSite",
              "name": "BDI Corporate",
              "url": "https://bdicorporate.com"
            },
            "lastReviewed": updated,
            "audience": {
              "@type": "Audience",
              "audienceType": "business customers and website visitors"
            }
          })
        }}
      />
    <main className="w-full overflow-x-clip">
      {/* HERO */}
      <section className="mt-10 mb-10 relative">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 60% at 20% 15%, rgba(94,198,234,.25), transparent 60%), radial-gradient(50% 60% at 80% 20%, rgba(35,213,171,.18), transparent 60%), linear-gradient(180deg,#fff, #fbfbfd)",
          }}
        />
        <div className="mx-auto max-w-6xl px-4 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
            Legal
          </span>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-[#1e90ff] to-[#23d5ab] bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </h1>
          <p className="mt-2 text-zinc-700 max-w-2xl mx-auto">
            How BDI Corporate (“we”, “us”, “our”) collects, uses, and protects your information for BI,
            integrations, and automations.
          </p>
          <div className="mt-2 text-xs text-zinc-500">Last updated: {updated}</div>
          <span className="mt-3 mx-auto block h-1 w-20 rounded-full bg-gradient-to-r from-[#1e90ff] to-[#23d5ab]" />
        </div>
      </section>

      {/* BODY */}
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <TOC items={toc} />

          <div className="lg:col-span-3 space-y-6">
            {/* card helper classlist */}
            {[
              {
                id: "overview",
                title: "Overview",
                body: (
                  <>
                    <p>
                      This Policy applies to <strong>bdicorporate.com</strong>, client portals, and our project
                      delivery. By using our site or services, you agree to this Policy. We do <strong>not sell</strong>{" "}
                      personal data. For client projects we typically act as a processor under a DPA.
                    </p>
                  </>
                ),
              },
              {
                id: "collect",
                title: "Information We Collect",
                body: (
                  <>
                    <p className="font-semibold">You provide</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Contact details, requests, contracts, billing info.</li>
                      <li>Systems and data you connect (ERP/CRM/e-commerce, files, schemas).</li>
                    </ul>
                    <p className="font-semibold mt-4">Automatically</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Device, IP (approximate location), pages, events, error & security logs.</li>
                    </ul>
                    <p className="font-semibold mt-4">From partners</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Hosting, auth, email, analytics, or platforms you authorize.</li>
                    </ul>
                  </>
                ),
              },
              {
                id: "use",
                title: "How We Use Information",
                body: (
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Provide/improve dashboards, integrations, automations.</li>
                    <li>Operate accounts, permissions, incident response, and support.</li>
                    <li>Send proposals, updates, and insights (opt-out anytime).</li>
                    <li>Comply with legal obligations and enforce agreements.</li>
                  </ul>
                ),
              },
              {
                id: "legal",
                title: "Legal Bases (GDPR/UK)",
                body: (
                  <p>
                    Contract performance; legitimate interests (security, product improvement, fraud prevention);
                    consent (certain cookies/marketing); and legal obligations.
                  </p>
                ),
              },
              {
                id: "sharing",
                title: "Sharing & Processors",
                body: (
                  <>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Sub-processors for hosting, auth, analytics, observability, email.</li>
                      <li>Third-party platforms you connect (ERP/CRM, POS, ecommerce).</li>
                      <li>Compliance/safety when required by law or to protect rights.</li>
                    </ul>
                    <p className="mt-3">We maintain contracts and safeguards with our processors.</p>
                  </>
                ),
              },
              {
                id: "transfers",
                title: "International Transfers",
                body: (
                  <p>
                    Data may be processed in Lebanon, the UAE, the EU and other locations where providers operate.
                    Where required, we use appropriate safeguards (e.g., SCCs).
                  </p>
                ),
              },
              {
                id: "retention",
                title: "Retention",
                body: (
                  <p>
                    We retain personal data only as long as needed for the purposes above or to meet legal requirements,
                    then delete or de-identify it. Project retention follows your SOW or instructions.
                  </p>
                ),
              },
              {
                id: "security",
                title: "Security",
                body: (
                  <p>
                    Layered security: least-privilege access, encrypted transit, segregation of environments, audit
                    trails, change control, and vendor due diligence. No method is 100% secure; we continuously improve.
                  </p>
                ),
              },
              {
                id: "rights",
                title: "Your Rights & Choices",
                body: (
                  <>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Access, correct, delete, or export your data where applicable.</li>
                      <li>Object to or restrict processing; withdraw consent where relied upon.</li>
                      <li>Manage marketing preferences via email footers or by contacting us.</li>
                    </ul>
                    <p className="mt-3">
                      Contact: <a className="text-[#1e90ff] font-semibold" href="mailto:joe@bdicorporate.com">joe@bdicorporate.com</a>
                    </p>
                  </>
                ),
              },
              {
                id: "cookies",
                title: "Cookies & Analytics",
                body: (
                  <p>
                    We use essential cookies for security/session. We may use privacy-respecting analytics in aggregate.
                    Manage non-essential cookies in your browser settings.
                  </p>
                ),
              },
              {
                id: "ai",
                title: "AI & Automations",
                body: (
                  <p>
                    Optional AI features run with guardrails and do not train public models on your data. You control
                    which sources are ingested and who can access outputs.
                  </p>
                ),
              },
              {
                id: "children",
                title: "Children’s Privacy",
                body: <p>Our services are not directed to children under 16.</p>,
              },
              {
                id: "changes",
                title: "Changes",
                body: <p>We may update this Policy. Material changes will be highlighted with a new date above.</p>,
              },
              {
                id: "contact",
                title: "Contact Us",
                body: (
                  <p>
                    Email:{" "}
                    <a className="text-[#1e90ff] font-semibold" href="mailto:joe@bdicorporate.com">
                      joe@bdicorporate.com
                    </a>{" "}
                    • Beirut, Lebanon — Dubai, UAE
                  </p>
                ),
              },
            ].map(({ id, title, body }) => (
              <section
                key={id}
                id={id}
                className="scroll-mt-24 p-6 md:p-8 rounded-[28px] bg-white border border-zinc-100 shadow-[0_20px_60px_-20px_rgba(0,0,0,.15)]"
              >
                <h2 className="text-2xl font-bold mb-3">{title}</h2>
                <div className="prose max-w-none prose-p:leading-relaxed prose-ul:leading-relaxed">{body}</div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
