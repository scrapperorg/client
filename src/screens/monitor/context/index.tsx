import React, { createContext } from 'react';
import Loading from 'components/loading';
import { DocumentDto, QueryAll, } from 'services/api/dtos';
import { documentApiService } from 'services/api/DocumentApiService';
import { usePaginatedApiService } from 'hooks/useApiService';

export interface MonitorProviderState {
  documents: DocumentDto[];
  totalNumberOfDocuments: number;
  page: number;
  pageSize: number;
  error?: string;
  onPageChange: (page: number) => void;
}

const defaultState: MonitorProviderState = {
  documents: [],
  totalNumberOfDocuments: 0,
  page: 0,
  pageSize: 2,
  onPageChange: (page: number) => { console.log('method not implemented') }
};

export const MonitorContext = createContext(defaultState);

const MonitorDataProvider = ({ children }: any) => {
  const { page, pageSize, data, loading, error, onPageChange } = usePaginatedApiService<QueryAll<DocumentDto>>(documentApiService, documentApiService.getDocuments);

  if (loading) {
    return <Loading />;
  }

  const state: MonitorProviderState = {
    documents: data?.results ?? defaultState.documents,
    totalNumberOfDocuments: data?.totalNumberOfResults ?? defaultState.totalNumberOfDocuments,
    error,
    page,
    pageSize: pageSize ||  defaultState.pageSize,
    onPageChange: onPageChange || defaultState.onPageChange,
  };


  return <MonitorContext.Provider value={state}>{children}</MonitorContext.Provider>;
};

export default MonitorDataProvider;
