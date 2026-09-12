# FOODIE-EXPRESS — React Native (Expo) Mobile App

The mobile front end for **Foodie-Express**, built with React Native, TypeScript, and Expo.

Directly converted from the Stitch UI/UX design project (**Foodie Delivery App UI/UX Design**, Project ID: `13194954215451445834`), this app connects to the Express REST API and supports both Light and Dark modes.

---

## Getting Started

### 1. Prerequisites
- Node.js (v18+)
- Backend running on `http://localhost:3001` (or local network IP)
- Android Emulator or physical device with the **Expo Go** app installed

### 2. Install Dependencies
```bash
cd mobile
npm install
```

### 3. Run the Development Server
```bash
npx expo start
```

- Press `a` to open in an Android Emulator.
- Scan the QR code using the **Expo Go** camera on a physical Android phone.

---

## Device & Emulator Network Configuration

When running on an Android device or emulator, the mobile app needs to reach your computer's local backend server:

- **Android Emulator**: Automatically routes through `http://10.0.2.2:3001` (handled in `src/api/client.ts`).
- **Physical Android Phone**: Both your computer and phone must be on the same Wi-Fi network.
  1. Find your computer's LAN IP address (`ipconfig` on Windows or `ifconfig` on macOS/Linux, e.g., `192.168.1.50`).
  2. In the app, navigate to **Profile Tab → Settings**.
  3. Enter your API Base URL (e.g. `http://192.168.1.50:3001`) and tap **Save**.

---

## Project Structure

```
mobile/
├── App.tsx                          # Root provider tree (Theme, Auth, Cart, SafeArea)
├── app.json                         # Expo configuration with adaptive icon & splash
├── tsconfig.json                    # Strict TypeScript configuration
└── src/
    ├── theme/                       # Stitch design tokens
    │   ├── colors.ts                # Exact Stitch Light (#B42901) and Dark (#FF6B4A) palettes
    │   ├── typography.ts            # Hanken Grotesk / system typography scale
    │   ├── spacing.ts               # Standard 4px grid spacing
    │   └── shadows.ts               # Card elevation and drop shadows
    ├── types/                       # TypeScript interfaces
    │   ├── restaurant.ts            # Restaurant and Dish types
    │   ├── cart.ts                  # CartItem and CartSummary types
    │   ├── order.ts                 # Order, OrderStage, Rider types
    │   ├── user.ts                  # User profile and address types
    │   └── navigation.ts            # RootStackParamList & MainTabParamList
    ├── api/                         # REST client & services
    │   ├── client.ts                # Fetch wrapper with timeout & host resolution
    │   ├── authApi.ts               # OTP authentication
    │   ├── restaurantApi.ts         # Catalog and menu queries
    │   ├── searchApi.ts             # Dish and cuisine search
    │   ├── cartApi.ts               # Cart synchronization
    │   ├── orderApi.ts              # Order placement and tracking
    │   └── userApi.ts               # User profile operations
    ├── context/                     # State management
    │   ├── ThemeContext.tsx         # Live Light / Dark theme toggling
    │   ├── AuthContext.tsx          # Authentication state and profile
    │   └── CartContext.tsx          # Local + backend cart sync & pricing
    ├── components/
    │   ├── common/                  # FoodieLogo (SVG), Badges, Buttons, Steppers, Header, FloatingCartBar
    │   ├── cards/                   # FoodCardHorizontal, RestaurantCardVertical, CuisineCategoryPill
    │   └── tracking/                # OrderStatusTimeline, SimulatedMapView, RiderProfileCard
    ├── navigation/
    │   ├── MainTabNavigator.tsx     # 4 bottom tabs (Home, Search, Orders, Profile)
    │   └── RootNavigator.tsx        # Stack navigation (Auth, Tabs, Menu, Cart, Checkout, Tracking)
    └── screens/
        ├── auth/                    # SplashScreen, LoginScreen, OTPScreen
        ├── home/                    # HomeScreen (Discovery)
        ├── search/                  # SearchScreen (Explore with filters)
        ├── restaurant/              # RestaurantMenuScreen (Catalog & items)
        ├── cart/                    # CartScreen (Item review & coupons)
        ├── checkout/                # CheckoutScreen (Address & payment)
        ├── orders/                  # OrdersScreen & OrderConfirmationScreen
        ├── tracking/                # OrderTrackingScreen (Live route & status)
        ├── profile/                 # ProfileScreen (Account & quick links)
        └── settings/                # SettingsScreen (Theme switch & API base URL)
```

---

## Building a Standalone Android APK

To generate an installable `.apk` file without requiring Android Studio:

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview
```

Before building the production APK, ensure that `API_BASE_URL` in `src/api/client.ts` points to a deployed public backend URL (e.g. on Render, Railway, or VPS).
