import React from 'react'
import AboutCard from '@/components/ui/AboutCard'
import { CardProps } from '@/types/cards'

interface ValueProps{
    values:CardProps[];
}

const Values:React.FC<ValueProps> = ({values}) => {
  return (
    <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[#3D1703] font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
        <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
          Commitment to Excellence
        </h2>
        <p className="text-gray-600">
          We stand apart through our unwavering dedication to quality, transparency, and customer satisfaction.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {values.map((card, i)=>(
          <AboutCard key={i} icon={card.icon} title={card.title} description={card.description}  />
        )
        )}
      </div>
    </div>
  </section>
  )
}

export default Values