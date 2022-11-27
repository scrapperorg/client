import React, { createContext } from 'react';
import Loading from 'components/loading';
import { DocumentDto } from 'services/api/dtos';
import { documentApiService } from 'services/api/DocumentApiService';
import { useApiService } from 'hooks/useApiService';
import { useParams } from 'react-router-dom';

export interface DocumentDetailsProviderState {
  document: DocumentDto | null;
}

const defaultState: DocumentDetailsProviderState = {
  document: null,
};

export const DocumentDetailsContext = createContext(defaultState);

const DocumentDetailsDataProvider = ({ children }: any) => {
  const { id='' } = useParams();

  const { data, loading, error } = useApiService<DocumentDto>(documentApiService, documentApiService.getDocumentById, id);

  if (loading) {
    return <Loading />;
  }

  const state: DocumentDetailsProviderState = {
    document: data ?? defaultState.document,
  };


  return <DocumentDetailsContext.Provider value={state}>{children}</DocumentDetailsContext.Provider>;
};

export default DocumentDetailsDataProvider;
