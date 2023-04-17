import React, { createContext } from 'react';
import { UserDto } from 'services/api/dtos';
import { userApiService } from 'services/api/UserApiService';
import { useApiService } from 'hooks/useApiService';

export interface UsersManagementProviderState {
  users: UserDto[];
  error?: string;
}

const defaultState: UsersManagementProviderState = {
  users: [],
};

export const UsersManagementContext = createContext(defaultState);

const UsersManagementDataProvider = ({ children }: any) => {

  const {data, error } = useApiService<UserDto[]>(userApiService, userApiService.getUsersWithRoles, []);

  const state: UsersManagementProviderState = {
    users: data ?? defaultState.users,
    error,
  };

  return <UsersManagementContext.Provider value={state}>{children}</UsersManagementContext.Provider>;
};

export default UsersManagementDataProvider;
