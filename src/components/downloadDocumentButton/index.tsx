import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton } from '@mui/material';
import styled from 'styled-components';
import config from 'config/index';

interface DownloadDocumentButtonProps {
  fileUrl: string;
}

const DownloadDocumentButton: React.FC<DownloadDocumentButtonProps> = ({ fileUrl }) => {
  const rawPdfDownloaderUrl = `${config.BASE_URL}document/download-pdf/${fileUrl}`;

  return (
    <IconButton>
      <StyledAnchor href={rawPdfDownloaderUrl} download>
        <DownloadIcon fontSize='small' />
      </StyledAnchor>
    </IconButton>
  );
};

export const StyledAnchor = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: 0;
`;

export default DownloadDocumentButton;
