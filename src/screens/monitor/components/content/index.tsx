import React, {useContext, useEffect, useState} from 'react';
import { MonitorContext } from 'screens/monitor/context';
import { DocumentsTable } from '../documentTable';

export default function MonitorContent() {
  const [time, setTime] = useState(new Date());

  const {
    documents,
    totalNumberOfDocuments,
    page,
    onPageChange,
    pageSize,
    fetch,
  } = useContext(MonitorContext);

  useEffect(() => {
    const interval = setInterval(async () => {
      await fetch(page, pageSize);
      if (page === 0) {
        setTime(new Date());
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    }
  }, [time]);

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
