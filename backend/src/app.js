const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const restaurantRoutes = require('./routes/restaurant.routes');
const cuisinesRoutes = require('./routes/cuisines.routes');
const searchRoutes = require('./routes/search.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');
const errorHandler = require('./middleware/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

// API health and route index
app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

app.get('/', (req, res) => {
  res.json({
    ok: true,
    service: 'FOODIE-EXPRESS REST API (Mobile JavaScript App Development - Dr. Sheena Christabel Pravin, VIT Chennai)',
    version: '2.0.0',
    endpoints: {
      auth: ['POST /api/auth/send-otp', 'POST /api/auth/verify-otp', 'POST /api/auth/logout'],
      users: ['GET /api/users/me', 'PATCH /api/users/me', 'POST /api/users/addresses'],
      restaurants: ['GET /api/restaurants', 'GET /api/restaurants/:id', 'GET /api/restaurants/:id/menu'],
      cuisines: ['GET /api/cuisines'],
      search: ['GET /api/search?q=&dietary=&minRating=&maxDeliveryTime=&hasOffers='],
      cart: ['GET /api/cart', 'POST /api/cart/items', 'PATCH /api/cart/items/:itemId', 'DELETE /api/cart/items/:itemId', 'POST /api/cart/coupon'],
      orders: ['POST /api/orders', 'GET /api/orders', 'GET /api/orders/:id', 'GET /api/orders/:id/tracking'],
      foodieCompat: ['GET /api/foodie/menu', 'POST /api/foodie/orders', 'GET /api/foodie/orders/:id'],
    },
  });
});

// Mount Foodie-Express routers
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/user', userRoutes); // Alias for singular route
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/cuisines', cuisinesRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Professor backwards compatibility: /api/foodie/menu and /api/foodie/orders
app.get('/api/foodie/menu', (req, res) => {
  const menu = require('./data/menu');
  res.json({ menu });
});
app.use('/api/foodie/orders', orderRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Not found: ${req.method} ${req.url}` });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
