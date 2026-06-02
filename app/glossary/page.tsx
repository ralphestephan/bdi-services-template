import { generateMetadata as createMetadata } from '@/lib/seo-metadata'
import StructuredData from '@/components/StructuredData'
import { BookOpen, Search } from 'lucide-react'
import GlassyImplementationCTA from '@/components/GlassyImplementationCTA'
import { SITE } from '@/lib/site'

const BRAND = SITE.colors.accent;

export const metadata = createMetadata({
  path: '/glossary',
  title: `Business Intelligence & Systems Integration Glossary | ${SITE.name}`,
  description: 'Comprehensive glossary of business intelligence, systems integration, ERP, CRM, and automation terms. Expert definitions for Middle East businesses.',
})

const glossaryTerms = [
  {
    term: 'Business Intelligence (BI)',
    definition: 'Technologies, applications, and practices for collecting, integrating, analyzing, and presenting business data to help executives and managers make informed decisions.',
    slug: 'business-intelligence'
  },
  {
    term: 'Systems Integration',
    definition: 'The process of linking together different computing systems and software applications physically or functionally to act as a coordinated whole.',
    slug: 'systems-integration'
  },
  {
    term: 'ERP (Enterprise Resource Planning)',
    definition: 'Business process management software that allows organizations to use integrated applications to manage their business and automate many back office functions.',
    slug: 'erp'
  },
  {
    term: 'CRM (Customer Relationship Management)',
    definition: 'Technology for managing all company relationships and interactions with customers and potential customers, aimed at improving business relationships.',
    slug: 'crm'
  },
  {
    term: 'API (Application Programming Interface)',
    definition: 'Set of protocols, routines, and tools for building software applications that specifies how software components should interact.',
    slug: 'api'
  },
  {
    term: 'Data Pipeline',
    definition: 'Set of data processing elements connected in series, where the output of one element is the input of the next one, used for moving and transforming data.',
    slug: 'data-pipeline'
  },
  {
    term: 'KPI (Key Performance Indicator)',
    definition: 'Measurable value that demonstrates how effectively a company is achieving key business objectives, used to evaluate success at reaching targets.',
    slug: 'kpi'
  },
  {
    term: 'ETL (Extract, Transform, Load)',
    definition: 'Data integration process that combines data from multiple sources into a single, consistent data store that is loaded into a data warehouse.',
    slug: 'etl'
  },
  {
    term: 'Data Warehouse',
    definition: 'Large store of data accumulated from a wide range of sources within a company, used to guide management decisions and business intelligence.',
    slug: 'data-warehouse'
  },
  {
    term: 'Business Process Automation',
    definition: 'Use of technology to execute recurring tasks or processes in a business where manual effort can be replaced by automated workflows.',
    slug: 'business-process-automation'
  },
  {
    term: 'iPaaS (Integration Platform as a Service)',
    definition: 'Cloud-based platform that connects various applications, systems, repositories, and IT environments for seamless data sharing.',
    slug: 'ipaas'
  },
  {
    term: 'Digital Transformation',
    definition: 'Integration of digital technology into all areas of business, fundamentally changing how organizations operate and deliver value to customers.',
    slug: 'digital-transformation'
  },
  {
    term: 'POS (Point of Sale)',
    definition: 'Place where a customer executes payment for goods or services, including the hardware and software systems that process transactions.',
    slug: 'pos'
  },
  {
    term: 'Financial Modeling',
    definition: 'Mathematical representation of a company financial performance, used for decision making, planning, and valuation purposes.',
    slug: 'financial-modeling'
  },
  {
    term: 'Workflow Automation',
    definition: 'Design, execution, and automation of processes based on workflow rules where human tasks, data, or files are routed between people or systems.',
    slug: 'workflow-automation'
  }
]

const glossarySchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'Business Intelligence & Systems Integration Glossary',
  description: 'Comprehensive glossary of business intelligence, systems integration, and automation terms',
  hasDefinedTerm: glossaryTerms.map(term => ({
    '@type': 'DefinedTerm',
    name: term.term,
    description: term.definition,
    url: `${SITE.baseUrl}/glossary/${term.slug}`
  }))
}

export default function GlossaryPage() {
  return (
    <>
      <StructuredData schema={glossarySchema} id="glossary-schema" />
      
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
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <BookOpen className="h-5 w-5" style={{ color: BRAND }} />
                <span className="text-white/90 text-sm font-medium">Business Intelligence Glossary</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Business Intelligence &
                <span className="block" style={{ color: BRAND }}>Systems Integration</span>
                <span className="block text-white">Glossary</span>
              </h1>
              
              <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto">
                Essential terms and definitions for business intelligence, systems integration, 
                ERP, CRM, and automation technologies used in the Middle East market.
              </p>

              <div className="inline-flex items-center gap-2 text-white/70">
                <Search className="h-5 w-5" />
                <span className="text-lg">15 Essential Terms Defined</span>
              </div>
            </div>
          </div>
        </section>

        {/* Glossary Terms */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="grid gap-8">
              {glossaryTerms.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-xl transition-all duration-300 p-8"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: BRAND }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900">
                        {item.term}
                      </h2>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {item.definition}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
  )
}