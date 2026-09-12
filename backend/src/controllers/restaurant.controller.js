const restaurantService = require('../services/restaurant.service');

function listRestaurants(req, res) {
  const { cuisine, isPopular, isFeatured } = req.query;
  const list = restaurantService.getAllRestaurants({ cuisine, isPopular, isFeatured });
  res.status(200).json({ restaurants: list });
}

function getRestaurant(req, res) {
  const { id } = req.params;
  const restaurant = restaurantService.getRestaurantById(id);
  if (!restaurant) {
    return res.status(404).json({ error: 'Restaurant not found' });
  }
  res.status(200).json({ restaurant });
}

function getMenu(req, res) {
  const { id } = req.params;
  const { category, dietary } = req.query;
  const menuItems = restaurantService.getRestaurantMenu(id, { category, dietary });
  res.status(200).json({ menu: menuItems });
}

module.exports = {
  listRestaurants,
  getRestaurant,
  getMenu,
};
