import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { FiImage, FiPlus, FiTrash2, FiToggleLeft, FiToggleRight, FiX } from 'react-icons/fi';

export default function ManagerBanners() {
  const { banners, addBanner, updateBanner, deleteBanner } = useData();
  const { success, warning } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    tag: 'FEATURED DROP',
    buttonText: 'Shop Now',
    buttonLink: '/shop',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80'
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.image) {
      warning('Please enter title and image URL');
      return;
    }
    addBanner(formData);
    success('Homepage banner created and published!');
    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Homepage Promotional Banners</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Manage hero slideshows, exclusive drop teasers, and high-impact visual banners.
          </p>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary btn-sm">
          <FiPlus /> Add Promotional Banner
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {banners.map((bnr) => (
          <div key={bnr.id} className="card-glass" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ position: 'relative', height: '180px', background: '#111' }}>
              <img src={bnr.image} alt={bnr.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                <span className="badge badge-accent">{bnr.tag}</span>
              </div>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#fff' }}>{bnr.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{bnr.subtitle}</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                  Target Route: <code>{bnr.buttonLink}</code> ({bnr.buttonText})
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', marginTop: '10px' }}>
                <span className={`badge ${bnr.isActive ? 'badge-success' : 'badge-dark'}`}>
                  {bnr.isActive ? 'Live on Store' : 'Hidden'}
                </span>

                <button
                  onClick={() => deleteBanner(bnr.id)}
                  className="action-btn"
                  style={{ color: 'var(--status-error)' }}
                  title="Remove Banner"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Banner Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>New Homepage Banner</h3>
              <button onClick={() => setIsModalOpen(false)} className="action-btn">
                <FiX />
              </button>
            </div>

            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Banner Tag / Badge</label>
                <input
                  type="text"
                  value={formData.tag}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Headline Title *</label>
                <input
                  type="text"
                  placeholder="e.g. UNLEASH MAXIMUM TORQUE"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Subtitle Description</label>
                <textarea
                  rows={2}
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Image CDN URL *</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Button Label</label>
                  <input
                    type="text"
                    value={formData.buttonText}
                    onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Destination Link</label>
                  <input
                    type="text"
                    value={formData.buttonLink}
                    onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>
                Publish Banner
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
