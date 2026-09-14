import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { 
  FiPackage, 
  FiTruck, 
  FiChevronRight, 
  FiCheckCircle, 
  FiClock, 
  FiXCircle,
  FiShoppingBag
} from 'react-icons/fi';

export default function Orders() {
  const { orders, cancelOrder } = useData();
  const { currentUser } = useAuth();
  const { success } = useToast();

  const [filterStatus, setFilterStatus] = useState('All');

  // Filter orders for the user (or all mock orders in demo mode)
  const userOrders = orders.filter(o => {
    if (filterStatus !== 'All' && o.status !== filterStatus) return false;
    return true;
  });

  const handleCancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      cancelOrder(orderId);
      success(`Order #${orderId} has been cancelled.`);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <span className="badge badge-success"><FiCheckCircle /> Delivered</span>;
      case 'Shipped':
        return <span className="badge badge-accent" style={{ background: 'var(--status-info)' }}><FiTruck /> Shipped</span>;
      case 'Processing':
        return <span className="badge badge-warning"><FiClock /> Processing</span>;
      case 'Cancelled':
        return <span className="badge badge-error"><FiXCircle /> Cancelled</span>;
      default:
        return <span className="badge badge-dark">{status}</span>;
    }
  };

  return (
    <div className="section-padding">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="section-tag"><FiPackage /> ORDER HISTORY</span>
            <h1 className="section-title">My Orders</h1>
          </div>

          {/* Status Filter Tabs */}
          <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-card)', padding: '6px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', flexWrap: 'wrap' }}>
            {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterStatus(tab)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: filterStatus === tab ? '#fff' : 'var(--text-secondary)',
                  background: filterStatus === tab ? 'var(--accent-primary)' : 'transparent'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {userOrders.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {userOrders.map((order) => (
              <div key={order.id} className="card-glass" style={{ padding: '24px' }}>
                {/* Header info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#fff' }}>Order #{order.id}</h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} • {order.items?.length || 0} items
                    </p>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#fff' }}>
                      ${order.total?.toFixed(2)}
                    </span>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {order.paymentMethod}
                    </p>
                  </div>
                </div>

                {/* Items preview */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                  {(order.items || []).map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                      <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>{item.name}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          Size: {item.size} • Qty: {item.quantity}
                        </span>
                        <p style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: '700' }}>
                          ${item.price?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', flexWrap: 'wrap', gap: '12px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Tracking No: <strong style={{ color: '#fff' }}>{order.trackingNumber}</strong>
                  </span>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    {order.status === 'Processing' && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="btn btn-outline btn-sm"
                        style={{ color: 'var(--status-error)', borderColor: 'rgba(239,68,68,0.3)' }}
                      >
                        Cancel Order
                      </button>
                    )}
                    <Link to={`/order/${order.id}`} className="btn btn-dark btn-sm">
                      View Timeline Details <FiChevronRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card-glass" style={{ padding: '60px 20px', textAlign: 'center' }}>
            <FiPackage size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700' }}>No Orders in this Status</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>You don't have any orders under "{filterStatus}".</p>
            <Link to="/shop" className="btn btn-primary btn-sm">Start Shopping</Link>
          </div>
        )}
      </div>
    </div>
  );
}
