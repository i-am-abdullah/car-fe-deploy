import { del, get, patch } from "@/utils/api";

export interface CarListingResponse {
  items: CarListing[];
  total: number;
  page: number;
  limit: number;
}

export interface CarListing {
  id: string;
  status: 'draft' | 'pending' | 'active' | 'sold' | 'inactive' | 'rejected';
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
    role: string;
    is_verified: boolean;
    last_login: string;
    created_at: string;
    updated_at: string;
  };
  features: any[];
  images: {
    id: string;
    image_url: string;
    created_at: string;
    updated_at: string;
  }[];
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
}
export async function getAdminCarListings(): Promise<any[]> {
  return await get('/admin/car-listings');
}

export async function deleteAdminCarListing(id: string): Promise<any> {
  return await del(`/admin/car-listings/${id}`);
}


export async function getAllCarListings(): Promise<CarListingResponse> {
  return await get<CarListingResponse>('/admin/car-listings');
}

export async function updateCarListingStatus(
  id: string, 
  status: 'active' | 'rejected'
): Promise<any> {
  return await patch(`/admin/car-listings/${id}/status`, {
    data: { status }
  });
}