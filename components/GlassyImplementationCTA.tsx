import Link from "next/link";
import { ArrowRight, Lightbulb } from "lucide-react";

const ACCENT = "#5EC6EA";

export type GlassyImplementationCTAProps = {
  /** Primary CTA (default: /contact) */
  primaryHref?: string;
  /** Secondary CTA (default: /services) */
  secondaryHref?: string;
  showSecondary?: boolean;
  className?: string;
};

export default function GlassyImplementationCTA({
  primaryHref = "/contact",
  secondaryHref = "/services",
  showSecondary = true,
  className = "",
}: GlassyImplementationCTAProps) {
  return (
    <section
      aria-label="Expert implementation call to action"
      className={`py-16 lg:py-24 bg-gradient-to-r from-slate-900 to-slate-800 ${className}`.trim()}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Lightbulb className="h-5 w-5" style={{ color: ACCENT }} />
            <span className="text-white/90 text-sm font-medium">Expert Implementation</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Need Help With Implementation?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Our experts can help you implement these technologies in your business with
            proven ROI and tailored solutions for the Middle East market.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={primaryHref}
              className="group inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-semibold text-white transition-all hover:-translate-y-1"
              style={{
                background: `linear-gradient(#0b0b0b,#0b0b0b) padding-box, linear-gradient(90deg, ${ACCENT}, rgba(94,198,234,.35), ${ACCENT}) border-box`,
                border: "2px solid transparent",
                boxShadow: "0 12px 24px rgba(0,0,0,.15)",
              }}
            >
              Book a Consultation
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            {showSecondary && (
              <Link
                href={secondaryHref}
                className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-semibold text-white border-2 border-white/20 hover:border-white/40 hover:bg-white/10 transition-all"
              >
                View Our Services
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/10">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">15+</div>
              <div className="text-white/70">Essential Terms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-white/70">Implementations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">2</div>
              <div className="text-white/70">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
