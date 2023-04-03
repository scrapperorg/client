import React, { createContext } from 'react';
import defaultKeywords from './keywords';

export interface OptionsProviderState {
  keywords: string[];
}

const defaultState: OptionsProviderState = {
    keywords: [],
};

export const OptionsContext = createContext(defaultState);

const OptionsDataProvider = ({ children }: any) => {
  const state = {
    keywords: defaultKeywords,
  };

  return <OptionsContext.Provider value={state}>{children}</OptionsContext.Provider>;
};

export default OptionsDataProvider;
