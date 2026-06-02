"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  MessageCircle,
  Mail,
  CalendarDays,
  CreditCard,
  Workflow,
  Search,
  Megaphone,
  BarChart3,
  Boxes,
  Users,
  FileSpreadsheet,
} from "lucide-react";
import { useSiteBrand } from "@/lib/tenant-brand";

// "Works with your stack" orbital constellation: glowing central brand node
// with the platform's real integrations orbiting it on a slowly-rotating ring
// (icons counter-rotate to stay upright), faint connecting lines + a
// hexagram for the premium SaaS feel. Brand name + logo come from
// `useSiteBrand()` so it re-skins per tenant.

type Node = { label: string; Icon: typeof Mail };

const NODES: Node[] = [
  { label: "Shopify / Commerce", Icon: ShoppingBag },
  { label: "WhatsApp", Icon: MessageCircle },
  { label: "Email (Resend)", Icon: Mail },
  { label: "Calendar / Calendly", Icon: CalendarDays },
  { label: "Payments (Stripe · Whish)", Icon: CreditCard },
  { label: "Automation (n8n)", Icon: Workflow },
  { label: "Google / SEO", Icon: Search },
  { label: "Meta · Ads", Icon: Megaphone },
  { label: "Analytics", Icon: BarChart3 },
  { label: "Inventory", Icon: Boxes },
  { label: "CRM", Icon: Users },
  { label: "Sheets / QuickBooks", Icon: FileSpreadsheet },
];

const RADIUS = 42; // % of the square container
const SPIN = 90; // seconds per full rotation

function pos(i: number, total: number) {
  const angle = (i / total) * Math.PI * 2 - Math.PI / 2; // start at top
  return {
    x: 50 + RADIUS * Math.cos(angle),
    y: 50 + RADIUS * Math.sin(angle),
  };
}

export default function IntegrationsConstellation() {
  const brand = useSiteBrand();
  const brandShort = brand.name.split(" ")[0];
  const centerLogo = brand.logoUrl || "/logo.png";
  const points = NODES.map((_, i) => pos(i, NODES.length));
  // Hexagram: connect every other node into two overlapping triangles.
  const triA = [0, 4, 8].map((i) => `${points[i].x},${points[i].y}`).join(" ");
  const triB = [2, 6, 10].map((i) => `${points[i].x},${points[i].y}`).join(" ");

  return (
    <section
      aria-label="Integrations"
      className="relative overflow-hidden bg-[#070912] text-white"
    >
      {/* ambient glows */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_60%_at_75%_45%,rgba(94,198,234,0.10),transparent_70%),radial-gradient(50%_50%_at_15%_20%,rgba(139,124,246,0.10),transparent_70%)]" />
      <div className="relative z-10 container mx-auto max-w-[1200px] px-4 md:px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Copy */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5EC6EA]" />
              INTEGRATIONS
            </span>
            <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
              Works with your
              <br />
              <span className="bg-gradient-to-r from-[#5EC6EA] via-[#7CC7F0] to-[#8B7CF6] bg-clip-text text-transparent">
                existing stack
              </span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/65">
              Connect {brandShort} to your storefront, payments, calendar, messaging and
              automation tools — all moving together in one intelligent
              workflow, with no rip-and-replace.
            </p>
          </div>

          {/* Constellation */}
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: SPIN, repeat: Infinity, ease: "linear" }}
            >
              {/* connecting geometry */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full"
                fill="none"
              >
                <circle cx="50" cy="50" r={RADIUS} stroke="rgba(255,255,255,0.08)" strokeWidth="0.3" />
                <polygon points={triA} stroke="rgba(94,198,234,0.18)" strokeWidth="0.3" />
                <polygon points={triB} stroke="rgba(139,124,246,0.18)" strokeWidth="0.3" />
                {points.map((p, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={p.x}
                    y2={p.y}
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="0.25"
                  />
                ))}
              </svg>

              {/* orbiting nodes */}
              {NODES.map((node, i) => {
                const p = points[i];
                const { Icon } = node;
                return (
                  <div
                    key={node.label}
                    className="absolute"
                    style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}
                    title={node.label}
                  >
                    {/* counter-rotate so the icon stays upright */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: SPIN, repeat: Infinity, ease: "linear" }}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] shadow-[0_0_20px_rgba(94,198,234,0.06)] backdrop-blur md:h-12 md:w-12"
                    >
                      <Icon className="h-5 w-5 text-white/80" aria-hidden />
                      <span className="sr-only">{node.label}</span>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            {/* center brand node (static, pulsing glow) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 1.06, 1], opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-br from-[#5EC6EA]/25 to-[#8B7CF6]/25 shadow-[0_0_60px_rgba(94,198,234,0.35)] backdrop-blur"
              >
                <div className="absolute -inset-2 -z-10 rounded-3xl bg-[radial-gradient(circle,rgba(94,198,234,0.30),transparent_70%)] blur-md" />
                <Image
                  src={centerLogo}
                  alt={brandShort}
                  width={120}
                  height={185}
                  priority
                  className="h-14 w-auto object-contain brightness-0 invert"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
