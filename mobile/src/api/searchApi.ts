import { request } from './client';
import { Restaurant, Dish, Cuisine } from '../types/restaurant';

export interface SearchResponse {
  query: string;
  totalMatches: number;
  restaurants: Restaurant[];
  dishes: Dish[];
  recentSearches: string[];
  trending: Array<{ term: string; count: string; icon: string }>;
  cuisines: Cuisine[];
}

export const searchApi = {
  search: (params: {
    q?: string;
    dietary?: string;
    minRating?: number | string;
    maxDeliveryTime?: boolean | string;
    hasOffers?: boolean | string;
  }) => {
    const query = new URLSearchParams();
    if (params.q) query.append('q', params.q);
    if (params.dietary) query.append('dietary', params.dietary);
    if (params.minRating) query.append('minRating', String(params.minRating));
    if (params.maxDeliveryTime) query.append('maxDeliveryTime', 'true');
    if (params.hasOffers) query.append('hasOffers', 'true');
    const qs = query.toString() ? `?${query.toString()}` : '';
    return request<SearchResponse>(`/api/search${qs}`);
  },
};
