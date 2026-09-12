const cartService = require('../services/cart.service');

function getCart(req, res) {
  const userId = req.headers['x-user-id'] || 'user-1';
  const cart = cartService.getCart(userId);
  res.status(200).json({ cart });
}

function addItem(req, res) {
  const userId = req.headers['x-user-id'] || 'user-1';
  const { id, qty, restaurantId } = req.body;
  const cart = cartService.addItem(userId, { id, qty, restaurantId });
  res.status(200).json({ cart });
}

function updateItem(req, res) {
  const userId = req.headers['x-user-id'] || 'user-1';
  const { itemId } = req.params;
  const { qty } = req.body;
  const cart = cartService.updateItem(userId, itemId, qty);
  res.status(200).json({ cart });
}

function removeItem(req, res) {
  const userId = req.headers['x-user-id'] || 'user-1';
  const { itemId } = req.params;
  const cart = cartService.removeItem(userId, itemId);
  res.status(200).json({ cart });
}

function applyCoupon(req, res) {
  const userId = req.headers['x-user-id'] || 'user-1';
  const { code } = req.body;
  const cart = cartService.applyCoupon(userId, code);
  res.status(200).json({ cart });
}

function clearCart(req, res) {
  const userId = req.headers['x-user-id'] || 'user-1';
  const cart = cartService.clearCart(userId);
  res.status(200).json({ cart });
}

module.exports = {
  getCart,
  addItem,
  updateItem,
  removeItem,
  applyCoupon,
  clearCart,
};
