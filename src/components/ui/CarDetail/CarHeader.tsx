'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, MessageCircle, Heart } from 'lucide-react';
import chatService from '@/services/ChatService';
import toast from 'react-hot-toast';

interface CarHeaderProps {
  make: string;
  model: string;
  year: string;
  price: number;
  phone: string;
  listingId: string;
  isUserListing?: boolean;
}

const CarHeader: React.FC<CarHeaderProps> = ({ make, model, year, price, phone, listingId, isUserListing }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChatWithSeller = async () => {
    try {
      setLoading(true);
      const response = await chatService.createConversation(listingId);
      setLoading(false);
      
      router.push(`/dashboard/conversations/${response.id}`);
    } catch (error) {
      setLoading(false);
      toast.error('Failed to start conversation. Please try again.');
      console.error('Error starting conversation:', error);
    }
  };

  return (
    <div className="car-header bg-white rounded-lg shadow p-4 my-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Price display */}
        <div className="price-container mb-4 md:mb-0">
          <span className="font-semibold text-4xl text-[#3D1703]">${price.toLocaleString()}</span>
          <h1 className="text-xl font-bold text-gray-800 mt-2">{make} {model} {year}</h1>
        </div>

        {/* Contact buttons */}
        <div className="action-buttons flex flex-wrap gap-3">
          <a 
            href={`tel:${phone}`} 
            className="btn flex items-center gap-2 px-5 py-2 bg-[#3D1703] text-white rounded-md hover:bg-[#3D1703] transition-colors"
          >
            <Phone size={18} />
            <span>Call Seller</span>
          </a>
          
          <button 
            className={`btn flex items-center gap-2 px-5 py-2 border border-[#3D1703] text-[#3D1703] bg-white rounded-md hover:bg-gray-50 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}     disabled:bg-gray-300
    disabled:border-gray-300
    disabled:text-gray-500
    disabled:cursor-not-allowed
    disabled:opacity-70`}
            onClick={handleChatWithSeller}
            disabled={loading || isUserListing}
          >
            <MessageCircle size={18} />
            <span>{loading ? 'Starting Chat...' : 'Chat with Seller'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarHeader;