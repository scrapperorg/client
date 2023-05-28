import React from 'react';
import NotificationsContent from './components/content';
import NotificationsDataProvider from './context';
import LayoutDataProvider from '../../components/layout/context';

export default function NotificationsScreen() {
  return (
    // <NotificationsDataProvider>
    <LayoutDataProvider>
      <NotificationsContent />
    </LayoutDataProvider>
    // </NotificationsDataProvider>
  );
}
