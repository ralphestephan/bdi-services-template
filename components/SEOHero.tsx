import Link from 'next/link'

interface HeroProps {
  title: string
  subtitle?: string
  ctaPrimary?: {
    text: string
    href: string
  }
  ctaSecondary?: {
    text: string
    href: string
  }
  backgroundImage?: string
  className?: string
}

export default function Hero({
  title,
  subtitle,
  ctaPrimary = { text: "Book a discovery call", href: "/contact" },
  ctaSecondary = { text: "Talk on WhatsApp", href: "https://wa.me/971XXXXXXXX" },
  backgroundImage,
  className = ""
}: HeroProps) {
  return (
    <section className={`relative py-20 md:py-32 ${className}`}>
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="relative container mx-auto max-w-6xl px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={ctaPrimary.href}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {ctaPrimary.text}
          </Link>
          <Link
            href={ctaSecondary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            {ctaSecondary.text}
          </Link>
        </div>
      </div>
    </section>
  )
}