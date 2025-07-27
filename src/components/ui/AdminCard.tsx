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
    Edit,
    Trash2,
    AlertCircle,
    Eye
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CarCardManageProps {
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
    status?: string;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const CarCardAdmin: React.FC<CarCardManageProps> = ({
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
    isFavorite: initialFavorite,
    status = 'pending',
    onEdit,
    onDelete
}) => {
    const router = useRouter()

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit(id);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(id);
    };

    // Get status badge color
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'sold': return 'bg-[#3D1703] text-[#3D1703]';
            case 'inactive': return 'bg-red-100 text-red-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleView = (id:any)=>{
router.push(`/cars/${id}`)
    }

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

                {/* Status badge positioned at top left of the image */}
                <div className="absolute top-3 left-3 z-10">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium shadow-md ${getStatusColor(status)}`}>
                        <AlertCircle size={12} className="mr-1" />
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                </div>

                {/* Electric badge if applicable */}
                {isElectric && (
                    <div className="absolute top-12 left-3 z-10">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#3D1703] text-[#3D1703] shadow-md">
                            <Zap size={12} className="mr-1" />
                            Electric
                        </span>
                    </div>
                )}

                {/* Price tag positioned at bottom left of the image */}
                <div className="absolute bottom-0 left-0 bg-[#3D1703] text-white px-3 py-1 rounded-tr-md font-bold shadow-md z-10">
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
                        <span className="text-sm text-gray-600">{mileage.toLocaleString()} km</span>
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

                {/* Management actions */}
                <div className="flex justify-between">
                    <button
                        onClick={()=>{
                            handleView(id)
                        }}
                        className="flex justify-center items-center py-2 px-4 bg-[#3D1703] text-white rounded-md hover:bg-[#1f74fec4] transition-colors duration-300 font-medium flex-1 mr-2"
                    >
                        <Eye size={16} className="mr-1" />
                        View Listing
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex justify-center items-center py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300 font-medium flex-1 ml-2"
                    >
                        <Trash2 size={16} className="mr-1" />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarCardAdmin;