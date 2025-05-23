'use client';
import React from 'react';
import Image from 'next/image';
import { Shield, ThumbsUp, Award } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 bg-[#b9b9b93b] p-10 rounded-2xl">
          {/* Left Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-700 mb-10">To get the most accurate and up-to-date information.</p>
            
            {/* Features List */}
            <div className="space-y-8">
              {/* Safe Purchase */}
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="w-10 h-10 rounded-full border border-blue-200 flex items-center justify-center bg-blue-50">
                    <Award size={20} className="text-[#1F75FE]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Safe Purchase</h3>
                  <p className="text-gray-600">
                    Safe purchase products are typically known for their high quality and reliability.
                  </p>
                </div>
              </div>
              
              {/* 90 Days Warranty */}
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="w-10 h-10 rounded-full border border-blue-200 flex items-center justify-center bg-blue-50">
                    <Shield size={20} className="text-[#1F75FE]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">90 Days Warranty</h3>
                  <p className="text-gray-600">
                    The warranty generally covers repairs, replacements, or refunds for products that exhibit defects.
                  </p>
                </div>
              </div>
              
              {/* Hassle & Haggle Free */}
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="w-10 h-10 rounded-full border border-blue-200 flex items-center justify-center bg-blue-50">
                    <ThumbsUp size={20} className="text-[#1F75FE]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Hassle & Haggle Free</h3>
                  <p className="text-gray-600">
                    Whether it's buying a product, negotiating a contract, or seeking customer support.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative h-[480px] w-full rounded-lg overflow-hidden">
              {/* blue border accent */}
              
              {/* Main image */}
              <div className="absolute inset-0">
                <Image
                  src="/mountain-background.jpeg" 
                  alt="Mercedes-Benz Showroom"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;