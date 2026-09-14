import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { 
  FiPackage, 
  FiTruck, 
  FiCheckCircle, 
  FiClock, 
  FiMapPin, 
  FiCreditCard, 
  FiArrowLeft,
  FiFileText
} from 'react-icons/fi';

export default function OrderDetails() {
  const { orderId } = useParams();
  const { orders } = useData();

  const order = orders.find(o => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <div className="section-padding container" style={{ textAlign: 'center' }}>
        <h2>Order Not Found</h2>
        <Link to="/orders" className="btn btn-primary" style={{ marginTop: '16px' }}>Back to Orders</Link>
      </div>
    );
  }

  const timelineSteps = order.timeline || [
    { status: 'Order Placed', date: new Date(order.createdAt).toLocaleString(), completed: true },
    { status: 'Payment Confirmed', date: new Date(order.createdAt).toLocaleString(), completed: true },
    { status: 'Processing in Warehouse', date: 'In Progress', completed: order.status !== 'Cancelled' },
    { status: 'Shipped with Express', date: 'Expected', completed: order.status === 'Shipped' || order.status === 'Delivered' },
    { status: 'Delivered', date: order.estimatedDelivery || 'Pending', completed: order.status === 'Delivered' }
  ];

  return (
    <div className="section-padding">
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Back Link */}
        <Link to="/orders" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>
          <FiArrowLeft /> Back to All Orders
        </Link>

        <div className="card-glass" style={{ padding: '36px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="section-tag"><FiPackage /> ORDER TRACKING</span>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Order #{order.id}</h1>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Placed on {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="badge badge-accent" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
                Status: {order.status}
              </span>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                Tracking: <strong>{order.trackingNumber}</strong>
              </p>
            </div>
          </div>

          {/* Timeline Stepper */}
          <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-lg)', marginBottom: '32px', border: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '20px' }}>Tracking Progress</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {timelineSteps.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: step.completed ? 'var(--status-success-bg)' : 'var(--bg-tertiary)',
                    color: step.completed ? 'var(--status-success)' : 'var(--text-muted)',
                    border: step.completed ? '2px solid var(--status-success)' : '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    flexShrink: 0
                  }}>
                    {step.completed ? <FiCheckCircle /> : <FiClock />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: step.completed ? '#fff' : 'var(--text-muted)' }}>
                      {step.status}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{step.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer & Shipping Summary Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--accent-primary)', fontWeight: '700' }}>
                <FiMapPin /> Delivery Address
              </div>
              <p style={{ fontWeight: '700', color: '#fff', fontSize: '0.95rem' }}>{order.customer?.name}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{order.customer?.address?.street}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                {order.customer?.address?.city}, {order.customer?.address?.state} {order.customer?.address?.zip}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{order.customer?.address?.country}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '6px' }}>Phone: {order.customer?.phone}</p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--accent-primary)', fontWeight: '700' }}>
                <FiCreditCard /> Payment & Method
              </div>
              <p style={{ fontWeight: '700', color: '#fff', fontSize: '0.95rem' }}>{order.paymentMethod}</p>
              <p style={{ color: 'var(--status-success)', fontSize: '0.85rem', fontWeight: '600' }}>Payment Status: {order.paymentStatus || 'Paid'}</p>
              {order.couponCode && (
                <p style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', marginTop: '6px' }}>Coupon Applied: {order.couponCode}</p>
              )}
            </div>
          </div>

          {/* Order Items Table */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px' }}>Purchased Footwear</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {(order.items || []).map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff' }}>{item.name}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: '1rem', fontWeight: '800', color: '#fff' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '360px', marginLeft: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <span>Subtotal</span>
              <span>${order.subtotal?.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--status-success)', fontSize: '0.9rem' }}>
                <span>Discount</span>
                <span>-${order.discount?.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <span>Shipping</span>
              <span>{order.shippingFee === 0 ? 'FREE' : `$${order.shippingFee?.toFixed(2)}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.2rem', color: '#fff', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
              <span>Total Amount</span>
              <span style={{ color: 'var(--accent-primary)' }}>${order.total?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
