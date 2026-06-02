import type { Metadata } from "next";
import Script from "next/script";
import { SITE } from "@/lib/site";
import { insights } from "@/lib/insights";
import InsightsIndex from "@/components/InsightsIndex";          // <-- local (client)
import InsightsHero from "./InsightsHero";            // <-- local (client)
import GlassyImplementationCTA from "@/components/GlassyImplementationCTA";

export const metadata: Metadata = {
  title: "Insights | BDI Corporate",
  description: "Deep dives and guides on BI, integration, and digital transformation.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Insights | BDI Corporate",
    description: "Deep dives and guides on BI, integration, and digital transformation.",
    url: `${SITE.baseUrl}/insights`,
    type: "website",
    images: [{ url: "/og/og-insights.jpg", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return (
    <main className="w-full overflow-x-clip">
      {/* SEO JSON-LD */}
      <Script id="ld-blog" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "BDI Corporate Insights",
          url: `${SITE.baseUrl}/insights`,
          blogPost: insights.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            datePublished: p.date,
            url: `${SITE.baseUrl}/insights/${p.slug}`,
            image: `${SITE.baseUrl}${p.cover}`,
            author: { "@type": "Organization", name: SITE.org.legalName },
            publisher: { "@type": "Organization", name: SITE.org.legalName },
            description: p.excerpt,
          })),
        })}
      </Script>

      {/* HERO (client, frosted + accent, no back button) */}
      <InsightsHero />

      {/* LIST */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4">
          <InsightsIndex posts={insights} />
        </div>
      </section>
      <GlassyImplementationCTA />
    </main>
  );
}
