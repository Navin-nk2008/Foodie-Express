# 🍔 FOODIE-EXPRESS — Backend REST API

> 🚀 **Node.js + Express REST API backend** for the Foodie-Express mobile food delivery application.

Foodie-Express is a full-stack food delivery system developed for the **Mobile JavaScript App Development** course at **VIT Chennai**.

The backend provides RESTful APIs for:

- 🔐 Authentication & OTP verification
- 👤 User profiles & saved addresses
- 🍕 Restaurant catalogues & menus
- 🔎 Search & filtering
- 🛒 Cart management
- 🎟️ Coupon application
- 📦 Order placement
- 👨‍🍳 Kitchen order processing
- 🛵 Live delivery tracking

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Phone-based OTP authentication and session management |
| 👤 **User Management** | Profile information and saved delivery addresses |
| 🍽️ **Restaurants** | Restaurant details, ratings, distance and delivery information |
| 📋 **Menus** | Category-wise restaurant menus and dish information |
| 🔎 **Search** | Search restaurants and dishes using multiple filters |
| 🛒 **Cart** | Add, update and remove cart items |
| 🎟️ **Coupons** | Support for `WELCOME40` and `TRYNEW` |
| 📦 **Orders** | Order validation and placement |
| 👨‍🍳 **Kitchen Pipeline** | Sequential order processing stages |
| 🛵 **Tracking** | Rider telemetry, ETA and delivery status |
| ⚠️ **Exception Handling** | Custom `InvalidOrderException` with reason codes |
| 🌐 **CORS** | Configured for mobile application communication |

---

# 🏗️ Architecture

The backend follows a **separation-of-concerns architecture**, keeping routing, controllers, services and data repositories independent.

```text
backend/
│
├── server.js                         # HTTP server entrypoint
│
└── src/
    │
    ├── app.js                        # Express configuration & routes
    │
    ├── controllers/                  # HTTP request/response handlers
    │
    ├── routes/                       # Modular Express route definitions
    │
    ├── services/                     # Business/domain logic
    │   ├── validateOrder.js          # Order validation
    │   ├── orderProcessor.js         # Kitchen & delivery pipeline
    │   ├── cart.service.js           # Cart & coupon operations
    │   ├── restaurant.service.js     # Restaurant queries
    │   ├── search.service.js         # Search & filtering
    │   └── auth.service.js           # OTP/session management
    │
    ├── data/                         # In-memory datasets
    │
    ├── errors/
    │   └── InvalidOrderException.js  # Custom exception class
    │
    └── middleware/
        └── error.middleware.js        # Global error handling
