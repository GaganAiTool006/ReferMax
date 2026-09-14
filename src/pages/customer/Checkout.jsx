import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import confetti from 'canvas-confetti';
import { 
  FiUser, 
  FiMapPin, 
  FiCreditCard, 
  FiTruck, 
  FiCheckCircle, 
  FiLock, 
  FiShield, 
  FiSmartphone, 
  FiDollarSign,
  FiShoppingBag
} from 'react-icons/fi';
import './Checkout.css';

export default function Checkout() {
  const { currentUser } = useAuth();
  const { 
    cartItems, 
    subtotal, 
    discount, 
    appliedCoupon, 
    deliveryFee, 
    estimatedTax, 
    total, 
    clearCart 
  } = useCart();
  const { placeOrder } = useData();
  const { success, warning } = useToast();
  const navigate = useNavigate();

  // Contact Form State
  const [formData, setFormData] = useState({
    fullName: currentUser?.displayName || 'Marcus Vance',
    email: currentUser?.email || 'marcus.v@example.com',
    phone: currentUser?.phoneNumber || '+1 (555) 234-8901',
    street: currentUser?.addresses?.[0]?.street || '742 Evergreen Terrace, Apt 4B',
    city: currentUser?.addresses?.[0]?.city || 'San Francisco',
    state: currentUser?.addresses?.[0]?.state || 'CA',
    zip: currentUser?.addresses?.[0]?.zip || '94107',
    country: currentUser?.addresses?.[0]?.country || 'United States'
  });

  // Shipping & Payment States
  const [shippingMethod, setShippingMethod] = useState('express'); // 'express' (free/$0) | 'priority' (+$15)
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'upi' | 'applepay' | 'cod'
  const [isProcessing, setIsProcessing] = useState(false);

  // Card info state for simulation
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '4242 •••• •••• 4242',
    cardName: currentUser?.displayName || 'MARCUS VANCE',
    cardExpiry: '08/28',
    cardCvc: '888'
  });

  const [upiId, setUpiId] = useState('stepx@okaxis');

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Pricing calculations adjusted with priority shipping if chosen
  const finalShippingFee = shippingMethod === 'priority' ? deliveryFee + 15 : deliveryFee;
  const finalCheckoutTotal = Number((total + (shippingMethod === 'priority' ? 15 : 0)).toFixed(2));

  // Place Order Handler
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.street || !formData.city || !formData.zip) {
      warning('Please complete all required shipping fields');
      return;
    }

    if (cartItems.length === 0) {
      warning('Your cart is empty');
      navigate('/shop');
      return;
    }

    setIsProcessing(true);

    // Simulate secure transaction network roundtrip
    setTimeout(() => {
      let paymentLabel = 'Credit Card (•••• 4242)';
      if (paymentMethod === 'upi') paymentLabel = `UPI (${upiId})`;
      if (paymentMethod === 'applepay') paymentLabel = 'Apple Pay / Digital Wallet';
      if (paymentMethod === 'cod') paymentLabel = 'Cash on Delivery';

      const orderPayload = {
        customer: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            country: formData.country
          }
        },
        items: cartItems,
        subtotal,
        discount,
        shippingFee: finalShippingFee,
        total: finalCheckoutTotal,
        couponCode: appliedCoupon ? appliedCoupon.code : '',
        paymentMethod: paymentLabel,
        paymentStatus: paymentMethod === 'cod' ? 'Pending (COD)' : 'Paid'
      };

      const newOrder = placeOrder(orderPayload);
      clearCart();
      setIsProcessing(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback gracefully
      }

      success(`Order #${newOrder.id} successfully placed!`);
      navigate(`/order-success/${newOrder.id}`, { state: { order: newOrder } });
    }, 1200);
  };

  if (cartItems.length === 0) {
    return (
      <div className="section-padding">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>No Items in Bag</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Please add shoes to your cart before proceeding to checkout.</p>
          <Link to="/shop" className="btn btn-primary">Go to Catalog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <span className="section-tag"><FiLock /> ENCRYPTED CHECKOUT</span>
          <h1 className="section-title">Secure Checkout</h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="checkout-grid">
          {/* Left Column: Form Steps */}
          <div className="checkout-steps-wrapper">
            {/* Step 1: Customer Contact Info */}
            <div className="checkout-step-card">
              <div className="step-card-header">
                <span className="step-number-badge">1</span>
                <h2 className="step-title">Customer Information</h2>
              </div>

              <div className="form-grid-3">
                <div className="form-field-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-field-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-field-group">
                  <label>Mobile Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="checkout-step-card">
              <div className="step-card-header">
                <span className="step-number-badge">2</span>
                <h2 className="step-title">Shipping Address</h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-field-group">
                  <label>Street Address / Apartment / Suite *</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-grid-3">
                  <div className="form-field-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-field-group">
                    <label>State / Province *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-field-group">
                    <label>PIN / ZIP Code *</label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-field-group">
                  <label>Country *</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Australia">Australia</option>
                    <option value="Japan">Japan</option>
                    <option value="India">India</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Delivery Speed */}
            <div className="checkout-step-card">
              <div className="step-card-header">
                <span className="step-number-badge">3</span>
                <h2 className="step-title">Delivery Method</h2>
              </div>

              <div className="delivery-options-grid">
                <div 
                  className={`delivery-tile ${shippingMethod === 'express' ? 'selected' : ''}`}
                  onClick={() => setShippingMethod('express')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: '#fff', fontSize: '0.95rem' }}>Standard Express</strong>
                    <span style={{ color: 'var(--status-success)', fontWeight: '700' }}>
                      {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Estimated delivery in 2-4 business days via DHL Express
                  </p>
                </div>

                <div 
                  className={`delivery-tile ${shippingMethod === 'priority' ? 'selected' : ''}`}
                  onClick={() => setShippingMethod('priority')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: '#fff', fontSize: '0.95rem' }}>Priority Overnight</strong>
                    <span style={{ color: 'var(--accent-primary)', fontWeight: '700' }}>+$15.00</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Guaranteed next-morning delivery before 10:30 AM
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4: Payment Method UI */}
            <div className="checkout-step-card">
              <div className="step-card-header">
                <span className="step-number-badge">4</span>
                <h2 className="step-title">Payment Method</h2>
              </div>

              {/* Payment selector tabs */}
              <div className="payment-tabs-grid">
                <button
                  type="button"
                  className={`payment-tab-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <FiCreditCard className="payment-tab-icon" />
                  <span>Credit Card</span>
                </button>

                <button
                  type="button"
                  className={`payment-tab-btn ${paymentMethod === 'applepay' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('applepay')}
                >
                  <FiSmartphone className="payment-tab-icon" />
                  <span>Apple / GPay</span>
                </button>

                <button
                  type="button"
                  className={`payment-tab-btn ${paymentMethod === 'upi' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <FiSmartphone className="payment-tab-icon" />
                  <span>UPI / Instant</span>
                </button>

                <button
                  type="button"
                  className={`payment-tab-btn ${paymentMethod === 'cod' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <FiDollarSign className="payment-tab-icon" />
                  <span>Cash on Delivery</span>
                </button>
              </div>

              {/* Payment Inputs */}
              {paymentMethod === 'card' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div className="form-field-group">
                    <label>Card Number</label>
                    <input
                      type="text"
                      value={cardInfo.cardNumber}
                      onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>

                  <div className="form-grid-3">
                    <div className="form-field-group" style={{ gridColumn: 'span 2' }}>
                      <label>Cardholder Name</label>
                      <input
                        type="text"
                        value={cardInfo.cardName}
                        onChange={(e) => setCardInfo({ ...cardInfo, cardName: e.target.value })}
                      />
                    </div>

                    <div className="form-field-group">
                      <label>CVV / CVC</label>
                      <input
                        type="password"
                        maxLength="4"
                        value={cardInfo.cardCvc}
                        onChange={(e) => setCardInfo({ ...cardInfo, cardCvc: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div className="form-field-group">
                    <label>Enter UPI ID / VPA</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@okhdfcbank"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'applepay' && (
                <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Biometric fingerprint or FaceID token will be prompted upon placing order.
                  </p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Pay with cash or card to the delivery courier when your package arrives at your doorstep.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Checkout Summary & Place Order */}
          <div className="checkout-order-summary">
            <h3 className="summary-title">Review Order</h3>

            {/* Items mini list */}
            <div className="checkout-items-list">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="checkout-item-mini">
                  <img src={item.image} alt={item.name} className="checkout-item-thumb" />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#fff' }}>{item.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Size {item.size} • Qty {item.quantity}
                    </span>
                  </div>
                  <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Summary lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="summary-row" style={{ color: 'var(--status-success)' }}>
                  <span>Promo Discount ({appliedCoupon?.code})</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Shipping</span>
                <span>
                  {finalShippingFee === 0 ? (
                    <strong style={{ color: 'var(--status-success)' }}>FREE</strong>
                  ) : (
                    `$${finalShippingFee.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="summary-row">
                <span>Estimated Sales Tax</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>

              <div className="summary-row total">
                <span>Total Due</span>
                <span style={{ color: 'var(--accent-primary)' }}>${finalCheckoutTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', height: '56px' }}
            >
              {isProcessing ? 'Processing Payment...' : `Authorize & Place Order • $${finalCheckoutTotal.toFixed(2)}`}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <FiShield style={{ color: 'var(--status-success)' }} /> Verified 256-Bit SSL Encrypted
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
