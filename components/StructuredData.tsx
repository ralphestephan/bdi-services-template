import Script from 'next/script'

interface StructuredDataProps {
  schema: Record<string, unknown>
  id?: string
}

export default function StructuredData({ schema, id }: StructuredDataProps) {
  return (
    <Script
      id={id || 'structured-data'}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}