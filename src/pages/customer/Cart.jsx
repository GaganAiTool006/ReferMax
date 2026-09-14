import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { 
  FiTrash2, 
  FiArrowRight, 
  FiShoppingBag, 
  FiMinus, 
  FiPlus, 
  FiTag, 
  FiCheck, 
  FiX, 
  FiTruck, 
  FiShield
} from 'react-icons/fi';
import './Cart.css';

export default function Cart() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    subtotal, 
    discount, 
    deliveryFee, 
    isFreeShipping, 
    estimatedTax, 
    total 
  } = useCart();

  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="section-padding">
        <div className="container">
          <div className="empty-cart-state">
            <div className="logo-badge" style={{ width: '64px', height: '64px', fontSize: '1.75rem' }}>
              <FiShoppingBag />
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Your Shopping Bag is Empty</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '420px' }}>
              Explore our new arrivals and race-engineered footwear to find your next favorite pair.
            </p>
            <Link to="/shop" className="btn btn-primary" style={{ marginTop: '8px' }}>
              Explore STEPX Catalog <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container">
        {/* Page Title */}
        <div style={{ marginBottom: '32px' }}>
          <span className="section-tag"><FiShoppingBag /> YOUR BAG</span>
          <h1 className="section-title">Shopping Cart ({cartItems.length} items)</h1>
        </div>

        <div className="cart-grid-layout">
          {/* Left Column: Cart Items List */}
          <div className="cart-items-wrapper">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={`${item.id}-${item.size}-${item.color}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="cart-item-card"
                >
                  <img src={item.image} alt={item.name} className="cart-item-image" />

                  <div className="cart-item-info">
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>
                      {item.brand || 'STEPX'}
                    </span>
                    <Link to={`/product/${item.id}`} className="cart-item-title">
                      {item.name}
                    </Link>
                    <span className="cart-item-meta">
                      Size: <strong>US {item.size}</strong> • Color: <strong>{item.color}</strong>
                    </span>
                    <span className="cart-item-price">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="cart-item-actions">
                    {/* Stepper */}
                    <div className="qty-stepper" style={{ height: '40px' }}>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.size, item.color, -1)}
                        className="qty-btn"
                        style={{ width: '30px', height: '30px' }}
                        aria-label="Decrease quantity"
                      >
                        <FiMinus size={14} />
                      </button>
                      <span className="qty-display" style={{ width: '30px', fontSize: '0.9rem' }}>
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.size, item.color, 1)}
                        className="qty-btn"
                        style={{ width: '30px', height: '30px' }}
                        aria-label="Increase quantity"
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>

                    {/* Total item cost */}
                    <span style={{ fontWeight: '700', minWidth: '70px', textAlign: 'right' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    {/* Delete Item */}
                    <button
                      onClick={() => removeFromCart(item.id, item.size, item.color)}
                      className="remove-cart-item-btn"
                      aria-label="Remove item"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Back to Shopping Button */}
            <div style={{ marginTop: '16px' }}>
              <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600' }}>
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="cart-summary-card">
            <h3 className="summary-title">Order Summary</h3>

            {/* Promo Code Input */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                Promo / VIP Discount Code
              </label>
              {appliedCoupon ? (
                <div className="applied-coupon-badge">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiTag />
                    <span>
                      <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}% OFF)
                    </span>
                  </div>
                  <button onClick={removeCoupon} style={{ color: 'var(--status-error)' }}>
                    <FiX size={16} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="coupon-input-group">
                  <input
                    type="text"
                    placeholder="e.g. STEPX10 or VIP20"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="coupon-input"
                  />
                  <button type="submit" className="btn btn-dark btn-sm">
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Price Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="summary-row" style={{ color: 'var(--status-success)' }}>
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Estimated Express Shipping</span>
                <span>
                  {deliveryFee === 0 ? (
                    <strong style={{ color: 'var(--status-success)' }}>FREE</strong>
                  ) : (
                    `$${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>

              {subtotal < 100 && (
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Add ${(100 - subtotal).toFixed(2)} more for <strong>FREE Express Shipping</strong>!
                </p>
              )}

              <div className="summary-row">
                <span>Estimated Sales Tax (7%)</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>

              <div className="summary-row total">
                <span>Total Amount</span>
                <span style={{ color: 'var(--accent-primary)' }}>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              Proceed to Checkout <FiArrowRight />
            </button>

            {/* Trust Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiShield style={{ color: 'var(--status-success)' }} /> 256-Bit Encrypted Secure Checkout
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiTruck style={{ color: 'var(--accent-primary)' }} /> 30-Day Guaranteed Returns
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
