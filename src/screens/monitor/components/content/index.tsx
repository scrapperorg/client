import React, { useContext } from 'react';
import { MonitorContext } from 'screens/monitor/context';
import { DocumentsTable } from '../documentTable';

export default function MonitorContent() {

  const {
    documents,
    totalNumberOfDocuments,
    page,
    onPageChange,
    pageSize,
  } = useContext(MonitorContext);

  if (!documents) return null

  return (
    <DocumentsTable
      documents={documents}
      totalNumberOfDocuments={totalNumberOfDocuments}
      page={page}
      pageSize={pageSize}
      onPageChange={onPageChange}
    />
  );
}
