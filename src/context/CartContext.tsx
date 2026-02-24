import React, { createContext, useContext, useState } from 'react';
import { Product, CartItem, Voucher } from '../types';
import { vouchers } from '../data/vouchers';

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  subtotal: number;
  total: number;
  voucherCode: string;
  setVoucherCode: (code: string) => void;
  appliedVoucher: Voucher | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [voucherCode, setVoucherCode] = useState('');

  // Derived state: find the voucher if it exists
  const appliedVoucher = vouchers.find(v => v.code.toLowerCase() === voucherCode.toLowerCase()) || null;

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const calculateTotal = () => {
    if (!appliedVoucher) return subtotal;
    
    if (appliedVoucher.discountType === 'percentage') {
      return subtotal * (1 - appliedVoucher.value);
    } else {
      return Math.max(0, subtotal - appliedVoucher.value);
    }
  };

  const total = calculateTotal();

  const contextValue = {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    total,
    voucherCode,
    setVoucherCode,
    appliedVoucher,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
