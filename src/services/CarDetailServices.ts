// services/carService.ts
import { get } from '@/utils/api';
import { CarData, FormattedCarData } from '@/types/car';

export const fetchCarById = async (id: string): Promise<CarData> => {
  return await get<CarData>(`/public/car-listings/${id}`,{
    withAuth: false
  });
};

export const formatCarForDisplay = (carData: CarData): FormattedCarData => {
  // Format the data for components
  const formattedImages = carData.images.map(img => ({
    url: img.image_url,
    thumbnail: img.image_url
  }));

  const featuresList = carData.features.map(feat => feat.feature.name);

  // Create specifications for the Overview table
  const specifications = [
    { label: 'Make', value: carData.make.name },
    { label: 'Model', value: carData.model.name },
    { label: 'Variant', value: carData.variant.name },
    { label: 'Year', value: carData.year.year.toString() },
    { label: 'Color', value: carData.color },
    { label: 'Mileage', value: `${carData.meter_reading} km` },
    { label: 'Location', value: carData.location },
    { label: 'Registration City', value: carData.registrationCity.name },
    { label: 'Registration Year', value: carData.generalDetail.registration_year.toString() },
    { label: 'Registration Number', value: carData.generalDetail.registration_number },
    { label: 'Ownership', value: carData.generalDetail.ownership_status },
    { label: 'Accident History', value: carData.generalDetail.accident_history ? 'Yes' : 'No' }
  ];

  // Engine performance specifications
  const performanceSpecs = [
    { label: 'Engine Type', value: carData.additionalDetail.engine_type },
    { label: 'Engine Capacity', value: carData.additionalDetail.engine_capacity },
    { label: 'Transmission', value: carData.additionalDetail.transmission },
    { label: 'Assembly', value: carData.additionalDetail.assembly },
    { label: 'Fuel Type', value: carData.additionalDetail.fuel_type }
  ];

  // Contact info for sidebar
  const contactInfo = {
    name: `${carData.user.first_name} ${carData.user.last_name}`,
    email: carData.user.email,
    phone: carData.user.phone_number,
    profilePic: carData.user.profile_picture_url
  };

  return {
    formattedImages,
    featuresList,
    specifications,
    performanceSpecs,
    contactInfo
  };
};