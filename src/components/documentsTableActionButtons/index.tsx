import { Box } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import ViewDocumentButton from 'components/viewDocumentButton';
import DownloadDocumentButton from 'components/downloadDocumentButton';

const StyledBox = styled(Box)`
  display: flex;
`;

export const ActionButtons = ({ document }: any) => {
  return (
    <StyledBox>
      <DownloadDocumentButton fileUrl={document.id} />
      <ViewDocumentButton fileUrl={document.link} />
    </StyledBox>
  );
};
