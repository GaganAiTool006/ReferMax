import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import ProductCard from '../../components/common/ProductCard';
import { productCategories, shoeSizes } from '../../data/products';
import { 
  FiFilter, 
  FiX, 
  FiSliders, 
  FiRotateCcw, 
  FiSearch,
  FiShoppingBag,
  FiStar
} from 'react-icons/fi';
import './Shop.css';

const COLOR_OPTIONS = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Red', hex: '#ef4444' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Green', hex: '#10b981' },
  { name: 'Volt', hex: '#ccff00' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'Brown', hex: '#78350f' }
];

export default function Shop() {
  const { products } = useData();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query Parameters
  const initialCategory = searchParams.get('category') || 'All Shoes';
  const initialGender = searchParams.get('gender') || 'All';
  const initialSearch = searchParams.get('search') || '';
  const initialFilter = searchParams.get('filter') || '';

  // Local Filter States
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedGender, setSelectedGender] = useState(initialGender);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [maxPrice, setMaxPrice] = useState(300);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popular');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync state if searchParams change
  useEffect(() => {
    if (searchParams.get('category')) setSelectedCategory(searchParams.get('category'));
    if (searchParams.get('gender')) setSelectedGender(searchParams.get('gender'));
  }, [searchParams]);

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedCategory('All Shoes');
    setSelectedGender('All');
    setSelectedSize(null);
    setSelectedColor(null);
    setMaxPrice(300);
    setMinRating(0);
    setSearchParams({});
  };

  // Filter and Sort Engine
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // 1. Search Query Filter
      if (initialSearch.trim()) {
        const query = initialSearch.toLowerCase();
        const matchesQuery = 
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.gender.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // 2. Special URL tags (new, sale, bestseller)
      if (initialFilter === 'new' && !product.isNew) return false;
      if (initialFilter === 'sale' && (!product.discountPrice || product.discountPrice >= product.price)) return false;
      if (initialFilter === 'bestseller' && !product.isBestSeller) return false;

      // 3. Category Filter
      if (selectedCategory !== 'All Shoes' && product.category !== selectedCategory) {
        return false;
      }

      // 4. Gender Filter
      if (selectedGender !== 'All') {
        if (product.gender !== selectedGender && product.gender !== 'Unisex') {
          return false;
        }
      }

      // 5. Size Filter
      if (selectedSize !== null) {
        if (!product.sizes || !product.sizes.includes(selectedSize)) {
          return false;
        }
      }

      // 6. Color Filter
      if (selectedColor !== null) {
        const hasColor = product.colors && product.colors.some(c => 
          c.name.toLowerCase().includes(selectedColor.toLowerCase())
        );
        if (!hasColor) return false;
      }

      // 7. Max Price Filter
      const effectivePrice = product.discountPrice || product.price;
      if (effectivePrice > maxPrice) {
        return false;
      }

      // 8. Min Rating Filter
      if (minRating > 0 && (product.rating || 0) < minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;

      switch (sortBy) {
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'price-low':
          return priceA - priceB;
        case 'price-high':
          return priceB - priceA;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'popular':
        default:
          return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      }
    });
  }, [
    products, 
    initialSearch, 
    initialFilter, 
    selectedCategory, 
    selectedGender, 
    selectedSize, 
    selectedColor, 
    maxPrice, 
    minRating, 
    sortBy
  ]);

  // Sidebar Filter Form Component
  const FilterContent = (
    <div className="filter-inner-form">
      <div className="filters-header">
        <h3 className="filters-header-title">
          <FiSliders /> Filters
        </h3>
        <button onClick={handleResetFilters} className="clear-filters-btn">
          Reset All
        </button>
      </div>

      {/* Category */}
      <div className="filter-group" style={{ marginTop: '16px' }}>
        <h4 className="filter-title">Category</h4>
        <ul className="filter-list">
          {productCategories.map(cat => (
            <li key={cat}>
              <label className="filter-option-label">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(cat)}
                  className="filter-checkbox"
                />
                <span>{cat}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Gender */}
      <div className="filter-group">
        <h4 className="filter-title">Gender / Fit</h4>
        <ul className="filter-list">
          {['All', 'Men', 'Women', 'Kids', 'Unisex'].map(gender => (
            <li key={gender}>
              <label className="filter-option-label">
                <input
                  type="radio"
                  name="gender"
                  checked={selectedGender === gender}
                  onChange={() => setSelectedGender(gender)}
                  className="filter-checkbox"
                />
                <span>{gender}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Sizes */}
      <div className="filter-group">
        <h4 className="filter-title">Shoe Size (US/UK)</h4>
        <div className="sizes-chips-grid">
          {shoeSizes.map(sz => (
            <button
              key={sz}
              type="button"
              className={`size-chip ${selectedSize === sz ? 'selected' : ''}`}
              onClick={() => setSelectedSize(selectedSize === sz ? null : sz)}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="filter-group">
        <h4 className="filter-title">Colorway</h4>
        <div className="colors-filter-row">
          {COLOR_OPTIONS.map(c => (
            <button
              key={c.name}
              type="button"
              className={`color-filter-btn ${selectedColor === c.name ? 'selected' : ''}`}
              style={{ backgroundColor: c.hex }}
              onClick={() => setSelectedColor(selectedColor === c.name ? null : c.name)}
              title={c.name}
            />
          ))}
        </div>
      </div>

      {/* Price Slider */}
      <div className="filter-group">
        <div className="price-labels-row">
          <span className="filter-title">Max Price</span>
          <span style={{ color: 'var(--accent-primary)', fontWeight: '700' }}>${maxPrice}</span>
        </div>
        <input
          type="range"
          min="40"
          max="300"
          step="10"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="price-range-input"
        />
        <div className="price-labels-row" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>$40</span>
          <span>$300</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="filter-group">
        <h4 className="filter-title">Customer Rating</h4>
        <ul className="filter-list">
          {[
            { val: 0, label: 'All Ratings' },
            { val: 4.8, label: '4.8★ & Above' },
            { val: 4.5, label: '4.5★ & Above' },
            { val: 4.0, label: '4.0★ & Above' }
          ].map(r => (
            <li key={r.val}>
              <label className="filter-option-label">
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === r.val}
                  onChange={() => setMinRating(r.val)}
                  className="filter-checkbox"
                />
                <span>{r.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="section-padding">
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: '32px' }}>
          <span className="section-tag">
            <FiShoppingBag /> STEPX OFFICIAL CATALOG
          </span>
          <h1 className="section-title">
            {initialSearch ? `Results for "${initialSearch}"` : selectedCategory !== 'All Shoes' ? selectedCategory : "All Performance & Streetwear Footwear"}
          </h1>
          <p className="section-subtitle">
            Explore {products.length} footwear designs engineered for maximum speed, court dominance, and pure luxury comfort.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="shop-layout">
          {/* Desktop Left Filters Sidebar */}
          <aside className="filters-sidebar">
            {FilterContent}
          </aside>

          {/* Right Product Grid Column */}
          <div>
            {/* Top Toolbar */}
            <div className="shop-toolbar">
              <span className="results-count">
                Showing <strong>{filteredProducts.length}</strong> styles
              </span>

              <div className="toolbar-controls">
                <button
                  className="mobile-filter-trigger"
                  onClick={() => setIsMobileFiltersOpen(true)}
                >
                  <FiFilter /> Filters
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest Releases</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filters Pill Tags */}
            {(selectedCategory !== 'All Shoes' || selectedGender !== 'All' || selectedSize || selectedColor || minRating > 0 || initialSearch) && (
              <div className="active-tags-row">
                {selectedCategory !== 'All Shoes' && (
                  <span className="active-tag-pill">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('All Shoes')} className="tag-remove-btn"><FiX size={14} /></button>
                  </span>
                )}
                {selectedGender !== 'All' && (
                  <span className="active-tag-pill">
                    Gender: {selectedGender}
                    <button onClick={() => setSelectedGender('All')} className="tag-remove-btn"><FiX size={14} /></button>
                  </span>
                )}
                {selectedSize && (
                  <span className="active-tag-pill">
                    Size: {selectedSize}
                    <button onClick={() => setSelectedSize(null)} className="tag-remove-btn"><FiX size={14} /></button>
                  </span>
                )}
                {selectedColor && (
                  <span className="active-tag-pill">
                    Color: {selectedColor}
                    <button onClick={() => setSelectedColor(null)} className="tag-remove-btn"><FiX size={14} /></button>
                  </span>
                )}
                {minRating > 0 && (
                  <span className="active-tag-pill">
                    {minRating}★+
                    <button onClick={() => setMinRating(0)} className="tag-remove-btn"><FiX size={14} /></button>
                  </span>
                )}
                {initialSearch && (
                  <span className="active-tag-pill">
                    Query: {initialSearch}
                    <button onClick={() => setSearchParams({})} className="tag-remove-btn"><FiX size={14} /></button>
                  </span>
                )}
                <button onClick={handleResetFilters} style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: '600' }}>
                  Clear All
                </button>
              </div>
            )}

            {/* Product Cards Grid */}
            {filteredProducts.length > 0 ? (
              <div className="products-grid-container">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="empty-products-box">
                <FiShoppingBag size={48} style={{ color: 'var(--text-muted)' }} />
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700' }}>No Shoes Found</h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>
                  We couldn't find any footwear matching your exact filter criteria. Try resetting or adjusting your price and size filters.
                </p>
                <button onClick={handleResetFilters} className="btn btn-primary btn-sm">
                  <FiRotateCcw /> Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Slide-over Modal */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setIsMobileFiltersOpen(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Filter Footwear</h3>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="action-btn">
                  <FiX />
                </button>
              </div>
              {FilterContent}
              <button 
                onClick={() => setIsMobileFiltersOpen(false)} 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '24px' }}
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
