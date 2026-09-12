import { CartItem } from './cart';
import { Address } from './user';

export type OrderStage =
  | 'placed'
  | 'validated'
  | 'cooking'
  | 'ready'
  | 'delivering'
  | 'delivered';

export interface OrderHistoryStep {
  stage: OrderStage;
  label: string;
  description: string;
  at: string;
  timestamp: number;
}

export interface Rider {
  name: string;
  phone: string;
  rating: number;
  deliveries: string;
  vehicle: string;
  avatar: string;
  safetyTag: string;
  currentLocation?: {
    latitude: number;
    longitude: number;
    distanceAway: string;
  };
}

export interface Order {
  id: number;
  orderNumber: string;
  userId: string;
  restaurantId: number;
  restaurantName: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  total: number;
  coupon?: string | null;
  stage: OrderStage;
  history: OrderHistoryStep[];
  eta: string;
  estimatedArrival: string;
  rider: Rider;
  deliveryAddress: Address;
  paymentMethod: string;
  createdAt: string;
}

export interface TrackingData {
  orderId: number;
  orderNumber: string;
  stage: OrderStage;
  history: OrderHistoryStep[];
  eta: string;
  estimatedArrival: string;
  rider: Rider;
  deliveryAddress: Address;
  items: CartItem[];
  total: number;
}
