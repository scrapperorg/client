import React from 'react';
import UsersManagementDataProvider from './context';
import UsersManagementContent from './components/content';


export default function UsersManagementScreen() {
  return (
    <UsersManagementDataProvider>
      <UsersManagementContent />
    </UsersManagementDataProvider>
  );
}
