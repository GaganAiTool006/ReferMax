import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useData } from '../../context/DataContext';
import { 
  FiSearch, 
  FiHeart, 
  FiShoppingBag, 
  FiUser, 
  FiMenu, 
  FiX, 
  FiLogOut, 
  FiPackage, 
  FiSliders,
  FiZap,
  FiChevronRight
} from 'react-icons/fi';
import './Navbar.css';

export default function Navbar() {
  const { currentUser, customerLogout, isManagerAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { products } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchInputRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname, location.search]);

  // Click outside listener for user dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock background body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Focus search input when modal opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  // Filter products for live search preview
  const searchResults = searchQuery.trim()
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-badge">
            <FiZap size={18} />
          </div>
          <span>STEP<span style={{ color: 'var(--accent-primary)' }}>X</span></span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav>
          <ul className="navbar-links">
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Shop All
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop?gender=Men" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Men
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop?gender=Women" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Women
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop?category=Kids+Shoes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Kids
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop?category=Sports+Shoes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Sports
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop?filter=new" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                New Arrivals
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop?filter=sale" className="nav-link sale">
                Sale 🔥
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="navbar-actions">
          {/* Search Trigger */}
          <button 
            className="action-btn"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search shoes"
          >
            <FiSearch />
          </button>

          {/* Wishlist */}
          <Link to="/wishlist" className="action-btn" aria-label="View Wishlist">
            <FiHeart />
            {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="action-btn" aria-label="View Cart">
            <FiShoppingBag />
            {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
          </Link>

          {/* User Profile Menu */}
          <div className="user-menu-wrapper" ref={userMenuRef}>
            <button
              className="action-btn"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              aria-label="User Account"
            >
              <FiUser />
            </button>

            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="user-dropdown"
                >
                  {currentUser ? (
                    <>
                      <div className="dropdown-user-header">
                        <p className="dropdown-user-name">{currentUser.displayName || 'STEPX Member'}</p>
                        <p className="dropdown-user-email">{currentUser.email}</p>
                      </div>
                      <Link to="/profile" className="dropdown-item">
                        <FiUser /> My Profile
                      </Link>
                      <Link to="/orders" className="dropdown-item">
                        <FiPackage /> My Orders
                      </Link>
                      <Link to="/wishlist" className="dropdown-item">
                        <FiHeart /> Wishlist ({wishlistCount})
                      </Link>
                      <button onClick={customerLogout} className="dropdown-item logout">
                        <FiLogOut /> Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="dropdown-item">
                        <FiUser /> Customer Login
                      </Link>
                      <Link to="/register" className="dropdown-item">
                        <FiZap /> Create Account
                      </Link>
                      <div style={{ borderTop: '1px solid var(--border-subtle)', margin: '4px 0' }} />
                      <Link to="/manager/login" className="dropdown-item" style={{ color: 'var(--accent-primary)' }}>
                        <FiSliders /> Manager Portal
                      </Link>
                    </>
                  )}

                  {isManagerAuthenticated && (
                    <Link to="/manager/dashboard" className="dropdown-item" style={{ color: 'var(--accent-volt)', borderTop: '1px solid var(--border-subtle)' }}>
                      <FiSliders /> Go to Manager Dashboard
                    </Link>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button 
            type="button"
            className="action-btn hamburger-btn"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <FiMenu size={20} />
          </button>
        </div>
      </div>

      {/* Interactive Search Overlay Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="search-modal-backdrop"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="search-modal-box"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearchSubmit} className="search-input-group">
                <FiSearch className="search-leading-icon" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search shoes by model, sport, color..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input-field"
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="search-clear-btn"
                  aria-label="Close search"
                >
                  <FiX />
                </button>
              </form>

              {/* Instant Search Suggestions */}
              {searchResults.length > 0 && (
                <div className="search-results-list">
                  {searchResults.map((item) => (
                    <Link
                      key={item.id}
                      to={`/product/${item.id}`}
                      className="search-result-item"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <img src={item.image} alt={item.name} className="search-thumb" />
                      <div className="search-item-info">
                        <h4 className="search-item-name">{item.name}</h4>
                        <span className="search-item-meta">{item.category} • {item.gender}</span>
                      </div>
                      <span className="search-item-price">${(item.discountPrice || item.price).toFixed(2)}</span>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Responsive Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mobile-nav-overlay"
              onClick={closeMobileMenu}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.22, ease: 'easeOut' }}
              className="mobile-nav-drawer"
            >
              <div>
                <div className="mobile-nav-header">
                  <div className="navbar-logo">
                    <div className="logo-badge">
                      <FiZap size={16} />
                    </div>
                    <span>STEP<span style={{ color: 'var(--accent-primary)' }}>X</span></span>
                  </div>
                  <button 
                    type="button"
                    onClick={closeMobileMenu}
                    className="action-btn"
                    aria-label="Close navigation"
                  >
                    <FiX size={18} />
                  </button>
                </div>

                <ul className="mobile-nav-links">
                  <li>
                    <NavLink to="/" onClick={closeMobileMenu} className="mobile-nav-link">
                      <span>Home</span>
                      <FiChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/shop" onClick={closeMobileMenu} className="mobile-nav-link">
                      <span>All Footwear</span>
                      <FiChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/shop?gender=Men" onClick={closeMobileMenu} className="mobile-nav-link">
                      <span>Men's Shoes</span>
                      <FiChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/shop?gender=Women" onClick={closeMobileMenu} className="mobile-nav-link">
                      <span>Women's Shoes</span>
                      <FiChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/shop?category=Kids+Shoes" onClick={closeMobileMenu} className="mobile-nav-link">
                      <span>Kids Collection</span>
                      <FiChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/shop?category=Sports+Shoes" onClick={closeMobileMenu} className="mobile-nav-link">
                      <span>Sports & Performance</span>
                      <FiChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/shop?filter=new" onClick={closeMobileMenu} className="mobile-nav-link">
                      <span>New Arrivals</span>
                      <FiChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/shop?filter=sale" onClick={closeMobileMenu} className="mobile-nav-link" style={{ color: 'var(--accent-primary)', fontWeight: '700' }}>
                      <span>Flash Sale 🔥</span>
                      <FiChevronRight size={16} style={{ color: 'var(--accent-primary)' }} />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about" onClick={closeMobileMenu} className="mobile-nav-link">
                      <span>About Us</span>
                      <FiChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact" onClick={closeMobileMenu} className="mobile-nav-link">
                      <span>Contact & Support</span>
                      <FiChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                    </NavLink>
                  </li>
                </ul>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', marginTop: '16px' }}>
                {currentUser ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      Signed in as <strong>{currentUser.displayName}</strong>
                    </p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link to="/profile" onClick={closeMobileMenu} className="btn btn-dark btn-sm" style={{ flex: 1 }}>
                        Profile
                      </Link>
                      <Link to="/orders" onClick={closeMobileMenu} className="btn btn-dark btn-sm" style={{ flex: 1 }}>
                        Orders
                      </Link>
                    </div>
                    <button 
                      onClick={() => { customerLogout(); closeMobileMenu(); }} 
                      className="btn btn-outline btn-sm" 
                      style={{ width: '100%', color: 'var(--status-error)', borderColor: 'rgba(239,68,68,0.3)', marginTop: '4px' }}
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link to="/login" onClick={closeMobileMenu} className="btn btn-dark btn-sm" style={{ flex: 1 }}>
                      Login
                    </Link>
                    <Link to="/register" onClick={closeMobileMenu} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                      Sign Up
                    </Link>
                  </div>
                )}
                
                <div style={{ marginTop: '12px', textAlign: 'center' }}>
                  <Link to="/manager/login" onClick={closeMobileMenu} style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Operations & Manager Login →
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
