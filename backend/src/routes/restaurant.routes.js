const express = require('express');
const restaurantController = require('../controllers/restaurant.controller');

const router = express.Router();

router.get('/', restaurantController.listRestaurants);
router.get('/:id', restaurantController.getRestaurant);
router.get('/:id/menu', restaurantController.getMenu);

module.exports = router;
