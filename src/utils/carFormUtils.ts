// utils/carFormUtils.ts

// Define interfaces for better type safety
interface ImageObject {
  image_url: string;
}

interface FeatureObject {
  id: string;
}

interface AdditionalDetailInput {
  engine_type?: string;
  engine_capacity?: string;
  transmission?: string;
  assembly?: string;
  fuel_type?: string;
}

interface GeneralDetailInput {
  description?: string;
  reason_for_selling?: string;
  ownership_status?: string;
  accident_history?: boolean;
  registration_year?: number;
  registration_number?: string;
}

interface InitialDataInput {
  make?: { id: string };
  model?: { id: string };
  year?: { id: string };
  variant?: { id: string };
  registrationCity?: { id: string };
  make_id?: string;
  model_id?: string;
  year_id?: string;
  variant_id?: string;
  registration_city_id?: string;
  price?: string | number;
  meter_reading?: number;
  color?: string;
  location?: string;
  status?: string;
  features?: (FeatureObject | string)[];
  images?: (ImageObject | string)[];
  additionalDetail?: AdditionalDetailInput;
  generalDetail?: GeneralDetailInput;
}

export function getInitialValues(initialData?: InitialDataInput): any {
  if (!initialData) {
    return {
      make_id: '',
      model_id: '',
      year_id: '',
      variant_id: '',
      price: 0,
      meter_reading: 0,
      color: '',
      location: '',
      status: 'pending',
      registration_city_id: '',
      features: [],
      images: [],
    };
  }

  // Extract the correct IDs from nested objects
  const make_id = initialData.make?.id || initialData.make_id || '';
  const model_id = initialData.model?.id || initialData.model_id || '';
  const year_id = initialData.year?.id || initialData.year_id || '';
  const variant_id = initialData.variant?.id || initialData.variant_id || '';
  const registration_city_id = initialData.registrationCity?.id || initialData.registration_city_id || '';
  
  // Extract image URLs from image objects or use the array directly if it's already string[]
  let images: string[] = [];
  if (initialData.images) {
    if (Array.isArray(initialData.images)) {
      if (initialData.images.length > 0 && typeof initialData.images[0] === 'object' && (initialData.images[0] as ImageObject)?.image_url) {
        // If images are objects with image_url property
        images = (initialData.images as ImageObject[]).map((img: ImageObject) => img.image_url);
      } else if (initialData.images.length > 0 && typeof initialData.images[0] === 'string') {
        // If images are already strings
        images = initialData.images as string[];
      }
    }
  }

  // Extract features if they exist
  let features: string[] = [];
  if (initialData.features) {
    if (Array.isArray(initialData.features)) {
      if (initialData.features.length > 0 && typeof initialData.features[0] === 'object' && (initialData.features[0] as FeatureObject)?.id) {
        // If features are objects with id property
        features = (initialData.features as FeatureObject[]).map((feature: FeatureObject) => feature.id);
      } else if (initialData.features.length > 0 && typeof initialData.features[0] === 'string') {
        // If features are already strings (IDs)
        features = initialData.features as string[];
      }
    }
  }

  // Convert from API response format to form format
  return {
    make_id,
    model_id,
    year_id,
    variant_id,
    price: typeof initialData.price === 'string' ? parseFloat(initialData.price) : initialData.price || 0,
    meter_reading: initialData.meter_reading || 0,
    color: initialData.color || '',
    location: initialData.location || '',
    status: initialData.status || 'pending',
    registration_city_id,
    features,
    images,
    // Extract additional details if they exist
    engine_type: initialData.additionalDetail?.engine_type || '',
    engine_capacity: initialData.additionalDetail?.engine_capacity || '',
    transmission: initialData.additionalDetail?.transmission || '',
    assembly: initialData.additionalDetail?.assembly || '',
    fuel_type: initialData.additionalDetail?.fuel_type || '',
    // Extract general details if they exist
    description: initialData.generalDetail?.description || '',
    reason_for_selling: initialData.generalDetail?.reason_for_selling || '',
    ownership_status: initialData.generalDetail?.ownership_status || '',
    accident_history: initialData.generalDetail?.accident_history || false,
    registration_year: initialData.generalDetail?.registration_year || undefined,
    registration_number: initialData.generalDetail?.registration_number || '',
  };
}

export function createCarData(formValues: any): any {
  // Convert from form format to API format
  const carData: any = {
    make_id: formValues.make_id,
    model_id: formValues.model_id,
    year_id: formValues.year_id,
    variant_id: formValues.variant_id,
    price: formValues.price,
    meter_reading: formValues.meter_reading,
    color: formValues.color,
    location: formValues.location,
    status: formValues.status,
    registration_city_id: formValues.registration_city_id,
    features: formValues.features || [],
    images: formValues.images || [],
  };

  // Add additional details if any field is filled
  if (
    formValues.engine_type ||
    formValues.engine_capacity ||
    formValues.transmission ||
    formValues.assembly ||
    formValues.fuel_type
  ) {
    carData.additionalDetail = {
      engine_type: formValues.engine_type || '',
      engine_capacity: formValues.engine_capacity || '',
      transmission: formValues.transmission || '',
      assembly: formValues.assembly || '',
      fuel_type: formValues.fuel_type || '',
    } as any; // Using 'as any' since we don't have the full type with id, created_at, updated_at
  }

  // Add general details if any field is filled
  if (
    formValues.description ||
    formValues.reason_for_selling ||
    formValues.ownership_status ||
    formValues.accident_history !== undefined ||
    formValues.registration_year ||
    formValues.registration_number
  ) {
    carData.generalDetail = {
      description: formValues.description || '',
      reason_for_selling: formValues.reason_for_selling || '',
      ownership_status: formValues.ownership_status || '',
      accident_history: formValues.accident_history || false,
      registration_year: formValues.registration_year,
      registration_number: formValues.registration_number || '',
    } as any; // Using 'as any' since we don't have the full type with id, created_at, updated_at
  }

  return carData;
}