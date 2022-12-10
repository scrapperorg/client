import React, { createContext } from 'react';
import Loading from 'components/loading';
import { useAuthenticatedUser } from './hooks/useAuthenticatedUser';
import { UserDto } from 'services/api/dtos';

export interface AuthProviderState {
  isAuthenticated: boolean;
  user: UserDto | undefined;
  setUser: (user: UserDto) => void;
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

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, isLoading, setUser, isAuthenticated, logoutUser } = useAuthenticatedUser();

  if (isLoading) {
    return <Loading />;
  }

  const state: AuthProviderState = {
    user,
    isAuthenticated,
    setUser,
    logoutUser,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
