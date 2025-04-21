'use client';

import React from 'react';
import "@/app/globals.css"
import { Heart } from 'lucide-react';

interface CarHeaderProps {
  make: string;
  model: string;
  year: string;
  rating: number;
  price:number
}

interface StarRatingProps {
  value: number;
}

const StarRating: React.FC<StarRatingProps> = ({ value }) => {
  const stars = [];
  const fullStars = Math.floor(value);
  const hasHalfStar = value - fullStars >= 0.5;
  
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<span key={i} className="star full">★</span>);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<span key={i} className="star half">★</span>);
    } else {
      stars.push(<span key={i} className="star empty">☆</span>);
    }
  }
  
  return <div className="star-rating">{stars}</div>;
};

const CarHeader: React.FC<CarHeaderProps> = ({ make, model, year, rating, price }) => {
  return (
    <div className="car-header">
      <div className="car-title">
        <h1>{`${make} ${model}`}</h1>
        <p className="car-year">{year}</p>
      </div>
      
      <div className="car-rating">
        <StarRating value={rating} />
        <span className="rating-value">{rating}/5</span>
        <span className="review-count">(42 Reviews)</span>
      </div>
      {price && (
  <div className="flex items-center gap-2 text-left">
    {/* <span className="font-medium text-gray-700">Price:</span> */}
    <span className=" font-semibold text-3xl text-[#1F75FE]">${price.toLocaleString()}</span>
  </div>
)}

      <div className="action-buttons">
        <button className="btn btn-primary">Book Now</button>
        <button className="btn btn-outline flex justify-center gap-1.5 text-right">
          <Heart size={19}/> Save
        </button>
      </div>
    </div>
  );
};

export default CarHeader;