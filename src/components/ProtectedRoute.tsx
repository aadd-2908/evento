import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireOrganizer?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireOrganizer = false 
}) => {
  const { user, loading, isAuthenticated, isOrganizer } = useContext(AuthContext);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireOrganizer && !isOrganizer) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;