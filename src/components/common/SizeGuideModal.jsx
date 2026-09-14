import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck } from 'react-icons/fi';

const SIZE_CHART = [
  { usMen: '7.0', usWomen: '8.5', uk: '6.0', eu: '40.0', cm: '25.0' },
  { usMen: '7.5', usWomen: '9.0', uk: '6.5', eu: '40.5', cm: '25.5' },
  { usMen: '8.0', usWomen: '9.5', uk: '7.0', eu: '41.0', cm: '26.0' },
  { usMen: '8.5', usWomen: '10.0', uk: '7.5', eu: '42.0', cm: '26.5' },
  { usMen: '9.0', usWomen: '10.5', uk: '8.0', eu: '42.5', cm: '27.0' },
  { usMen: '9.5', usWomen: '11.0', uk: '8.5', eu: '43.0', cm: '27.5' },
  { usMen: '10.0', usWomen: '11.5', uk: '9.0', eu: '44.0', cm: '28.0' },
  { usMen: '10.5', usWomen: '12.0', uk: '9.5', eu: '44.5', cm: '28.5' },
  { usMen: '11.0', usWomen: '12.5', uk: '10.0', eu: '45.0', cm: '29.0' },
  { usMen: '12.0', usWomen: '13.5', uk: '11.0', eu: '46.0', cm: '30.0' }
];

export default function SizeGuideModal({ isOpen, onClose, selectedSize, onSelectSize }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="modal-content"
          style={{ maxWidth: '650px' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800' }}>STEPX Footwear Size Guide</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>International sizing conversion & foot length measurements</p>
            </div>
            <button onClick={onClose} className="action-btn">
              <FiX />
            </button>
          </div>

          <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '2px solid var(--border-light)' }}>
                  <th style={{ padding: '10px 14px', color: 'var(--accent-primary)' }}>US Men</th>
                  <th style={{ padding: '10px 14px' }}>US Women</th>
                  <th style={{ padding: '10px 14px' }}>UK</th>
                  <th style={{ padding: '10px 14px' }}>EU</th>
                  <th style={{ padding: '10px 14px' }}>Foot Length (CM)</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_CHART.map((row, idx) => (
                  <tr 
                    key={idx} 
                    style={{ 
                      borderBottom: '1px solid var(--border-subtle)',
                      background: parseFloat(row.usMen) === Number(selectedSize) ? 'var(--accent-light)' : 'transparent',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      if (onSelectSize) onSelectSize(parseFloat(row.usMen));
                      onClose();
                    }}
                  >
                    <td style={{ padding: '10px 14px', fontWeight: '700', color: '#fff' }}>{row.usMen}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{row.usWomen}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{row.uk}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{row.eu}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{row.cm} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '6px' }}>How to Measure Your Foot:</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              1. Stand barefoot on a sheet of paper with your heel against a flat wall.<br />
              2. Mark the tip of your longest toe on the paper.<br />
              3. Measure the distance in centimeters from the wall to the mark and match with the table above.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
