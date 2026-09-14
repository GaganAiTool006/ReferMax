import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { FiHeart, FiShoppingBag, FiTrash2, FiArrowRight } from 'react-icons/fi';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { success } = useToast();

  const handleMoveToCart = (product) => {
    const defaultSize = (product.sizes && product.sizes[0]) || 9;
    const defaultColor = (product.colors && product.colors[0]?.name) || 'Standard';
    addToCart(product, defaultSize, defaultColor, 1);
    removeFromWishlist(product.id);
    success(`Moved ${product.name} to your Shopping Bag!`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="section-padding">
        <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <div className="card-glass" style={{ padding: '60px 20px' }}>
            <div className="logo-badge" style={{ width: '64px', height: '64px', margin: '0 auto 20px', fontSize: '1.75rem', background: 'var(--bg-tertiary)' }}>
              <FiHeart />
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '12px' }}>Your Wishlist is Empty</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Save your favorite sneakers, performance runners, and limited drops to keep track of them.
            </p>
            <Link to="/shop" className="btn btn-primary">
              Discover Footwear <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container">
        <div style={{ marginBottom: '32px' }}>
          <span className="section-tag"><FiHeart /> SAVED STYLES</span>
          <h1 className="section-title">My Wishlist ({wishlistItems.length} items)</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          <AnimatePresence>
            {wishlistItems.map((product) => {
              const currentPrice = product.discountPrice || product.price;
              const hasDiscount = product.discountPrice && product.discountPrice < product.price;

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="card-glass"
                  style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div style={{ position: 'relative', width: '100%', paddingTop: '100%', background: '#111' }}>
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="product-wishlist-btn active"
                      style={{ background: 'rgba(239, 68, 68, 0.85)', color: '#fff' }}
                      aria-label="Remove from wishlist"
                    >
                      <FiTrash2 />
                    </button>
                  </div>

                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        {product.brand || 'STEPX'}
                      </span>
                      <Link to={`/product/${product.id}`}>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff', margin: '4px 0 8px' }}>
                          {product.name}
                        </h3>
                      </Link>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#fff' }}>
                          ${currentPrice.toFixed(2)}
                        </span>
                        {hasDiscount && (
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <button
                        onClick={() => handleMoveToCart(product)}
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1 }}
                      >
                        <FiShoppingBag /> Move to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
