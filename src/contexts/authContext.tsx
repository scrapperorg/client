import React, { createContext, useState } from 'react';
import Loading from 'components/loading';

export interface AuthProviderState {
  isAuthenticated: boolean;
}

const defaultState: AuthProviderState = {
  isAuthenticated: false,
};

export const AuthContext = createContext(defaultState);

const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  const state: AuthProviderState = {
    isAuthenticated,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
