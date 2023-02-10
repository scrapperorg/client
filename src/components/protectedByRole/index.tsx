import React, { ReactComponentElement, useContext } from 'react';
import { Role, ROLES_PRIORITY } from 'constants/roles';
import { AuthContext } from 'contexts/authContext';
import { NotAllowedRole } from './components/notAllowedRole';

export function ProtectedByRole(component: ReactComponentElement<any>, atLeastRole: Role) {
  const { user } = useContext(AuthContext);

  if (atLeastRole) {
    if (ROLES_PRIORITY[user!.role] < ROLES_PRIORITY[atLeastRole]) {
      return <NotAllowedRole />;
    }
  }

  return component;
}
