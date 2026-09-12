# FOODIE-EXPRESS — Android Mobile Application & REST API

An artisanal food delivery mobile application and REST API system built for **Mobile JavaScript App Development** (Dr. Sheena Christabel Pravin, Associate Professor, School of Electronics Engineering, VIT Chennai).

The application is engineered from the Stitch UI/UX design (**Foodie Delivery App UI/UX Design**, Project ID: `13194954215451445834`), featuring a full design system, dual light/dark modes, 10 mobile screens, and an Express REST API backend preserving academic software engineering principles.

---

## Architecture Overview

```
FOODIE-EXPRESS/
├── backend/                  # Node.js + Express REST API Server
│   ├── server.js             # Server entrypoint (Port 3001)
│   ├── src/
│   │   ├── app.js            # Express app configuration & routing
│   │   ├── controllers/      # Request handlers (auth, user, restaurant, search, cart, order)
│   │   ├── services/         # Business logic, cart computation, kitchen stage pipeline
│   │   ├── data/             # In-memory repositories (restaurants, menu, cuisines, orders, users)
│   │   ├── errors/           # Custom academic exceptions (InvalidOrderException with reasonCode)
│   │   └── middleware/       # Centralized error handler & CORS
│   └── README.md
│
└── mobile/                   # React Native (Expo) TypeScript Mobile Application
    ├── App.tsx               # Root component with Providers (Theme, Auth, Cart, Safe Area)
    ├── app.json              # Expo configuration (Foodie branding, adaptive icon)
    ├── src/
    │   ├── theme/            # Stitch design tokens (exact Light & Dark hex palettes, typography, spacing)
    │   ├── types/            # Strict TypeScript interfaces (Restaurant, Dish, Cart, Order, User)
    │   ├── api/              # API client with Android 10.0.2.2 emulator auto-resolver & endpoints
    │   ├── context/          # React Contexts (ThemeContext, AuthContext, CartContext)
    │   ├── components/       # Reusable components (Stitch squircle logo, badges, steppers, cards, banners)
    │   ├── navigation/       # React Navigation 6 (Root Stack Navigator & Main Tab Navigator)
    │   └── screens/          # 10 production screens (Auth, Home, Search, Menu, Cart, Checkout, Tracking, etc.)
    └── README.md
```

---

## Key Features

1. **Stitch Design System Faithful Implementation**:
   - **Light Mode Palette**: Terracotta primary (`#B42901`), Coral containers (`#FF5E36`), Soft clean background (`#F8F9FC`), White cards (`#FFFFFF`).
   - **Dark Mode Palette**: Bright Coral primary (`#FF6B4A`), Deep slate background (`#0F1117`), Dark elevated cards (`#1A1D26`).
   - **Custom Vector Logo**: Foodie squircle badge with fork & spoon cutouts rendered via `react-native-svg`.
   - **Dietary Badges**: Distinct square indicators for Pure Veg (Green circle) and Non-Veg (Red triangle).

2. **10 Production Screens**:
   - **Splash Screen**: Animated branded intro displaying course and professor details.
   - **Login & OTP Screens**: Phone verification with demo OTP generator (`123456`).
   - **Home Discovery**: Search bar, promotional discount carousels, cuisine category pills, featured restaurants with ratings, distance, and free delivery badges.
   - **Search & Explore**: Live debounced search with dietary filters (All, Veg, Non-Veg), price ranges, and sorting.
   - **Restaurant Menu**: Hero banner, restaurant info, category tabs, and items with "+ Add" or stepper quantity controls.
   - **Floating Cart Bar**: Sticky bottom indicator displaying active item count, subtotal, and quick navigation to Cart.
   - **Cart Screen**: Itemized review, coupon code application (`WELCOME40`, `TRYNEW`), delivery fee breakdown, and subtotal.
   - **Checkout Screen**: Address selector, delivery instructions, payment method options (UPI, Card, Cash on Delivery).
   - **Order Confirmation**: Celebration screen with order number, estimated delivery time, and tracking CTA.
   - **Live Order Tracking**: Interactive vector map route, dynamic rider telemetry (`Vikram S.`), and 5-stage kitchen status timeline.
   - **Order History**: List of past and active orders with live status badges.
   - **Profile & Settings Screen**: User information editor, live Light/Dark mode switcher, and live backend URL configuration.

3. **Academic Software Engineering Concepts**:
   - **Custom Exception Handling (Sheet 04)**: `InvalidOrderException` with distinct `reasonCode` (`EMPTY_CART`, `ITEM_NOT_FOUND`, `INVALID_QUANTITY`).
   - **Async Kitchen & Delivery Pipeline (Sheet 05)**: Order stages advance sequentially (`placed` → `validated` → `cooking` → `ready` → `delivering` → `delivered`).
   - **Decoupled Architecture**: Strict separation of concerns between API data layer, business controllers, and mobile presentation.

---

## Quick Start

### 1. Start the Backend API

```bash
cd backend
npm install
npm start
```
The server will start on **`http://localhost:3001`**. Test connectivity:
```bash
curl http://localhost:3001/health
```

### 2. Start the Mobile App

```bash
cd mobile
npm install
npx expo start
```

- **Android Emulator**: Press `a` in the Expo terminal (the API client automatically routes to `http://10.0.2.2:3001`).
- **Physical Android Phone**: Open Expo Go and scan the QR code. Ensure your phone and computer are on the same Wi-Fi network, and update the API Base URL in **Profile → Settings** to your computer's LAN IP (e.g. `http://192.168.1.X:3001`).

---

## Academic Information

- **Course**: Mobile JavaScript App Development
- **Faculty Guide**: Dr. Sheena Christabel Pravin
- **Department**: School of Electronics Engineering, VIT Chennai
