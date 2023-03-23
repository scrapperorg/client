import { Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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
      <IconButton>
        <SearchIcon fontSize='small' />
      </IconButton>
    </StyledBox>
  );
};
