import { Box } from '@mui/system';
import React, { useContext } from 'react';
import { MonitorContext } from 'screens/monitor/context';
import styled from 'styled-components';
import { DocumentsTable } from 'components/documentTable';
import { SourcesSelector } from '../sourcesSelector';
import CardsList from '../cardsList';
import { AuthContext } from '../../../../contexts/authContext';

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
    fetch,
  } = useContext(MonitorContext);

  const { user } = useContext(AuthContext);

  if (!documents) return null;

  return (
    <>
      <Box>
        <CardsList user={user} />
      </Box>
      <Box>
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
            actionsCallbacks={{
              quickAnalysisSuccess: () => {
                fetch(sourcesOfInterest)
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
}

const SelectBox = styled(Box)`
  display: flex;
  justify-content: end;
  padding-bottom: 15px;
`;
