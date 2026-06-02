// app/_components/ClientsMarquee.tsx
'use client';

import Image from "next/image";

export default function ClientsMarquee({
  logos,
  accent = "#5EC6EA",
}: {
  logos: string[];
  accent?: string;
}) {
  return (
    <section aria-label="Trusted by" className="py-12"
      style={{ background: `linear-gradient(180deg, ${accent}14, transparent 60%)` }}>
      <div className="container mx-auto max-w-[1200px] px-4 md:px-6 text-center space-y-6">
        <div className="flex flex-col items-center justify-center space-y-2">
          <span
            className="rounded-full px-3 py-1 text-sm"
            style={{ background: `${accent}1A`, color: "#0B1220", border: "1px solid rgba(0,0,0,0.08)" }}
          >
            Our Clients
          </span>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Industries we <span style={{ color: accent }}>serve</span>
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg mx-auto">
            Trusted by leading companies across the UAE and Lebanon.
          </p>
        </div>

        <div className="relative overflow-x-hidden">
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16" style={{background:"linear-gradient(90deg, white, transparent)"}}/>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16" style={{background:"linear-gradient(270deg, white, transparent)"}}/>

          <div className="flex gap-12 px-4 w-max animate-[marquee_24s_linear_infinite] hover:[animation-play-state:paused] will-change-transform">
            {logos.concat(logos).map((logo, i) => (
              <div key={i} className={`relative flex-shrink-0 flex items-center justify-center ${logo.includes("sunset.jpg") ? "w-100 h-28" : "w-40 h-28"}`}>
                <Image src={logo} alt={`Client ${i+1}`} fill className="object-contain opacity-80 hover:opacity-100 transition" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}
