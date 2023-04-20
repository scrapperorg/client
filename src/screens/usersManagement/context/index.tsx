import React, { createContext } from 'react';
import { UserDto } from 'services/api/dtos';
import { userApiService } from 'services/api/UserApiService';
import { useApiService } from 'hooks/useApiService';

export interface UsersManagementProviderState {
  users: UserDto[];
  error?: string;
  fetch: () => void;
  loading: boolean;
}

const defaultState: UsersManagementProviderState = {
  users: [],
  fetch: () => {
    console.log('method not implemented');
  },
  loading: false,
};

export const UsersManagementContext = createContext(defaultState);

const UsersManagementDataProvider = ({ children }: any) => {

  const { data, error, fetch, loading } = useApiService<UserDto[]>(userApiService, userApiService.getUsersWithRoles, []);

  const state: UsersManagementProviderState = {
    users: data ?? defaultState.users,
    error,
    fetch,
    loading,
  };

  return <UsersManagementContext.Provider value={state}>{children}</UsersManagementContext.Provider>;
};

export default UsersManagementDataProvider;
