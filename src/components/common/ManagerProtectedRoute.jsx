import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ManagerProtectedRoute({ children }) {
  const { managerUser, isManagerAuthenticated } = useAuth();
  const location = useLocation();

  if (!isManagerAuthenticated || !managerUser || managerUser.role !== 'manager') {
    return <Navigate to="/manager/login" state={{ from: location }} replace />;
  }

  return children;
}
