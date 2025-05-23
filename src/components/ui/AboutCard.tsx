import React from 'react';
import { CardProps } from '@/types/cards';


const AboutCard: React.FC<CardProps> = ({ icon: Icon, title, description }) => {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 transition duration-300 hover:shadow-xl p-6">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-700 mb-4">
            <Icon size={24} strokeWidth={2} />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
          <p className="text-gray-600 text-center leading-relaxed">{description}</p>
        </div>
      </div>
    );
  };

  export default AboutCard