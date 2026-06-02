interface Feature {
  title: string
  description: string
  icon?: React.ReactNode
}

interface FeatureGridProps {
  features: Feature[]
  title?: string
  subtitle?: string
  columns?: 2 | 3 | 4
  className?: string
}

export default function FeatureGrid({
  features,
  title,
  subtitle,
  columns = 3,
  className = ""
}: FeatureGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4'
  }

  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto max-w-6xl px-4">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            )}
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}
        
        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8`}>
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              {feature.icon && (
                <div className="flex justify-center mb-4 text-blue-600">
                  {feature.icon}
                </div>
              )}
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}