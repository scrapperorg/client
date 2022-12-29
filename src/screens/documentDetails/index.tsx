import React from 'react';
import DocumentDetailsContent from './components/content';
import DocumentDetailsDataProvider from './context';

export default function MonitorScreen() {
  return (
    <DocumentDetailsDataProvider>
      <DocumentDetailsContent />
    </DocumentDetailsDataProvider>
  );
}
