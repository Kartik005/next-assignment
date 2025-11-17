// app/context/CartContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, newQuantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  totalPrice: number;
}


const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the Provider Component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

  };

  const removeFromCart = (id: number) => { // only keep items that don't match the cart item
    setCart((prevCart) => prevCart.filter((item => item.id !== id)));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    }
    else {
      setCart((prevCart) =>
        prevCart.map((item) => item.id === id ? { ...item, quantity: newQuantity } : item)
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  }

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ 
        cart, 
        addToCart, 
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        totalPrice,
         }}>
      {children}
    </CartContext.Provider>
  );
};

// 6. Create a custom hook for easy access
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};