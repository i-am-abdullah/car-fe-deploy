import React from 'react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';

const Hero = () => {
  return (
    <section className="w-full py-6 md:py-4 px-7">
      <div className="container mx-auto">
        <div className="relative w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image 
              src="/mountain-background.jpeg" 
              alt="Luxury car in mountains" 
              fill
              className="object-cover"
              priority
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-55"></div>
          </div>
          
          {/* Content */}
          <div className="relative h-full flex flex-col justify-center items-center text-center px-4 md:px-20">
            <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold text-white mb-4 hero-title">Premier Auto Sales</h1>
            <p className="text-lg md:text-xl text-white mb-8 font-sans">Car dealerships may sell new cars from one or several manufacturers</p>
            
            {/* Find Car Button */}
            <div className="mb-10">
              <button className="bg-[#1F75FE] hover:bg-[#1E90FF] text-white px-8 py-3 rounded-md flex items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Find Your Car
              </button>
            </div>
            
            {/* Trustpilot ratings */}
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <div className="flex items-center">
              </div>

              <div className="text-white">
                Trust Rating 5.0 | 2348 Reviews
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            
            {/* Slide indicators
            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
              {[1, 2, 3].map((dot, index) => (
                <button 
                  key={dot} 
                  className={`h-2.5 w-2.5 rounded-full ${index === 0 ? 'bg-[#1F75FE]' : 'bg-white/50'}`}
                  aria-label={`Go to slide ${dot}`}
                />
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;