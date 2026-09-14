import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ToastContainer from '../components/common/ToastContainer';
import { 
  FiGrid, 
  FiBox, 
  FiShoppingBag, 
  FiUsers, 
  FiTag, 
  FiImage, 
  FiBarChart2, 
  FiExternalLink, 
  FiLogOut, 
  FiZap,
  FiShield,
  FiMenu,
  FiX
} from 'react-icons/fi';
import './ManagerLayout.css';

export default function ManagerLayout() {
  const { managerUser, managerLogout } = useAuth();
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    managerLogout();
    navigate('/manager/login');
  };

  const NavLinksContent = (
    <ul className="manager-nav-list">
      <li>
        <NavLink 
          to="/manager/dashboard" 
          onClick={() => setIsMobileSidebarOpen(false)}
          className={({ isActive }) => `manager-nav-link ${isActive ? 'active' : ''}`}
        >
          <FiGrid /> Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/manager/products" 
          onClick={() => setIsMobileSidebarOpen(false)}
          className={({ isActive }) => `manager-nav-link ${isActive ? 'active' : ''}`}
        >
          <FiBox /> Products & Inventory
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/manager/orders" 
          onClick={() => setIsMobileSidebarOpen(false)}
          className={({ isActive }) => `manager-nav-link ${isActive ? 'active' : ''}`}
        >
          <FiShoppingBag /> Orders
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/manager/customers" 
          onClick={() => setIsMobileSidebarOpen(false)}
          className={({ isActive }) => `manager-nav-link ${isActive ? 'active' : ''}`}
        >
          <FiUsers /> Customers
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/manager/coupons" 
          onClick={() => setIsMobileSidebarOpen(false)}
          className={({ isActive }) => `manager-nav-link ${isActive ? 'active' : ''}`}
        >
          <FiTag /> Discounts & Coupons
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/manager/banners" 
          onClick={() => setIsMobileSidebarOpen(false)}
          className={({ isActive }) => `manager-nav-link ${isActive ? 'active' : ''}`}
        >
          <FiImage /> Homepage Banners
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/manager/reports" 
          onClick={() => setIsMobileSidebarOpen(false)}
          className={({ isActive }) => `manager-nav-link ${isActive ? 'active' : ''}`}
        >
          <FiBarChart2 /> Sales Analytics
        </NavLink>
      </li>
    </ul>
  );

  return (
    <div className="manager-container">
      {/* Desktop Sidebar Navigation */}
      <aside className="manager-sidebar">
        <div>
          {/* Logo */}
          <Link to="/manager/dashboard" className="manager-logo-box">
            <div className="logo-badge" style={{ width: '32px', height: '32px' }}>
              <FiZap size={18} />
            </div>
            <span>STEP<span style={{ color: 'var(--accent-primary)' }}>X</span> ADMIN</span>
          </Link>

          {/* Links */}
          {NavLinksContent}
        </div>

        {/* Sidebar Footer */}
        <div className="manager-sidebar-footer">
          <Link to="/" target="_blank" className="btn btn-dark btn-sm" style={{ width: '100%', gap: '8px' }}>
            <FiExternalLink /> View Live Store
          </Link>

          <div className="manager-user-badge">
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
              M
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <p style={{ fontSize: '0.85rem', fontWeight: '700', color: '#fff', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                {managerUser?.displayName || 'Operations Mgr'}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--status-success)' }}>● Authenticated</p>
            </div>
            <button onClick={handleLogout} style={{ color: 'var(--status-error)', cursor: 'pointer' }} title="Log Out">
              <FiLogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="manager-main-content">
        <header className="manager-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="action-btn manager-mobile-menu-btn"
              aria-label="Open Manager Navigation"
            >
              <FiMenu />
            </button>
            <span className="badge badge-accent" style={{ background: 'var(--accent-volt)', color: '#000', fontWeight: '800' }}>
              <FiShield /> SECURE CONSOLE
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link to="/" target="_blank" className="btn btn-outline btn-sm" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
              <FiExternalLink /> Storefront
            </Link>
          </div>
        </header>

        <main className="manager-page-body">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer Navigation for Manager */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mobile-nav-overlay"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="mobile-nav-drawer"
              style={{ left: 0, right: 'auto', borderRight: '1px solid var(--border-light)', borderLeft: 'none' }}
            >
              <div>
                <div className="mobile-nav-header">
                  <div className="manager-logo-box" style={{ padding: 0, border: 'none' }}>
                    <div className="logo-badge" style={{ width: '30px', height: '30px' }}>
                      <FiZap size={16} />
                    </div>
                    <span>STEP<span style={{ color: 'var(--accent-primary)' }}>X</span> ADMIN</span>
                  </div>
                  <button onClick={() => setIsMobileSidebarOpen(false)} className="action-btn">
                    <FiX />
                  </button>
                </div>

                {NavLinksContent}
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', marginTop: '20px' }}>
                <button onClick={handleLogout} className="btn btn-outline btn-sm" style={{ width: '100%', color: 'var(--status-error)' }}>
                  <FiLogOut /> Sign Out Manager
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  );
}
