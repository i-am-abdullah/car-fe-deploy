import React from 'react'

const OurStory = () => {
  return (
    <section className="py-16">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Text Content */}
        <div className="md:w-1/2">
          <div className="mb-4">
            <span className="text-[#3D1703] font-semibold text-sm uppercase tracking-wider">Our Story</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              ABOUT AUTOLEECH
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            We began with a passion for revolutionizing the car buying process,
            making it simple, transparent, and enjoyable for everyone. With a dedicated team of
            automotive experts, we've built a sophisticated platform that bridges the gap
            between dealerships and buyers, ensuring a seamless experience
            from browsing to driving off the lot.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to empower customers with the knowledge, tools, and
            support they need to find the perfect car at the right price. We believe that purchasing a vehicle
            should be an exciting milestone, not a stressful experience.
          </p>
        </div>

        {/* Image with Professional Styling */}
        <div className="md:w-1/2">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/why-choose-us.jpeg"
              alt="Our Story"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-30"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default OurStory