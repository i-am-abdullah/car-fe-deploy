'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchCarById,formatCarForDisplay } from '@/services/CarDetailServices';
import { CarData } from '@/types/car';
import CarGallery from '@/components/ui/CarDetail/CarGallery';
import CarHeader from '@/components/ui/CarDetail/CarHeader';
import CarDescription from '@/components/ui/CarDetail/CarDescription';
import KeyFeatures from '@/components/ui/CarDetail/KeyFeatures';
import OverviewTable from '@/components/ui/CarDetail/Overview';
import EnginePerformance from '@/components/ui/CarDetail/EnginePerformance';
import Sidebar from '@/components/layout/Sidebar';
import "@/app/globals.css";
import Header from '../layout/Header';
import { getAccessToken } from '@/utils/tokenUtils';
import chatService from '@/services/ChatService';

export default function CarDetailsPage() {
  const params = useParams();
  const [carData, setCarData] = useState<CarData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formattedData, setFormattedData] = useState<any>(null);
  let isUserListing;
  useEffect(() => {
    const loadCarDetails = async () => {
      try {
        setLoading(true);
        const carId = params.id as string;
        const data = await fetchCarById(carId);
        setCarData(data);
        setFormattedData(formatCarForDisplay(data));
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to load car details');
        console.error('Error fetching car details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadCarDetails();
    }
  }, [params.id]);
  const token = getAccessToken()
  const userId = chatService.getCurrentUserId()
 if(token){
  isUserListing = carData?.user.id === userId ? true : false
 }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !carData || !formattedData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Car Details</h2>
          <p className="text-gray-700">{error || 'Car data not found'}</p>
        </div>
      </div>
    );
  }
  
  
  const { formattedImages, featuresList, specifications, performanceSpecs, contactInfo } = formattedData;
  return (<>
        <Header title={`${carData.make.name} ${carData.model.name} ${carData.year.year.toString()} ${carData.variant.name}`}/>
    <div className="car-listing-container mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="car-listing-main lg:col-span-3">
        <CarGallery images={formattedImages} />
        <CarHeader 
          make={carData.make.name} 
          model={carData.model.name} 
          year={carData.year.year.toString()} 
          price={parseFloat(carData.price)}
          phone = {contactInfo.phone}
          listingId={carData.id}
          isUserListing={isUserListing}
        />
        
        <div className="car-details-section mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="section-title text-2xl font-semibold text-gray-800 mb-4">Car Details</h2>
          <CarDescription description={carData.generalDetail.description} />
          
          <h3 className="subsection-title text-xl font-medium text-gray-700 mt-6 mb-3">Key Features</h3>
          <KeyFeatures features={featuresList} />
          
          <h3 className="subsection-title text-xl font-medium text-gray-700 mt-6 mb-3">Overview</h3>
          <OverviewTable specifications={specifications} />
          
          <h3 className="subsection-title text-xl font-medium text-gray-700 mt-6 mb-3">Engine & Performance</h3>
          <EnginePerformance performance={performanceSpecs} price={parseFloat(carData.price)} />
          
          <div className="mt-6">
            <h3 className="subsection-title text-xl font-medium text-gray-700 mb-3">Reason for Selling</h3>
            <p className="text-gray-600">{carData.generalDetail.reason_for_selling}</p>
          </div>
        </div>
      </div>
      
      {/* <div className="lg:col-span-1">
        <Sidebar contactInfo={contactInfo} />
      </div> */}
    </div>
    </>
  );
}