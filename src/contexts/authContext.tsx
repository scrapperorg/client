import React, { createContext, useEffect, useState } from 'react';
import Loading from 'components/loading';

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: string;
}

// const token = localStorage.getItem('token');
// const user = JSON.parse(localStorage.getItem('user'));
export interface AuthProviderState {
  isAuthenticated: boolean;
  user: User | undefined;
  setUser: (user: User) => void;
}

const defaultState: AuthProviderState = {
  user: undefined,
  isAuthenticated: false,
  // eslint-disable-next-line
  setUser: () => {},
};

export const AuthContext = createContext(defaultState);

const AuthProvider = ({ children }: any) => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    // fetch /refresh token
  }, [setUser, setIsLoading]);

  if (isLoading) {
    return <Loading />;
  }

  const state: AuthProviderState = {
    user,
    isAuthenticated: Boolean(user),
    setUser: (user: User) => {
      setUser(user);
    },
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
