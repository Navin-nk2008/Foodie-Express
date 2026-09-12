import { NavigatorScreenParams } from '@react-navigation/native';
import { Restaurant } from './restaurant';

export type MainTabParamList = {
  HomeTab: undefined;
  SearchTab: { initialQuery?: string } | undefined;
  OrdersTab: undefined;
  ProfileTab: undefined;
};

export type RootStackParamList = {
  // Auth
  Splash: undefined;
  Login: undefined;
  OTP: { phone: string; demoOtp?: string };

  // Main App
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  RestaurantMenu: { restaurantId: number; restaurant?: Restaurant };
  Cart: undefined;
  Checkout: undefined;
  OrderConfirmation: { orderId: number; orderNumber: string; eta: string; total: number };
  OrderTracking: { orderId: number };
  Settings: undefined;
};
