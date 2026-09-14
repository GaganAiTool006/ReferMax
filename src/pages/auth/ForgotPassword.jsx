import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { FiZap, FiArrowLeft, FiMail, FiSend } from 'react-icons/fi';
import './Auth.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { resetPassword } = useAuth();
  const { success, error } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      error('Please enter your account email');
      return;
    }

    setIsSubmitting(true);
    const res = await resetPassword(email);
    setIsSubmitting(false);

    if (res.success) {
      setSubmitted(true);
      success(res.message);
    } else {
      error(res.error);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="auth-header-logo">
            <div className="logo-badge">
              <FiZap size={20} />
            </div>
            <span>STEP<span style={{ color: 'var(--accent-primary)' }}>X</span></span>
          </Link>
          <h1 className="auth-title">Reset Password</h1>
          <p className="auth-subtitle">Enter your email and we'll send a password recovery token</p>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', background: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <FiMail size={40} style={{ color: 'var(--accent-primary)', marginBottom: '12px' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>Check Your Inbox</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              We've dispatched recovery instructions to <strong>{email}</strong>.
            </p>
            <Link to="/login" className="btn btn-primary btn-sm">
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Account Email
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '8px' }}
            >
              {isSubmitting ? 'Transmitting...' : 'Send Reset Link'} <FiSend />
            </button>
          </form>
        )}

        <div className="auth-footer">
          <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <FiArrowLeft /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
