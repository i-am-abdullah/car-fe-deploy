import { get, post, del} from '../utils/api';
import { CarMake, CarModel, CarYear, CarVariant } from '../types/car';

export const useCarApi = () => {
  // Makes
  const fetchMakes = () => get<CarMake[]>('/car/primary-details/make');
  const createMake = (data: { name: string }) => 
    post<CarMake>('/car/primary-details/make', { data });
  const bulkCreateMakes = (names: string[]) => 
    post<CarMake[]>('/car/primary-details/make/bulk', { data: { names } });
  const deleteMake = (id: string) => 
    del(`/car/primary-details/make/${id}`);

  // Models
  const fetchModels = () => get<CarModel[]>('/car/primary-details/model');
  const fetchModelsByMake = (makeId: string) => 
    get<CarModel[]>(`/car/primary-details/make/${makeId}/model`);
  const createModel = (data: { name: string; makeId: string }) => 
    post<CarModel>('/car/primary-details/model', { data });
  const bulkCreateModels = (makeId: string, models: { name: string }[]) => 
    post<CarModel[]>('/car/primary-details/model/bulk', { data: { makeId, models } });
  const deleteModel = (id: string) => 
    del(`/car/primary-details/model/${id}`);

  // Years
  const fetchYears = () => get<CarYear[]>('/car/primary-details/year');
  const fetchYearsByMakeAndModel = (makeId: string, modelId: string) => 
    get<CarYear[]>(`/car/primary-details/make/${makeId}/model/${modelId}/year`);
  const createYear = (data: { year: number; makeId: string; modelId: string }) => 
    post<CarYear>('/car/primary-details/year', { data });
  const bulkCreateYears = (makeId: string, modelId: string, years: number[]) => 
    post<CarYear[]>('/car/primary-details/year/bulk', { data: { makeId, modelId, years } });
  const deleteYear = (id: string) => 
    del(`/car/primary-details/year/${id}`);

  // Variants
  const fetchVariants = () => get<CarVariant[]>('/car/primary-details/variant');
  const fetchVariantsByMakeModelYear = (makeId: string, modelId: string, yearId: string) => 
    get<CarVariant[]>(`/car/primary-details/make/${makeId}/models/${modelId}/years/${yearId}/variant`);
  const createVariant = (data: { name: string; description?: string; makeId: string; modelId: string; yearId: string }) => 
    post<CarVariant>('/car/primary-details/variant', { data });
  const bulkCreateVariants = (makeId: string, modelId: string, yearId: string, variants: { name: string; description?: string }[]) => 
    post<CarVariant[]>('/car/primary-details/variant/bulk', { data: { makeId, modelId, yearId, variants } });
  const deleteVariant = (id: string) => 
    del(`/car/primary-details/variant/${id}`);

  return {
    // Makes
    fetchMakes,
    createMake,
    bulkCreateMakes,
    deleteMake,
    // Models
    fetchModels,
    fetchModelsByMake,
    createModel,
    bulkCreateModels,
    deleteModel,
    // Years
    fetchYears,
    fetchYearsByMakeAndModel,
    createYear,
    bulkCreateYears,
    deleteYear,
    // Variants
    fetchVariants,
    fetchVariantsByMakeModelYear,
    createVariant,
    bulkCreateVariants,
    deleteVariant,
  };
};
