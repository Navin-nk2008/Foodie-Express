import React, { createContext, useContext, useState, useEffect } from 'react';
import { Cart, CartItem } from '../types/cart';
import { Dish } from '../types/restaurant';
import { cartApi } from '../api/cartApi';

interface CartContextType {
  cart: Cart | null;
  itemCount: number;
  isLoading: boolean;
  addToCart: (dish: Dish, restaurantId?: number) => Promise<void>;
  updateQuantity: (dishId: number, delta: number) => Promise<void>;
  removeItem: (dishId: number) => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getDishQuantity: (dishId: number) => number;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cart: null,
  itemCount: 0,
  isLoading: false,
  addToCart: async () => {},
  updateQuantity: async () => {},
  removeItem: async () => {},
  applyCoupon: async () => {},
  clearCart: async () => {},
  getDishQuantity: () => 0,
  refreshCart: async () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refreshCart = async () => {
    try {
      const data = await cartApi.get();
      if (data && data.cart) {
        setCart(data.cart);
      }
    } catch (e) {
      console.log('[CartContext] Could not fetch cart from backend');
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const getDishQuantity = (dishId: number): number => {
    if (!cart || !cart.items) return 0;
    const item = cart.items.find((i) => i.id === dishId);
    return item ? item.qty : 0;
  };

  const addToCart = async (dish: Dish, restaurantId?: number) => {
    setIsLoading(true);
    try {
      const targetRestId = restaurantId || dish.restaurantId;
      const res = await cartApi.addItem(dish.id, 1, targetRestId);
      if (res && res.cart) setCart(res.cart);
    } catch (err) {
      console.error('[CartContext] Error adding item:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (dishId: number, delta: number) => {
    if (!cart) return;
    const currentQty = getDishQuantity(dishId);
    const newQty = currentQty + delta;

    setIsLoading(true);
    try {
      if (newQty <= 0) {
        const res = await cartApi.removeItem(dishId);
        if (res && res.cart) setCart(res.cart);
      } else {
        const res = await cartApi.updateItem(dishId, newQty);
        if (res && res.cart) setCart(res.cart);
      }
    } catch (err) {
      console.error('[CartContext] Error updating quantity:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (dishId: number) => {
    setIsLoading(true);
    try {
      const res = await cartApi.removeItem(dishId);
      if (res && res.cart) setCart(res.cart);
    } catch (err) {
      console.error('[CartContext] Error removing item:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const applyCoupon = async (code: string) => {
    setIsLoading(true);
    try {
      const res = await cartApi.applyCoupon(code);
      if (res && res.cart) setCart(res.cart);
    } catch (err) {
      console.error('[CartContext] Error applying coupon:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    try {
      const res = await cartApi.clear();
      if (res && res.cart) setCart(res.cart);
    } catch (err) {
      console.error('[CartContext] Error clearing cart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const itemCount = cart ? cart.itemCount : 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount,
        isLoading,
        addToCart,
        updateQuantity,
        removeItem,
        applyCoupon,
        clearCart,
        getDishQuantity,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
