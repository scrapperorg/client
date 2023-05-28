import { AuthContext } from 'contexts/authContext';
import React, { createContext, useContext, useEffect } from 'react';
import { useApiService } from '../../../hooks/useApiService';
import { NotificationDto } from '../../../services/api/dtos';
import { notificationApiService } from '../../../services/api/NotificationApiService';
import { useInterval } from 'react-interval-hook';

export interface LayoutProviderState {
  notifications: NotificationDto[];
  fetchNotifications: () => void;
}

const defaultState: LayoutProviderState = {
  notifications: [],
  fetchNotifications: () => [],
};

export const LayoutContext = createContext(defaultState);

const LayoutDataProvider = ({ children }: any) => {
  const { user } = useContext(AuthContext);
  const { data, fetch } = useApiService<NotificationDto[]>(notificationApiService, () =>
    notificationApiService.getAll(user!.id),
  );

  const { start: startPolling, stop: stopPolling } = useInterval(fetch, 20000, {
    autoStart: false,
    immediate: false,
  });

  useEffect(() => {
    startPolling();
    return () => stopPolling();
  }, []);

  const state: LayoutProviderState = {
    notifications: data || defaultState.notifications,
    fetchNotifications: fetch,
  };

  return <LayoutContext.Provider value={state}>{children}</LayoutContext.Provider>;
};

export default LayoutDataProvider;
