import React, { createContext } from 'react';
import Loading from 'components/loading';
import {useAuthenticatedUser} from "./hooks/useAuthenticatedUser";
import {UserDto} from "../../services/api/AuthApiService";

export interface AuthProviderState {
  isAuthenticated: boolean;
  user: UserDto | undefined;
  setUser: (user: UserDto) => void;
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

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, isLoading, setUser, isAuthenticated } = useAuthenticatedUser();

  if (isLoading) {
    return <Loading />;
  }

  const state: AuthProviderState = {
    user,
    isAuthenticated,
    setUser,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
