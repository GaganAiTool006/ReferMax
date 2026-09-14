import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { 
  FiShoppingBag, 
  FiSearch, 
  FiFilter, 
  FiEye, 
  FiCheckCircle, 
  FiTruck, 
  FiXCircle, 
  FiClock, 
  FiX 
} from 'react-icons/fi';

export default function ManagerOrders() {
  const { orders, updateOrderStatus } = useData();
  const { success } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    success(`Order #${orderId} status updated to ${newStatus}`);
  };

  const filteredOrders = orders.filter(o => {
    if (statusFilter !== 'All' && o.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customer?.name?.toLowerCase().includes(q) ||
        o.customer?.email?.toLowerCase().includes(q) ||
        o.trackingNumber?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Orders Management</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Track order fulfillment, update logistics milestones, and inspect delivery destinations.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="card-glass" style={{ padding: '16px 20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '260px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
            <FiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by Order ID, customer, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '38px', height: '40px', fontSize: '0.85rem' }}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: 'auto', height: '40px', padding: '0 14px', fontSize: '0.85rem' }}
          >
            <option value="All">All Statuses ({orders.length})</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredOrders.length}</strong> orders
        </span>
      </div>

      {/* Orders Table */}
      <div className="card-glass" style={{ padding: '24px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left' }}>
              <th style={{ padding: '12px 14px', color: 'var(--text-muted)', fontWeight: '700' }}>Order ID</th>
              <th style={{ padding: '12px 14px', color: 'var(--text-muted)', fontWeight: '700' }}>Date Placed</th>
              <th style={{ padding: '12px 14px', color: 'var(--text-muted)', fontWeight: '700' }}>Customer</th>
              <th style={{ padding: '12px 14px', color: 'var(--text-muted)', fontWeight: '700' }}>Total Amount</th>
              <th style={{ padding: '12px 14px', color: 'var(--text-muted)', fontWeight: '700' }}>Payment</th>
              <th style={{ padding: '12px 14px', color: 'var(--text-muted)', fontWeight: '700' }}>Fulfillment Status</th>
              <th style={{ padding: '12px 14px', color: 'var(--text-muted)', fontWeight: '700', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '14px', fontWeight: '800', color: '#fff' }}>#{order.id}</td>
                <td style={{ padding: '14px', color: 'var(--text-muted)' }}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '14px' }}>
                  <p style={{ fontWeight: '700', color: '#fff' }}>{order.customer?.name}</p>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{order.customer?.email}</span>
                </td>
                <td style={{ padding: '14px', fontWeight: '800', color: 'var(--accent-primary)' }}>
                  ${order.total?.toFixed(2)}
                </td>
                <td style={{ padding: '14px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{order.paymentMethod}</span>
                </td>
                <td style={{ padding: '14px' }}>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    style={{
                      padding: '6px 12px',
                      fontSize: '0.82rem',
                      width: 'auto',
                      fontWeight: '700',
                      background: order.status === 'Delivered' ? 'var(--status-success-bg)' : order.status === 'Shipped' ? 'var(--accent-light)' : order.status === 'Cancelled' ? 'var(--status-error-bg)' : 'var(--bg-tertiary)',
                      color: order.status === 'Delivered' ? 'var(--status-success)' : order.status === 'Shipped' ? 'var(--accent-primary)' : order.status === 'Cancelled' ? 'var(--status-error)' : 'var(--status-warning)'
                    }}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td style={{ padding: '14px', textAlign: 'right' }}>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="btn btn-dark btn-sm"
                  >
                    <FiEye /> Inspect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Inspection Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Order #{selectedOrder.id} Details</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Tracking Code: {selectedOrder.trackingNumber}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="action-btn">
                <FiX />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--accent-primary)', marginBottom: '8px' }}>Shipping Address</h4>
                <p style={{ fontWeight: '700', color: '#fff' }}>{selectedOrder.customer?.name} ({selectedOrder.customer?.phone})</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{selectedOrder.customer?.address?.street}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {selectedOrder.customer?.address?.city}, {selectedOrder.customer?.address?.state} {selectedOrder.customer?.address?.zip}
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px' }}>Order Footwear Items</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(selectedOrder.items || []).map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={item.image} alt={item.name} style={{ width: '44px', height: '44px', borderRadius: '6px', objectFit: 'cover' }} />
                        <div>
                          <p style={{ fontWeight: '700', color: '#fff', fontSize: '0.9rem' }}>{item.name}</p>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Size {item.size} • Color: {item.color} • Qty {item.quantity}</span>
                        </div>
                      </div>
                      <span style={{ fontWeight: '800', color: '#fff' }}>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.2rem' }}>
                <span>Order Total</span>
                <span style={{ color: 'var(--accent-primary)' }}>${selectedOrder.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
