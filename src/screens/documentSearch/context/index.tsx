import React, { createContext } from 'react';
import { UserDto } from 'services/api/dtos';
import { useApiService } from 'hooks/useApiService';
import { userApiService } from 'services/api/UserApiService';

export interface DocumentsSearchProviderState {
  assignableResponsibles: UserDto[];
  loadingAssignableRoles: boolean;
}

const defaultState: DocumentsSearchProviderState = {
  assignableResponsibles: [],
  loadingAssignableRoles: false,
};

export const DocumentSearchContext = createContext(defaultState);

const DocumentsSearchDataProvider = ({ children }: any) => {

  const { data: assignableResponsibles, loading: loadingAssignableRoles } = useApiService<UserDto[]>(userApiService, userApiService.getUsersWithRoles, ['LSE', 'LSS']);

  const state: DocumentsSearchProviderState = {
    assignableResponsibles: assignableResponsibles ?? defaultState.assignableResponsibles,
    loadingAssignableRoles: loadingAssignableRoles ?? defaultState.loadingAssignableRoles,
  };

  return <DocumentSearchContext.Provider value={state}>{children}</DocumentSearchContext.Provider>;
};

export default DocumentsSearchDataProvider;
