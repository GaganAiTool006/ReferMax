import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import ProductCard from '../../components/common/ProductCard';
import SizeGuideModal from '../../components/common/SizeGuideModal';
import ReviewModal from '../../components/common/ReviewModal';
import { 
  FiHeart, 
  FiShoppingBag, 
  FiZap, 
  FiStar, 
  FiCheck, 
  FiTruck, 
  FiRefreshCw, 
  FiShield, 
  FiInfo, 
  FiHelpCircle,
  FiMinus,
  FiPlus,
  FiEdit3
} from 'react-icons/fi';
import './ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addProductReview } = useData();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { warning } = useToast();

  const product = products.find(p => p.id === id);

  // States
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : 9);
  const [selectedColor, setSelectedColor] = useState(product?.colors ? product.colors[0]?.name : '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  if (!product) {
    return (
      <div className="container section-padding" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Shoe Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>The footwear model you requested does not exist or has been discontinued.</p>
        <Link to="/shop" className="btn btn-primary">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const isWishlisted = isInWishlist(product.id);
  const currentPrice = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const savings = hasDiscount ? (product.price - product.discountPrice).toFixed(2) : null;

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      warning('Please choose a shoe size');
      return;
    }
    addToCart(product, selectedSize, selectedColor || product.colors?.[0]?.name, quantity);
  };

  // Handle Buy Now (Instant Checkout)
  const handleBuyNow = () => {
    if (!selectedSize) {
      warning('Please choose a shoe size');
      return;
    }
    addToCart(product, selectedSize, selectedColor || product.colors?.[0]?.name, quantity);
    navigate('/checkout');
  };

  // Related products in same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="section-padding">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav style={{ display: 'flex', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '28px' }}>
          <Link to="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
          <span>/</span>
          <Link to="/shop" style={{ color: 'var(--text-secondary)' }}>Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} style={{ color: 'var(--text-secondary)' }}>{product.category}</Link>
          <span>/</span>
          <span style={{ color: '#fff', fontWeight: '600' }}>{product.name}</span>
        </nav>

        {/* Product Details Main Grid */}
        <div className="product-detail-layout">
          {/* Left Column: Multi-Angle Image Gallery */}
          <div className="product-gallery">
            <div className="main-image-viewport">
              <img
                src={galleryImages[selectedImageIndex] || product.image}
                alt={product.name}
                className="main-image-display"
              />
              {product.isLimited && (
                <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                  <span className="badge badge-accent">Limited Drop</span>
                </div>
              )}
            </div>

            {/* Thumbnail Switcher */}
            {galleryImages.length > 1 && (
              <div className="thumbnail-strip">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`thumbnail-item ${selectedImageIndex === idx ? 'active' : ''}`}
                    onClick={() => setSelectedImageIndex(idx)}
                    aria-label={`View angle ${idx + 1}`}
                  >
                    <img src={img} alt={`Angle ${idx + 1}`} className="thumbnail-img" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Options & Purchase Actions */}
          <div className="product-info-panel">
            <div className="product-info-header">
              <span className="product-brand">{product.brand || 'STEPX'} • {product.gender}</span>
              <h1 className="product-detail-title">{product.name}</h1>

              <div className="product-detail-rating">
                <div style={{ display: 'flex', gap: '3px', color: '#fbbf24' }}>
                  <FiStar style={{ fill: '#fbbf24' }} size={16} />
                </div>
                <span style={{ fontWeight: '700', color: '#fff' }}>{product.rating?.toFixed(1) || '4.8'}</span>
                <span style={{ color: 'var(--text-muted)' }}>({product.reviewsCount || 0} reviews)</span>
                <span style={{ color: 'var(--border-light)' }}>•</span>
                <span style={{ color: product.stock > 0 ? 'var(--status-success)' : 'var(--status-error)', fontWeight: '600', fontSize: '0.85rem' }}>
                  {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
                </span>
              </div>

              {/* Price & Savings */}
              <div className="product-pricing-box">
                <span className="price-big-current">${currentPrice.toFixed(2)}</span>
                {hasDiscount && (
                  <span className="price-big-original">${product.price.toFixed(2)}</span>
                )}
                {savings && (
                  <span className="price-savings-tag">Save ${savings} ({product.discountPercent}%)</span>
                )}
              </div>
            </div>

            {/* Colorway Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="picker-section">
                <div className="picker-header">
                  <span className="picker-label">Color: <strong style={{ color: 'var(--accent-primary)' }}>{selectedColor}</strong></span>
                </div>
                <div className="colors-selector-group">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      className={`color-option-button ${selectedColor === c.name ? 'active' : ''}`}
                      onClick={() => setSelectedColor(c.name)}
                    >
                      <span className="color-dot" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            <div className="picker-section">
              <div className="picker-header">
                <span className="picker-label">Select Size (US/UK)</span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="size-guide-trigger"
                >
                  <FiHelpCircle /> Size Guide
                </button>
              </div>

              <div className="sizes-grid-selector">
                {(product.sizes || [7, 8, 9, 10, 11, 12]).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    className={`size-choice-btn ${Number(selectedSize) === Number(sz) ? 'active' : ''}`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Action Buttons */}
            <div className="actions-row">
              <div className="qty-stepper">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-btn"
                  aria-label="Decrease quantity"
                >
                  <FiMinus />
                </button>
                <span className="qty-display">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="qty-btn"
                  aria-label="Increase quantity"
                >
                  <FiPlus />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="btn btn-primary"
                style={{ flex: 1, minWidth: '160px', height: '52px' }}
              >
                <FiShoppingBag /> Add to Cart
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="btn btn-secondary"
                style={{ flex: 1, minWidth: '140px', height: '52px' }}
              >
                <FiZap /> Buy Now
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`action-btn ${isWishlisted ? 'active' : ''}`}
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-md)',
                  background: isWishlisted ? 'var(--accent-primary)' : 'var(--bg-card)',
                  color: isWishlisted ? '#fff' : 'var(--text-primary)'
                }}
                aria-label="Wishlist"
              >
                <FiHeart style={{ fill: isWishlisted ? '#ffffff' : 'none' }} size={20} />
              </button>
            </div>

            {/* Trust Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginTop: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiTruck style={{ color: 'var(--accent-primary)', fontSize: '1.25rem' }} />
                <span style={{ fontSize: '0.85rem' }}>Free Express Delivery over $100</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiRefreshCw style={{ color: 'var(--status-info)', fontSize: '1.25rem' }} />
                <span style={{ fontSize: '0.85rem' }}>Hassle-Free 30-Day Returns</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiShield style={{ color: 'var(--status-success)', fontSize: '1.25rem' }} />
                <span style={{ fontSize: '0.85rem' }}>100% Certified Authentic</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiZap style={{ color: 'var(--accent-volt)', fontSize: '1.25rem' }} />
                <span style={{ fontSize: '0.85rem' }}>Energy Return Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info Section */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
          <div className="tab-nav">
            <button
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description & Technology
            </button>
            <button
              className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Specifications
            </button>
            <button
              className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
            >
              Shipping & Returns
            </button>
            <button
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Customer Reviews ({product.reviewsCount || 0})
            </button>
          </div>

          <div style={{ padding: '20px 0 40px', minHeight: '180px' }}>
            {activeTab === 'description' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '24px', maxWidth: '800px' }}>
                  {product.description}
                </p>
                {product.features && (
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '14px' }}>Key Engineering Highlights:</h4>
                    <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', listStyle: 'none' }}>
                      {product.features.map((f, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)' }}>
                          <FiCheck style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'specs' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div style={{ maxWidth: '600px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
                  {product.specs ? (
                    Object.entries(product.specs).map(([key, val], idx) => (
                      <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 20px', borderBottom: idx !== Object.entries(product.specs).length - 1 ? '1px solid var(--border-subtle)' : 'none', background: idx % 2 === 0 ? 'var(--bg-secondary)' : 'transparent' }}>
                        <span style={{ textTransform: 'capitalize', color: 'var(--text-muted)', fontWeight: '600' }}>
                          {key.replace(/([A-Z])/g, ' $1')}
                        </span>
                        <span style={{ color: '#fff', fontWeight: '600' }}>{val}</span>
                      </div>
                    ))
                  ) : (
                    <p style={{ padding: '20px', color: 'var(--text-secondary)' }}>Standard STEPX engineering specifications apply.</p>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'shipping' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '720px' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>Worldwide Express Delivery</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    Orders placed before 3:00 PM EST ship same-day. Free standard express delivery is automatically applied on orders of $100 or more. Estimated delivery time is 2-4 business days.
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>30-Day Guaranteed Trial</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    Take your STEPX footwear for a real spin. If you are not 100% satisfied with the comfort, fit, or energy return within 30 days, initiate an instant return with pre-paid return labels.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Customer Reviews</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Average rating of {product.rating} / 5.0 based on verified community purchases.</p>
                  </div>
                  <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="btn btn-outline btn-sm"
                  >
                    <FiEdit3 /> Write a Review
                  </button>
                </div>

                {product.reviews && product.reviews.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                    {product.reviews.map((rev) => (
                      <div key={rev.id} className="card-glass" style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <div>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff' }}>{rev.user}</h4>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rev.date}</span>
                          </div>
                          <div style={{ display: 'flex', color: '#fbbf24' }}>
                            {[...Array(rev.rating)].map((_, i) => (
                              <FiStar key={i} style={{ fill: '#fbbf24' }} size={14} />
                            ))}
                          </div>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>"{rev.comment}"</p>
                        {rev.verified && (
                          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--status-success)' }}>
                            <FiCheck size={12} /> Verified Buyer
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: '40px 20px', textAlign: 'center', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>No reviews yet for this model. Be the first to share your experience!</p>
                    <button onClick={() => setIsReviewModalOpen(true)} className="btn btn-primary btn-sm">
                      Write First Review
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '60px', borderTop: '1px solid var(--border-subtle)', paddingTop: '50px' }}>
            <div className="section-header">
              <div>
                <span className="section-tag"><FiZap /> COMPLEMENTARY GEAR</span>
                <h2 className="section-title">You May Also Like</h2>
              </div>
              <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="btn btn-outline btn-sm">
                More in {product.category}
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
              {relatedProducts.map(rel => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        selectedSize={selectedSize}
        onSelectSize={(sz) => setSelectedSize(sz)}
      />

      {/* Review Submission Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        product={product}
        onSubmitReview={(rev) => addProductReview(product.id, rev)}
      />
    </div>
  );
}
