import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { productCategories, shoeSizes } from '../../data/products';
import { 
  FiBox, 
  FiPlus, 
  FiSearch, 
  FiEdit2, 
  FiTrash2, 
  FiX, 
  FiCheck, 
  FiAlertTriangle,
  FiFilter
} from 'react-icons/fi';

export default function ManagerProducts() {
  const { products, addProduct, updateProduct, deleteProduct, updateStock } = useData();
  const { success, warning } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: '',
    brand: 'STEPX',
    category: 'Running Shoes',
    gender: 'Men',
    price: '',
    discountPrice: '',
    stock: 25,
    image: '',
    description: '',
    featuresStr: 'Carbon composite plate, Breathable upper mesh, Responsive Cushioning'
  });

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      brand: 'STEPX',
      category: 'Running Shoes',
      gender: 'Men',
      price: '149.99',
      discountPrice: '119.99',
      stock: 25,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
      description: 'Engineered for elite performance and everyday comfort with advanced multi-layer cushioning.',
      featuresStr: 'Aerospace-grade composite, Breathable engineered mesh, High abrasion rubber outsole'
    });
    setEditingProduct(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      brand: product.brand || 'STEPX',
      category: product.category,
      gender: product.gender,
      price: product.price,
      discountPrice: product.discountPrice || '',
      stock: product.stock,
      image: product.image,
      description: product.description,
      featuresStr: (product.features || []).join(', ')
    });
    setIsAddModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the catalog?`)) {
      deleteProduct(id);
      success(`"${name}" removed successfully.`);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) {
      warning('Please fill in product name, price, and image URL');
      return;
    }

    const payload = {
      name: formData.name,
      brand: formData.brand || 'STEPX',
      category: formData.category,
      gender: formData.gender,
      price: parseFloat(formData.price),
      discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
      stock: parseInt(formData.stock, 10) || 10,
      image: formData.image,
      images: [formData.image],
      description: formData.description,
      features: formData.featuresStr.split(',').map(s => s.trim()).filter(Boolean),
      sizes: [7, 8, 8.5, 9, 9.5, 10, 11, 12],
      colors: [
        { name: 'Core Jet Black', hex: '#111111', bg: '#000' },
        { name: 'Hyper Orange / Volt', hex: '#ff4600', bg: '#ccff00' }
      ]
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
      success(`Updated "${payload.name}" successfully!`);
    } else {
      addProduct(payload);
      success(`New footwear "${payload.name}" added to catalog!`);
    }

    setIsAddModalOpen(false);
  };

  // Filter products by search and category
  const filteredList = products.filter(p => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Products & Inventory</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Manage {products.length} footwear models, prices, stock levels, and specs.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn btn-primary btn-sm">
          <FiPlus /> Add New Footwear
        </button>
      </div>

      {/* Toolbar */}
      <div className="card-glass" style={{ padding: '16px 20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '260px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
            <FiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by shoe name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '38px', height: '40px', fontSize: '0.85rem' }}
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ width: 'auto', height: '40px', padding: '0 14px', fontSize: '0.85rem' }}
          >
            <option value="All">All Categories ({products.length})</option>
            {productCategories.filter(c => c !== 'All Shoes').map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredList.length}</strong> items
        </span>
      </div>

      {/* Products Table */}
      <div className="card-glass" style={{ padding: '24px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left' }}>
              <th style={{ padding: '12px 14px', color: 'var(--text-muted)', fontWeight: '700' }}>Shoe Model</th>
              <th style={{ padding: '12px 14px', color: 'var(--text-muted)', fontWeight: '700' }}>Category</th>
              <th style={{ padding: '12px 14px', color: 'var(--text-muted)', fontWeight: '700' }}>Price / MSRP</th>
              <th style={{ padding: '12px 14px', color: 'var(--text-muted)', fontWeight: '700' }}>Stock Status</th>
              <th style={{ padding: '12px 14px', color: 'var(--text-muted)', fontWeight: '700' }}>Rating</th>
              <th style={{ padding: '12px 14px', color: 'var(--text-muted)', fontWeight: '700', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((product) => (
              <tr key={product.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={product.image} alt={product.name} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: '#fff' }}>{product.name}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{product.gender} • ID: {product.id}</span>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{product.category}</td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ fontWeight: '800', color: 'var(--accent-primary)' }}>
                    ${(product.discountPrice || product.price).toFixed(2)}
                  </span>
                  {product.discountPrice && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: '6px' }}>
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="number"
                      min="0"
                      value={product.stock}
                      onChange={(e) => updateStock(product.id, e.target.value)}
                      style={{ width: '64px', padding: '4px 8px', fontSize: '0.85rem', textAlign: 'center' }}
                    />
                    <span className={`badge ${product.stock > 15 ? 'badge-success' : product.stock > 0 ? 'badge-warning' : 'badge-error'}`} style={{ fontSize: '0.7rem' }}>
                      {product.stock > 15 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </td>
                <td style={{ padding: '12px 14px', color: '#fbbf24', fontWeight: '700' }}>
                  ★ {product.rating || '5.0'} ({product.reviewsCount || 0})
                </td>
                <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button
                      onClick={() => handleOpenEdit(product)}
                      className="action-btn"
                      style={{ width: '32px', height: '32px', fontSize: '0.9rem' }}
                      title="Edit Product"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="action-btn"
                      style={{ width: '32px', height: '32px', fontSize: '0.9rem', color: 'var(--status-error)' }}
                      title="Delete Product"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="modal-content"
              style={{ maxWidth: '640px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>
                  {editingProduct ? 'Edit Footwear Model' : 'Add New Footwear'}
                </h3>
                <button onClick={() => setIsAddModalOpen(false)} className="action-btn">
                  <FiX />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Product Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. STEPX Carbon Racer Pro"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {productCategories.filter(c => c !== 'All Shoes').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    >
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Unisex">Unisex</option>
                      <option value="Kids">Kids</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Regular Price ($) *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Discount Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.discountPrice}
                      onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Initial Stock</label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Image CDN URL *</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Key Features (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.featuresStr}
                    onChange={(e) => setFormData({ ...formData, featuresStr: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>
                  {editingProduct ? 'Save Product Changes' : 'Create & Publish Footwear'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
