'use client';
import React from 'react';
import BrandCard from '../../components/ui/BrandCard';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const carBrands = [
  {
    id: 'tata',
    logo: '/next.svg',
    name: 'TATA Car',
    count: 23533,
  },
  {
    id: 'toyota',
    logo: '/next.svg',
    name: 'Toyota',
    count: 35486,
  },
  {
    id: 'honda',
    logo: '/next.svg',
    name: 'Honda',
    count: 29754,
  },
  {
    id: 'bmw',
    logo: '/next.svg',
    name: 'BMW',
    count: 18942,
  },
  {
    id: 'mercedes',
    logo: '/next.svg',
    name: 'Mercedes-Benz',
    count: 21367,
  },
  {
    id: 'audi',
    logo: '/next.svg',
    name: 'Audi',
    count: 17852,
  },
  {
    id: 'ford',
    logo: '/next.svg',
    name: 'Ford',
    count: 31246,
  },
  {
    id: 'tesla',
    logo: '/next.svg',
    name: 'Tesla',
    count: 12578,
  },
];

const BrandsCarousel: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Popular Brands</h2>
            <p className="text-gray-600 mt-2">Explore vehicles by your favorite manufacturers</p>
          </div>

        </div>
        
        {/* Swiper Slider */}
        <div className="relative px-12">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={2}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
              type: 'bullets',
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 6,
              },
            }}
            className="brands-swiper"
          >
            {carBrands.map(brand => (
              <SwiperSlide key={brand.id}>
                <div className="px-2 mb-6">
                  <BrandCard {...brand} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Navigation Buttons */}
          <button 
            className="swiper-button-prev relative top-1/2 left-2 -translate-y-1/2 bg-white p-3 rounded-lg shadow-md z-10 opacity-100 hover:bg-gray-100"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} className="text-gray-800 absolute" />
          </button>
          
          <button 
            className="swiper-button-next relative top-1/2 right-2 -translate-y-1/2 bg-white p-3 rounded-lg shadow-md z-10 opacity-100 hover:bg-gray-100"
            aria-label="Next slide"
          >
            <ChevronRight size={20} className="text-gray-800 absolute" />
          </button>
          
          {/* Custom Pagination */}
          <div className="swiper-pagination flex justify-center mt-8 space-x-2"></div>
        </div>
      </div>
      
      {/* Add custom styling for Swiper pagination */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d1d5db;
          opacity: 1;
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active {
          width: 24px;
          background: #14b8a6;
          border-radius: 4px;
        }
        
        .swiper-button-next::after,
        .swiper-button-prev::after {
          display: none;
        }
        
        .swiper-button-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
};

export default BrandsCarousel;