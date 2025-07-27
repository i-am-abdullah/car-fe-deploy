import React from 'react'

const Mission = () => {
  return (
    <section className="py-16">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[#3D1703] font-semibold text-sm uppercase tracking-wider">Our Purpose</span>
        <h2 className="text-3xl font-bold text-gray-900 mt-2">
          Mission & Vision
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Mission */}
        <div className="p-8 bg-white rounded-lg shadow-lg border-t-4 border-[#3D1703]">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            Our Mission
          </h3>
          <p className="text-gray-700 leading-relaxed">
            To empower every car buyer with reliable information and a seamless
            platform that makes purchasing a vehicle both transparent and exciting. We strive to
            eliminate the complexity and uncertainty traditionally associated with car buying
            through innovative technology and exceptional customer service.
          </p>
        </div>

        {/* Vision */}
        <div className="p-8 bg-white rounded-lg shadow-lg border-t-4 border-[#3D1703]">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            Our Vision
          </h3>
          <p className="text-gray-700 leading-relaxed">
            We envision a future where finding the right car is as effortless
            as a few clicks—where trust, clarity, and customer satisfaction
            define the automotive industry. We aim to be the global standard for
            online vehicle purchasing, setting new benchmarks for transparency and
            customer experience.
          </p>
        </div>
      </div>
    </div>
  </section>
    )
}

export default Mission