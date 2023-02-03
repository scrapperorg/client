import React, { createContext, useCallback, useEffect, useState } from 'react';
import Loading from 'components/loading';
import { authApiService } from 'services/api/AuthApiService';
import { LoginDto, OperationStatus } from 'services/api/dtos';
import { Role } from 'constants/roles';

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: Role;
  sourcesOfInterest: string[];
}
export interface AuthProviderState {
  isAuthenticated: boolean;
  user: Partial<User> | undefined;
  setUser: (user: User | undefined) => void;
  logoutUser: () => void;
}

const defaultState: AuthProviderState = {
  user: {} as User,
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
  user: Partial<User> | undefined;
  token: string | null;
  setUser: (user: Partial<User> | undefined) => void;
  logoutUser: () => void;
}

const useAuth: () => UseAuthHookReturnType = () => {
  const [isLoading, setIsLoading] = useState(false);
  const storedUser: string | null = localStorage.getItem('user');
  let initialUser: Partial<User>;
  if (storedUser && storedUser !== undefined) {
    initialUser = JSON.parse(storedUser);
  } else {
    initialUser = {};
  }
  const [user, _setUser] = useState<Partial<User>>(initialUser);
  const token = localStorage.getItem('token');

  const setUser = useCallback(
    (user: Partial<User> | undefined) => {
      if (user) _setUser(user);
    },
    [_setUser],
  );

  const logoutUser = () => {
    setUser(undefined);
    authApiService.logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  useEffect(() => {
    if (token) {
      // fetch /refresh token
      setIsLoading(true);
      authApiService
        .refreshToken(token)
        .then((data: OperationStatus<LoginDto>) => {
          if (data.payload?.user) _setUser(data.payload?.user);
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, []);

  return { isLoading, user, token, setUser, logoutUser };
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { isLoading, user, setUser, logoutUser } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  const state: AuthProviderState = {
    user,
    isAuthenticated: Boolean(user),
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
