
import { Car, FAQ, Specification } from '@/types/car';
import { ALL_SPECIFICATIONS, ALL_ENGINE_PERFORMANCE } from '@/constants';

export function getInitialValues(initialData?: Car | null): any {
  const initialFAQs: FAQ[] = initialData?.faqs || [{ question: '', answer: '' }];
  
  const initialSpecifications: Specification[] = mergeSpecifications(
    ALL_SPECIFICATIONS,
    initialData?.specifications || []
  );
  
  const initialEnginePerformance: Specification[] = mergeSpecifications(
    ALL_ENGINE_PERFORMANCE,
    initialData?.enginePerformance || []
  );

  return {
    id: initialData?.id || '',
    price: initialData?.price || 0,
    model: initialData?.model || '',
    year: initialData?.year || new Date().getFullYear().toString(),
    location: initialData?.location || '',
    mileage: initialData?.mileage || 0,
    fuelType: initialData?.fuelType || '',
    transmission: initialData?.transmission || '',
    isElectric: initialData?.isElectric || false,
    make: initialData?.make || '',
    rating: initialData?.rating || 0,
    status: initialData?.status || 'pending',
    requestDate: initialData?.requestDate || new Date(),
    description: initialData?.description || '',
    keyFeatures: initialData?.keyFeatures || [],
    contactInfo: {
      dealerName: initialData?.contactInfo?.dealerName || '',
      phone: initialData?.contactInfo?.phone || '',
      email: initialData?.contactInfo?.email || '',
      address: initialData?.contactInfo?.address || '',
      hours: initialData?.contactInfo?.hours || '',
      sellerType: initialData?.contactInfo?.sellerType || 'dealer',
    },
    images: initialData?.images || [],
    specifications: initialSpecifications,
    enginePerformance: initialEnginePerformance,
    faqs: initialFAQs,
  };
}

function mergeSpecifications(allFields: Specification[], existingFields: Specification[]): Specification[] {
  const existingFieldMap = new Map<string, string>();
  existingFields.forEach(field => {
    existingFieldMap.set(field.label, field.value);
  });
  
  return allFields.map(field => ({
    label: field.label,
    value: existingFieldMap.has(field.label) ? existingFieldMap.get(field.label)! : ''
  }));
}

export function createCarData(values: any): Car {
  return {
    ...values,
    faqs: values.faqs.filter((faq: FAQ) => faq.question.trim() !== '' && faq.answer.trim() !== ''),
  };
}