import { Box } from '@mui/system';
import React, { useContext } from 'react';
import { MonitorContext } from 'screens/monitor/context';
import styled from 'styled-components';
import { DocumentsTable } from 'components/documentTable';
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
    onPageSizeChange,
    stopPolling,
    startPolling,
  } = useContext(MonitorContext);

  if (!documents) return null;

  return (
    <>
      <SelectBox>
        <SourcesSelector
          value={sourcesOfInterest}
          onSelect={updateSourcesOfInterest}
          onMenuOpen={stopPolling}
          onMenuClose={startPolling}
        />
      </SelectBox>
      <Box>
        <DocumentsTable
          documents={documents}
          totalNumberOfDocuments={totalNumberOfDocuments}
          page={page}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </Box>
    </>
  );
}

const SelectBox = styled(Box)`
  display: flex;
  justify-content: end;
  padding-bottom: 15px;
`;
