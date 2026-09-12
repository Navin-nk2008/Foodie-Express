const express = require('express');
const orderController = require('../controllers/order.controller');

const router = express.Router();

router.post('/', orderController.placeOrder);
router.get('/', orderController.listOrders);
router.get('/:id', orderController.getOrderById);
router.get('/:id/tracking', orderController.getTracking);

module.exports = router;
