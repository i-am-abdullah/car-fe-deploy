// types/promotion.ts
import { Car } from './car';
import { User } from './user';

export type PromotionPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in days
  benefits: string[];
  featuredPosition: boolean;
  highlightListing: boolean;
};

export type PromotionStatus = 'active' | 'expired' | 'cancelled';

export interface Promotion {
  id: string;
  carId: string;
  car?: any; // For populated data
  userId: string;
  user?: User; // For populated data
  planId: string;
  planName: string;
  price:number;
  startDate: Date;
  endDate: Date;
  status: PromotionStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Sample promotion plans
export const PROMOTION_PLANS: PromotionPlan[] = [
  {
    id: 'basic',
    name: 'Basic Boost',
    description: 'Increase visibility of your listing for 7 days',
    price: 9.99,
    duration: 7,
    benefits: ['Higher search rank', 'Highlighted in search results'],
    featuredPosition: false,
    highlightListing: true
  },
  {
    id: 'premium',
    name: 'Premium Spotlight',
    description: 'Get maximum exposure for your listing for 14 days',
    price: 19.99,
    duration: 14,
    benefits: ['Top search results', 'Homepage feature', 'Special badge'],
    featuredPosition: true,
    highlightListing: true
  },
  {
    id: 'ultra',
    name: 'Ultra Visibility',
    description: 'Ultimate promotion package for 30 days of premium visibility',
    price: 39.99,
    duration: 30,
    benefits: ['Top search placement', 'Featured on homepage', 'Special badge', 'Social media promotion'],
    featuredPosition: true,
    highlightListing: true
  }
];