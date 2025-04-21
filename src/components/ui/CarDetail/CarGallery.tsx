'use client';

import React, { useState } from 'react';
import { CarImage } from '@/types/car';
import "@/app/globals.css"

interface CarGalleryProps {
  images: CarImage[];
}

const CarGallery: React.FC<CarGalleryProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  
  const handlePrevious = (): void => {
    setCurrentImage(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const handleNext = (): void => {
    setCurrentImage(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  const handleThumbnailClick = (index: number): void => {
    setCurrentImage(index);
  };
  
  return (
    <div className="car-gallery">
      <div className="main-image-container">
        <button className="gallery-nav prev" onClick={handlePrevious}>
          &#10094;
        </button>
        <img 
          src={images[currentImage]?.url || '/placeholder-car.jpg'} 
          alt={`Car view ${currentImage + 1}`} 
          className="main-image"
        />
        <button className="gallery-nav next" onClick={handleNext}>
          &#10095;
        </button>
      </div>
      
      <div className="thumbnails-container">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`thumbnail ${index === currentImage ? 'active' : ''}`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img 
              src={image.thumbnail || image.url} 
              alt={`Thumbnail ${index + 1}`} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarGallery;