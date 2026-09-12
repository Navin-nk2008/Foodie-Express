const express = require('express');
const cartController = require('../controllers/cart.controller');

const router = express.Router();

router.get('/', cartController.getCart);
router.post('/items', cartController.addItem);
router.patch('/items/:itemId', cartController.updateItem);
router.delete('/items/:itemId', cartController.removeItem);
router.post('/coupon', cartController.applyCoupon);
router.delete('/', cartController.clearCart);

module.exports = router;
