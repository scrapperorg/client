import { Box } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import ViewDocumentButton from 'components/viewDocumentButton';
import DownloadDocumentButton from 'components/downloadDocumentButton';

const StyledBox = styled(Box)`
  display: flex;
`;

export const ActionButtons = () => {
  return (
    <StyledBox>
      <DownloadDocumentButton fileUrl='dummy.pdf' />
      <ViewDocumentButton fileUrl='https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' />
    </StyledBox>
  );
};
