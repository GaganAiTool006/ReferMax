import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { 
  FiUser, 
  FiPackage, 
  FiHeart, 
  FiMapPin, 
  FiLock, 
  FiLogOut, 
  FiPlus, 
  FiTrash2, 
  FiCheck,
  FiAward,
  FiMail,
  FiPhone,
  FiEdit2
} from 'react-icons/fi';

export default function Profile() {
  const { currentUser, updateProfileInfo, addAddress, removeAddress, setDefaultAddress, customerLogout } = useAuth();
  const { orders } = useData();
  const { wishlistCount } = useWishlist();
  const { success, warning } = useToast();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'addresses' | 'settings'

  // Edit Profile Form State
  const [profileData, setProfileData] = useState({
    displayName: currentUser?.displayName || '',
    email: currentUser?.email || '',
    phoneNumber: currentUser?.phoneNumber || ''
  });

  // New Address Form State
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    type: 'Home',
    fullName: currentUser?.displayName || '',
    phone: currentUser?.phoneNumber || '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States'
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfileInfo(profileData);
    success('Profile information updated successfully!');
  };

  const handleCreateAddress = (e) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.city || !newAddr.zip) {
      warning('Please fill in all address fields');
      return;
    }
    addAddress(newAddr);
    success('New shipping address saved!');
    setIsAddingAddress(false);
    setNewAddr({
      type: 'Home',
      fullName: currentUser?.displayName || '',
      phone: currentUser?.phoneNumber || '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States'
    });
  };

  const userOrdersCount = orders.length;
  const userTotalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div className="section-padding">
      <div className="container">
        {/* Header Profile Summary */}
        <div className="card-glass" style={{ padding: '32px', marginBottom: '36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              background: 'var(--accent-primary)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: '800',
              boxShadow: '0 8px 25px var(--accent-glow)'
            }}>
              {currentUser?.displayName ? currentUser.displayName[0].toUpperCase() : 'S'}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff' }}>
                  {currentUser?.displayName || 'STEPX VIP Member'}
                </h1>
                <span className="badge badge-accent" style={{ background: 'var(--accent-volt)', color: '#000', fontWeight: '800' }}>
                  <FiAward /> Gold VIP
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '2px' }}>
                {currentUser?.email}
              </p>
            </div>
          </div>

          <button onClick={customerLogout} className="btn btn-outline btn-sm" style={{ color: 'var(--status-error)', borderColor: 'rgba(239,68,68,0.3)' }}>
            <FiLogOut /> Sign Out
          </button>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '36px' }}>
          <Link to="/orders" className="card-glass" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="logo-badge" style={{ width: '48px', height: '48px', fontSize: '1.3rem' }}>
              <FiPackage />
            </div>
            <div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '800' }}>{userOrdersCount}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Orders</p>
            </div>
          </Link>

          <Link to="/wishlist" className="card-glass" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="logo-badge" style={{ width: '48px', height: '48px', fontSize: '1.3rem', background: '#ec4899' }}>
              <FiHeart />
            </div>
            <div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '800' }}>{wishlistCount}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Saved in Wishlist</p>
            </div>
          </Link>

          <div className="card-glass" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="logo-badge" style={{ width: '48px', height: '48px', fontSize: '1.3rem', background: 'var(--status-success)' }}>
              <FiAward />
            </div>
            <div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '800' }}>${userTotalSpent.toFixed(2)}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Lifetime Spend</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '28px' }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '12px 0',
              fontWeight: '700',
              fontSize: '1rem',
              color: activeTab === 'overview' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'overview' ? '2px solid var(--accent-primary)' : 'none'
            }}
          >
            Personal Information
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            style={{
              padding: '12px 0',
              fontWeight: '700',
              fontSize: '1rem',
              color: activeTab === 'addresses' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'addresses' ? '2px solid var(--accent-primary)' : 'none'
            }}
          >
            Saved Addresses ({(currentUser?.addresses || []).length})
          </button>
        </div>

        {/* Tab 1: Personal Info */}
        {activeTab === 'overview' && (
          <div className="card-glass" style={{ padding: '32px', maxWidth: '640px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '20px' }}>Edit Personal Details</h3>
            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.displayName}
                  onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Mobile Phone
                </label>
                <input
                  type="tel"
                  value={profileData.phoneNumber}
                  onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '10px' }}>
                Save Profile Changes
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Manage Shipping Addresses</h3>
              <button onClick={() => setIsAddingAddress(!isAddingAddress)} className="btn btn-primary btn-sm">
                <FiPlus /> {isAddingAddress ? 'Cancel' : 'Add New Address'}
              </button>
            </div>

            {/* Add Address Form */}
            {isAddingAddress && (
              <div className="card-glass" style={{ padding: '28px', marginBottom: '28px', maxWidth: '640px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px' }}>New Shipping Address</h4>
                <form onSubmit={handleCreateAddress} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Address Type</label>
                      <select value={newAddr.type} onChange={(e) => setNewAddr({ ...newAddr, type: e.target.value })}>
                        <option value="Home">Home</option>
                        <option value="Office">Office</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Full Name</label>
                      <input
                        type="text"
                        value={newAddr.fullName}
                        onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Street Address</label>
                    <input
                      type="text"
                      placeholder="e.g. 100 Main Street, Apt 4"
                      value={newAddr.street}
                      onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>City</label>
                      <input
                        type="text"
                        value={newAddr.city}
                        onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>State</label>
                      <input
                        type="text"
                        value={newAddr.state}
                        onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>ZIP</label>
                      <input
                        type="text"
                        value={newAddr.zip}
                        onChange={(e) => setNewAddr({ ...newAddr, zip: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '10px' }}>
                    Save Address
                  </button>
                </form>
              </div>
            )}

            {/* Saved Addresses List */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {(currentUser?.addresses || []).map((addr) => (
                <div key={addr.id} className="card-glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="badge badge-dark">{addr.type}</span>
                      {addr.isDefault && (
                        <span className="badge badge-success"><FiCheck /> Default</span>
                      )}
                    </div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff' }}>{addr.fullName}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                      {addr.street}<br />
                      {addr.city}, {addr.state} {addr.zip}<br />
                      {addr.country}
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '6px' }}>
                      Phone: {addr.phone}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
                    {!addr.isDefault && (
                      <button
                        onClick={() => setDefaultAddress(addr.id)}
                        className="btn btn-dark btn-sm"
                        style={{ flex: 1 }}
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      onClick={() => removeAddress(addr.id)}
                      className="btn btn-outline btn-sm"
                      style={{ color: 'var(--status-error)', borderColor: 'rgba(239,68,68,0.3)' }}
                    >
                      <FiTrash2 /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
