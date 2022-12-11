import { Box } from '@mui/system';
import React, { useContext } from 'react';
import { MonitorContext } from 'screens/monitor/context';
import styled from 'styled-components';
import { DocumentsTable } from '../documentTable';
import { SourcesSelector } from '../sourcesSelector';

export default function MonitorContent() {

  const {
    documents,
    totalNumberOfDocuments,
    page,
    onPageChange,
    pageSize,
    sourcesOfInterest,
    updateSourcesOfInterest,
  } = useContext(MonitorContext);

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