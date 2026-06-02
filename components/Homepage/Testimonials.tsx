'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export type Testimonial = { q: string; a: string };

export default function Testimonials({
  items,
  accent = "#5EC6EA",
  intervalMs = 5000,
}: {
  items: Testimonial[];
  accent?: string;
  intervalMs?: number;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const id = setInterval(() => setIdx((p) => (p + 1) % items.length), intervalMs);
    return () => clearInterval(id);
  }, [items.length, intervalMs]);

  return (
    <section aria-label="Testimonials" className="py-16 md:py-24"
      style={{ background: `linear-gradient(180deg, transparent, ${accent}10)` }}>
      <div className="container mx-auto max-w-[900px] px-4 md:px-6 text-center">
        <span
          className="rounded-full mb-3 inline-block px-3 py-1 text-sm"
          style={{ background: `${accent}1A`, color: "#0B1220", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          What clients say
        </span>

        <div className="relative mx-auto">
          <Quote className="mx-auto mb-3 h-6 w-6" style={{ color: accent }} />
          <motion.blockquote
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-2xl md:text-3xl font-medium leading-snug text-black"
          >
            “{items[idx].q}”
            <footer className="mt-4 text-sm text-muted-foreground">— {items[idx].a}</footer>
          </motion.blockquote>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`h-2 w-6 rounded-full ${i === idx ? "bg-black" : "bg-muted"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
