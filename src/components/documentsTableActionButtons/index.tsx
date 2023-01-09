import { Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import styled from 'styled-components';
import DownloadIcon from '@mui/icons-material/Download';
import ViewDocumentButton from 'components/viewDocumentButton';

const StyledBox = styled(Box)`
  display: flex;
`;

export const ActionButtons = () => {
  return (
    <StyledBox>
      <IconButton>
        <DownloadIcon fontSize='small' />
      </IconButton>
      <ViewDocumentButton fileUrl='https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' />
      <IconButton>
        <SearchIcon fontSize='small' />
      </IconButton>
    </StyledBox>
  );
};
