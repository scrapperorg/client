import { Box } from '@mui/system';
import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import { MonitorContext } from 'screens/monitor/context';
import styled from 'styled-components';
import { DocumentsTable } from '../documentTable';
import { SourcesSelector } from '../sourcesSelector';

export default function MonitorContent() {
  const [time, setTime] = useState(new Date());
  const interval = useRef<any>();

  const {
    documents,
    totalNumberOfDocuments,
    page,
    onPageChange,
    pageSize,
    sourcesOfInterest,
    updateSourcesOfInterest,
    fetch
  } = useContext(MonitorContext);

  const startTickLongPulling = useCallback(() => {
    interval.current = setTimeout(async () => {
      await fetch(page, pageSize, sourcesOfInterest);
      if (page === 0) {
        setTime(new Date());
      }
    }, 5000);
  }, [fetch, page, pageSize, sourcesOfInterest]);

  useEffect(() => {
   if (interval.current) {
     clearTimeout(interval.current);
     startTickLongPulling();
   }
  }, [sourcesOfInterest, startTickLongPulling]);

  useEffect(() => {
    startTickLongPulling();

    return () => {
      clearTimeout(interval.current);
    }
  }, [time, startTickLongPulling]);

  if (!documents) return null

  return (
    <>
      <SelectBox>
        <SourcesSelector
          value={sourcesOfInterest}
          onSelect={updateSourcesOfInterest}
        />
      </SelectBox>
      <Box>
        <DocumentsTable
          documents={documents}
          totalNumberOfDocuments={totalNumberOfDocuments}
          page={page}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </Box>
    </>
  );
}

const SelectBox = styled(Box)`
  display: flex;
  justify-content: end;
  padding: 15px 0;
`;