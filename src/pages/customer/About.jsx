import React from 'react';
import { Link } from 'react-router-dom';
import { FiZap, FiAward, FiShield, FiTrendingUp, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

export default function About() {
  return (
    <div className="section-padding">
      <div className="container">
        {/* Hero Brand Manifesto */}
        <div style={{ maxWidth: '820px', margin: '0 auto 60px', textAlign: 'center' }}>
          <span className="section-tag"><FiZap /> THE STEPX MANIFESTO</span>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1.1', margin: '16px 0 20px' }}>
            ENGINEERED TO OUTRUN <span style={{ color: 'var(--accent-primary)' }}>CONVENTION</span>.
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.7' }}>
            Founded on the relentless obsession with biomechanical efficiency and modern luxury, STEPX blends aerospace-grade carbon composite plates with hand-finished Portuguese leather.
          </p>
        </div>

        {/* Brand Image Showcase */}
        <div style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden', height: '420px', marginBottom: '80px', border: '1px solid var(--border-light)' }}>
          <img
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1600&q=80"
            alt="STEPX Workshop"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,12,0.9) 0%, transparent 60%)', display: 'flex', alignItems: 'flex-end', padding: '40px' }}>
            <div>
              <span className="badge badge-accent" style={{ marginBottom: '8px' }}>INNOVATION LAB 01</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff' }}>From Computational Simulation to Race Day Glory</h2>
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '80px' }}>
          <div className="card-glass" style={{ padding: '36px' }}>
            <div className="logo-badge" style={{ width: '52px', height: '52px', fontSize: '1.5rem', marginBottom: '20px' }}>
              <FiZap />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '12px' }}>Carbon-Core Dynamics</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Every performance silhouette is engineered with an autoclave cured carbon fiber chassis that returns up to 85% of kinetic energy with zero rotational torque.
            </p>
          </div>

          <div className="card-glass" style={{ padding: '36px' }}>
            <div className="logo-badge" style={{ width: '52px', height: '52px', fontSize: '1.5rem', marginBottom: '20px', background: 'var(--status-info)' }}>
              <FiShield />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '12px' }}>Artisanal Craftsmanship</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Our formal and lifestyle collections are hand-lasted by master cordwainers in Porto and Milan using certified eco-friendly European calfskins.
            </p>
          </div>

          <div className="card-glass" style={{ padding: '36px' }}>
            <div className="logo-badge" style={{ width: '52px', height: '52px', fontSize: '1.5rem', marginBottom: '20px', background: 'var(--status-success)' }}>
              <FiAward />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '12px' }}>Zero Waste Vision</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Over 60% of our knit uppers utilize ocean-bound plastic recycled polymers, aiming for 100% circularity across all footwear categories by 2028.
            </p>
          </div>
        </div>

        {/* Global Numbers */}
        <div className="card-glass" style={{ padding: '60px 40px', textAlign: 'center', background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(255,70,0,0.08) 100%)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '36px' }}>
            <div>
              <h3 style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>50K+</h3>
              <p style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Active Runners & Athletes</p>
            </div>
            <div>
              <h3 style={{ fontSize: '3rem', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-heading)' }}>42</h3>
              <p style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Marathon Podiums</p>
            </div>
            <div>
              <h3 style={{ fontSize: '3rem', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-heading)' }}>120+</h3>
              <p style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Proprietary Patents</p>
            </div>
            <div>
              <h3 style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--status-success)', fontFamily: 'var(--font-heading)' }}>100%</h3>
              <p style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Authenticity Verified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
