import React from 'react';
import NotificationsContent from './components/content';
import LayoutDataProvider from '../../components/layout/context';

export default function NotificationsScreen() {
  return (
    <LayoutDataProvider>
      <NotificationsContent />
    </LayoutDataProvider>
  );
}
