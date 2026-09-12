/**
 * Kitchen + Delivery Pipeline — Sheet 05 (Dr. Sheena Christabel Pravin, VIT Chennai)
 *
 * Coordinates multi-stage order lifecycle:
 * placed -> validated -> cooking -> ready -> delivering -> delivered
 */
const orders = require('../data/orders');
const menu = require('../data/menu');
const restaurants = require('../data/restaurants');

let nextOrderId = 9205;

function formatTime(date = new Date()) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

function stageDurationMs(order) {
  const itemCount = (order.items || []).reduce((sum, item) => sum + (item.qty || 1), 0);
  return 1500 + itemCount * 500; // Kitchen cook time
}

function advance(record, stage, label, description) {
  record.stage = stage;
  const now = new Date();
  record.history.push({
    stage,
    label: label || stage,
    description: description || '',
    at: formatTime(now),
    timestamp: now.getTime(),
  });
}

function runDelivery(record) {
  advance(
    record,
    'delivering',
    'Out for Delivery',
    'Partner picked up parcel and heading your way'
  );

  // Delivery simulation: reaches customer in 10 seconds
  setTimeout(() => {
    advance(
      record,
      'delivered',
      'Delivered',
      'Contactless doorstep handoff completed'
    );
    record.eta = 'Delivered';
  }, 10000);
}

function runKitchen(record) {
  advance(
    record,
    'cooking',
    'Restaurant Preparing your Food',
    'Woodfired baking & final check'
  );

  setTimeout(() => {
    advance(
      record,
      'ready',
      'Food Packed & Ready',
      'Handed over to delivery partner'
    );
    runDelivery(record);
  }, stageDurationMs(record));
}

function createOrder(orderData, userId = 'user-1') {
  const id = nextOrderId++;
  const now = new Date();

  // Populate line item details
  const populatedItems = orderData.items.map((line) => {
    const menuItem = menu.find((m) => m.id === Number(line.id));
    const qty = Number(line.qty) || 1;
    return {
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      qty,
      dietaryType: menuItem.dietaryType,
      subtotal: menuItem.price * qty,
      image: menuItem.image,
    };
  });

  const subtotal = populatedItems.reduce((sum, item) => sum + item.subtotal, 0);
  const deliveryFee = subtotal > 400 ? 0 : 35;
  const tax = Math.round(subtotal * 0.05);

  let discount = 0;
  if (orderData.coupon === 'WELCOME40') {
    discount = Math.min(120, Math.round(subtotal * 0.4));
  } else if (orderData.coupon === 'TRYNEW') {
    discount = Math.min(120, Math.round(subtotal * 0.2));
  }

  const total = Math.max(0, subtotal + deliveryFee + tax - discount);

  const restaurant = restaurants.find((r) => r.id === Number(orderData.restaurantId)) || restaurants[0];

  const record = {
    id,
    orderNumber: `FD-${id}`,
    userId,
    restaurantId: restaurant.id,
    restaurantName: restaurant.name,
    items: populatedItems,
    subtotal,
    deliveryFee,
    tax,
    discount,
    total,
    coupon: orderData.coupon || null,
    stage: 'placed',
    history: [
      {
        stage: 'placed',
        label: 'Order Confirmed',
        description: 'Payment successful & sent to kitchen',
        at: formatTime(now),
        timestamp: now.getTime(),
      },
    ],
    eta: '20–25 mins',
    estimatedArrival: formatTime(new Date(now.getTime() + 25 * 60 * 1000)),
    rider: {
      name: 'Vikram S.',
      phone: '+91 98123 45678',
      rating: 4.9,
      deliveries: '1,840 deliveries',
      vehicle: 'Electric Scooter (TN 09 BX 4412)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      safetyTag: 'Sanitized bag & regular temp checks',
      currentLocation: {
        latitude: 12.8406,
        longitude: 80.1534,
        distanceAway: '1.8 km',
      },
    },
    deliveryAddress: orderData.deliveryAddress || {
      title: 'Home',
      addressLine: 'Flat 402, Oakwood Heights, Evergreen St, Midtown',
      note: 'Leave with security guard',
    },
    paymentMethod: orderData.paymentMethod || 'Online UPI Payment',
    createdAt: now.toISOString(),
  };

  orders.set(id, record);

  // Automatically advance to validated, then trigger kitchen pipeline
  setTimeout(() => {
    advance(
      record,
      'validated',
      'Validated by Restaurant',
      'Order accepted by head chef'
    );
    runKitchen(record);
  }, 1000);

  return record;
}

function getOrder(id) {
  return orders.get(Number(id));
}

function getAllOrders(userId = 'user-1') {
  return Array.from(orders.values())
    .filter((o) => !userId || o.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

module.exports = {
  createOrder,
  getOrder,
  getAllOrders,
};
