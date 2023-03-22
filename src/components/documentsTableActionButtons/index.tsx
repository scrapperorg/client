import { Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import styled from 'styled-components';
import ViewDocumentButton from 'components/viewDocumentButton';
import DownloadDocumentButton from 'components/downloadDocumentButton';

const StyledBox = styled(Box)`
  display: flex;
`;

interface ActionButtonsProps {
  fileUrl?: string
}

export const ActionButtons = ({ fileUrl }: ActionButtonsProps) => {
  return (
    <StyledBox>
      <DownloadDocumentButton fileUrl='dummy.pdf' />
      <ViewDocumentButton fileUrl={fileUrl ?? ''} />
      <IconButton>
        <SearchIcon fontSize='small' />
      </IconButton>
    </StyledBox>
  );
};
