'use client';
// components/HowItWorks.tsx
import React from 'react';
import { MapPin, Mail, CreditCard, Car, Play } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-20">
        <div className="bg-white rounded-2xl shadow-sm p-10 pb-14">
          {/* Header with Title and Button */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">How Does It Work</h2>
              <p className="text-gray-600">Here are some of the featured cars in different categories</p>
            </div>
            
            <button className="mt-4 md:mt-0 flex items-center bg-[#1F75FE] hover:bg-gray-800 text-white px-5 py-3 rounded-lg transition-colors">
              <Play size={18} className="mr-2" fill="white" />
              Watch video
            </button>
          </div>
          
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-14 h-14 rounded-full border-2 border-blue-200 flex items-center justify-center bg-white text-[#1F75FE] font-bold">
                  01
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-blue-200"></div>
              </div>
              
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-white border border-gray-200 rounded-full flex items-center justify-center">
                  <MapPin size={28} className="text-gray-800" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Choose Any where</h3>
              <p className="text-gray-600 leading-relaxed">
                Car servicing is the regular maintenance and inspection of a vehicle to ensure.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-14 h-14 rounded-full border-2 border-blue-200 flex items-center justify-center bg-white text-[#1F75FE] font-bold">
                  02
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-blue-200"></div>
              </div>
              
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-white border border-gray-200 rounded-full flex items-center justify-center">
                  <Mail size={28} className="text-gray-800" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Contact With Us</h3>
              <p className="text-gray-600 leading-relaxed">
                Car servicing is the regular maintenance and inspection of a vehicle to ensure.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-14 h-14 rounded-full border-2 border-blue-200 flex items-center justify-center bg-white text-[#1F75FE] font-bold">
                  03
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-blue-200"></div>
              </div>
              
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-white border border-gray-200 rounded-full flex items-center justify-center">
                  <CreditCard size={28} className="text-gray-800" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Pay For The Car</h3>
              <p className="text-gray-600 leading-relaxed">
                Car servicing is the regular maintenance and inspection of a vehicle to ensure.
              </p>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-14 h-14 rounded-full border-2 border-blue-200 flex items-center justify-center bg-white text[#1F75FE] font-bold">
                  04
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-blue-200"></div>
              </div>
              
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto border border-gray-200 rounded-full flex items-center justify-center bg-blue-500">
                  <Car size={28} className="text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Recieve The Car</h3>
              <p className="text-gray-600 leading-relaxed">
                Car servicing is the regular maintenance and inspection of a vehicle to ensure.
              </p>
            </div>
          </div>
          
          {/* Trustpilot Rating */}
          <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="font-bold text-xl">Excellent!</div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-[#1F75FE] fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <div className="text-gray-600">
              <span className="font-medium">5.0</span> Rating out of <span className="font-medium">5.0</span> based on <span className="font-medium">245354</span> reviews
            </div>
            <div className="ml-2">
              <svg className="w-6 h-6 text-[#1F75FE]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.22 7.85l-3.15.55.25.31c.18.23.33.48.46.74l.15.33 3.15-.55-.86-1.38zm-8.73.63l2.15 3.46c.24.4.65.63 1.08.63h1.9l-1.08-1.73c-.27-.44-.64-.78-1.08-1.02L10.49 8.48zm2.46 5.03c-.39 0-.77-.14-1.08-.38l-5.11-4.11.71-1.12c.28-.45.73-.76 1.24-.84l5.68-.99c1.33-.23 2.66.44 3.29 1.67l1.08 1.73c.29.45.31 1.02.08 1.5-.24.49-.7.83-1.25.9l-3.32.58c-.1.01-.21.02-.32.02v.04z" />
                <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm2 0c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8-8 3.58-8 8z" />
              </svg>
            </div>
            <div className="text-gray-700 font-bold">Trustpilot</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;