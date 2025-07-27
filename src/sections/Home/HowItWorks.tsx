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
            
            {/* <button className="mt-4 md:mt-0 flex items-center bg-[#3D1703] hover:bg-gray-800 text-white px-5 py-3 rounded-lg transition-colors">
              <Play size={18} className="mr-2" fill="white" />
              Watch video
            </button> */}
          </div>
          
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-14 h-14 rounded-full border-2 border-[#3D1703] flex items-center justify-center bg-white text-[#3D1703] font-bold">
                  01
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-[#3D1703]"></div>
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
                <div className="w-14 h-14 rounded-full border-2 border-[#3D1703] flex items-center justify-center bg-white text-[#3D1703] font-bold">
                  02
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-[#3D1703]"></div>
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
                <div className="w-14 h-14 rounded-full border-2 border-[#3D1703] flex items-center justify-center bg-white text-[#3D1703] font-bold">
                  03
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-[#3D1703]"></div>
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
                <div className="w-14 h-14 rounded-full border-2 border-[#3D1703] flex items-center justify-center bg-white text[#3D1703] font-bold">
                  04
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-[#3D1703]"></div>
              </div>
              
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto border border-gray-200 rounded-full flex items-center justify-center bg-[#3D1703]">
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
          {/* <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="font-bold text-xl">Excellent!</div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-[#3D1703] fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <div className="text-gray-600">
              <span className="font-medium">5.0</span> Rating out of <span className="font-medium">5.0</span> based on <span className="font-medium">245354</span> reviews
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;