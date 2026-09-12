const menu = require('../data/menu');
const restaurants = require('../data/restaurants');

// In-memory cart store per user
const carts = new Map();

function getOrCreateCart(userId = 'user-1') {
  if (!carts.has(userId)) {
    carts.set(userId, {
      restaurantId: 1,
      items: [
        { id: 102, qty: 1 }, // default seeded item from Stitch menu
      ],
      coupon: 'TRYNEW',
    });
  }
  return carts.get(userId);
}

function calculateCart(cart) {
  const restaurant = restaurants.find((r) => r.id === Number(cart.restaurantId)) || restaurants[0];

  const enrichedItems = (cart.items || []).map((line) => {
    const dish = menu.find((m) => m.id === Number(line.id));
    if (!dish) return null;
    return {
      id: dish.id,
      name: dish.name,
      price: dish.price,
      qty: line.qty,
      dietaryType: dish.dietaryType,
      subtotal: dish.price * line.qty,
      image: dish.image,
      tag: dish.tag,
    };
  }).filter(Boolean);

  const subtotal = enrichedItems.reduce((sum, item) => sum + item.subtotal, 0);
  const deliveryFee = subtotal === 0 || subtotal > 400 ? 0 : 35;
  const tax = Math.round(subtotal * 0.05);

  let discount = 0;
  if (cart.coupon === 'WELCOME40') {
    discount = Math.min(120, Math.round(subtotal * 0.4));
  } else if (cart.coupon === 'TRYNEW') {
    discount = Math.min(120, Math.round(subtotal * 0.2));
  }

  const grandTotal = Math.max(0, subtotal + deliveryFee + tax - discount);

  return {
    restaurant,
    items: enrichedItems,
    itemCount: enrichedItems.reduce((acc, i) => acc + i.qty, 0),
    subtotal,
    deliveryFee,
    tax,
    discount,
    grandTotal,
    coupon: cart.coupon,
    availableCoupons: [
      { code: 'WELCOME40', description: '40% OFF your first order up to ₹120' },
      { code: 'TRYNEW', description: 'FLAT 20% OFF on order up to ₹120' },
    ],
  };
}

function getCart(userId = 'user-1') {
  const cart = getOrCreateCart(userId);
  return calculateCart(cart);
}

function addItem(userId = 'user-1', { id, qty = 1, restaurantId }) {
  const cart = getOrCreateCart(userId);

  // If changing restaurant, reset cart items to new restaurant
  if (restaurantId && Number(restaurantId) !== Number(cart.restaurantId)) {
    cart.restaurantId = Number(restaurantId);
    cart.items = [];
  }

  const existing = cart.items.find((i) => i.id === Number(id));
  if (existing) {
    existing.qty += Number(qty);
  } else {
    cart.items.push({ id: Number(id), qty: Number(qty) });
  }

  // Remove zero or negative quantities
  cart.items = cart.items.filter((i) => i.qty > 0);

  return calculateCart(cart);
}

function updateItem(userId = 'user-1', itemId, qty) {
  const cart = getOrCreateCart(userId);
  const existing = cart.items.find((i) => i.id === Number(itemId));

  if (existing) {
    existing.qty = Number(qty);
  }

  cart.items = cart.items.filter((i) => i.qty > 0);
  return calculateCart(cart);
}

function removeItem(userId = 'user-1', itemId) {
  const cart = getOrCreateCart(userId);
  cart.items = cart.items.filter((i) => i.id !== Number(itemId));
  return calculateCart(cart);
}

function applyCoupon(userId = 'user-1', couponCode) {
  const cart = getOrCreateCart(userId);
  cart.coupon = couponCode ? couponCode.trim().toUpperCase() : null;
  return calculateCart(cart);
}

function clearCart(userId = 'user-1') {
  const cart = getOrCreateCart(userId);
  cart.items = [];
  cart.coupon = null;
  return calculateCart(cart);
}

module.exports = {
  getCart,
  addItem,
  updateItem,
  removeItem,
  applyCoupon,
  clearCart,
};
