import React, { createContext } from 'react';
import { DocumentDto } from 'services/api/dtos';
import {useDocuments} from "../hooks/useDocuments";

export interface MonitorProviderState {
  documents: DocumentDto[];
  totalNumberOfDocuments: number;
  page: number;
  pageSize: number;
  error?: string;
  fetch: (page: number, pageSize: number) => void;
  onPageChange: (page: number) => void;
}

const defaultState: MonitorProviderState = {
  documents: [],
  totalNumberOfDocuments: 0,
  page: 0,
  pageSize: 2,
  fetch: () => { console.log('method not implemented') },
  onPageChange: (page: number) => { console.log(`method not implemented. page: ${page}`) }
};

export const MonitorContext = createContext(defaultState);

const MonitorDataProvider = ({ children }: any) => {
  const documentsState = useDocuments();

  return <MonitorContext.Provider value={documentsState}>{children}</MonitorContext.Provider>;
};

export default MonitorDataProvider;
