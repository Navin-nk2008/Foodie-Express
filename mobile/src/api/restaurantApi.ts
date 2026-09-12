import { request } from './client';
import { Restaurant, Dish, Cuisine } from '../types/restaurant';

export const restaurantApi = {
  list: (params: { cuisine?: string; isPopular?: boolean; isFeatured?: boolean } = {}) => {
    const query = new URLSearchParams();
    if (params.cuisine) query.append('cuisine', params.cuisine);
    if (params.isPopular) query.append('isPopular', 'true');
    if (params.isFeatured) query.append('isFeatured', 'true');
    const qs = query.toString() ? `?${query.toString()}` : '';
    return request<{ restaurants: Restaurant[] }>(`/api/restaurants${qs}`);
  },

  get: (id: number) =>
    request<{ restaurant: Restaurant }>(`/api/restaurants/${id}`),

  getMenu: (id: number, params: { category?: string; dietary?: string } = {}) => {
    const query = new URLSearchParams();
    if (params.category) query.append('category', params.category);
    if (params.dietary) query.append('dietary', params.dietary);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return request<{ menu: Dish[] }>(`/api/restaurants/${id}/menu${qs}`);
  },

  getCuisines: () =>
    request<{ cuisines: Cuisine[] }>('/api/cuisines'),
};
