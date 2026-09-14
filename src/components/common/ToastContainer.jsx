import React from 'react';
import { useToast } from '../../context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi';
import './Toast.css';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="toast-icon" />;
      case 'error':
        return <FiAlertCircle className="toast-icon" />;
      case 'warning':
        return <FiAlertTriangle className="toast-icon" />;
      default:
        return <FiInfo className="toast-icon" />;
    }
  };

  return (
    <div className="toast-container" aria-live="polite">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`toast-item ${toast.type}`}
          >
            {getIcon(toast.type)}
            <div className="toast-text">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="toast-close"
              aria-label="Close notification"
            >
              <FiX size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
