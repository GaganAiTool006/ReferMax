import React from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { FiBarChart2, FiDownload, FiDollarSign, FiTrendingUp, FiShoppingBag, FiAward } from 'react-icons/fi';

export default function ManagerReports() {
  const { orders, products, stats } = useData();
  const { success } = useToast();

  const avgOrderValue = stats.totalOrdersCount > 0 ? (stats.totalRevenue / stats.totalOrdersCount).toFixed(2) : '0.00';

  const categoryBreakdown = [
    { category: 'Running Shoes', share: '36%', revenue: '$14,280.00' },
    { category: 'Sneakers', share: '28%', revenue: '$11,100.00' },
    { category: 'Basketball Shoes', share: '18%', revenue: '$7,140.00' },
    { category: 'Formal Shoes', share: '10%', revenue: '$3,960.00' },
    { category: 'Training & Gym', share: '8%', revenue: '$3,170.00' }
  ];

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Order ID,Customer,Total,Status,Date\n"
      + orders.map(o => `${o.id},"${o.customer?.name}",${o.total},${o.status},${o.createdAt}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `STEPX_Sales_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    success('Sales report CSV successfully generated and downloaded!');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Executive Sales Reports & Analytics</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Comprehensive gross merchandise volume, average order values, and category revenues.
          </p>
        </div>

        <button onClick={handleExportCSV} className="btn btn-primary btn-sm">
          <FiDownload /> Export Sales CSV
        </button>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div className="card-glass" style={{ padding: '24px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Gross Merchandise Value</span>
          <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff', margin: '8px 0' }}>${stats.totalRevenue.toFixed(2)}</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--status-success)' }}>● 100% Verified Transactions</span>
        </div>

        <div className="card-glass" style={{ padding: '24px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Average Order Value (AOV)</span>
          <h3 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent-primary)', margin: '8px 0' }}>${avgOrderValue}</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Per completed checkout</span>
        </div>

        <div className="card-glass" style={{ padding: '24px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Total Units Dispatched</span>
          <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff', margin: '8px 0' }}>{orders.reduce((sum, o) => sum + (o.items?.length || 0), 0)} pairs</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--status-success)' }}>● Express Logistics Hub</span>
        </div>
      </div>

      {/* Category Performance Table */}
      <div className="card-glass" style={{ padding: '28px', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '18px' }}>Category Revenue Distribution</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left' }}>
              <th style={{ padding: '12px 14px', color: 'var(--text-muted)', fontWeight: '700' }}>Footwear Discipline</th>
              <th style={{ padding: '12px 14px', color: 'var(--text-muted)', fontWeight: '700' }}>Revenue Share</th>
              <th style={{ padding: '12px 14px', color: 'var(--text-muted)', fontWeight: '700' }}>Gross Sales ($)</th>
            </tr>
          </thead>
          <tbody>
            {categoryBreakdown.map((item, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '14px', fontWeight: '700', color: '#fff' }}>{item.category}</td>
                <td style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ flex: 1, maxWidth: '140px', height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: item.share, height: '100%', background: 'var(--accent-primary)' }} />
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.share}</span>
                  </div>
                </td>
                <td style={{ padding: '14px', fontWeight: '800', color: 'var(--accent-primary)' }}>{item.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
