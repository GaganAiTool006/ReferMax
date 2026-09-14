import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { FiTag, FiPlus, FiTrash2, FiToggleLeft, FiToggleRight, FiX, FiCheck } from 'react-icons/fi';

export default function ManagerCoupons() {
  const { coupons, addCoupon, toggleCoupon, deleteCoupon } = useData();
  const { success, warning } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discountPercent: 15,
    minSpend: 50,
    description: '',
    expiresAt: '2026-12-31'
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.code) {
      warning('Please enter a coupon code');
      return;
    }

    addCoupon({
      code: formData.code.trim().toUpperCase(),
      discountPercent: Number(formData.discountPercent),
      minSpend: Number(formData.minSpend),
      description: formData.description || `${formData.discountPercent}% OFF orders over $${formData.minSpend}`,
      expiresAt: formData.expiresAt
    });

    success(`Coupon code ${formData.code.toUpperCase()} created!`);
    setIsModalOpen(false);
    setFormData({ code: '', discountPercent: 15, minSpend: 50, description: '', expiresAt: '2026-12-31' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Discounts & Promo Coupons</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Configure promotional percentage vouchers, VIP member discounts, and free shipping triggers.
          </p>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary btn-sm">
          <FiPlus /> Create New Coupon
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {coupons.map((coupon) => (
          <div key={coupon.id} className="card-glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-accent" style={{ fontSize: '1rem', letterSpacing: '0.08em', padding: '6px 12px' }}>
                  {coupon.code}
                </span>
                <span className={`badge ${coupon.isActive ? 'badge-success' : 'badge-dark'}`}>
                  {coupon.isActive ? 'Active' : 'Disabled'}
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#fff' }}>
                {coupon.discountPercent ? `${coupon.discountPercent}% OFF` : 'Free Shipping'}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '6px' }}>
                {coupon.description}
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                Min. Spend: <strong>${coupon.minSpend}</strong> • Expires: <strong>{coupon.expiresAt}</strong>
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
              <button
                onClick={() => toggleCoupon(coupon.id)}
                className="btn btn-dark btn-sm"
                style={{ gap: '6px' }}
              >
                {coupon.isActive ? <FiToggleRight style={{ color: 'var(--status-success)' }} /> : <FiToggleLeft />}
                {coupon.isActive ? 'Disable' : 'Enable'}
              </button>

              <button
                onClick={() => deleteCoupon(coupon.id)}
                className="action-btn"
                style={{ width: '34px', height: '34px', color: 'var(--status-error)' }}
                title="Delete Coupon"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Coupon Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Create Promotional Coupon</h3>
              <button onClick={() => setIsModalOpen(false)} className="action-btn">
                <FiX />
              </button>
            </div>

            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Promo Code (e.g. SUMMER25)</label>
                <input
                  type="text"
                  placeholder="CODE"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Discount (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={formData.discountPercent}
                    onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Min Spend ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.minSpend}
                    onChange={(e) => setFormData({ ...formData, minSpend: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Description Summary</label>
                <input
                  type="text"
                  placeholder="e.g. 15% OFF for flash weekend sale"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>
                Publish Promo Voucher
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
