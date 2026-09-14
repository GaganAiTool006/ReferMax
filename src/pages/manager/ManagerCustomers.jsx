import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FiUsers, FiSearch, FiMail, FiPhone, FiAward } from 'react-icons/fi';

export default function ManagerCustomers() {
  const { customers } = useData();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(c => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
  });

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Customer Roster</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Registered client accounts, VIP tier loyalty, and lifetime spend history.
        </p>
      </div>

      <div className="card-glass" style={{ padding: '16px 20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
          <FiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search by customer name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '38px', height: '40px', fontSize: '0.85rem' }}
          />
        </div>

        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Total Customers: <strong>{filteredCustomers.length}</strong>
        </span>
      </div>

      <div className="card-glass" style={{ padding: '24px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left' }}>
              <th style={{ padding: '12px 14px', color: 'var(--text-muted)', fontWeight: '700' }}>Customer</th>
              <th style={{ padding: '12px 14px', color: 'var(--text-muted)', fontWeight: '700' }}>Contact</th>
              <th style={{ padding: '12px 14px', color: 'var(--text-muted)', fontWeight: '700' }}>VIP Tier</th>
              <th style={{ padding: '12px 14px', color: 'var(--text-muted)', fontWeight: '700' }}>Orders Completed</th>
              <th style={{ padding: '12px 14px', color: 'var(--text-muted)', fontWeight: '700' }}>Lifetime Spend</th>
              <th style={{ padding: '12px 14px', color: 'var(--text-muted)', fontWeight: '700' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((cust) => (
              <tr key={cust.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: '#fff' }}>
                      {cust.name[0]}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff' }}>{cust.name}</h4>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Joined {cust.joinedDate}</span>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '14px', color: 'var(--text-secondary)' }}>
                  <div>{cust.email}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{cust.phone}</div>
                </td>
                <td style={{ padding: '14px' }}>
                  <span className="badge badge-accent" style={{ background: cust.tier?.includes('Platinum') ? '#a855f7' : cust.tier?.includes('Gold') ? '#eab308' : 'var(--bg-tertiary)', color: '#fff' }}>
                    <FiAward /> {cust.tier || 'Silver'}
                  </span>
                </td>
                <td style={{ padding: '14px', fontWeight: '700', color: '#fff' }}>
                  {cust.ordersCount} orders
                </td>
                <td style={{ padding: '14px', fontWeight: '800', color: 'var(--status-success)' }}>
                  ${cust.totalSpent?.toFixed(2)}
                </td>
                <td style={{ padding: '14px' }}>
                  <span className="badge badge-success">
                    {cust.status || 'Active'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
