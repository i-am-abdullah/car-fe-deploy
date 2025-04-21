import React from 'react';
import CarGallery from '@/components/ui/CarDetail/CarGallery';
import CarHeader from '@/components/ui/CarDetail/CarHeader';
import CarDescription from '@/components/ui/CarDetail/CarDescription';
import KeyFeatures from '@/components/ui/CarDetail/KeyFeatures';
import OverviewTable from '@/components/ui/CarDetail/Overview';
import EnginePerformance from '@/components/ui/CarDetail/EnginePerformance';
import Sidebar from '@/components/layout/Sidebar';
import FaqSection from '@/components/ui/Faq';
import "@/app/globals.css"
import { Car } from '@/types/car';

interface CarListingPageProps {
    carData: Car;
  }
  
  const CarDetailsPage: React.FC<CarListingPageProps> = ({ carData }) => {
    return (
      <div className="car-listing-container">
        <div className="car-listing-main">
          <CarGallery images={carData.images} />
          <CarHeader 
            make={carData.make} 
            model={carData.model} 
            year={carData.year} 
            rating={carData.rating} 
            price={carData.price}
          />
          
          <div className="car-details-section">
            <h2 className="section-title">Car Details</h2>
            <CarDescription description={carData.description} />
            
            <h3 className="subsection-title">Key Features</h3>
            <KeyFeatures features={carData.keyFeatures} />
            
            <h3 className="subsection-title">Overview</h3>
            <OverviewTable specifications={carData.specifications} />
            
            <h3 className="subsection-title">Engine Performance</h3>
            <EnginePerformance performance={carData.enginePerformance} price={carData.price} />
            
            <h3 className="subsection-title">FAQs</h3>
            <FaqSection faqs={carData.faqs} />
          </div>
        </div>
        
        <Sidebar 
          contactInfo={carData.contactInfo} 
        />
      </div>
    );
  };
  
  export default CarDetailsPage;