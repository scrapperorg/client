import React, { createContext, useState } from 'react';
import Loading from 'components/loading';
import { useDocuments } from '../hooks/useDocuments';
import { authApiService } from '../../../services/api/AuthApiService';

export interface MonitorProviderState {
  data: any;
}

const defaultState: MonitorProviderState = {
  data: [],
};

export const MonitorContext = createContext(defaultState);

const MonitorDataProvider = ({ children }: any) => {

  const [documents, documentsLoading, documentsError] = useDocuments();

  if (documentsLoading) {
    return <Loading />;
  }

  const state: MonitorProviderState = {
    data: documents,
  };

  return <MonitorContext.Provider value={state}>{children}</MonitorContext.Provider>;
};

export default MonitorDataProvider;
