'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { isAuthenticated } from '@/utils/auth';

const CartContext = createContext(null);

const normalizeCartItem = (item) => {
  if (!item || typeof item !== 'object') {
    return null;
  }

  const quantity = Number.isFinite(item.quantity) && item.quantity > 0 ? Math.floor(item.quantity) : 1;

  const rawPrice = item.price ?? item.unitPrice ?? item.unit_price ?? 0;
  const numericPrice = typeof rawPrice === 'number'
    ? rawPrice
    : parseFloat(String(rawPrice).replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;
  const priceLabel = (() => {
    if (typeof rawPrice === 'string') {
      const trimmed = rawPrice.trim();
      if (!trimmed) {
        return `${numericPrice} USD`;
      }
      return /usd$/i.test(trimmed) ? trimmed : `${trimmed} USD`;
    }
    return `${numericPrice} USD`;
  })();

  return {
    id: item.id,
    name: item.name ?? 'Без названия',
    brand: item.brand ?? '',
    image_url: item.image_url ?? item.imageUrl ?? null,
    unitPrice: numericPrice,
    price: priceLabel,
    quantity,
  };
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalAction, setAuthModalAction] = useState('добавить товар в корзину');

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (!savedCart) {
        return;
      }

      const parsedCart = JSON.parse(savedCart);
      if (!Array.isArray(parsedCart)) {
        return;
      }

      const normalized = parsedCart
        .map((item) => normalizeCartItem(item))
        .filter(Boolean);

      setCart(normalized);
    } catch (error) {
      console.error('Failed to restore cart from storage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('cartChange'));
    } catch (error) {
      console.error('Failed to persist cart to storage:', error);
    }
  }, [cart]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key && event.key !== 'cart') {
        return;
      }

      try {
        const nextCart = event.newValue ? JSON.parse(event.newValue) : [];
        if (Array.isArray(nextCart)) {
          const normalized = nextCart
            .map((item) => normalizeCartItem(item))
            .filter(Boolean);
          setCart(normalized);
        }
      } catch (error) {
        console.error('Failed to sync cart from storage event:', error);
      }
    };

    const handleAuthChange = () => {
      // Clear cart when user logs out
      if (!isAuthenticated()) {
        setCart([]);
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const addToCart = (product, quantity = 1) => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      setAuthModalAction('добавить товар в корзину');
      setShowAuthModal(true);
      return false;
    }

    setCart((prevCart) => {
      const normalizedProduct = normalizeCartItem({ ...product, quantity });
      if (!normalizedProduct) {
        return prevCart;
      }

      const existingIndex = prevCart.findIndex((item) => item.id === normalizedProduct.id);
      if (existingIndex !== -1) {
        return prevCart.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + normalizedProduct.quantity }
            : item
        );
      }

      return [...prevCart, normalizedProduct];
    });

    return true;
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart.filter((item) => item.id !== id);
      }

      return prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.floor(quantity) } : item
      );
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  const totalPrice = useMemo(
    () => cart.reduce((total, item) => total + item.unitPrice * item.quantity, 0),
    [cart],
  );

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalItems,
      totalPrice,
      showAuthModal,
      authModalAction,
      closeAuthModal,
    }),
    [cart, totalItems, totalPrice, showAuthModal, authModalAction],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

