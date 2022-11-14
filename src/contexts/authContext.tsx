import React, { createContext, useCallback, useEffect, useState } from 'react';
import Loading from 'components/loading';

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: string;
}
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

export interface AuthProviderProps {
  children: JSX.Element;
}

export interface UseAuthHookReturnType {
  isLoading: boolean;
  user: User | undefined;
  token: string | null;
  setUser: (user: User) => void;
}

const useAuth: () => UseAuthHookReturnType = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, _setUser] = useState<User | undefined>();
  const token = localStorage.getItem('token');

  const setUser = useCallback(
    (user: User) => {
      _setUser(user);
    },
    [_setUser],
  );

  useEffect(() => {
    if (token) {
      // fetch /refresh token
    }
  }, [setUser, setIsLoading]);

  return { isLoading, user, token, setUser };
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { isLoading, user, setUser } = useAuth();

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
