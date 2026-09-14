import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { FiShield, FiLock, FiMail, FiArrowRight, FiZap } from 'react-icons/fi';
import '../auth/Auth.css';

export default function ManagerLogin() {
  const [email, setEmail] = useState('manager@stepx.com');
  const [accessKey, setAccessKey] = useState('STEPX-ADMIN-2026');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { managerLogin } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !accessKey) {
      error('Please enter authorized manager credentials');
      return;
    }

    setIsSubmitting(true);
    const result = await managerLogin(accessKey, email);
    setIsSubmitting(false);

    if (result.success) {
      success('Manager session authorized. Welcome to STEPX Operations!');
      navigate('/manager/dashboard');
    } else {
      error(result.error);
    }
  };

  return (
    <div className="auth-page-wrapper" style={{ background: 'radial-gradient(circle at 50% 30%, rgba(204, 255, 0, 0.06) 0%, #08080a 70%)' }}>
      <div className="auth-card" style={{ borderColor: 'rgba(255, 70, 0, 0.3)' }}>
        <div className="auth-header">
          <div className="logo-badge" style={{ width: '48px', height: '48px', margin: '0 auto 16px', background: 'var(--accent-volt)', color: '#000', fontSize: '1.4rem' }}>
            <FiShield />
          </div>
          <h1 className="auth-title">Executive Operations Portal</h1>
          <p className="auth-subtitle">Restricted to authorized STEPX Merchandising & Operations Managers</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Manager Work Email
            </label>
            <input
              type="email"
              placeholder="manager@stepx.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Operations Security Access Key
            </label>
            <input
              type="password"
              placeholder="Enter authorization key"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '10px' }}
          >
            {isSubmitting ? 'Verifying Security Token...' : 'Authorize Manager Access'} <FiArrowRight />
          </button>
        </form>

        <div className="auth-footer">
          <Link to="/" style={{ color: 'var(--text-muted)' }}>
            ← Return to Customer Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
