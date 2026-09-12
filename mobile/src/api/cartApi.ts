import { request } from './client';
import { Cart } from '../types/cart';

export const cartApi = {
  get: () => request<{ cart: Cart }>('/api/cart'),

  addItem: (id: number, qty: number = 1, restaurantId?: number) =>
    request<{ cart: Cart }>('/api/cart/items', {
      method: 'POST',
      body: JSON.stringify({ id, qty, restaurantId }),
    }),

  updateItem: (itemId: number, qty: number) =>
    request<{ cart: Cart }>(`/api/cart/items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify({ qty }),
    }),

  removeItem: (itemId: number) =>
    request<{ cart: Cart }>(`/api/cart/items/${itemId}`, {
      method: 'DELETE',
    }),

  applyCoupon: (code: string) =>
    request<{ cart: Cart }>('/api/cart/coupon', {
      method: 'POST',
      body: JSON.stringify({ code }),
    }),

  clear: () =>
    request<{ cart: Cart }>('/api/cart', {
      method: 'DELETE',
    }),
};
