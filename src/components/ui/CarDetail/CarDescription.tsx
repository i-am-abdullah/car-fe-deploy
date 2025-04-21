'use client';
import React, { useState } from 'react';
import "@/app/globals.css"

interface CarDescriptionProps {
  description: string;
}

const CarDescription: React.FC<CarDescriptionProps> = ({ description }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  
  const isLongDescription = description.length > 300;
  const displayText = isLongDescription && !expanded 
    ? `${description.substring(0, 300)}...` 
    : description;
    
  return (
    <div className="car-description">
      <p>{displayText}</p>
      
      {isLongDescription && (
        <button 
          className="read-more-btn"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

export default CarDescription;