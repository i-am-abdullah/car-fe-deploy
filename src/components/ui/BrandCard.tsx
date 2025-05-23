'use client';
import React from 'react';
import Image from 'next/image';
import { RefreshCcw } from 'lucide-react';
import Link from 'next/link';

interface BrandCardProps {
  id: string;
  logo: string;
  name: string;
  count: number;
}

const BrandCard: React.FC<BrandCardProps> = ({
  id,
  logo,
  name,
  count
}) => {
  return (
    <Link href={`/brands/${id}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 cursor-pointer">
        <div className="flex items-center mb-4">
          {/* Brand Logo */}
          <div className="w-10 h-10 mr-3 relative flex-shrink-0">
            <Image
              src={logo}
              alt={`${name} logo`}
              fill
              className="object-contain"
            />
          </div>
          
          {/* Brand Info */}
          <div>
            <h3 className="font-bold text-gray-800">{name}</h3>
            <p className="text-gray-500 text-sm">
              ({count.toLocaleString()}) +
            </p>
          </div>
        </div>
        
        {/* Refresh Icon at Bottom */}
        <div className="flex justify-center">
          <div className="p-1.5 bg-green-100 rounded-full">
            <RefreshCcw size={16} className="text-green-500" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BrandCard;