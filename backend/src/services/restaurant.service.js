const restaurants = require('../data/restaurants');
const menu = require('../data/menu');

function getAllRestaurants(filters = {}) {
  let list = [...restaurants];

  if (filters.cuisine) {
    const c = filters.cuisine.toLowerCase();
    list = list.filter((r) =>
      r.cuisines.some((item) => item.toLowerCase().includes(c))
    );
  }

  if (filters.isPopular === 'true' || filters.isPopular === true) {
    list = list.filter((r) => r.isPopular);
  }

  if (filters.isFeatured === 'true' || filters.isFeatured === true) {
    list = list.filter((r) => r.isFeatured);
  }

  return list;
}

function getRestaurantById(id) {
  const restaurant = restaurants.find((r) => r.id === Number(id));
  if (!restaurant) return null;
  return restaurant;
}

function getRestaurantMenu(restaurantId, filters = {}) {
  let items = menu.filter((m) => m.restaurantId === Number(restaurantId));

  if (filters.category && filters.category !== 'All') {
    items = items.filter((m) => m.category.toLowerCase() === filters.category.toLowerCase());
  }

  if (filters.dietary) {
    items = items.filter((m) => m.dietaryType.toLowerCase() === filters.dietary.toLowerCase());
  }

  return items;
}

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantMenu,
};
