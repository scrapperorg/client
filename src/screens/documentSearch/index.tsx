import React from 'react';
import DocumentsSearchContent from './components/content';
import DocumentsSearchDataProvider from './context';


export default function DocumentsSearchScreen() {
  return (
    <DocumentsSearchDataProvider>
      <DocumentsSearchContent />
    </DocumentsSearchDataProvider>
  );
}
