import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

import { insights } from "@/lib/insights";
import { SITE } from "@/lib/site";
import { Card } from "@/components/ui/card";
import GlassyImplementationCTA from "@/components/GlassyImplementationCTA";
import { CalendarDays, Clock3, Tag as TagIcon, CheckCircle2, ArrowRight } from "lucide-react";

/* Brand accent */
const ACCENT = SITE.colors.accent;

/** Props shape that satisfies Next's constraint */
type Props = {
  params?: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return insights.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!params) return { title: "Insight" };            // optional in Next's type
  const { slug } = await params;                        // params is a Promise per Next types
  const post = insights.find((p) => p.slug === slug);
  if (!post) return { title: "Insight" };

  return {
    title: `${post.title} | ${SITE.name} Insights`,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE.baseUrl}/insights/${post.slug}`,
      images: [{ url: `${SITE.baseUrl}${post.cover}` }],
    },
    twitter: { card: "summary_large_image", site: SITE.socials.twitter },
  };
}

export default async function Page({ params }: Props) {
  if (!params) return notFound();
  const { slug } = await params;

  const post = insights.find((p) => p.slug === slug);
  if (!post) return notFound();

  // ...keep the rest of your component exactly as-is


  const related = insights
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 3);

  const firstWithBullets = post.sections.find((s) => s.bullets && s.bullets.length > 0);
  const takeaways =
    firstWithBullets?.bullets?.slice(0, 4) ?? post.sections.slice(0, 4).map((s) => s.heading);

  return (
    <main className="w-full overflow-x-clip relative">
      {/* subtle page wash */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(94,198,234,0.06), rgba(255,255,255,0))",
        }}
      />

      {/* JSON-LD */}
      <Script id="ld-article" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          datePublished: post.date,
          url: `${SITE.baseUrl}/insights/${post.slug}`,
          image: `${SITE.baseUrl}${post.cover}`,
          author: { "@type": "Organization", name: SITE.org.legalName },
          publisher: { "@type": "Organization", name: SITE.org.legalName },
          description: post.excerpt,
        })}
      </Script>

      {/* ============================== HERO ============================== */}
      <section className="relative overflow-hidden">
        {/* Blur the cover lightly as background for cohesion */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={post.cover}
            alt=""
            fill
            className="object-cover opacity-70"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.42),rgba(0,0,0,.18))]" />
          <div className="absolute inset-0 [mask-image:radial-gradient(80%_70%_at_25%_40%,black,transparent_70%)] bg-black/25" />
        </div>

        <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-10 md:py-16 grid md:grid-cols-[1fr_520px] gap-8 items-center">
          {/* LEFT: title + meta + takeaways card */}
          <header className="text-white">
            <div className="inline-flex items-center gap-2 text-xs">
              <Link
                href="/insights"
                className="rounded-full bg-white/10 text-white/85 px-3 py-1 border border-white/15 hover:bg-white/15"
              >
                Insights
              </Link>
              <span className="text-white/50">/</span>
              <span className="rounded-full bg-white/8 text-white/70 px-3 py-1 border border-white/10">
                Article
              </span>
            </div>

            <h1 className="mt-4 text-[34px] sm:text-[40px] md:text-[46px] font-extrabold leading-[1.05] tracking-tight max-w-[18ch]">
              {post.title}
            </h1>

            <p className="mt-3 md:text-lg text-white/85 max-w-[68ch]">
              {post.intro ?? post.excerpt}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/85">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 opacity-85" />
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4 opacity-85" />
                {post.readMins} min read
              </span>
              {post.tags.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] bg-white/10 border-white/25"
                >
                  <TagIcon className="h-3.5 w-3.5 opacity-80" />
                  {t}
                </span>
              ))}
            </div>

            {/* Key takeaways – compact, filled, on brand */}
            {takeaways.length > 0 && (
              <div className="mt-6 rounded-2xl border border-white/25 bg-white/14 backdrop-blur-md p-4">
                <div className="text-[11px] uppercase tracking-wide text-white/80">Key takeaways</div>
                <ul className="mt-2 grid gap-2 sm:grid-cols-2 text-sm">
                  {takeaways.map((t, i) => (
                    <li key={i} className="flex items-start gap-2 rounded-xl bg-white/15 border border-white/20 px-3 py-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                      <span className="text-white/90">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </header>

          {/* RIGHT: cover visual in a glass card (kept tidy) */}
          <aside className="relative">
            <div
              className="relative rounded-[28px] border border-white/25 bg-white/18 backdrop-blur-md p-3 shadow-[0_40px_120px_-30px_rgba(0,0,0,.6)] overflow-hidden"
              aria-label="Article cover"
            >
              <div
                className="pointer-events-none absolute -top-20 -right-12 h-64 w-64 rounded-full opacity-30"
                style={{ background: ACCENT, filter: "blur(60px)" }}
              />
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                <Image src={post.pic} alt={post.coverAlt} fill className="object-cover" />
              </div>

              {/* Meta chips under the image */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl border bg-white/80 text-black px-3 py-2">
                  <div className="text-[10px] uppercase tracking-wide text-black/60">Published</div>
                  <div className="font-medium">
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="rounded-xl border bg-white/80 text-black px-3 py-2">
                  <div className="text-[10px] uppercase tracking-wide text-black/60">Reading time</div>
                  <div className="font-medium">{post.readMins} min</div>
                </div>
              </div>
            </div>

            {post.coverAlt ? (
              <p className="mt-2 text-[11px] text-zinc-600 text-center">{post.coverAlt}</p>
            ) : null}
          </aside>
        </div>
      </section>

      {/* ============================== CONTENT ============================= */}
      <section className="pb-20">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
          {/* Main article */}
          <article className="space-y-10 prose max-w-none prose-headings:font-semibold prose-headings:text-zinc-900">
            {post.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2
                  className="text-2xl md:text-3xl font-extrabold tracking-tight"
                  style={{
                    background: `linear-gradient(90deg, ${ACCENT}, #a6e3f7)`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {s.heading}
                </h2>

                {s.paras?.map((p, i) => <p key={i}>{p}</p>)}

                {s.bullets?.length ? (
                  <ul className="list-disc pl-6">
                    {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                ) : null}

                {s.note ? (
                  <Card className="mt-4 p-4 border"
                    style={{ background: `${ACCENT}0F`, borderColor: `${ACCENT}33` }}
                  >
                    <strong className="text-black">Note:</strong> {s.note}
                  </Card>
                ) : null}
              </section>
            ))}
          </article>

          {/* Sidebar */}
          <aside className="space-y-6 h-fit lg:sticky lg:top-24">
            {/* On this page */}
            <Card className="p-6">
              <h3 className="text-sm font-semibold">On this page</h3>
              <nav className="mt-2 space-y-2">
                {post.sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-sm text-zinc-700 hover:text-black transition"
                  >
                    {s.heading}
                  </a>
                ))}
              </nav>
            </Card>

            {/* Tags */}
            {post.tags?.length ? (
              <Card className="p-6">
                <h3 className="text-sm font-semibold">Tags</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs"
                      style={{ background: "white" }}
                    >
                      <TagIcon className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            ) : null}

            {/* FAQ */}
            {post.faq?.length ? (
              <Card className="p-6">
                <h3 className="text-sm font-semibold">FAQ</h3>
                <div className="mt-2 divide-y rounded-xl border bg-zinc-50">
                  {post.faq.map((f, i) => (
                    <details key={i} className="group p-4 open:bg-white open:rounded-2xl">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                        <span className="font-medium">{f.q}</span>
                        <span className="text-zinc-500 group-open:rotate-180 transition">⌄</span>
                      </summary>
                      <p className="mt-2 text-zinc-600">{f.a}</p>
                    </details>
                  ))}
                </div>
              </Card>
            ) : null}

            {/* Related */}
            {related.length ? (
              <Card className="p-6">
                <h3 className="text-sm font-semibold mb-2">Related reads</h3>
                <ul className="space-y-3">
                  {related.map((p) => (
                    <li key={p.slug} className="flex items-start gap-3">
                      <div className="relative w-16 h-12 rounded-md overflow-hidden border">
                        <Image src={p.cover} alt={p.coverAlt} fill className="object-cover" />
                      </div>
                      <div>
                        <Link href={`/insights/${p.slug}`} className="font-medium hover:underline">
                          {p.title}
                        </Link>
                        <div className="text-xs text-zinc-500">{p.readMins} min</div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <Link
                    href="/insights"
                    className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                  >
                    Browse all insights <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Card>
            ) : null}
          </aside>
        </div>
      </section>
      <GlassyImplementationCTA />
    </main>
  );
}
