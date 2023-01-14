import React, { createContext } from 'react';
import { DocumentDto, QueryAll } from 'services/api/dtos';
import { documentApiService } from 'services/api/DocumentApiService';
import { usePaginatedApiService } from 'hooks/usePaginatedApiService';

export interface DocumentsSearchProviderState {
  documents: DocumentDto[];
  totalNumberOfDocuments: number;
  page: number;
  pageSize: number;
  error?: string;
  fetch: (page: number, pageSize: number, sourceOfInterest?: string[]) => void;
  onPageSizeChange: (pageSize: number) => void;
  onPageChange: (page: number) => void;
}

const defaultState: DocumentsSearchProviderState = {
  documents: [],
  totalNumberOfDocuments: 0,
  page: 0,
  pageSize: 2,
  fetch: () => { console.log('method not implemented') },
  onPageSizeChange: () => { console.log('method not implemented') },
  onPageChange: (page: number) => { console.log(`method not implemented. page: ${page}`) },
};

// export const DocumentSearchContext = createContext(defaultState);

export const DocumentSearchContext = createContext(defaultState);

const DocumentsSearchDataProvider = ({ children }: any) => {

  const { page, pageSize, data, fetch, onPageSizeChange, error, onPageChange } = usePaginatedApiService<QueryAll<DocumentDto>>(documentApiService, documentApiService.getDocuments);

  const state: DocumentsSearchProviderState = {
    documents: data?.results ?? defaultState.documents,
    totalNumberOfDocuments: data?.totalNumberOfResults ?? defaultState.totalNumberOfDocuments,
    error,
    page,
    fetch,
    pageSize: pageSize,
    onPageSizeChange,
    onPageChange: onPageChange,
  };

  return <DocumentSearchContext.Provider value={state}>{children}</DocumentSearchContext.Provider>;
};

export default DocumentsSearchDataProvider;
