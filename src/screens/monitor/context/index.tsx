import React, { createContext, useEffect } from 'react';
import { DocumentDto, QueryAll } from 'services/api/dtos';
import { documentApiService } from 'services/api/DocumentApiService';
import { useDocumentsFilters } from '../hooks/useDocumentsFilters';
import { usePaginatedApiService } from 'hooks/usePaginatedApiService';
import { useInterval } from 'react-interval-hook';

export interface MonitorProviderState {
  documents: DocumentDto[];
  totalNumberOfDocuments: number;
  page: number;
  pageSize: number;
  error?: string;
  sourcesOfInterest: string[];
  fetch: (page: number, pageSize: number, sourceOfInterest?: string[]) => void;
  onPageSizeChange: (pageSize: number) => void;
  onPageChange: (page: number) => void;
  updateSourcesOfInterest: (sources: string[]) => void;
  startPolling: () => void;
  stopPolling: () => void;
}

const defaultState: MonitorProviderState = {
  documents: [],
  totalNumberOfDocuments: 0,
  page: 0,
  pageSize: 2,
  sourcesOfInterest: [],
  fetch: () => {
    console.log('method not implemented');
  },
  onPageSizeChange: () => {
    console.log('method not implemented');
  },
  onPageChange: (page: number) => {
    console.log(`method not implemented. page: ${page}`);
  },
  updateSourcesOfInterest: (sources: string[]) => {
    console.log(`method not implemented. sources: ${sources}`);
  },
  startPolling: () => {
    console.log(`method not implemented`);
  },
  stopPolling: () => {
    console.log('method not implemented');
  },
};

export const MonitorContext = createContext(defaultState);

const MonitorDataProvider = ({ children }: any) => {
  const { sourcesOfInterest, updateSourcesOfInterest } = useDocumentsFilters();

  const { start: startPolling, stop: stopPolling } = useInterval(
    async () => {
      await fetch(page, pageSize, sourcesOfInterest);
    },
    5000,
    { autoStart: false, immediate: false },
  );

  const { page, pageSize, data, fetch, onPageSizeChange, error, onPageChange } =
    usePaginatedApiService<QueryAll<DocumentDto>>(
      documentApiService,
      documentApiService.getDocuments,
      sourcesOfInterest,
    );

  useEffect(() => {
    startPolling();

    return () => stopPolling();
  }, []);

  const state: MonitorProviderState = {
    documents: data?.results ?? defaultState.documents,
    totalNumberOfDocuments: data?.totalNumberOfResults ?? defaultState.totalNumberOfDocuments,
    error,
    page,
    fetch,
    pageSize: pageSize || defaultState.pageSize,
    sourcesOfInterest,
    onPageSizeChange,
    onPageChange: onPageChange || defaultState.onPageChange,
    updateSourcesOfInterest: updateSourcesOfInterest || defaultState.updateSourcesOfInterest,
    startPolling,
    stopPolling,
  };

  return <MonitorContext.Provider value={state}>{children}</MonitorContext.Provider>;
};

export default MonitorDataProvider;
