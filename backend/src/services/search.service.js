const restaurants = require('../data/restaurants');
const menu = require('../data/menu');
const cuisines = require('../data/cuisines');

const TRENDING_SEARCHES = [
  { term: 'Smash Burgers', count: '3.4k+ searches', icon: 'trending_up' },
  { term: 'Dumplings & Dim Sum', count: '2.1k+ searches', icon: 'restaurant' },
  { term: 'Acai Bowls', count: '1.8k+ searches', icon: 'nutrition' },
  { term: 'Loaded Fries', count: '1.5k+ searches', icon: 'fastfood' },
];

const RECENT_SEARCHES = [
  'Butter Chicken',
  'Sourdough Pizza',
  'Boba Tea',
  'Cheeseburger',
];

function search({ q = '', dietary, minRating, maxDeliveryTime, hasOffers }) {
  const query = (q || '').trim().toLowerCase();

  // Search matching restaurants
  let matchedRestaurants = restaurants.filter((r) => {
    if (!query) return true;
    const matchName = r.name.toLowerCase().includes(query);
    const matchCuisine = r.cuisines.some((c) => c.toLowerCase().includes(query));
    return matchName || matchCuisine;
  });

  // Search matching dishes
  let matchedDishes = menu.filter((item) => {
    if (!query) return true;
    const matchName = item.name.toLowerCase().includes(query);
    const matchDesc = (item.description || '').toLowerCase().includes(query);
    const matchCat = (item.category || '').toLowerCase().includes(query);
    return matchName || matchDesc || matchCat;
  });

  // Apply filter: dietary (veg / non-veg)
  if (dietary && dietary !== 'all') {
    matchedDishes = matchedDishes.filter((d) => d.dietaryType.toLowerCase() === dietary.toLowerCase());
  }

  // Apply filter: rating 4.0+
  if (minRating) {
    const min = parseFloat(minRating);
    matchedRestaurants = matchedRestaurants.filter((r) => r.rating >= min);
    matchedDishes = matchedDishes.filter((d) => d.rating >= min);
  }

  // Apply filter: under 30 mins
  if (maxDeliveryTime === 'true' || maxDeliveryTime === true || maxDeliveryTime === '30') {
    matchedRestaurants = matchedRestaurants.filter((r) => {
      const match = r.deliveryTime.match(/(\d+)/);
      return match ? parseInt(match[1], 10) <= 30 : true;
    });
  }

  // Apply filter: has offers
  if (hasOffers === 'true' || hasOffers === true) {
    matchedRestaurants = matchedRestaurants.filter((r) => !!r.offer);
  }

  // Enrich dishes with restaurant info
  const enrichedDishes = matchedDishes.map((dish) => {
    const rest = restaurants.find((r) => r.id === dish.restaurantId);
    return {
      ...dish,
      restaurantName: rest ? rest.name : 'Foodie Partner',
      deliveryTime: rest ? rest.deliveryTime : '25 mins',
      distance: rest ? rest.distance : '1.5 km',
    };
  });

  return {
    query,
    totalMatches: matchedRestaurants.length + enrichedDishes.length,
    restaurants: matchedRestaurants,
    dishes: enrichedDishes,
    recentSearches: RECENT_SEARCHES,
    trending: TRENDING_SEARCHES,
    cuisines,
  };
}

module.exports = {
  search,
  TRENDING_SEARCHES,
  RECENT_SEARCHES,
};
