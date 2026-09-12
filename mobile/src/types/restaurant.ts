export type DietaryType = 'veg' | 'non-veg';

export interface Dish {
  id: number;
  restaurantId: number;
  name: string;
  price: number;
  category: string;
  dietaryType: DietaryType;
  tag?: string;
  description: string;
  image: string;
  rating: number;
  reviews?: number;
  restaurantName?: string;
  deliveryTime?: string;
  distance?: string;
}

export interface Restaurant {
  id: number;
  name: string;
  image: string;
  coverImage?: string;
  rating: number;
  reviewCount: string;
  cuisines: string[];
  deliveryTime: string;
  distance: string;
  priceForTwo: number;
  isFeatured?: boolean;
  isPopular?: boolean;
  isFavorite?: boolean;
  offer?: string;
  discountCode?: string;
  tags?: string[];
  trustBadge?: string;
}

export interface Cuisine {
  id: string;
  name: string;
  icon: string;
  emoji: string;
  subtitle: string;
  image: string;
}
