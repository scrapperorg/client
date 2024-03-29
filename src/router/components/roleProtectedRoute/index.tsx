import React, { useContext } from 'react';
import { AuthContext } from 'contexts/authContext';
import { Navigate, Outlet } from 'react-router-dom';
import PATHS from 'constants/paths';
import { Role, ROLES_PRIORITY } from 'constants/roles';

interface PrivateRouteProps {
  exactRoles?: Role[];
  atLeastRole?: Role;
}

export default function RoleProtectedRoute({ exactRoles, atLeastRole }: PrivateRouteProps) {
  const { user } = useContext(AuthContext);

  if (exactRoles && exactRoles.length) {
    if (!exactRoles.includes(user!.role)) {
      return <Navigate to={PATHS.MONITOR} />;
    }
  }

  if (atLeastRole) {
    if (ROLES_PRIORITY[user!.role] < ROLES_PRIORITY[atLeastRole]) {
      return <Navigate to={PATHS.MONITOR} />;
    }
  }

  return <Outlet />;
}
