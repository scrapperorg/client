import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton } from '@mui/material';
import styled from 'styled-components';

interface DownloadDocumentButtonProps {
  fileUrl: string;
}

const DownloadDocumentButton: React.FC<DownloadDocumentButtonProps> = ({ fileUrl }) => {
  return (
    <IconButton>
      <StyledAnchor href={fileUrl} download>
        <DownloadIcon fontSize='small' />
      </StyledAnchor>
    </IconButton>
  );
};

export const StyledAnchor = styled.a`
  text-decoration: none;
  color: inherit;
`;

export default DownloadDocumentButton;
