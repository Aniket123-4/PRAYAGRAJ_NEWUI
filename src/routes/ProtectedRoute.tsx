import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  const isAuthenticated = !!(token && user);
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;