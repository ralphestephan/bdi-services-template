interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQ[]
  title?: string
  className?: string
}

export default function FAQSection({ faqs, title = "Frequently Asked Questions", className = "" }: FAQSectionProps) {
  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {faq.question}
              </h3>
              <div className="text-gray-600 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}