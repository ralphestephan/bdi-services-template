import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Reusable "Powered by BDI Systems" section — shown on the services overview
// and on every service detail page. Expands on what BDI Systems is and shows
// real product screenshots from /public.

const FEATURES = [
  "CEO dashboards + team micro-apps, with view restrictions by role",
  "Runs membership, commerce, services, rental and billing models",
  "Connects your storefront, payments, calendar, messaging and automation",
  "Centralized reporting, automated workflows and plain-language AI",
];

function ProductFrame({
  src,
  alt,
  w,
  h,
  label,
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  label?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-background p-2 shadow-lg shadow-primary/10">
      <div className="flex items-center gap-1.5 px-2 py-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
        {label ? (
          <span className="ml-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
        ) : null}
      </div>
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        className="w-full rounded-xl border object-cover"
      />
    </div>
  );
}

export default function BdiSystemsSection() {
  return (
    <section className="px-4 md:px-6 py-14 md:py-20">
      <div className="container mx-auto max-w-[1200px]">
        <div className="rounded-3xl border bg-card p-6 shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Powered by BDI Systems
              </span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
                The platform behind the work
              </h2>
              <p className="mt-3 max-w-[60ch] text-muted-foreground">
                Many engagements are delivered on{" "}
                <strong className="text-foreground">BDI Systems</strong> — our own
                multi-tenant business platform (from{" "}
                <strong className="text-foreground">$100/mo</strong>, at{" "}
                <a
                  href="https://systems.bdicorporate.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline underline-offset-4"
                >
                  systems.bdicorporate.com
                </a>
                ). It gives leadership live dashboards, teams role-scoped
                micro-apps, and everyone a single place to run day-to-day
                operations — so the systems work we deliver keeps paying off
                long after launch.
              </p>
              <ul className="mt-5 space-y-2.5 text-sm">
                {FEATURES.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <a
                    href="https://systems.bdicorporate.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Explore BDI Systems
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Book a discovery call</Link>
                </Button>
              </div>
            </div>

            <ProductFrame
              src="/sys-dashboard.png"
              alt="BDI Systems — executive dashboard with KPIs, top services and revenue mix"
              w={1600}
              h={900}
              label="Dashboard"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
