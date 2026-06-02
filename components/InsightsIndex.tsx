"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

const ACCENT = "#5EC6EA";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  coverAlt: string;
  date: string;
  readMins: number;
  tags: string[];
};

const ALL = "All";

export default function InsightsIndex({ posts }: { posts: Post[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>(ALL);

  const safePosts = useMemo(() => posts ?? [], [posts]);

  const topics = useMemo(() => {
    const set = new Set<string>();
    safePosts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return [ALL, ...Array.from(set).sort()];
  }, [safePosts]);

  const [feature, ...rest] = safePosts;

  const visible = useMemo(() => {
    if (active === ALL) return rest;
    return rest.filter((p) => p.tags.includes(active));
  }, [rest, active]);

  const activate = (t: string) => {
    setActive(t);
    requestAnimationFrame(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  if (!feature) {
    return (
      <div className="text-center text-zinc-500 py-16">
        No insights available yet.
      </div>
    );
  }

  return (
    <>
      {/* FEATURE + TOPICS (elevated + on-brand) */}
      <section id="browse" className="mt-10 mb-12 relative">
        <div className="mx-auto max-w-6xl px-0 md:px-0 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Featured */}
          <Link
            href={`/insights/${feature.slug}`}
            className="group overflow-hidden rounded-[28px] border shadow-[0_30px_90px_-40px_rgba(0,0,0,.45)] relative"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,.92), rgba(255,255,255,.86))",
              borderColor: "rgba(0,0,0,.08)",
            }}
          >
            <div className="relative aspect-[16/8] w-full overflow-hidden">
              <Image
                src={feature.cover}
                alt={feature.coverAlt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {/* Soft top-left glow */}
              <div
                className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full opacity-30"
                style={{ background: ACCENT, filter: "blur(60px)" }}
              />
              <span className="absolute left-4 top-4 inline-flex items-center px-2.5 py-1 rounded-full bg-white/90 text-xs font-medium shadow-sm">
                Featured
              </span>
            </div>
            <div className="p-6 md:p-7">
              <h2 className="text-2xl md:text-3xl font-extrabold leading-tight text-black">
                {feature.title}
              </h2>
              <p className="mt-2 text-zinc-700">{feature.excerpt}</p>
              <div className="mt-3 text-sm text-zinc-500">
                {new Date(feature.date).toLocaleDateString()} • {feature.readMins} min read
              </div>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold"
                   style={{ color: ACCENT }}>
                Read article <span aria-hidden>→</span>
              </div>
            </div>
          </Link>

          {/* Topics + Editor’s picks (card) */}
          <Card
            className="rounded-[28px] p-6 flex flex-col"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,.96), rgba(255,255,255,.9))",
              borderColor: "rgba(0,0,0,.08)",
            }}
          >
            <div>
              <div className="text-sm font-semibold text-black">Browse by topic</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {topics.map((t) => {
                  const isActive = t === active;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => activate(t)}
                      aria-pressed={isActive}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition border ${
                        isActive
                          ? "text-white"
                          : "text-black/70 hover:text-black"
                      }`}
                      style={{
                        background: isActive
                          ? `linear-gradient(90deg, ${ACCENT}, #a6e3f7)`
                          : "white",
                        borderColor: isActive ? "transparent" : "rgba(0,0,0,.08)",
                      }}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {rest.length > 0 && (
              <div className="mt-6">
                <div className="text-sm font-semibold text-black mb-2">Editor’s picks</div>
                <ul className="space-y-3">
                  {rest.slice(0, 3).map((p) => (
                    <li key={p.slug} className="flex items-start gap-3">
                      <div className="relative w-16 h-12 rounded-md overflow-hidden border border-zinc-200">
                        <Image src={p.cover} alt={p.coverAlt} fill className="object-cover" />
                      </div>
                      <div>
                        <Link
                          href={`/insights/${p.slug}`}
                          className="font-medium hover:underline text-black"
                        >
                          {p.title}
                        </Link>
                        <div className="text-xs text-zinc-500">
                          {p.readMins} min • {new Date(p.date).toLocaleDateString()}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {rest.length > 0 && (
              <div className="mt-auto pt-6 text-sm text-zinc-600">
                New to business intelligence? Start with{" "}
                <Link
                  href={`/insights/${rest[0].slug}`}
                  className="text-black font-semibold hover:underline"
                >
                  {rest[0].title}
                </Link>.
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* GRID (filtered) */}
      <section className="pb-4" ref={gridRef}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {visible.map((p) => (
            <Link
              key={p.slug}
              href={`/insights/${p.slug}`}
              className="group h-full flex flex-col overflow-hidden rounded-2xl border hover:shadow-lg transition"
              style={{ background: "white", borderColor: "rgba(0,0,0,.08)" }}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={p.cover}
                  alt={p.coverAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute left-3 top-3 inline-flex items-center px-2.5 py-1 rounded-full bg-white/90 text-xs font-medium shadow-sm">
                  {p.tags[0]}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-semibold leading-snug line-clamp-3 text-black">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-600 line-clamp-2">{p.excerpt}</p>
                <div className="mt-auto pt-4 flex items-center justify-between text-sm">
                  <span className="text-zinc-500">{p.readMins} min read</span>
                  <span className="inline-flex items-center gap-1.5 font-semibold"
                        style={{ color: ACCENT }}>
                    Read <span aria-hidden>→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {visible.length === 0 && (
            <div className="col-span-full text-center text-zinc-500">
              Nothing here yet for <strong>{active}</strong>.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
