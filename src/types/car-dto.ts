export interface CreateCarMakeDto {
  name: string;
}

export interface CreateCarModelDto {
  name: string;
  makeId: string;
}

export interface CreateCarYearDto {
  year: number;
  makeId: string;
  modelId: string;
}

export interface CreateCarVariantDto {
  name: string;
  description?: string;
  makeId: string;
  modelId: string;
  yearId: string;
}

export interface BulkCreateCarMakeDto {
  names: string[];
}

export interface BulkCreateCarModelDto {
  makeId: string;
  models: { name: string }[];
}

export interface BulkCreateCarYearDto {
  makeId: string;
  modelId: string;
  years: number[];
}

export interface BulkCreateCarVariantDto {
  makeId: string;
  modelId: string;
  yearId: string;
  variants: { name: string; description?: string }[];
}