import React, { createContext } from 'react';
import { KeywordDto } from '../../../services/api/dtos/keyword';
import { useApiService } from '../../../hooks/useApiService';
import { keywordApiService } from '../../../services/api/KeywordApiService';
import { Loading } from 'components/loading';

export interface OptionsProviderState {
  keywords: KeywordDto[];
  getAllKeywords: () => void;
}

const defaultState: OptionsProviderState = {
  keywords: [],
  getAllKeywords: () => {
    console.log('not implemented');
  },
};

export const OptionsContext = createContext(defaultState);

const NotificationsDataProvider = ({ children }: any) => {
  const { data, loading, fetch } = useApiService<KeywordDto[]>(
    keywordApiService,
    keywordApiService.getAll,
  );

  if (loading) {
    return <Loading />;
  }

  const state: OptionsProviderState = {
    keywords: data ?? defaultState.keywords,
    getAllKeywords: fetch,
  };

  return <OptionsContext.Provider value={state}>{children}</OptionsContext.Provider>;
};

export default NotificationsDataProvider;
