import React from 'react';
import MonitorDataProvider from './context';
import MonitorContent from './components/content';

export default function MonitorScreen() {
  return (
    <MonitorDataProvider>
      <MonitorContent />
    </MonitorDataProvider>
  );
}
