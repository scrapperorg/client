import React, { useContext } from 'react';
import { AuthContext } from 'contexts/authContext';
import { Navigate, Outlet } from 'react-router-dom';
import PATHS from 'constants/paths';

export default function PrivateRoute() {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Navigate to={PATHS.MONITOR} />;
  }

  return <Outlet />;
}
