const carMockData: any[] = [{
    id: "1",
    price: 119850,
    model: "M5",
    year: "2023",
    location: "Beverly Hills, CA",
    mileage: 3425,
    fuelType: "Premium Gasoline",
    transmission: "8-Speed Automatic",
    isElectric: false,
    status:"Approved",
    requestDate: new Date(2025, 2, 9),
    make: "BMW",
    rating: 4.8,
    images: [
      { url: "/car.png", thumbnail: "/car.png" },
      { url: "/car.png", thumbnail: "/car.png" },
      { url: "/car.png", thumbnail: "/car.png" },
      { url: "/car.png", thumbnail: "/car.png" },
      { url: "/car.png", thumbnail: "/car.png" },
    ],
    description:
      "Experience unmatched driving performance with the 2023 BMW M5. This luxury sedan combines elegant design with raw power. Featuring the latest M TwinPower Turbo technology, the M5 delivers exhilarating performance with precise handling. The interior boasts premium materials, cutting-edge technology, and exceptional comfort for both driver and passengers. With its distinctive styling and advanced safety features, the BMW M5 represents the perfect blend of luxury and high-performance engineering.",
    keyFeatures: [
      "4.4L V8 Engine",
      "617 Horsepower",
      "All-Wheel Drive",
      "8-Speed Automatic",
      "Premium Sound System",
      "Leather Interior",
      "Heated/Ventilated Seats",
      "Heads-Up Display",
      "Lane Departure Warning",
    ],
    specifications: [
      { label: "Make", value: "BMW" },
      { label: "Model", value: "M5" },
      { label: "Year", value: "2023" },
      { label: "Body Type", value: "Sedan" },
      { label: "Exterior Color", value: "Marina Bay Blue" },
      { label: "Interior Color", value: "Black" },
      { label: "Doors", value: "4" },
      { label: "Seats", value: "5" },
      { label: "VIN", value: "WBS83CD09MCF12345" },
      { label: "Fuel Type", value: "Premium Gasoline" },
      { label: "Transmission", value: "8-Speed Automatic" },
      { label: "Drive Type", value: "All-Wheel Drive" },
      { label: "Mileage", value: "3,425 miles" },
      { label: "Fuel Efficiency", value: "15 City / 21 Hwy" },
      { label: "Car Condition", value: "Excellent" },
    ],
    enginePerformance: [
      { label: "Engine Type", value: "4.4L Twin-Turbo V8" },
      { label: "Horsepower", value: "617 hp @ 6,000 rpm" },
      { label: "Torque", value: "553 lb-ft @ 1,800 rpm" },
      { label: "0-60 mph", value: "3.2 seconds" },
      { label: "Top Speed", value: "189 mph (limited)" },
      { label: "Transmission", value: "8-Speed Automatic" },
      { label: "Drive Type", value: "All-Wheel Drive" },
      { label: "Fuel System", value: "Direct Injection" },
      { label: "Engine Location", value: "Front" },
    ],
    faqs: [
      {
        question: "What warranty comes with this BMW M5?",
        answer:
          "This BMW M5 comes with BMW's standard 4-year/50,000-mile New Vehicle Limited Warranty, plus a 4-year/unlimited-mileage Roadside Assistance Program. Additionally, it includes a 12-year/unlimited-mileage Rust Perforation Limited Warranty and a 4-year/50,000-mile Federal Emissions Warranty.",
      },
      {
        question: "Is there an extended warranty available?",
        answer:
          "Yes, BMW offers an Extended Service Contract that can be purchased to cover your vehicle after the standard warranty expires. There are several coverage levels available with terms up to 7 years or 100,000 miles from the original in-service date.",
      },
      {
        question: "What does the maintenance schedule look like for the M5?",
        answer:
          "The BMW M5 uses condition-based servicing, which means the vehicle will alert you when service is needed based on actual driving conditions rather than a fixed schedule. However, typical service intervals include oil changes every 10,000 miles or 12 months, brake fluid every 2 years, and more comprehensive inspections at 30,000 and 60,000 miles.",
      },
      {
        question: "Are there any dealer incentives currently available?",
        answer:
          "We currently offer competitive financing rates starting at 2.9% APR for qualified buyers, as well as special lease terms. Additionally, we have a loyalty program that offers additional benefits for current BMW owners looking to upgrade their vehicle.",
      },
    ],
    contactInfo: {
      dealerName: "Premium Auto Group",
      phone: "(555) 123-4567",
      email: "sales@premiumautogroup.com",
      address: "123 Luxury Lane, Beverly Hills, CA 90210",
      hours: "Mon-Sat: 9AM-8PM, Sun: 10AM-6PM",
      sellerType: "dealer",
    },
  }];
  export const KEY_FEATURES_OPTIONS = [
    { value: '4.4L V8 Engine', label: '4.4L V8 Engine' },
    { value: '617 Horsepower', label: '617 Horsepower' },
    { value: 'All-Wheel Drive', label: 'All-Wheel Drive' },
    { value: '8-Speed Automatic', label: '8-Speed Automatic' },
    { value: 'Premium Sound System', label: 'Premium Sound System' },
    { value: 'Leather Interior', label: 'Leather Interior' },
    { value: 'Heated/Ventilated Seats', label: 'Heated/Ventilated Seats' },
    { value: 'Heads-Up Display', label: 'Heads-Up Display' },
    { value: 'Lane Departure Warning', label: 'Lane Departure Warning' },
    { value: 'Blind Spot Monitoring', label: 'Blind Spot Monitoring' },
    { value: 'Adaptive Cruise Control', label: 'Adaptive Cruise Control' },
    { value: 'Parking Sensors', label: 'Parking Sensors' },
  ];

  export const ALL_SPECIFICATIONS = [
    { label: 'Make', value: '' },
    { label: 'Model', value: '' },
    { label: 'Year', value: '' },
    { label: 'Body Type', value: '' },
    { label: 'Exterior Color', value: '' },
    { label: 'Interior Color', value: '' },
    { label: 'Doors', value: '' },
    { label: 'Seats', value: '' },
    { label: 'VIN', value: '' },
    { label: 'Fuel Type', value: '' },
    { label: 'Transmission', value: '' },
    { label: 'Drive Type', value: '' },
    { label: 'Mileage', value: '' },
    { label: 'Fuel Efficiency', value: '' },
    { label: 'Car Condition', value: '' },
  ];
  
  export const ALL_ENGINE_PERFORMANCE = [
    { label: 'Engine Type', value: '' },
    { label: 'Horsepower', value: '' },
    { label: 'Torque', value: '' },
    { label: '0-60 mph', value: '' },
    { label: 'Top Speed', value: '' },
    { label: 'Transmission', value: '' },
    { label: 'Drive Type', value: '' },
    { label: 'Fuel System', value: '' },
    { label: 'Engine Location', value: '' },
  ];
  
  export const FUEL_TYPES = [
    { value: 'Regular Gasoline', label: 'Regular Gasoline' },
    { value: 'Premium Gasoline', label: 'Premium Gasoline' },
    { value: 'Diesel', label: 'Diesel' },
    { value: 'Electric', label: 'Electric' },
    { value: 'Hybrid', label: 'Hybrid' },
    { value: 'Plug-in Hybrid', label: 'Plug-in Hybrid' },
  ];
  
  export const TRANSMISSION_TYPES = [
    { value: 'Manual', label: 'Manual' },
    { value: '5-Speed Manual', label: '5-Speed Manual' },
    { value: '6-Speed Manual', label: '6-Speed Manual' },
    { value: 'Automatic', label: 'Automatic' },
    { value: '8-Speed Automatic', label: '8-Speed Automatic' },
    { value: '9-Speed Automatic', label: '9-Speed Automatic' },
    { value: 'CVT', label: 'CVT' },
    { value: 'Dual-Clutch', label: 'Dual-Clutch' },
  ];
  
  export const STATUS_OPTIONS = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
  ];
  
  export const SELLER_TYPES = [
    { value: 'dealer', label: 'Dealer' },
    { value: 'private', label: 'Private Seller' },
    { value: 'other', label: 'Other' },
  ];
  
  // mock/promotionData.ts
