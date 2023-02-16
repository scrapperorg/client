import React, { createContext } from 'react';
import { FullScreenLoading as Loading } from 'components/loading';
import { DocumentDto, UserDto } from 'services/api/dtos';
import { documentApiService } from 'services/api/DocumentApiService';
import { useApiService } from 'hooks/useApiService';
import { useParams } from 'react-router-dom';
import { userApiService } from 'services/api/UserApiService';

export interface DocumentDetailsProviderState {
  document: DocumentDto | null;
  assignableResponsibles: UserDto[];
  loadingAssignableRoles: boolean;
}

const defaultState: DocumentDetailsProviderState = {
  document: null,
  assignableResponsibles: [],
  loadingAssignableRoles: false,
};

export const DocumentDetailsContext = createContext(defaultState);

const DocumentDetailsDataProvider = ({ children }: any) => {
  const { id='' } = useParams();

  const { data, loading } = useApiService<DocumentDto>(documentApiService, documentApiService.getDocumentById, id);
  
  const { data: assignableResponsibles, loading: loadingAssignableRoles } = useApiService<UserDto[]>(userApiService, userApiService.getUsersWithRoles, ['LSE', 'LSS']);

  if (loading) {
    return <Loading />;
  }

  const state: DocumentDetailsProviderState = {
    document: data ?? defaultState.document,
    assignableResponsibles: assignableResponsibles ?? defaultState.assignableResponsibles,
    loadingAssignableRoles: loadingAssignableRoles ?? defaultState.loadingAssignableRoles,
  };


  return <DocumentDetailsContext.Provider value={state}>{children}</DocumentDetailsContext.Provider>;
};

export default DocumentDetailsDataProvider;
