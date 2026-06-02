"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { routes } from "@/lib/constants";
import { useSiteBrand } from "@/lib/tenant-brand";

export default function Navbar() {
  const pathname = usePathname();
  const brand = useSiteBrand();
  const BRAND = brand.accentColor || "#5EC6EA";
  const brandName = brand.name;
  const brandWordFirst = brandName.split(" ")[0];
  const brandWordRest = brandName.includes(" ")
    ? brandName.slice(brandWordFirst.length + 1)
    : "";
  const logoSrc = brand.logoLightUrl || brand.logoUrl || "/logo.png";
  const homeLabel = `${brandName} home`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  const LINKS = routes;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 6);
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close drawer on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-[60]">
      {/* Solid brand ribbon with animated sheen (base is solid brand — no fade-out) */}
      <div className="relative h-[3px] w-full" style={{ background: BRAND }}>
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,.45), transparent)",
            backgroundSize: "200% 100%",
            animation: "bdiSheen 5s linear infinite",
          }}
          aria-hidden
        />
      </div>

      {/* Frosted shell */}
      <div
        className={[
          "transition-all duration-300 border-b",
          scrolled
            ? "bg-white/85 backdrop-blur-md border-black/10 shadow-[0_10px_28px_-20px_rgba(0,0,0,.25)]"
            : "bg-white/75 backdrop-blur-md border-black/10",
        ].join(" ")}
      >
        <nav className="mx-auto max-w-[1200px] px-4">
          {/* Desktop */}
          <div className="hidden md:flex h-[72px] items-center justify-between">
            {/* Brand (logo + name; second word in brand accent) */}
            <Link
              href="/"
              aria-label={homeLabel}
              className="inline-flex items-center gap-3"
            >
              <Image
                src={logoSrc}
                alt={brandName}
                width={160}
                height={54}
                className="h-10 w-auto"
                priority
              />
              <span className="text-lg font-bold tracking-tight text-black">
                {brandWordFirst}{brandWordRest ? <> <span style={{ color: BRAND }}>{brandWordRest}</span></> : null}
              </span>
            </Link>

            {/* Links */}
            <ul className="flex items-center gap-8 text-[15px] font-semibold text-black/80">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={pathname === l.href ? "page" : undefined}
                    className={[
                      "relative pb-0.5 hover:text-black transition-colors",
                      pathname === l.href ? "text-black" : "",
                    ].join(" ")}
                  >
                    {l.label}
                    {/* active/hover underline */}
                    <span
                      aria-hidden
                      className={[
                        "absolute left-0 right-0 -bottom-1 h-[2px] origin-left rounded",
                        "transition-transform duration-300",
                        pathname === l.href ? "scale-x-100" : "scale-x-0",
                      ].join(" ")}
                      style={{ background: BRAND }}
                    />
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* Mobile bar */}
          <div className="md:hidden h-16 grid grid-cols-3 items-center">
            {/* Burger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
              className="justify-self-start inline-flex h-10 w-10 items-center justify-center rounded-xl active:scale-[.98] transition"
            >
              <svg width="22" height="22" viewBox="0 0 24 24">
                <rect
                  className={`fill-black transition ${open ? "translate-y-[6px] rotate-45 origin-[10px_1px]" : ""}`}
                  x="4"
                  y="7"
                  width="16"
                  height="2"
                  rx="1"
                />
                <rect
                  className={`fill-black transition ${open ? "opacity-0" : ""}`}
                  x="4"
                  y="11"
                  width="16"
                  height="2"
                  rx="1"
                />
                <rect
                  className={`fill-black transition ${open ? "-translate-y-[6px] -rotate-45 origin-[10px_1px]" : ""}`}
                  x="4"
                  y="15"
                  width="16"
                  height="2"
                  rx="1"
                />
              </svg>
            </button>

            {/* Brand center; show name on >=sm to avoid cramping */}
            <Link href="/" aria-label={homeLabel} className="justify-self-center inline-flex items-center gap-2">
              <Image
                src={logoSrc}
                alt={brandName}
                width={140}
                height={48}
                className="h-9 w-auto"
                priority
              />
              <span className="hidden xs:inline text-base font-bold tracking-tight text-black">
                {brandWordFirst}{brandWordRest ? <> <span style={{ color: BRAND }}>{brandWordRest}</span></> : null}
              </span>
            </Link>

            {/* Spacer to keep brand centered in the 3-col grid */}
            <span aria-hidden className="justify-self-end h-10 w-10" />
          </div>
        </nav>
      </div>

      {/* Scroll progress */}
      <div className="h-[2px] w-full bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#5EC6EA] to-[#8B7CF6] transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
          aria-hidden
        />
      </div>

      {/* Overlay + Drawer (z-index above header to ensure clicks) */}
      <div
        className={[
          "fixed inset-0 bg-black/25 opacity-0 pointer-events-none transition-opacity md:hidden z-[70]",
          open ? "opacity-100 pointer-events-auto" : "",
        ].join(" ")}
        onClick={() => setOpen(false)}
      />
      <aside
        className={[
          "fixed top-0 bottom-0 left-0 w-[80%] max-w-[18rem] -translate-x-full md:hidden",
          "bg-white/90 backdrop-blur-xl border-r border-black/10 z-[80] transition-transform",
          open ? "translate-x-0" : "",
        ].join(" ")}
        aria-hidden={!open}
      >
        <div className="p-4 pt-6 flex items-center gap-3">
          <Image
            src={logoSrc}
            alt={brandName}
            width={140}
            height={48}
            className="h-9 w-auto"
          />
          <span className="text-lg font-bold tracking-tight text-black">
            {brandWordFirst}{brandWordRest ? <> <span style={{ color: BRAND }}>{brandWordRest}</span></> : null}
          </span>
        </div>

        <nav className="px-2 pb-8 text-black">
          <ul className="space-y-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-[15px] font-medium transition-colors ${
                    pathname === l.href ? "bg-black/[0.06]" : "hover:bg-black/[0.05]"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mx-2 mt-4 block rounded-full bg-gradient-to-r from-[#5EC6EA] to-[#8B7CF6] px-4 py-3 text-center text-[15px] font-semibold text-white shadow"
          >
            Book a discovery call
          </Link>
        </nav>
      </aside>

      {/* Scoped keyframes */}
      <style>{`
        @keyframes bdiSheen {
          0% { background-position: 0% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes bdiSweep {
          0% { left:-120%; }
          50% { left:120%; }
          100% { left:120%; }
        }
      `}</style>
    </header>
  );
}