import { Promotion } from '../types/promotion';

// Helper to add days to a date
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const mockUserCars = [
  {
    id: 'car1',
    title: '2019 Toyota Camry',
    make: 'Toyota',
    model: 'Camry',
    year: 2019,
    price: 22000,
    imageUrl: '/images/camry.jpg',
  },
  {
    id: 'car2',
    title: '2020 Honda Civic',
    make: 'Honda',
    model: 'Civic',
    year: 2020,
    price: 18500,
    imageUrl: '/images/civic.jpg',
  },
  {
    id: 'car3',
    title: '2021 Ford Mustang',
    make: 'Ford',
    model: 'Mustang',
    year: 2021,
    price: 35000,
    imageUrl: '/images/mustang.jpg',
  },
];

export const mockPromotions: Promotion[] = [
  {
    id: 'promo1',
    carId: 'car1',
    car: mockUserCars[0],
    userId: 'user1',
    user: {
      id: 'user1',
      name: 'John Doe',
      email: 'john@example.com',
    },
    planId: 'premium',
    planName: 'Premium Spotlight',
    price:20,
    startDate: new Date('2025-03-05'),
    endDate: addDays(new Date('2025-03-05'), 14),
    status: 'active',
    createdAt: new Date('2025-03-05'),
    updatedAt: new Date('2025-03-05'),
  },
  {
    id: 'promo2',
    carId: 'car2',
    car: mockUserCars[1],
    userId: 'user1',
    user: {
      id: 'user1',
      name: 'John Doe',
      email: 'john@example.com',
    },
    planId: 'basic',
    planName: 'Basic Boost',
    price:20,
    startDate: new Date('2025-02-20'),
    endDate: addDays(new Date('2025-02-20'), 7),
    status: 'expired',
    createdAt: new Date('2025-02-20'),
    updatedAt: new Date('2025-02-20'),
  },
];

export const mockAdminPromotions: Promotion[] = [
  ...mockPromotions,
  {
    id: 'promo3',
    carId: 'car4',
    car: {
      id: 'car4',
      title: '2022 Tesla Model 3',
      make: 'Tesla',
      model: 'Model 3',
      year: 2022,
      price: 48000,
      imageUrl: '/images/tesla.jpg',
    },
    userId: 'user2',
    user: {
      id: 'user2',
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
    planId: 'ultra',
    planName: 'Ultra Visibility',
    price:300,
    startDate: new Date('2025-03-01'),
    endDate: addDays(new Date('2025-03-01'), 30),
    status: 'active',
    createdAt: new Date('2025-03-01'),
    updatedAt: new Date('2025-03-01'),
  },
];
  
  export default carMockData

  /**
 * API base URL - Change this to your API endpoint
 */
export const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Local storage key for access token
 */
export const tokenKey = 'admin_access_token';

/**
 * Local storage key for refresh token
 */
export const refreshTokenKey = 'admin_refresh_token';

/**
 * Authentication-related routes
 */
export const AUTH_ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
};

/**
 * Protected routes that require authentication
 */
export const PROTECTED_ROUTES = [
  '/dashboard',
  '/profile',
  '/settings',
  '/users',
  // Add more protected routes here
];

/**
 * Public routes that don't require authentication
 */
export const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  // Add more public routes here
];
