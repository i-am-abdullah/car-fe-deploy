'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Heart,
  MapPin,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Zap,
  ChevronRight
} from 'lucide-react';

interface CarCardProps {
  id: string;
  image: string;
  price: number;
  location: string;
  model: string;
  year: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  isElectric: boolean;
  isFavorite: boolean;
}

const HorizontalCarCard: React.FC<CarCardProps> = ({
  id,
  image,
  price,
  location,
  model,
  year,
  mileage,
  fuelType,
  transmission,
  isElectric,
  isFavorite: initialFavorite
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="flex flex-col sm:flex-row-reverse rounded-lg overflow-hidden shadow-md border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300 max-w-full sm:max-w-2xl h-auto sm:h-56">

              {/* Left side - Content */}
      <div className="flex flex-col flex-grow p-4">
        {/* Location */}
        <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-1">
          <MapPin size={14} className="mr-1" />
          <span>{location}</span>
        </div>

        {/* Car model */}
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">{model}</h3>

        {/* Car specs */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-2 sm:gap-y-3 mt-3 mb-4">
          <div className="flex items-center">
            <Calendar size={16} className="text-gray-400 mr-2" />
            <span className="text-xs sm:text-sm text-gray-600">{year}</span>
          </div>

          <div className="flex items-center">
            <Gauge size={16} className="text-gray-400 mr-2" />
            <span className="text-xs sm:text-sm text-gray-600">{mileage.toLocaleString()} mi</span>
          </div>

          <div className="flex items-center">
            <Fuel size={16} className="text-gray-400 mr-2" />
            <span className="text-xs sm:text-sm text-gray-600">{fuelType}</span>
          </div>

          <div className="flex items-center">
            <Settings size={16} className="text-gray-400 mr-2" />
            <span className="text-xs sm:text-sm text-gray-600">{transmission}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-3"></div>

        {/* View details button */}
        <a
          href={`/cars/${id}`}
          className="flex justify-center items-center w-full py-2 px-4 bg-[#3D1703] text-white rounded-md hover:bg-[#1f74fec4] transition-colors duration-300 font-medium text-sm sm:text-base"
        >
          View Details
          <ChevronRight size={16} className="ml-1" />
        </a>
      </div>
      {/* Right side - Image */}
      <div className="relative w-full sm:w-48 h-40 sm:h-full flex-shrink-0">
        <Image
          src={image}
          alt={model}
          fill
          className="object-cover"
        />
        <button 
          onClick={toggleFavorite}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md z-10 transition-colors duration-300"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            size={18} 
            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"} 
          />
        </button>

        {/* Price tag */}
        <div className="absolute bottom-0 left-0 bg-[#3D1703] text-white px-3 py-1 rounded-tr-md font-bold shadow-md z-10 text-sm sm:text-base">
          ${price.toLocaleString()}
        </div>

        {/* Electric badge */}
        {isElectric && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#3D1703] text-[#3D1703] shadow-md">
              <Zap size={12} className="mr-1" />
              Electric
            </span>
          </div>
        )}
      </div>


    </div>
  );
};

export default HorizontalCarCard;
