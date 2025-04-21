'use client';
import React, { useState } from 'react';
import CarCard from '../../components/ui/CarCard';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const featuredCars = [
  {
    id: '1',
    image: '/car.png',
    price: 7656.00,
    location: 'Panama City',
    model: 'Mercedes-Benz Class',
    year: '2023',
    mileage: 2500,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    isElectric: true,
    isFavorite: false,
  },
  {
    id: '2',
    image: '/car.png',
    price: 9200.00,
    location: 'Miami',
    model: 'Audi A4',
    year: '2022',
    mileage: 5600,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    isElectric: false,
    isFavorite: true,
  },
  {
    id: '3',
    image: '/car.png',
    price: 4500.00,
    location: 'New York',
    model: 'Toyota Camry',
    year: '2021',
    mileage: 12000,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    isElectric: true,
    isFavorite: false,
  },
  {
    id: '4',
    image: '/car.png',
    price: 15800.00,
    location: 'San Francisco',
    model: 'Tesla Model 3',
    year: '2023',
    mileage: 1200,
    fuelType: 'Electric',
    transmission: 'Automatic',
    isElectric: true,
    isFavorite: false,
  },
  {
    id: '5',
    image: '/car.png',
    price: 5300.00,
    location: 'Chicago',
    model: 'Honda Accord',
    year: '2022',
    mileage: 8500,
    fuelType: 'Petrol',
    transmission: 'Manual',
    isElectric: false,
    isFavorite: false,
  },
  {
    id: '6',
    image: '/car.png',
    price: 12400.00,
    location: 'Los Angeles',
    model: 'Lexus RX',
    year: '2023',
    mileage: 3200,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    isElectric: true,
    isFavorite: true,
  },
  {
    id: '7',
    image: '/car.png',
    price: 6780.00,
    location: 'Seattle',
    model: 'Ford Mustang',
    year: '2021',
    mileage: 15000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    isElectric: false,
    isFavorite: false,
  },
  {
    id: '8',
    image: '/car.png',
    price: 11250.00,
    location: 'Boston',
    model: 'BMW X5',
    year: '2022',
    mileage: 6800,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    isElectric: false,
    isFavorite: false,
  },
];

const FeaturedCars: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 ">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Featured Cars</h2>
            <p className="text-gray-600 mt-2">Explore our top-rated vehicles with the best deals</p>
          </div>
          
          {/* View All Button */}
          <a href="/cars" className="inline-flex items-center text-[#1F75FE] hover:text-[#1F75FE] font-medium">
            View All
            <ArrowRight size={18} className="ml-1" />
          </a>
        </div>
        
        {/* Swiper Slider */}
        <div className="relative px-12">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
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
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="car-swiper"
          >
            {featuredCars.map(car => (
              <SwiperSlide key={car.id}>
                <div className="px-2 mb-6">
                  <CarCard {...car} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Navigation Buttons */}
          <button 
            className="swiper-button-prev relative top-1/2 left-2 -translate-y-1/2 bg-white p-3 rounded-lg shadow-md z-10 opacity-100 hover:bg-gray-100"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} className=" absolute text-gray-800" />
          </button>
          
          <button 
            className="swiper-button-next relative top-1/2 right-2 -translate-y-1/2 bg-white p-3 rounded-lg shadow-md z-10 opacity-100 hover:bg-gray-100"
            aria-label="Next slide"
          >
            <ChevronRight size={20} className="absolute text-gray-800" />
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
          background: #1F75FE;
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

export default FeaturedCars;