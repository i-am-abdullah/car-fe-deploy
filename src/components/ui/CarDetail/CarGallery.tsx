'use client';

import React, { useState } from 'react';
import "@/app/globals.css"

interface Image {
  url: string;
  thumbnail?: string;
}

interface CarGalleryProps {
  images: Image[];
}

const CarGallery: React.FC<CarGalleryProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  
  // If no images are provided, use a placeholder
  const hasImages = images && images.length > 0;
  
  const handlePrevious = (): void => {
    if (!hasImages) return;
    setCurrentImage(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const handleNext = (): void => {
    if (!hasImages) return;
    setCurrentImage(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  const handleThumbnailClick = (index: number): void => {
    setCurrentImage(index);
  };
  
  return (
    <div className="car-gallery bg-white rounded-lg shadow overflow-hidden">
      <div className="main-image-container relative h-96">
        {hasImages ? (
          <>
            <button 
              className="gallery-nav prev absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors" 
              onClick={handlePrevious}
            >
              &#10094;
            </button>
            <img 
              src={images[currentImage]?.url} 
              alt={`${currentImage + 1} of ${images.length}`} 
              className="main-image w-full h-full object-cover"
            />
            <button 
              className="gallery-nav next absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors" 
              onClick={handleNext}
            >
              &#10095;
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <span className="text-gray-400">No images available</span>
          </div>
        )}
      </div>
      
      {hasImages && images.length > 1 && (
        <div className="thumbnails-container flex gap-2 p-3 overflow-x-auto">
          {images.map((image, index) => (
            <div 
              key={index}
              className={`thumbnail cursor-pointer flex-shrink-0 w-20 h-20 border-2 rounded overflow-hidden ${index === currentImage ? 'border-[#3D1703]' : 'border-transparent'}`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img 
                src={image.thumbnail || image.url} 
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover" 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarGallery;