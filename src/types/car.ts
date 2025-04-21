export interface CarImage {
    url: string;
    thumbnail: string;
  }
  
  export interface Specification {
    label: string;
    value: string;
  }
  export interface FAQ {
    question: string;
    answer: string;
  }
  export interface ContactInfo {
    dealerName: string;
    phone: string;
    email: string;
    address: string;
    hours: string;
    sellerType: 'dealer' | 'individual';
  }
  export interface Car {
    id: string;
    price: number;
    location: string;
    model: string;
    year: string;
    mileage: number;
    fuelType: string;
    transmission: string;
    isElectric: boolean;
    status:string;
    requestDate: Date;
    make: string;
    rating: number;
    images: CarImage[];
    description: string;
    keyFeatures: string[];
    specifications: Specification[];
    enginePerformance: Specification[];
    faqs: FAQ[];
    contactInfo: ContactInfo;
  }
  