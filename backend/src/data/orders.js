/**
 * In-memory Order Repository
 */
const orders = new Map();

// Seed the Stitch active order #FD-9204
const seedOrder = {
  id: 9204,
  orderNumber: 'FD-9204',
  userId: 'user-1',
  restaurantId: 1,
  restaurantName: 'Napoli Woodfired Pizza',
  items: [
    {
      id: 102,
      name: 'Double Pepperoni Rustica',
      price: 490,
      qty: 1,
      dietaryType: 'non-veg',
      subtotal: 490,
    },
    {
      id: 107,
      name: 'Garlic Truffle Knots',
      price: 200,
      qty: 1,
      dietaryType: 'veg',
      subtotal: 200,
    },
  ],
  subtotal: 690,
  deliveryFee: 35,
  tax: 24,
  discount: 0,
  total: 749,
  coupon: null,
  stage: 'delivering', // matches Stitch "On the move / Out for Delivery"
  history: [
    { stage: 'placed', label: 'Order Confirmed', description: 'Payment successful & sent to kitchen', at: '18:42', timestamp: Date.now() - 32 * 60 * 1000 },
    { stage: 'validated', label: 'Validated by Restaurant', description: 'Order accepted by head chef', at: '18:44', timestamp: Date.now() - 30 * 60 * 1000 },
    { stage: 'cooking', label: 'Restaurant Preparing your Food', description: 'Woodfired baking & final check', at: '18:48', timestamp: Date.now() - 26 * 60 * 1000 },
    { stage: 'ready', label: 'Food Packed & Ready', description: 'Placed in thermal delivery bag', at: '18:59', timestamp: Date.now() - 15 * 60 * 1000 },
    { stage: 'delivering', label: 'Out for Delivery', description: 'Partner picked up parcel and heading your way', at: '19:01', timestamp: Date.now() - 13 * 60 * 1000 },
  ],
  eta: '18–22 mins',
  estimatedArrival: '19:14 PM',
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
  deliveryAddress: {
    title: 'Home',
    addressLine: 'Flat 402, Oakwood Heights, Evergreen St, Midtown',
    note: 'Leave with security guard',
  },
  paymentMethod: 'UPI / Online Payment',
  createdAt: new Date(Date.now() - 32 * 60 * 1000).toISOString(),
};

orders.set(9204, seedOrder);

module.exports = orders;
