import React from 'react';
import { Box } from '@mui/material';
import styled from 'styled-components';
import ViewDocumentButton from 'components/viewDocumentButton';
import DownloadDocumentButton from 'components/downloadDocumentButton';
import { QuickAnalysisButton } from 'components/quickAnalysisButton';
import { DocumentDto } from 'services/api/dtos';

const StyledBox = styled(Box)`
  display: flex;
`;

interface ActionButtonsProps {
  document: DocumentDto;
  actionsCallbacks?: {
    quickAnalysisSuccess?: (document:DocumentDto) => void;
  };
}


export const ActionButtons = ({ document, actionsCallbacks }: ActionButtonsProps) => {
  return (
    <StyledBox>
      <DownloadDocumentButton fileUrl={document.id} />
      <ViewDocumentButton fileUrl={document.link} />
      <QuickAnalysisButton documentId={document.id} callback={actionsCallbacks?.quickAnalysisSuccess}/>
    </StyledBox>
  );
};
