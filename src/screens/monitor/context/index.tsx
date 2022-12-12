import React, { createContext } from 'react';
import Loading from 'components/loading';
import { DocumentDto, QueryAll, } from 'services/api/dtos';
import { documentApiService } from 'services/api/DocumentApiService';
import { usePaginatedApiService } from 'hooks/useApiService';
import { useDocumentsFilters } from '../hooks/useDocumentsFilters';

export interface MonitorProviderState {
  documents: DocumentDto[];
  totalNumberOfDocuments: number;
  page: number;
  pageSize: number;
  error?: string;
  sourcesOfInterest: string[];
  onPageChange: (page: number) => void;
  updateSourcesOfInterest: (sources: string[]) => void;
}

const defaultState: MonitorProviderState = {
  documents: [],
  totalNumberOfDocuments: 0,
  page: 0,
  pageSize: 2,
  sourcesOfInterest: [],
  onPageChange: (page: number) => { console.log(`method not implemented. page: ${page}`) },
  updateSourcesOfInterest: (sources: string[]) => { console.log(`method not implemented. sources: ${sources}`) }
};

export const MonitorContext = createContext(defaultState);

const MonitorDataProvider = ({ children }: any) => {

  const { sourcesOfInterest, updateSourcesOfInterest } = useDocumentsFilters()

  const { page, pageSize, data, loading, error, onPageChange } = usePaginatedApiService<QueryAll<DocumentDto>>(documentApiService, documentApiService.getDocuments, sourcesOfInterest);

  if (loading) {
    return <Loading />;
  }

  const state: MonitorProviderState = {
    documents: data?.results ?? defaultState.documents,
    totalNumberOfDocuments: data?.totalNumberOfResults ?? defaultState.totalNumberOfDocuments,
    error,
    page,
    pageSize: pageSize ||  defaultState.pageSize,
    sourcesOfInterest,
    onPageChange: onPageChange || defaultState.onPageChange,
    updateSourcesOfInterest: updateSourcesOfInterest || defaultState.updateSourcesOfInterest
  };


  return <MonitorContext.Provider value={state}>{children}</MonitorContext.Provider>;
};

export default MonitorDataProvider;
