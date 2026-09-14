import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { 
  FiDollarSign, 
  FiShoppingBag, 
  FiUsers, 
  FiBox, 
  FiTrendingUp, 
  FiArrowUpRight, 
  FiCheckCircle, 
  FiClock, 
  FiTruck,
  FiPlus
} from 'react-icons/fi';

export default function ManagerDashboard() {
  const { products, orders, customers, stats, updateOrderStatus } = useData();

  // Top selling products based on review count and sales
  const topSellers = [...products]
    .sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0))
    .slice(0, 5);

  const recentOrders = orders.slice(0, 5);

  // Simulated monthly revenue chart bars
  const monthlyRevenueData = [
    { month: 'Mar', revenue: 14200, height: '45%' },
    { month: 'Apr', revenue: 18400, height: '58%' },
    { month: 'May', revenue: 22800, height: '72%' },
    { month: 'Jun', revenue: 28900, height: '88%' },
    { month: 'Jul', revenue: 24500, height: '78%' },
    { month: 'Aug', revenue: 34150, height: '100%' }
  ];

  return (
    <div>
      {/* Page Title & Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Executive Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Real-time footwear performance, live inventory telemetry, and customer metrics.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/manager/products" className="btn btn-primary btn-sm">
            <FiPlus /> Add New Footwear
          </Link>
          <Link to="/manager/orders" className="btn btn-dark btn-sm">
            Manage Orders
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div className="card-glass" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Total Revenue
            </span>
            <div className="logo-badge" style={{ width: '38px', height: '38px', background: 'var(--status-success-bg)', color: 'var(--status-success)' }}>
              <FiDollarSign size={18} />
            </div>
          </div>
          <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-heading)' }}>
            ${stats.totalRevenue.toFixed(2)}
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--status-success)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
            <FiTrendingUp /> +24.8% vs last month
          </p>
        </div>

        <div className="card-glass" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Total Orders
            </span>
            <div className="logo-badge" style={{ width: '38px', height: '38px', background: 'var(--accent-light)', color: 'var(--accent-primary)' }}>
              <FiShoppingBag size={18} />
            </div>
          </div>
          <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-heading)' }}>
            {stats.totalOrdersCount}
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--status-success)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
            <FiTrendingUp /> +18.2% conversion rate
          </p>
        </div>

        <div className="card-glass" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Active Customers
            </span>
            <div className="logo-badge" style={{ width: '38px', height: '38px', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
              <FiUsers size={18} />
            </div>
          </div>
          <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-heading)' }}>
            {stats.totalCustomersCount}
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--status-info)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
            94% customer satisfaction
          </p>
        </div>

        <div className="card-glass" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Catalog Products
            </span>
            <div className="logo-badge" style={{ width: '38px', height: '38px', background: 'var(--accent-light)', color: 'var(--accent-volt)' }}>
              <FiBox size={18} />
            </div>
          </div>
          <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-heading)' }}>
            {stats.totalProductsCount}
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            Across 9 specialized categories
          </p>
        </div>
      </div>

      {/* Analytics Visual Chart & Top Sellers Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '28px', marginBottom: '32px' }}>
        {/* Sales Revenue Analytics Chart */}
        <div className="card-glass" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Monthly Sales & Revenue</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Revenue progression in USD ($)</p>
            </div>
            <span className="badge badge-accent" style={{ background: 'var(--accent-volt)', color: '#000' }}>
              Live Telemetry
            </span>
          </div>

          {/* Responsive CSS Bar Chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '220px', padding: '16px 0', borderBottom: '1px solid var(--border-subtle)', gap: '14px' }}>
            {monthlyRevenueData.map((bar, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
                  ${(bar.revenue / 1000).toFixed(1)}k
                </span>
                <div
                  style={{
                    width: '100%',
                    maxWidth: '44px',
                    height: bar.height,
                    background: i === monthlyRevenueData.length - 1 ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                    borderRadius: '6px 6px 0 0',
                    border: '1px solid var(--border-light)',
                    transition: 'all 0.3s ease'
                  }}
                />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                  {bar.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Selling Shoes */}
        <div className="card-glass" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Top Performing Shoes</h3>
            <Link to="/manager/products" style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', fontWeight: '600' }}>
              View All
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {topSellers.map((shoe, idx) => (
              <div key={shoe.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={shoe.image} alt={shoe.name} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#fff' }}>{shoe.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{shoe.category} • {shoe.rating}★ ({shoe.reviewsCount} sold)</span>
                  </div>
                </div>
                <span style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
                  ${(shoe.discountPrice || shoe.price).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="card-glass" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Recent Customer Orders</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Latest purchase orders requiring warehouse processing</p>
          </div>
          <Link to="/manager/orders" className="btn btn-dark btn-sm">
            View Full Order Ledger <FiArrowUpRight />
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: '700' }}>Order ID</th>
                <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: '700' }}>Customer</th>
                <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: '700' }}>Items</th>
                <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: '700' }}>Total</th>
                <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: '700' }}>Status</th>
                <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: '700' }}>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: '700', color: '#fff' }}>#{order.id}</td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{order.customer?.name}</td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{order.items?.length || 0} pair(s)</td>
                  <td style={{ padding: '14px 16px', fontWeight: '800', color: 'var(--accent-primary)' }}>${order.total?.toFixed(2)}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span className={`badge ${order.status === 'Delivered' ? 'badge-success' : order.status === 'Shipped' ? 'badge-accent' : order.status === 'Cancelled' ? 'badge-error' : 'badge-warning'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      style={{ padding: '6px 10px', fontSize: '0.82rem', width: 'auto', background: 'var(--bg-tertiary)' }}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
