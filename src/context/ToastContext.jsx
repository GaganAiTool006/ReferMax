import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X, Sparkles } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ title, message, type = 'info', duration = 4000, icon }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type, icon }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showSuccess = (message, title = 'सफलता (Success)') => 
    addToast({ title, message, type: 'success' });

  const showError = (message, title = 'त्रुटि (Error)') => 
    addToast({ title, message, type: 'error' });

  const showBonus = (message, title = '🎉 बोनस क्रेडिट (Bonus Added!)') => 
    addToast({ title, message, type: 'bonus', duration: 5000 });

  const showInfo = (message, title = 'सूचना (Notice)') => 
    addToast({ title, message, type: 'info' });

  return (
    <ToastContext.Provider value={{ addToast, removeToast, showSuccess, showError, showBonus, showInfo }}>
      {children}
      <div className="toast-container fixed-toasts">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast-item toast-${toast.type}`}
          >
            <div className="toast-icon">
              {toast.type === 'success' && <CheckCircle2 size={20} color="#10b981" />}
              {toast.type === 'error' && <AlertCircle size={20} color="#ef4444" />}
              {toast.type === 'bonus' && <Sparkles size={22} color="#f59e0b" className="spin-icon" />}
              {toast.type === 'info' && <Info size={20} color="#06b6d4" />}
            </div>
            <div className="toast-body">
              {toast.title && <h4 className="toast-title">{toast.title}</h4>}
              <p className="toast-msg">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="toast-close"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
