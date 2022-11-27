import React, { useContext } from 'react';
import { MonitorContext } from 'screens/monitor/context';
import { DocumentsTable } from '../documentTable';

export default function MonitorContent() {

  const { documents } = useContext(MonitorContext);

  if (!documents) return null

  return (
    <DocumentsTable documents={documents} />
  );
}