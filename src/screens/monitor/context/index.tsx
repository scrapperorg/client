import React, { createContext, useState } from 'react';
import Loading from 'components/loading';

export interface MonitorProviderState {
  data: any;
}

const defaultState: MonitorProviderState = {
  data: [],
};

export const MonitorContext = createContext(defaultState);

const MonitorDataProvider = ({ children }: any) => {
  const [data] = useState(true);
  const [isLoading] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  const state: MonitorProviderState = {
    data,
  };

  return <MonitorContext.Provider value={state}>{children}</MonitorContext.Provider>;
};

export default MonitorDataProvider;
