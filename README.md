# 🍔 FOODIE-EXPRESS

### 📱 Android Mobile Application & REST API

<p align="center">
  <strong>A modern full-stack food delivery application built with React Native, Expo, Node.js and Express.</strong>
</p>

<p align="center">
  🍕 Restaurant Discovery • 🔎 Search • 🛒 Cart • 💳 Checkout • 📦 Orders • 🚴 Live Tracking
</p>

---

## 📖 About The Project

**Foodie Express** is an artisanal food delivery mobile application and REST API
system developed for the **Mobile JavaScript App Development** course.

The application is based on the **Stitch UI/UX Design — Foodie Delivery App UI/UX Design**
(Project ID: `13194954215451445834`) and implements a complete mobile food-ordering
experience with a reusable design system, Light/Dark themes, multiple production
screens and a decoupled REST API backend.

### 🎓 Academic Context

| | Details |
|---|---|
| 📚 Course | Mobile JavaScript App Development |
| 👨‍🏫 Faculty | Dr. Sheena Christabel Pravin |
| 🏫 Institution | VIT Chennai |
| 🎓 School | School of Electronics Engineering |

---

# ✨ Key Features

## 🎨 1. Stitch Design System

Foodie Express follows the Stitch UI/UX design with a consistent visual language
across the application.

### ☀️ Light Mode

- 🧱 Terracotta Primary — `#B42901`
- 🍊 Coral Containers — `#FF5E36`
- 🤍 Soft Background — `#F8F9FC`
- ⬜ White Cards — `#FFFFFF`

### 🌙 Dark Mode

- 🍊 Bright Coral Primary — `#FF6B4A`
- 🌑 Deep Slate Background — `#0F1117`
- 🖤 Elevated Cards — `#1A1D26`

### 🎯 UI Components

- 🍴 Custom Foodie squircle logo
- 🥗 Pure Veg indicator
- 🔺 Non-Veg indicator
- 🎨 Reusable color tokens
- 📏 Spacing and typography tokens
- 🌗 Complete Light/Dark theme support
- 🧩 Reusable UI components

The custom logo is rendered using `react-native-svg`.

---

# 📱 Application Screens

Foodie Express provides a complete end-to-end food ordering workflow.

### 🔐 Authentication

- 🚀 Splash Screen
- 📱 Phone Login
- 🔢 OTP Verification
- 🧪 Demo OTP: `123456`

### 🏠 Discovery

- 🔎 Search bar
- 🎟️ Promotional discount banners
- 🍜 Cuisine categories
- ⭐ Featured restaurants
- 📍 Restaurant distance
- 🚚 Free delivery indicators

### 🔍 Search & Explore

- ⚡ Live debounced search
- 🥗 Veg / Non-Veg filters
- 💰 Price range filtering
- ↕️ Sorting options

### 🍔 Restaurant Menu

- 🖼️ Restaurant hero banner
- ⭐ Restaurant information
- 📑 Category tabs
- ➕ Add food items
- 🔢 Quantity steppers

### 🛒 Cart

- 🧾 Itemized cart
- 🔢 Quantity management
- 🎟️ Coupon application
- 💰 Delivery fee calculation
- 💵 Subtotal calculation
- 📌 Floating cart bar

### 💳 Checkout

- 📍 Address selection
- 📝 Delivery instructions
- 💳 Payment methods:
  - UPI
  - Card
  - Cash on Delivery

### 🎉 Order Confirmation

- 🎊 Order success screen
- 🔢 Order number
- ⏱️ Estimated delivery time
- 🚴 Tracking CTA

### 🚴 Live Order Tracking

- 🗺️ Interactive vector route
- 🛵 Rider telemetry
- 👨‍✈️ Rider information
- 📊 Five-stage order timeline

### 📦 Order History

- 🧾 Previous orders
- 🔴 Active orders
- 📊 Live status badges

### 👤 Profile & Settings

- 👤 User information
- 🌗 Light/Dark mode switch
- ⚙️ Backend API configuration

---

# 🏗️ Architecture

```text
                     🍔 FOODIE-EXPRESS
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
       📱 MOBILE APP                ⚙️ REST API
       React Native                  Node.js
       Expo                          Express
       TypeScript                    REST
              │                           │
              │       HTTP / JSON         │
              └─────────────┬─────────────┘
                            │
                            ▼
                     📦 Application Data
