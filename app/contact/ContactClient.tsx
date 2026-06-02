"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  X,
} from "lucide-react";
const ACCENT = "#5EC6EA";

/* ─── Pre-fill narratives keyed by ?from= param ──────────────────── */
const NARRATIVES: Record<string, { subject: string; message: string }> = {
  about: {
    subject: "general",
    message: "Hi, I visited your About Us page and would like to learn more about BDI Corporate — your team, approach, and how you work with businesses like ours.",
  },
  services: {
    subject: "consultation",
    message: "Hi, I'm interested in learning more about your services — systems integration, business intelligence, and automation. Could you help me understand which service fits my business needs?",
  },
  discovery: {
    subject: "consultation",
    message: "Hi, I'd like to book a discovery call to discuss how BDI Corporate can help improve our systems, reporting, or operations. Please let me know your availability.",
  },
  clients: {
    subject: "general",
    message: "Hi, I visited your Our Clients page and would like to know more about the types of businesses and SMEs you work with, and whether our company would be a good fit.",
  },
  "suggest-topic": {
    subject: "general",
    message: "Hi, I'd like to suggest a topic for your Insights section. Here's my idea: ",
  },
};

const heroImages = [
  { src: "/consult2.jpeg", alt: "Business consultation" },
  { src: "/businessplan.jpg", alt: "Business planning" },
  { src: "/digitalcons.jpg", alt: "Digital consulting" },
];

