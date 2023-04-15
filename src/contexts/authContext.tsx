import React, { createContext, useCallback, useState } from 'react';
import { FullScreenLoading as Loading } from 'components/loading';
import { authApiService } from 'services/api/AuthApiService';
import { Role } from 'constants/roles';

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: Role;
  sourcesOfInterest: string[];
  createdAt: string;
}
export interface AuthProviderState {
  isAuthenticated: boolean;
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  logoutUser: () => void;
}

const defaultState: AuthProviderState = {
  user: undefined,
  isAuthenticated: false,
  // eslint-disable-next-line
  setUser: () => {},
  logoutUser: () => undefined,
};

export const AuthContext = createContext(defaultState);

export interface AuthProviderProps {
  children: JSX.Element;
}

export interface UseAuthHookReturnType {
  isLoading: boolean;
  user: User | undefined;
  token: string | null;
  setUser: (user: User | undefined) => void;
  logoutUser: () => void;
}

const useAuth: () => UseAuthHookReturnType = () => {
  const [isLoading] = useState(false);
  const [user, _setUser] = useState<User | undefined>();
  const token = localStorage.getItem('token');

  const setUser = useCallback(
    (user: User | undefined) => {
      _setUser(user);
    },
    [_setUser],
  );

  const logoutUser = () => {
    setUser(undefined);
    authApiService.logout();
    localStorage.removeItem('token');
  };

  return { isLoading, user, token, setUser, logoutUser };
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { isLoading, user, setUser, logoutUser, token } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  const state: AuthProviderState = {
    user,
    isAuthenticated: Boolean(token),
    setUser: (user: User | undefined) => {
      setUser(user);
    },
    logoutUser: () => {
      logoutUser();
    },
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
