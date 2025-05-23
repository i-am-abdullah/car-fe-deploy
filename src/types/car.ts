// types/car.ts

export interface Specification {
  label: string;
  value: string;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  profilePic?: string;
}

export interface Image {
  url: string;
  thumbnail?: string;
}

export interface CarImage {
  id: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface Feature {
  id: string;
  created_at: string;
  feature: {
    id: string;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  }
}

export interface CarData {
  id: string;
  status: string;
  meter_reading: number;
  price: string;
  color: string;
  location: string;
  listing_date: string;
  featured_until: string | null;
  created_at: string;
  updated_at: string;
  make: {
    id: string;
    name: string;
    image_url: string;
    created_at: string;
    updated_at: string;
  };
  model: {
    id: string;
    name: string;
    image_url: string;
    created_at: string;
    updated_at: string;
  };
  variant: {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
  year: {
    id: string;
    year: number;
    created_at: string;
    updated_at: string;
  };
  registrationCity: {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  };
  user: {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    profile_picture_url: string;
  };
  additionalDetail: {
    id: string;
    engine_type: string;
    engine_capacity: string;
    transmission: string;
    assembly: string;
    fuel_type: string;
    created_at: string;
    updated_at: string;
  };
  generalDetail: {
    id: string;
    description: string;
    reason_for_selling: string;
    ownership_status: string;
    accident_history: boolean;
    registration_year: number;
    registration_number: string;
    created_at: string;
    updated_at: string;
  };
  features: Feature[];
  images: CarImage[];
}

export interface FormattedCarData {
  formattedImages: Image[];
  featuresList: string[];
  specifications: Specification[];
  performanceSpecs: Specification[];
  contactInfo: ContactInfo;
}