export default function ContactClient() {
  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from") || "";

  const [activeImg, setActiveImg] = useState(0);
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Pre-fill form from URL params on mount
  useEffect(() => {
    const narrative = NARRATIVES[fromParam];
    if (narrative) {
      setFormData(prev => ({
        ...prev,
        subject: narrative.subject,
        message: narrative.message,
      }));
      // Show WhatsApp popup for discovery calls
      if (fromParam === "discovery") {
        setShowWhatsAppPopup(true);
      } else {
        // Auto-scroll to form
        setTimeout(() => {
          document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" });
        }, 400);
      }
    }
  }, [fromParam]);

  useEffect(() => {
    if (heroImages.length < 2) return;
    const id = setInterval(() => setActiveImg(i => (i + 1) % heroImages.length), 4500);
    return () => clearInterval(id);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };
  const handleSelectChange = (value: string) =>
    setFormData((p) => ({ ...p, subject: value }));

  const inquiryTypes = [
    { value: "new-project", label: "New Project" },
    { value: "consultation", label: "Consultation Request" },
    { value: "support", label: "Technical Support" },
    { value: "partnership", label: "Partnership" },
    { value: "general", label: "General Inquiry" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-bdi-source": "contact-page",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        toast("Message sent", {
          description: "We'll get back to you shortly.",
        });
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast("Error", {
          description: data.error || "Failed to send message.",
        });
      }
    } catch {
      toast("Error", { description: "Something went wrong." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* ========================= HERO (image carousel) ========================= */}
      <section className="relative overflow-hidden">
        {/* Background carousel */}
        {heroImages.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt={i === activeImg ? img.alt : ""}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`absolute inset-0 object-cover transition-opacity duration-[1200ms] ease-in-out ${
              i === activeImg ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== activeImg}
          />
        ))}

        {/* Readability scrims */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.35),rgba(0,0,0,.15))]" />
        <div className="absolute inset-0 [mask-image:radial-gradient(80%_70%_at_25%_40%,black,transparent_70%)] bg-black/25" />

        <div className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-24">
          <div className="container mx-auto max-w-[1200px] px-4 md:px-6">
            <div className="max-w-[820px] text-white">
              <div className="mb-4 inline-flex items-center gap-3 text-xs">
                <span className="rounded-full bg-white/10 text-white/85 px-3 py-1 border border-white/15">
                  Contact Us
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
                Contact{" "}
                <span style={{ color: ACCENT }}>BDI Corporate</span>
              </h1>

              <p className="mt-4 max-w-[60ch] text-white/85 md:text-lg leading-relaxed">
                Tell us what you need, and we&apos;ll help define the right next step
                for your business.
              </p>
              <p className="mt-2 text-sm text-white/70">
                We support companies in Lebanon and the UAE with systems
                integration, reporting, and automation initiatives.
              </p>

              {/* CTAs */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#inquiry-form"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("inquiry-form")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center justify-center h-10 md:h-11 lg:h-12 px-4 md:px-5 lg:px-6 rounded-full text-sm font-semibold text-white"
                  style={{
                    background: `linear-gradient(#0b0b0b,#0b0b0b) padding-box, linear-gradient(90deg, ${ACCENT}, rgba(94,198,234,.35), ${ACCENT}) border-box`,
                    border: "2px solid transparent",
                    boxShadow: "0 10px 40px -20px rgba(0,0,0,.8)",
                  }}
                >
                  Send an inquiry
                </a>
                <Button asChild variant="outline" className="h-10 md:h-11 lg:h-12 px-4 md:px-5 lg:px-6 rounded-full bg-white/10 text-white hover:bg-white/15 border-white/30">
                  <a
                    href="https://wa.me/9613599996?text=Hello%2C%20I%27d%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================== CONTACT METHODS =================== */}
      <section className="relative overflow-hidden bg-[#070912] text-white py-14 md:py-16 border-y border-white/10">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_60%_at_75%_45%,rgba(94,198,234,0.10),transparent_70%),radial-gradient(50%_50%_at_15%_20%,rgba(139,124,246,0.10),transparent_70%)]" />
        <div className="relative z-10 container mx-auto max-w-[1200px] px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-5">
              <MessageCircle className="h-5 w-5 mt-0.5 shrink-0" style={{ color: ACCENT }} />
              <div>
                <div className="font-semibold text-sm">WhatsApp</div>
                <a
                  href="https://wa.me/9613599996"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +961 3 599 996
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-5">
              <Mail className="h-5 w-5 mt-0.5 shrink-0" style={{ color: ACCENT }} />
              <div>
                <div className="font-semibold text-sm">Email</div>
                <a
                  href="mailto:info@bdicorporate.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  info@bdicorporate.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-5">
              <Phone className="h-5 w-5 mt-0.5 shrink-0" style={{ color: ACCENT }} />
              <div>
                <div className="font-semibold text-sm">Phone</div>
                <div className="text-sm text-muted-foreground space-y-0.5">
                  <div>
                    <a href="tel:+9613599996" className="hover:text-foreground transition-colors">
                      +961 3 599 996
                    </a>
                  </div>
                  <div>
                    <a href="tel:+971529798517" className="hover:text-foreground transition-colors">
                      +971 52 979 8517
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-5">
              <MapPin className="h-5 w-5 mt-0.5 shrink-0" style={{ color: ACCENT }} />
              <div>
                <div className="font-semibold text-sm">Offices</div>
                <div className="text-sm text-muted-foreground">
                  <div>Sin El Fil, Beirut</div>
                  <div>Dubai Internet City</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            Business hours: Mon–Fri · 9:00–18:00 · Weekends by appointment
          </div>
        </div>
      </section>

      {/* =================== FORM + SIDEBAR =================== */}
      <section id="inquiry-form" className="py-14 md:py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* FORM */}
            <Card className="border border-black/10 shadow-sm">
              <CardContent className="p-6 md:p-8">
                <div className="space-y-5">
                  <div>
                    <h2 className="text-2xl font-bold">Send us a message</h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      Share a brief overview of your request and we&apos;ll get back
                      to you.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Full name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          autoComplete="name"
                          placeholder="Jane Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-medium">
                          Company name
                        </label>
                        <Input
                          id="company"
                          name="company"
                          autoComplete="organization"
                          placeholder="Company Ltd"
                          value={formData.company}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="jane@company.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Phone{" "}
                          <span className="text-muted-foreground font-normal">
                            (optional)
                          </span>
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          autoComplete="tel"
                          placeholder="+961 …"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Inquiry type
                      </label>
                      <Select
                        value={formData.subject}
                        onValueChange={handleSelectChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((s) => (
                            <SelectItem key={s.value} value={s.value}>
                              {s.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Briefly describe what you need…"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        We will only use your information to respond to your
                        request.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending…
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Send message
                        </span>
                      )}
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>

            {/* SIDEBAR */}
            <aside className="lg:sticky lg:top-24 space-y-4">
              {/* What happens next */}
              <div className="rounded-2xl border bg-white p-6">
                <h3 className="font-semibold mb-3">What happens next</h3>
                <ol className="space-y-3">
                  {[
                    "We review your request",
                    "We contact you to clarify scope if needed",
                    "We suggest the most relevant next step",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white mt-0.5"
                        style={{ background: ACCENT }}
                      >
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-xs text-muted-foreground">
                  Our goal is to keep the first conversation focused, practical,
                  and relevant to your business needs.
                </p>
              </div>

              {/* Reassurance */}
              <div className="rounded-2xl border bg-white p-6">
                <h3 className="font-semibold mb-3">
                  Practical, business-focused support
                </h3>
                <ul className="space-y-2">
                  {[
                    "Clear communication",
                    "Business-oriented advice",
                    "Structured engagement",
                    "Lebanon and UAE coverage",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2
                        className="h-4 w-4 shrink-0"
                        style={{ color: ACCENT }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick contact */}
              <div className="rounded-2xl border bg-white p-6">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://wa.me/9613599996?text=Hello%2C%20I%27d%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 bg-white hover:bg-muted transition text-sm font-medium"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                  <a
                    href="mailto:info@bdicorporate.com"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 bg-white hover:bg-muted transition text-sm font-medium"
                  >
                    <Mail className="h-4 w-4" />
                    Email us
                  </a>
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  <ShieldCheck className="inline h-3.5 w-3.5 mr-1" style={{ color: ACCENT }} />
                  We will never share your details.
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* =================== WHATSAPP POPUP =================== */}
      {showWhatsAppPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowWhatsAppPopup(false)}>
          <div className="relative w-[90%] max-w-md rounded-2xl border bg-white p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setShowWhatsAppPopup(false)}
              className="absolute top-3 right-3 rounded-full p-1 hover:bg-muted transition"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>

            <div className="text-center space-y-4">
              <div className="mx-auto h-12 w-12 rounded-full flex items-center justify-center" style={{ background: `${ACCENT}1A` }}>
                <MessageCircle className="h-6 w-6" style={{ color: ACCENT }} />
              </div>
              <h3 className="text-lg font-bold">Book via WhatsApp</h3>
              <p className="text-sm text-muted-foreground">
                Send us a quick message on WhatsApp to schedule a discovery call at a time that works for you.
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <Button asChild size="lg" className="w-full">
                  <a
                    href="https://wa.me/9613599996?text=Hello%2C%20I%27d%20like%20to%20book%20a%20discovery%20call%20to%20discuss%20how%20BDI%20Corporate%20can%20help%20my%20business."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Open WhatsApp
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    setShowWhatsAppPopup(false);
                    setFormData(prev => ({
                      ...prev,
                      subject: "consultation",
                      message: "Hi, I'd like to book a discovery call to discuss how BDI Corporate can help improve our systems, reporting, or operations. Please let me know your availability.",
                    }));
                    setTimeout(() => {
                      document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" });
                    }, 200);
                  }}
                >
                  Use contact form instead
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
