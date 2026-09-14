import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { 
  FiZap, 
  FiInstagram, 
  FiTwitter, 
  FiFacebook, 
  FiYoutube, 
  FiSend,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiAward
} from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { success, warning } = useToast();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      warning('Please enter a valid email address');
      return;
    }
    success('Welcome to STEPX VIP Club! Check your inbox for a 15% promo code.');
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Trust Badges Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          paddingBottom: '50px',
          marginBottom: '50px',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="logo-badge" style={{ width: '44px', height: '44px' }}>
              <FiTruck size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>Free Global Express</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>On all orders exceeding $100</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="logo-badge" style={{ width: '44px', height: '44px', background: 'var(--status-info)' }}>
              <FiRefreshCw size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>30-Day Free Returns</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No questions asked return policy</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="logo-badge" style={{ width: '44px', height: '44px', background: 'var(--status-success)' }}>
              <FiShield size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>100% Authentic Guaranteed</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Direct from verified artisan labs</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="logo-badge" style={{ width: '44px', height: '44px', background: 'var(--accent-volt)', color: '#000' }}>
              <FiAward size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>Lifetime Craftsmanship</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Engineered for elite durability</p>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="logo-badge">
                <FiZap size={22} />
              </div>
              <span>STEP<span style={{ color: 'var(--accent-primary)' }}>X</span></span>
            </Link>
            <p className="footer-desc">
              Next-generation athletic propulsion and sartorial footwear craftsmanship. Engineered for marathoners, tastemakers, and everyday pioneers.
            </p>
            <div className="footer-socials">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Instagram">
                <FiInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Twitter">
                <FiTwitter />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook">
                <FiFacebook />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="YouTube">
                <FiYoutube />
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="footer-col-title">Categories</h4>
            <ul className="footer-links">
              <li><Link to="/shop?category=Running+Shoes" className="footer-link">Running Shoes</Link></li>
              <li><Link to="/shop?category=Sneakers" className="footer-link">Lifestyle Sneakers</Link></li>
              <li><Link to="/shop?category=Basketball+Shoes" className="footer-link">Basketball Shoes</Link></li>
              <li><Link to="/shop?category=Training+Shoes" className="footer-link">CrossFit & Gym</Link></li>
              <li><Link to="/shop?category=Formal+Shoes" className="footer-link">Formal Leather</Link></li>
              <li><Link to="/shop?category=Sandals" className="footer-link">Recovery Slides</Link></li>
              <li><Link to="/shop?category=Kids+Shoes" className="footer-link">Kids Collection</Link></li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="footer-col-title">Customer Care</h4>
            <ul className="footer-links">
              <li><Link to="/orders" className="footer-link">Track Your Order</Link></li>
              <li><Link to="/about" className="footer-link">About STEPX</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Support</Link></li>
              <li><Link to="/contact#faq" className="footer-link">Shipping & Returns FAQ</Link></li>
              <li><Link to="/profile" className="footer-link">My Account</Link></li>
              <li><Link to="/wishlist" className="footer-link">Saved Wishlist</Link></li>
              <li><Link to="/manager/login" className="footer-link" style={{ color: 'var(--text-muted)' }}>Staff Portal</Link></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <div className="newsletter-box">
              <h4 className="footer-col-title" style={{ marginBottom: '8px' }}>Join the Drop List</h4>
              <p>Subscribe for exclusive early-access release drops, private flash discounts, and sneakerhead news.</p>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="btn btn-primary btn-sm" aria-label="Subscribe">
                  <FiSend />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} STEPX Footwear Laboratories Inc. All rights reserved. Designed with precision.
          </p>
          <div className="payment-badges">
            <span className="payment-pill">VISA</span>
            <span className="payment-pill">Mastercard</span>
            <span className="payment-pill">AMEX</span>
            <span className="payment-pill">Apple Pay</span>
            <span className="payment-pill">Google Pay</span>
            <span className="payment-pill">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
