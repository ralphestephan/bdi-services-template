
  "use client";
import * as React from "react";



function TOC({ items }: { items: { id: string; label: string }[] }) {

  const [active, setActive] = React.useState(items[0]?.id);
  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top?.target?.id) setActive(top.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
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

export default function TermsPage() {
  const effective = "September 30, 2025";

  const toc = [
    { label: "Overview", id: "overview" },
    { label: "Engagement & Scope", id: "scope" },
    { label: "Fees & Payment", id: "fees" },
    { label: "Client Responsibilities", id: "client" },
    { label: "Intellectual Property", id: "ip" },
    { label: "Third-Party Services", id: "thirdparty" },
    { label: "Confidentiality & Data", id: "conf" },
    { label: "Warranties & Disclaimers", id: "warranties" },
    { label: "Limitation of Liability", id: "liability" },
    { label: "Indemnification", id: "indemnity" },
    { label: "Non-Solicitation", id: "nonsolicit" },
    { label: "Term & Termination", id: "termination" },
    { label: "Governing Law", id: "law" },
    { label: "Changes to Terms", id: "changes" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Terms of Service - BDI Corporate",
            "description": "Terms of service for BDI Corporate's systems integration, business intelligence, and automation services.",
            "url": "https://bdicorporate.com/terms",
            "isPartOf": {
              "@type": "WebSite",
              "name": "BDI Corporate",
              "url": "https://bdicorporate.com"
            },
            "lastReviewed": effective,
            "audience": {
              "@type": "Audience",
              "audienceType": "business customers and clients"
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
              Terms of Service
            </span>
          </h1>
          <p className="mt-2 text-zinc-700 max-w-2xl mx-auto">
            The rules for using BDI Corporate’s website and services.
          </p>
          <div className="mt-2 text-xs text-zinc-500">Effective: {effective}</div>
          <span className="mt-3 mx-auto block h-1 w-20 rounded-full bg-gradient-to-r from-[#1e90ff] to-[#23d5ab]" />
        </div>
      </section>

      {/* BODY */}
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <TOC items={toc} />

          <div className="lg:col-span-3 space-y-6">
            {[
              {
                id: "overview",
                title: "Overview",
                body: (
                  <p>
                    These Terms form a binding agreement between you and BDI Corporate (“we”, “us”, “our”).
                    If a signed Statement of Work (SOW) conflicts with these Terms, the SOW controls.
                  </p>
                ),
              },
              {
                id: "scope",
                title: "Engagement & Scope",
                body: (
                  <ul className="list-disc pl-6 space-y-1">
                    <li>SOWs define deliverables, milestones, assumptions, and acceptance.</li>
                    <li>Changes are handled via written change requests.</li>
                    <li>We may use qualified subcontractors; we remain responsible for their work.</li>
                  </ul>
                ),
              },
              {
                id: "fees",
                title: "Fees & Payment",
                body: (
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Fees may be fixed-scope, T&amp;M, or retainers as stated in the SOW.</li>
                    <li>Invoices are due within 14 days unless otherwise stated; applicable taxes are your responsibility.</li>
                    <li>Late amounts may accrue the lesser of 1.5%/month or the legal maximum.</li>
                  </ul>
                ),
              },
              {
                id: "client",
                title: "Client Responsibilities",
                body: (
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Provide timely access to stakeholders, systems, and data with appropriate permissions.</li>
                    <li>Ensure rights to supply any data/content and to enable integrations.</li>
                    <li>Review deliverables promptly; delays may extend timelines.</li>
                  </ul>
                ),
              },
              {
                id: "ip",
                title: "Intellectual Property",
                body: (
                  <ul className="list-disc pl-6 space-y-1">
                    <li>You own deliverables created for you upon full payment.</li>
                    <li>
                      We retain reusable libraries and know-how; you get a perpetual, non-exclusive license to embedded
                      BDI components for internal use.
                    </li>
                    <li>We may reference your name/logo as a client with prior consent (opt-out anytime).</li>
                  </ul>
                ),
              },
              {
                id: "thirdparty",
                title: "Third-Party Services",
                body: (
                  <p>
                    Solutions may rely on external platforms (ERP/CRM, cloud, analytics). Their terms, pricing, and SLAs apply;
                    we aren’t responsible for their outages or changes.
                  </p>
                ),
              },
              {
                id: "conf",
                title: "Confidentiality & Data",
                body: (
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Each party protects the other’s confidential information and uses it only for the engagement.</li>
                    <li>
                      We process personal data per our{" "}
                      <a className="text-[#1e90ff] font-semibold" href="/privacy">
                        Privacy Policy
                      </a>
                      . A DPA can be executed if required.
                    </li>
                  </ul>
                ),
              },
              {
                id: "warranties",
                title: "Warranties & Disclaimers",
                body: (
                  <ul className="list-disc pl-6 space-y-1">
                    <li>We warrant services will be performed with reasonable skill and care.</li>
                    <li>Except as stated, services and deliverables are provided “as is”.</li>
                  </ul>
                ),
              },
              {
                id: "liability",
                title: "Limitation of Liability",
                body: (
                  <p>
                    To the maximum extent permitted by law, neither party is liable for indirect or consequential damages.
                    Each party’s total liability under an SOW is capped at fees paid in the 12 months preceding the claim,
                    excluding unpaid fees, breach of confidentiality, and indemnified IP claims caused by that party.
                  </p>
                ),
              },
              {
                id: "indemnity",
                title: "Indemnification",
                body: (
                  <p>
                    Each party will defend and indemnify the other from third-party claims arising from materials it supplied
                    that infringe IP, or from its violation of law, subject to prompt notice and cooperation.
                  </p>
                ),
              },
              {
                id: "nonsolicit",
                title: "Non-Solicitation",
                body: (
                  <p>
                    During the engagement and 12 months after, neither party will solicit to hire the other’s personnel who
                    worked on the project, except by mutual written consent.
                  </p>
                ),
              },
              {
                id: "termination",
                title: "Term & Termination",
                body: (
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Either party may terminate for material breach not cured within 15 days of notice.</li>
                    <li>You may terminate for convenience; we’ll invoice for work performed and non-cancelable costs.</li>
                    <li>Survival: fees, IP, confidentiality, and liability provisions.</li>
                  </ul>
                ),
              },
              {
                id: "law",
                title: "Governing Law",
                body: (
                  <p>
                    These Terms are governed by the laws of <strong>Lebanon</strong> (Beirut courts) or the{" "}
                    <strong>UAE</strong> (Dubai courts) as designated in the SOW. The CISG does not apply.
                  </p>
                ),
              },
              {
                id: "changes",
                title: "Changes to Terms",
                body: <p>We may update these Terms. Continued use after updates constitutes acceptance.</p>,
              },
              {
                id: "contact",
                title: "Contact",
                body: (
                  <p>
                    Legal:{" "}
                    <a className="text-[#1e90ff] font-semibold" href="mailto:legal@bdicorporate.com">
                      legal@bdicorporate.com
                    </a>{" "}
                    • General:{" "}
                    <a className="text-[#1e90ff] font-semibold" href="mailto:info@bdicorporate.com">
                      info@bdicorporate.com
                    </a>
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
