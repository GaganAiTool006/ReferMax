import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { FiHeart, FiShoppingBag, FiStar } from 'react-icons/fi';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);
  const currentPrice = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = (product.sizes && product.sizes[0]) || 9;
    const defaultColor = (product.colors && product.colors[0]?.name) || 'Standard';
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-image-wrapper">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-card-img" 
          loading="lazy" 
        />

        {/* Badges */}
        <div className="product-badges">
          {product.isLimited && (
            <span className="badge badge-accent">Limited Drop</span>
          )}
          {hasDiscount && (
            <span className="badge badge-dark">
              -{product.discountPercent || Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
            </span>
          )}
          {product.isNew && !product.isLimited && (
            <span className="badge badge-accent" style={{ background: 'var(--status-info)' }}>New</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`product-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FiHeart style={{ fill: isWishlisted ? '#ffffff' : 'none' }} />
        </button>
      </Link>

      <div className="product-card-body">
        <div>
          <div className="product-card-meta">
            <span className="product-brand">{product.brand || 'STEPX'}</span>
            <div className="product-rating">
              <FiStar style={{ fill: '#fbbf24' }} size={13} />
              <span>{product.rating?.toFixed(1) || '4.8'}</span>
              <span className="product-rating-count">({product.reviewsCount || 0})</span>
            </div>
          </div>

          <Link to={`/product/${product.id}`}>
            <h3 className="product-name">{product.name}</h3>
          </Link>

          {/* Color previews */}
          {product.colors && product.colors.length > 0 && (
            <div className="product-card-colors">
              {product.colors.slice(0, 4).map((c, idx) => (
                <span
                  key={idx}
                  className="color-dot"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="product-card-footer">
          <div className="product-pricing">
            <span className="product-price-current">${currentPrice.toFixed(2)}</span>
            {hasDiscount && (
              <span className="product-price-original">${product.price.toFixed(2)}</span>
            )}
          </div>

          <button 
            onClick={handleQuickAdd}
            className="quick-add-btn"
            aria-label="Quick Add to Bag"
          >
            <FiShoppingBag size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
