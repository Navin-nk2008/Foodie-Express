import { request } from './client';
import { Order, TrackingData } from '../types/order';

export interface PlaceOrderPayload {
  restaurantId: number;
  items: Array<{ id: number; qty: number }>;
  deliveryAddress?: any;
  paymentMethod?: string;
  coupon?: string | null;
}

export const orderApi = {
  placeOrder: (payload: PlaceOrderPayload) =>
    request<{ order: Order }>('/api/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  list: () => request<{ orders: Order[] }>('/api/orders'),

  get: (id: number) => request<{ order: Order }>(`/api/orders/${id}`),

  getTracking: (id: number) => request<TrackingData>(`/api/orders/${id}/tracking`),
};
