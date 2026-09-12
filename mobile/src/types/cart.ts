import { DietaryType, Restaurant } from './restaurant';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  dietaryType: DietaryType;
  subtotal: number;
  image?: string;
  tag?: string;
}

export interface Coupon {
  code: string;
  description: string;
}

export interface Cart {
  restaurant: Restaurant;
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  grandTotal: number;
  coupon: string | null;
  availableCoupons: Coupon[];
}
