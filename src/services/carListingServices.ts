// services/carListingService.ts
import { get, post, patch, del } from '@/utils/api';
import { uploadFile } from '@/utils/fileUpload';

// Primary details API calls
export async function getCarMakes(): Promise<any[]> {
  return await get('/car/primary-details/make');
}

export async function getCarModelsByMakeId(makeId: string): Promise<any[]> {
  return await get(`/car/primary-details/make/${makeId}/model`);
}

export async function getCarYearsByMakeAndModelIds(makeId: string, modelId: string): Promise<any[]> {
  return await get(`/car/primary-details/make/${makeId}/model/${modelId}/year`);
}

export async function getCarVariantsByMakeModelAndYearIds(
  makeId: string,
  modelId: string,
  yearId: string
): Promise<any[]> {
  return await get(`/car/primary-details/make/${makeId}/models/${modelId}/years/${yearId}/variant`);
}

// Registration cities
export async function getRegistrationCities(): Promise<any[]> {
  return await get('/registration-cities');
}

// Features
export async function getFeatures(): Promise<any[]> {
  return await get('/features');
}

// Car listings
export async function createCarListing(data: any): Promise<any> {
  return await post('/user/car-listings', { data });
}

export async function updateCarListing(id: string, data: any): Promise<any> {
  return await patch(`/user/car-listings/${id}`, { data });
}

export async function deleteCarListing(id: string): Promise<any> {
  return await del(`/user/car-listings/${id}`);
}
export async function getCarListing(id: string): Promise<any> {
  return await get(`/user/car-listings/${id}`);
}

export async function getUserCarListings(): Promise<any[]> {
  return await get('/user/car-listings');
}

// Utility function to upload multiple images and return URLs
export async function uploadCarImages(files: File[]): Promise<string[]> {
  const uploadPromises = files.map(file => uploadFile(file));
  return await Promise.all(uploadPromises);
}