import React, { createContext, useContext, useState, useEffect } from 'react';
import { useData } from './DataContext';
import { useToast } from './ToastContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { coupons } = useData();
  const { success, error, info } = useToast();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('stepx_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('stepx_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('stepx_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('stepx_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('stepx_coupon');
    }
  }, [appliedCoupon]);

  // Add Item to Cart
  const addToCart = (product, size, color, quantity = 1) => {
    const selectedSize = size || (product.sizes && product.sizes[0]) || 9;
    const selectedColor = color || (product.colors && product.colors[0]?.name) || 'Standard';

    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && item.size === selectedSize && item.color === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem = {
          id: product.id,
          name: product.name,
          brand: product.brand || 'STEPX',
          price: product.discountPrice || product.price,
          originalPrice: product.price,
          image: product.image,
          category: product.category,
          size: selectedSize,
          color: selectedColor,
          quantity: quantity
        };
        return [...prev, newItem];
      }
    });

    success(`Added ${product.name} (Size ${selectedSize}) to cart!`);
  };

  // Remove Item
  const removeFromCart = (id, size, color) => {
    setCartItems(prev => prev.filter(
      item => !(item.id === id && item.size === size && item.color === color)
    ));
    info('Item removed from cart');
  };

  // Update Quantity
  const updateQuantity = (id, size, color, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id && item.size === size && item.color === color) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  // Apply Promo Coupon
  const applyCoupon = (couponCode) => {
    if (!couponCode) {
      error('Please enter a coupon code');
      return false;
    }

    const cleanCode = couponCode.trim().toUpperCase();
    const found = coupons.find(c => c.code.toUpperCase() === cleanCode && c.isActive);

    if (!found) {
      error('Invalid or expired coupon code');
      return false;
    }

    if (subtotal < (found.minSpend || 0)) {
      error(`Minimum spend of $${found.minSpend} required for this coupon`);
      return false;
    }

    setAppliedCoupon(found);
    success(`Promo code ${found.code} applied successfully!`);
    return true;
  };

  // Remove Promo Coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    info('Coupon removed');
  };

  // Pricing Calculations
  const subtotal = Number(
    cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)
  );

  let discount = 0;
  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.discountPercent) {
      discount = Number(((subtotal * appliedCoupon.discountPercent) / 100).toFixed(2));
    }
  }

  // Free shipping on orders over $100 or with FREESHIP coupon
  const isFreeShipping = subtotal >= 100 || (appliedCoupon && appliedCoupon.freeShipping);
  const deliveryFee = subtotal === 0 ? 0 : isFreeShipping ? 0 : 9.99;

  // Estimated Tax (7% on discounted subtotal)
  const estimatedTax = Number(((Math.max(0, subtotal - discount)) * 0.07).toFixed(2));

  // Final Total
  const total = Number((Math.max(0, subtotal - discount) + deliveryFee + estimatedTax).toFixed(2));

  // Total Quantity Count
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discount,
        deliveryFee,
        isFreeShipping,
        estimatedTax,
        total,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
