import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiStar, FiSend } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';

export default function ReviewModal({ isOpen, onClose, product, onSubmitReview }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const { success, warning } = useToast();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      warning('Please write your review feedback');
      return;
    }
    onSubmitReview({
      author: author.trim() || 'STEPX Member',
      rating,
      comment: comment.trim()
    });
    success('Thank you! Your review has been published.');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="modal-content"
          style={{ maxWidth: '540px' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Write a Review</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{product?.name}</p>
            </div>
            <button onClick={onClose} className="action-btn">
              <FiX />
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px' }}>
                Your Rating
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    style={{ fontSize: '1.8rem', background: 'none', border: 'none', cursor: 'pointer', color: (hoverRating || rating) >= star ? '#fbbf24' : '#52525b' }}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px' }}>
                Your Name / Handle
              </label>
              <input
                type="text"
                placeholder="e.g. Marcus V."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px' }}>
                Review Feedback
              </label>
              <textarea
                rows={4}
                placeholder="Share your experience on comfort, fit, responsiveness, and durability..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
              <FiSend /> Post Verified Review
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
