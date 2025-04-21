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

const CarCard: React.FC<CarCardProps> = ({
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
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Card image container with favorite button, price tag and electric badge */}
            <div className="relative h-48">
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

                {/* Electric badge positioned at top left of the image */}
                {isElectric && (
                    <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-[#1F75FE] shadow-md">
                            <Zap size={12} className="mr-1" />
                            Electric
                        </span>
                    </div>
                )}

                {/* Price tag positioned at bottom left of the image */}
                <div className="absolute bottom-0 left-0 bg-[#1F75FE] text-white px-3 py-1 rounded-tr-md font-bold shadow-md z-10">
                    ${price.toLocaleString()}
                </div>
            </div>

            {/* Card content */}
            <div className="p-4">
                {/* Location first, then car model */}
                <div className="flex items-center text-gray-500 mb-1">
                    <MapPin size={14} className="mr-1" />
                    <span className="text-sm">{location}</span>
                </div>

                {/* Car model title */}
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{model}</h3>

                {/* Car specs with dividers */}
                <div className="grid grid-cols-2 gap-x-2 gap-y-3 mb-4">
                    <div className="flex items-center">
                        <Calendar size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{year}</span>
                    </div>

                    <div className="flex items-center">
                        <Gauge size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{mileage.toLocaleString()} mi</span>
                    </div>

                    <div className="flex items-center">
                        <Fuel size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{fuelType}</span>
                    </div>

                    <div className="flex items-center">
                        <Settings size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{transmission}</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-200 my-3"></div>

                {/* View details button */}
                <a
                    href={`/cars/${id}`}
                    className="flex justify-center items-center w-full py-2 px-4 bg-[#1F75FE] text-white rounded-md hover:bg-[#1f74fec4] transition-colors duration-300 font-medium"
                >
                    View Details
                    <ChevronRight size={16} className="ml-1" />
                </a>
            </div>
        </div>
    );
};

export default CarCard;