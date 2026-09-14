import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import ProductCard from '../../components/common/ProductCard';
import { 
  FiArrowRight, 
  FiZap, 
  FiAward, 
  FiCheckCircle, 
  FiTrendingUp, 
  FiShield, 
  FiStar, 
  FiSend,
  FiActivity
} from 'react-icons/fi';
import './Home.css';

export default function Home() {
  const { products, reviews } = useData();
  const { success, warning } = useToast();

  // VIP Newsletter input state
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Countdown timer for Limited Edition Drop (Simulated 24-day drop)
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 8,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleVipSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      warning('Please enter a valid email address');
      return;
    }
    success('VIP Access Granted! 20% discount coupon "VIP20" unlocked.');
    setNewsletterEmail('');
  };

  // Product category filters
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const trendingShoes = products.filter(p => p.isTrending).slice(0, 4);
  const sportsCollection = products.filter(p => p.category === 'Sports Shoes' || p.category === 'Running Shoes' || p.category === 'Basketball Shoes').slice(0, 4);

  return (
    <div>
      {/* 1. HERO BANNER */}
      <section className="hero-section">
        <div className="container hero-grid">
          {/* Left Text Column */}
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-badge-tag">
              <FiZap /> STEPX PERFORMANCE LABS 2026
            </div>

            <h1 className="hero-title">
              PROPEL YOUR <br />
              <span>LIMITLESS SPEED.</span>
            </h1>

            <p className="hero-desc">
              Precision-crafted footwear engineered with dual-density carbon composite plates and breathable aerodynamic mesh. Elevate your everyday motion.
            </p>

            <div className="hero-cta-group">
              <Link to="/shop?gender=Men" className="btn btn-primary btn-lg">
                Shop Men <FiArrowRight />
              </Link>
              <Link to="/shop?gender=Women" className="btn btn-secondary btn-lg">
                Shop Women
              </Link>
            </div>

            <div className="hero-stats-row">
              <div className="hero-stat-item">
                <h3>198g</h3>
                <p>Featherweight Carbon</p>
              </div>
              <div className="hero-stat-item">
                <h3>85%</h3>
                <p>Energy Return Rate</p>
              </div>
              <div className="hero-stat-item">
                <h3>4.9★</h3>
                <p>Over 12,000+ Reviews</p>
              </div>
            </div>
          </motion.div>

          {/* Right Showcase Visual */}
          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="hero-shoe-card">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80"
                alt="STEPX VaporFly Apex Pro"
                className="hero-shoe-main-img"
              />

              <div className="hero-floating-badge">
                <div className="floating-icon">
                  <FiAward />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>VaporFly Apex Pro</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: '600' }}>
                    $149.99 <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through' }}>$189.99</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CATEGORIES SHOWCASE TILES */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-tag"><FiActivity /> CURATED CATEGORIES</span>
              <h2 className="section-title">Explore by Discipline</h2>
              <p className="section-subtitle">From marathon courses to street couture, find footwear built for your world.</p>
            </div>
            <Link to="/shop" className="btn btn-outline btn-sm">
              View All Categories <FiArrowRight />
            </Link>
          </div>

          <div className="category-card-grid">
            <Link to="/shop?category=Running+Shoes" className="category-tile">
              <img 
                src="https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80" 
                alt="Running" 
                className="category-tile-bg" 
              />
              <div className="category-tile-content">
                <h3 className="category-tile-name">Running</h3>
                <span className="category-tile-link">Explore Gear <FiArrowRight /></span>
              </div>
            </Link>

            <Link to="/shop?category=Sneakers" className="category-tile">
              <img 
                src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80" 
                alt="Sneakers" 
                className="category-tile-bg" 
              />
              <div className="category-tile-content">
                <h3 className="category-tile-name">Sneakers</h3>
                <span className="category-tile-link">Explore Street <FiArrowRight /></span>
              </div>
            </Link>

            <Link to="/shop?category=Basketball+Shoes" className="category-tile">
              <img 
                src="https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=600&q=80" 
                alt="Basketball" 
                className="category-tile-bg" 
              />
              <div className="category-tile-content">
                <h3 className="category-tile-name">Basketball</h3>
                <span className="category-tile-link">Explore Court <FiArrowRight /></span>
              </div>
            </Link>

            <Link to="/shop?category=Training+Shoes" className="category-tile">
              <img 
                src="https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80" 
                alt="Training" 
                className="category-tile-bg" 
              />
              <div className="category-tile-content">
                <h3 className="category-tile-name">Training & Gym</h3>
                <span className="category-tile-link">Explore Gym <FiArrowRight /></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-tag"><FiZap /> FRESH RELEASES</span>
              <h2 className="section-title">New Arrivals</h2>
              <p className="section-subtitle">The latest silhouettes and innovative foam technologies fresh out of our design lab.</p>
            </div>
            <Link to="/shop?filter=new" className="btn btn-outline btn-sm">
              See All New <FiArrowRight />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. LIMITED EDITION PROMOTIONAL BANNER WITH COUNTDOWN */}
      <section className="section-padding" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="limited-banner">
            <div>
              <span className="badge badge-accent" style={{ marginBottom: '12px' }}>
                EXCLUSIVE WORLDWIDE DROP
              </span>
              <h2 style={{ fontSize: '2.4rem', fontWeight: '800', marginBottom: '12px' }}>
                QUANTUM CARBON X
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6' }}>
                Only 500 numbered pairs crafted globally. Featuring autoclave cured carbon propulsion matrix with supercritical nitrogen hyper-foam.
              </p>

              <div className="countdown-box-grid">
                <div className="countdown-unit">
                  <div className="countdown-num">{String(timeLeft.days).padStart(2, '0')}</div>
                  <div className="countdown-lbl">Days</div>
                </div>
                <div className="countdown-unit">
                  <div className="countdown-num">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="countdown-lbl">Hours</div>
                </div>
                <div className="countdown-unit">
                  <div className="countdown-num">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="countdown-lbl">Mins</div>
                </div>
                <div className="countdown-unit">
                  <div className="countdown-num">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="countdown-lbl">Secs</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link to="/product/stepx-ltd-01" className="btn btn-primary">
                  Reserve Pair ($249.99) <FiArrowRight />
                </Link>
                <Link to="/shop?category=Running+Shoes" className="btn btn-outline">
                  View Specs
                </Link>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <img
                src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80"
                alt="Limited Drop"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: '0 20px 50px rgba(255, 70, 0, 0.25)',
                  border: '1px solid rgba(255, 70, 0, 0.4)',
                  width: '100%',
                  maxHeight: '340px',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. BEST SELLERS */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-tag"><FiTrendingUp /> COMMUNITY FAVORITES</span>
              <h2 className="section-title">Best Sellers</h2>
              <p className="section-subtitle">Our most coveted styles trusted by thousands of athletes and sneaker enthusiasts.</p>
            </div>
            <Link to="/shop?filter=bestseller" className="btn btn-outline btn-sm">
              View All Best Sellers <FiArrowRight />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. TRENDING & SPORTS SPOTLIGHT */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-tag"><FiAward /> PRO PERFORMANCE</span>
              <h2 className="section-title">Trending in Sports & Court</h2>
              <p className="section-subtitle">Engineered for intense lateral stability, court grip, and explosive takeoff.</p>
            </div>
            <Link to="/shop?category=Sports+Shoes" className="btn btn-outline btn-sm">
              Explore Sports <FiArrowRight />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {sportsCollection.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', justifyContent: 'center', marginBottom: '50px' }}>
            <div>
              <span className="section-tag"><FiStar /> VERIFIED ATHLETE FEEDBACK</span>
              <h2 className="section-title">Tested by Pioneers</h2>
              <p className="section-subtitle" style={{ margin: '8px auto 0' }}>
                Hear what marathon runners, fitness coaches, and street stylists say about STEPX.
              </p>
            </div>
          </div>

          <div className="reviews-grid">
            {reviews.map((rev) => (
              <div key={rev.id} className="review-card">
                <div>
                  <div className="review-header">
                    <img src={rev.avatar} alt={rev.author} className="review-avatar" />
                    <div>
                      <h4 className="review-author-name">{rev.author}</h4>
                      <p className="review-author-role">{rev.role}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '3px', margin: '14px 0 10px', color: '#fbbf24' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <FiStar key={i} style={{ fill: '#fbbf24' }} size={16} />
                    ))}
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '8px' }}>
                    "{rev.title}"
                  </h4>
                  <p className="review-text">"{rev.comment}"</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
                  <span className="review-product-tag">Verified on {rev.product}</span>
                  <FiCheckCircle style={{ color: 'var(--status-success)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. VIP NEWSLETTER PROMO BANNER */}
      <section className="section-padding">
        <div className="container">
          <div className="vip-banner">
            <span className="section-tag" style={{ justifyContent: 'center' }}>
              <FiZap /> STEPX VIP MEMBERSHIP
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '12px 0' }}>
              Unlock 20% Off Your First Order
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '28px', maxWidth: '540px', marginInline: 'auto' }}>
              Join over 50,000 members for priority drops, member-only pricing, free express shipping, and birthday rewards.
            </p>

            <form onSubmit={handleVipSubmit} style={{ display: 'flex', gap: '10px', maxWidth: '480px', margin: '0 auto', flexWrap: 'wrap' }}>
              <input
                type="email"
                placeholder="Enter your personal email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{ flex: 1, minWidth: '240px' }}
                required
              />
              <button type="submit" className="btn btn-primary">
                Claim VIP Pass <FiSend />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
