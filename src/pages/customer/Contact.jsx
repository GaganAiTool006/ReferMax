import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiChevronDown, FiHelpCircle } from 'react-icons/fi';

const FAQ_ITEMS = [
  {
    q: "How fast is STEPX express shipping?",
    a: "Orders placed before 3:00 PM EST ship the same day. Express delivery takes 2-4 business days worldwide. Overnight priority delivery is also available at checkout."
  },
  {
    q: "What is your 30-day return policy?",
    a: "We offer a 30-day guaranteed trial. If you are not completely satisfied with the comfort or performance of your shoes, you can initiate a pre-paid return from your account for a 100% full refund."
  },
  {
    q: "How do I know my exact shoe size?",
    a: "Check our interactive Size Guide on any product details page for US, UK, EU, and exact foot length measurements in centimeters. STEPX shoes fit true to standard athletic sizing."
  },
  {
    q: "Are all STEPX shoes 100% authentic?",
    a: "Yes. Every pair of STEPX footwear is manufactured in our certified partner laboratories and comes with an embedded cryptographic verification QR tag on the box."
  },
  {
    q: "Can I use multiple coupon codes on a single order?",
    a: "You can apply one promotional coupon code per transaction in combination with automatic Free Shipping thresholds."
  }
];

export default function Contact() {
  const { success, warning } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      warning('Please fill in all contact fields');
      return;
    }
    success('Message sent successfully! Our concierge team will reply within 4 hours.');
    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
  };

  return (
    <div className="section-padding">
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '700px', margin: '0 auto 50px', textAlign: 'center' }}>
          <span className="section-tag"><FiMail /> CONCIERGE & SUPPORT</span>
          <h1 className="section-title">Get in Touch with STEPX</h1>
          <p className="section-subtitle" style={{ margin: '8px auto 0' }}>
            Have questions regarding sizing, custom team orders, or returns? Our performance footwear specialists are here to assist.
          </p>
        </div>

        {/* Contact Form & Office Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '48px', marginBottom: '80px', alignItems: 'start' }}>
          {/* Left: Contact Info */}
          <div className="card-glass" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Headquarters & Labs</h3>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="logo-badge" style={{ width: '44px', height: '44px', fontSize: '1.2rem', flexShrink: 0 }}>
                <FiMapPin />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#fff' }}>Global HQ</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                  STEPX Footwear Laboratories Inc.<br />
                  500 Howard Street, Suite 800<br />
                  San Francisco, CA 94105
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="logo-badge" style={{ width: '44px', height: '44px', fontSize: '1.2rem', flexShrink: 0, background: 'var(--status-info)' }}>
                <FiMail />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#fff' }}>Email Support</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                  support@stepx.com<br />
                  vip@stepx.com (Priority Drops)
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="logo-badge" style={{ width: '44px', height: '44px', fontSize: '1.2rem', flexShrink: 0, background: 'var(--status-success)' }}>
                <FiPhone />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#fff' }}>Phone Direct</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                  +1 (800) 555-STEPX<br />
                  Mon - Sat: 8:00 AM - 8:00 PM EST
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="logo-badge" style={{ width: '44px', height: '44px', fontSize: '1.2rem', flexShrink: 0, background: 'var(--accent-volt)', color: '#000' }}>
                <FiClock />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#fff' }}>Live Concierge</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                  Live response time under 15 minutes during operating hours.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="card-glass" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '20px' }}>Send Us a Message</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Marcus Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="marcus@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Topic / Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Order Tracking & Shipping">Order Tracking & Shipping</option>
                  <option value="Returns & Exchanges">Returns & Exchanges</option>
                  <option value="Size Consultation">Size Consultation</option>
                  <option value="VIP Drops & Sponsorships">VIP Drops & Sponsorships</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Message *
                </label>
                <textarea
                  rows={5}
                  placeholder="How can we assist you today?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                <FiSend /> Send Message
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="section-tag"><FiHelpCircle /> FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="section-title">Common Questions</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="card-glass" style={{ overflow: 'hidden' }}>
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textAlign: 'left',
                      color: '#fff',
                      fontSize: '1.05rem',
                      fontWeight: '700'
                    }}
                  >
                    <span>{item.q}</span>
                    <FiChevronDown style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: 'var(--accent-primary)' }} />
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 24px 20px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
