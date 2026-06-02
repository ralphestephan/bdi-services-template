import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import GlassyImplementationCTA from "@/components/GlassyImplementationCTA";
import { Phone, Mail, MapPin, ArrowRight, Building2, Users, TrendingUp, Zap } from "lucide-react";

const BRAND = "#5EC6EA";

export const metadata: Metadata = {
  title: "Business Intelligence Solutions in Lebanon | BDI Corporate",
  description: "Premier business intelligence and digital transformation services in Lebanon. Expert systems integration, AI analytics, and data-driven solutions for Lebanese businesses.",
  alternates: {
    canonical: "/locations/lebanon",
  },
  openGraph: {
    title: "Business Intelligence Solutions in Lebanon | BDI Corporate",
    description: "Transform your Lebanese business with cutting-edge BI solutions, AI analytics, and digital transformation services.",
    url: "https://bdicorporate.com/locations/lebanon",
    images: [
      {
        url: "/lebanon-business.jpg",
        width: 1200,
        height: 630,
        alt: "BDI Corporate Lebanon Office - Business Intelligence Solutions",
      },
    ],
  },
};

export default function LebanonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "BDI Corporate - Lebanon Office",
            "description": "Business intelligence and digital transformation services in Lebanon",
            "url": "https://bdicorporate.com/locations/lebanon",
            "telephone": "+9613599996",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Beirut",
              "addressCountry": "LB"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Lebanon"
            },
            "serviceType": ["Business Intelligence", "Digital Transformation", "Systems Integration", "AI Analytics"],
            "parentOrganization": {
              "@type": "Organization",
              "name": "BDI Corporate",
              "url": "https://bdicorporate.com"
            }
          })
        }}
      />

      {/* Brand ribbon */}
      <div className="relative h-[3px] w-full" style={{ background: BRAND }}>
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,.45), transparent)",
            backgroundSize: "200% 100%",
            animation: "bdiSheen 5s linear infinite",
          }}
          aria-hidden
        />
      </div>

      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
          </div>

          <div className="relative container mx-auto px-4 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <span className="text-2xl">🇱🇧</span>
                  <span className="text-white/90 text-sm font-medium">Lebanon Office</span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Business Intelligence
                  <span className="block" style={{ color: BRAND }}>Solutions in Lebanon</span>
                </h1>
                
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  Transform your Lebanese business with cutting-edge BI solutions, AI analytics, 
                  and digital transformation services tailored for the local market.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-semibold text-white transition-all hover:-translate-y-1"
                    style={{
                      background: `linear-gradient(#0b0b0b,#0b0b0b) padding-box, linear-gradient(90deg, ${BRAND}, rgba(94,198,234,.35), ${BRAND}) border-box`,
                      border: "2px solid transparent",
                      boxShadow: "0 12px 24px rgba(0,0,0,.15)",
                    }}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  
                  <a
                    href="tel:+9613599996"
                    className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-semibold text-white border-2 border-white/20 hover:border-white/40 hover:bg-white/10 transition-all"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call Lebanon Office
                  </a>
                </div>

                {/* Contact info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/70">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5" style={{ color: BRAND }} />
                    <a href="tel:+9613599996" className="hover:text-white transition-colors">
                      +961 3 599 996
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5" style={{ color: BRAND }} />
                    <a href="mailto:info@bdicorporate.com" className="hover:text-white transition-colors">
                      info@bdicorporate.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:pl-8">
                <Image
                  src="/digital.webp"
                  alt="Business Intelligence Solutions Lebanon"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl border border-white/10"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Our Services in <span style={{ color: BRAND }}>Lebanon</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive business intelligence and digital transformation solutions 
                tailored for the Lebanese market
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Building2,
                  title: "Business Intelligence Consulting",
                  description: "Strategic BI implementation and optimization for Lebanese enterprises"
                },
                {
                  icon: Zap,
                  title: "Systems Integration",
                  description: "Seamless integration of business systems and applications"
                },
                {
                  icon: TrendingUp,
                  title: "Digital Transformation",
                  description: "Complete digital modernization and process automation"
                },
                {
                  icon: Users,
                  title: "AI Analytics Solutions",
                  description: "Advanced AI-powered analytics and machine learning"
                },
                {
                  icon: MapPin,
                  title: "Data Visualization",
                  description: "Interactive dashboards and real-time reporting solutions"
                },
                {
                  icon: ArrowRight,
                  title: "Cloud Migration",
                  description: "Secure and efficient cloud infrastructure migration"
                }
              ].map((service, index) => (
                <div
                  key={index}
                  className="group p-8 bg-white rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: `${BRAND}15` }}
                    >
                      <service.icon className="h-6 w-6" style={{ color: BRAND }} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose BDI Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Why Choose <span style={{ color: BRAND }}>BDI</span> in Lebanon
                </h2>
                <div className="space-y-6">
                  {[
                    "Local Market Expertise",
                    "Bilingual Support (Arabic & English)",
                    "24/7 Technical Assistance",
                    "Proven Track Record",
                    "Customized Solutions for Lebanese Market"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: BRAND }}
                      >
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                      <span className="text-gray-700 text-lg">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Image
                  src="/business-planning.webp"
                  alt="Business Planning Lebanon"
                  width={500}
                  height={400}
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <GlassyImplementationCTA />
      </main>

      {/* Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes bdiSheen {
            0% { background-position: 0% 0; }
            100% { background-position: 200% 0; }
          }
        `
      }} />
    </>
  );
}