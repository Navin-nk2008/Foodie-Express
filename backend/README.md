# FOODIE-EXPRESS — Backend REST API

Node.js and Express REST API backend for the **Foodie-Express** mobile food delivery system.

Designed for the **Mobile JavaScript App Development** course (Dr. Sheena Christabel Pravin, VIT Chennai), this server provides endpoints for authentication, restaurant catalogs, dynamic menus, cart operations, coupons, order placement, and live order tracking.

---

## Setup & Running

```bash
cd backend
npm install
npm start
```

Runs on **`http://localhost:3001`**.

To run with automatic file reload during development:
```bash
npm run dev
```

---

## Architecture & Design Patterns

The backend strictly separates routing, controller handling, and business domain logic:

```
backend/
├── server.js                        # HTTP listener
└── src/
    ├── app.js                       # Express configuration, CORS, routes
    ├── errors/
    │   └── InvalidOrderException.js # Custom Exception class with reasonCode (Sheet 04)
    ├── services/
    │   ├── validateOrder.js         # Order validation logic (throws InvalidOrderException)
    │   ├── orderProcessor.js        # Stage pipeline & rider telemetry simulation (Sheet 05)
    │   ├── cart.service.js          # Cart item storage and coupon calculation
    │   ├── restaurant.service.js    # Restaurant catalog queries & filters
    │   ├── search.service.js        # Multi-attribute search across cuisines & dishes
    │   └── auth.service.js          # In-memory OTP session manager
    ├── controllers/                 # Express request/response controllers
    ├── routes/                      # Modular Express router definitions
    ├── data/                        # In-memory seed datasets (Napoli Pizza, Burger Craft, etc.)
    └── middleware/
        └── error.middleware.js      # Global error handler translating exceptions to JSON
```

---

## API Endpoints Reference

### Health & Root
| Method | Route | Description |
|---|---|---|
| `GET` | `/health` | Server heartbeat status (`{"status":"ok"}`) |
| `GET` | `/` | API capability index and available endpoints |

### Authentication
| Method | Route | Request Body | Description |
|---|---|---|---|
| `POST` | `/api/auth/send-otp` | `{ "phone": "9876543210" }` | Generates a 6-digit OTP (demo: `123456`) |
| `POST` | `/api/auth/verify-otp` | `{ "phone": "9876543210", "otp": "123456" }` | Verifies OTP and returns user profile |
| `POST` | `/api/auth/logout` | — | Invalidates active user session |

### User Profile
| Method | Route | Request Body | Description |
|---|---|---|---|
| `GET` | `/api/users/me` | — | Returns current user profile and saved addresses |
| `PATCH` | `/api/users/me` | `{ "name": "...", "email": "..." }` | Updates user details |
| `POST` | `/api/users/addresses` | `{ "title": "Home", "addressLine": "..." }` | Adds a saved delivery address |

### Restaurants & Cuisines
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/restaurants` | List all restaurants with ratings, distance, delivery times |
| `GET` | `/api/restaurants/:id` | Get individual restaurant details |
| `GET` | `/api/restaurants/:id/menu` | Get full category-wise dish menu for a restaurant |
| `GET` | `/api/cuisines` | List popular cuisine categories (Pizza, Burgers, Biryani, etc.) |

### Search
| Method | Route | Query Parameters | Description |
|---|---|---|---|
| `GET` | `/api/search` | `?q=pizza&dietary=veg&minRating=4.0` | Search dishes and restaurants by name, category, or dietary tag |

### Cart Management
| Method | Route | Request Body | Description |
|---|---|---|---|
| `GET` | `/api/cart` | — | Current cart items, item count, subtotal, and discount |
| `POST` | `/api/cart/items` | `{ "dishId": 101, "qty": 1, "restaurantId": 1 }` | Add item or increment quantity |
| `PATCH` | `/api/cart/items/:id` | `{ "qty": 2 }` | Update quantity |
| `DELETE` | `/api/cart/items/:id` | — | Remove item from cart |
| `POST` | `/api/cart/coupon` | `{ "code": "WELCOME40" }` | Apply discount coupon (`WELCOME40` or `TRYNEW`) |

### Orders & Tracking
| Method | Route | Request Body | Description |
|---|---|---|---|
| `POST` | `/api/orders` | `{ "restaurantId": 1, "items": [...] }` | Validates & places order. Returns 201 or 400 on error |
| `GET` | `/api/orders` | — | List past and active orders |
| `GET` | `/api/orders/:id` | — | Retrieve order summary and status |
| `GET` | `/api/orders/:id/tracking` | — | Live stage timeline, rider coordinates, and ETA |

---

## Course Concept Implementation

### 1. Custom Exception Handling (`InvalidOrderException`)
Defined in `src/errors/InvalidOrderException.js`. Throws with a specific `reasonCode`:
```json
{
  "error": "Cart is empty. Please add at least one item.",
  "reasonCode": "EMPTY_CART"
}
```

### 2. Async Kitchen Stage Pipeline
Orders advance through the sequential stages:
`placed` → `validated` → `cooking` → `ready` → `delivering` → `delivered`
Each transition records timestamps in the `history` array and computes dynamic delivery partner telemetry.
