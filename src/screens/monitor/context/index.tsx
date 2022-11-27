import React, { createContext } from 'react';
import Loading from 'components/loading';
import { useGetDocuments } from '../../../hooks/useDocuments';
import { DocumentDto, } from 'services/api/dtos';

export interface MonitorProviderState {
  documents: DocumentDto[];
  totalNumberOfDocuments: number;
  page: number;
  error?: string;
  goToPage?: (page: number) => void;
  nextPage?: () => void;
  previousPage?: () => void;
}

const defaultState: MonitorProviderState = {
  documents: [],
  totalNumberOfDocuments: 0,
  page: 0,
};

export const MonitorContext = createContext(defaultState);

const MonitorDataProvider = ({ children }: any) => {

  const {
    data,
    loading: documentsLoading,
    error,
    page,
    goToPage,
    nextPage,
    previousPage,
  } = useGetDocuments()

  if (documentsLoading) {
    return <Loading />;
  }

  const state: MonitorProviderState = {
    documents: data?.results || defaultState.documents,
    totalNumberOfDocuments: data?.totalNumberOfResults ?? defaultState.totalNumberOfDocuments,
    page,
    error,
    nextPage,
    previousPage,
  };


  return <MonitorContext.Provider value={state}>{children}</MonitorContext.Provider>;
};

export default MonitorDataProvider;
