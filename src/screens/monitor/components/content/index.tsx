import { Box } from '@mui/system';
import React, {useContext, useEffect, useState} from 'react';
import { MonitorContext } from 'screens/monitor/context';
import styled from 'styled-components';
import { DocumentsTable } from '../documentTable';
import { SourcesSelector } from '../sourcesSelector';

export default function MonitorContent() {
  const [time, setTime] = useState(new Date());

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

  useEffect(() => {
    const interval = setTimeout(async () => {
      await fetch(page, pageSize, sourcesOfInterest);
      if (page === 0) {
        setTime(new Date());
      }
    }, 5000);

    return () => {
      clearTimeout(interval);
    }
  }, [time]);

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