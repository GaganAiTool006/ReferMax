import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { FiCheckCircle, FiPackage, FiTruck, FiArrowRight, FiDownload } from 'react-icons/fi';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const location = useLocation();
  const { orders } = useData();

  const order = location.state?.order || orders.find(o => o.id === orderId) || orders[0];

  return (
    <div className="section-padding">
      <div className="container" style={{ maxWidth: '780px' }}>
        <div className="card-glass" style={{ padding: '48px 36px', textAlign: 'center' }}>
          {/* Animated Success Badge */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--status-success-bg)',
            color: 'var(--status-success)',
            border: '2px solid var(--status-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            margin: '0 auto 24px'
          }}>
            <FiCheckCircle />
          </div>

          <span className="section-tag" style={{ color: 'var(--status-success)' }}>PAYMENT AUTHORIZED</span>
          <h1 style={{ fontSize: '2.4rem', fontWeight: '800', margin: '8px 0 12px' }}>Order Confirmed!</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto 32px' }}>
            Thank you for choosing STEPX. We are preparing your footwear for dispatch from our logistics hub.
          </p>

          {/* Order Details Summary Box */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '24px', textAlign: 'left', marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Order Reference</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff' }}>#{order?.id || orderId}</h3>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Delivery</span>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
                  {order?.estimatedDelivery || '3-5 Business Days'}
                </h3>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tracking Code</span>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {order?.trackingNumber || 'SPX-US-882910'}
                </h3>
              </div>
            </div>

            {/* Items list preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              {(order?.items || []).map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={item.image} alt={item.name} style={{ width: '44px', height: '44px', borderRadius: '6px', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>{item.name}</h4>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Size {item.size} • Qty {item.quantity}</span>
                    </div>
                  </div>
                  <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.15rem' }}>
              <span>Total Paid</span>
              <span style={{ color: 'var(--accent-primary)' }}>${order?.total?.toFixed(2) || '0.00'}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to={`/order/${order?.id || orderId}`} className="btn btn-primary">
              <FiPackage /> View Order Timeline
            </Link>
            <Link to="/shop" className="btn btn-outline">
              Continue Shopping <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
