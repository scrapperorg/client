import { ROLES_PRIORITY, Role } from 'constants/roles';
import { AuthContext } from 'contexts/authContext';
import React, { useContext } from 'react'
import { NotAllowedRole } from './components/notAllowedRole';
import { Navigate, Outlet } from 'react-router-dom';
import PATHS from 'constants/paths';

interface AuthorizedComponentProps {
  children?: React.ReactNode,
  atLeastRole?: Role,
  exactRole?: Role,
  showMessage?: boolean,
  isRoute?: boolean,
}

export const ProtectedByRole = (props: AuthorizedComponentProps) => {
  const {
    children,
    atLeastRole,
    exactRole,
    showMessage = false,
    isRoute = false
  } = props;
  const { user } = useContext(AuthContext);
  
  const message = showMessage ? <NotAllowedRole /> : null;

  const cantAccess = (exactRole && user?.role !== exactRole) || (atLeastRole && ROLES_PRIORITY[user!.role] < ROLES_PRIORITY[atLeastRole]);

  if (cantAccess && isRoute) return <Navigate to={PATHS.LOGIN} />;

  if (cantAccess) return message;

  const content = isRoute ? <Outlet /> : children;

  return <>{content}</>;
  
}