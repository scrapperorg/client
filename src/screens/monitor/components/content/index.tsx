import { Box } from '@mui/system';
import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import { MonitorContext } from 'screens/monitor/context';
import styled from 'styled-components';
import { DocumentsTable } from '../documentTable';
import { SourcesSelector } from '../sourcesSelector';
import {useLongPolling} from "../../hooks/useLongPolling";

export default function MonitorContent() {
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

  useLongPolling({ fetch, pageSize, page, sourcesOfInterest });

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