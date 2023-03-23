import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton } from '@mui/material';
import styled from 'styled-components';
import config from 'config/index';

interface DownloadDocumentButtonProps {
  fileUrl: string;
}

const DownloadDocumentButton: React.FC<DownloadDocumentButtonProps> = ({ fileUrl }) => {
  const rawPdfDownloaderUrl = `${config.BASE_URL}/document/download-pdf/${fileUrl}`;

  const handleDownload = () => {
    fetch(rawPdfDownloaderUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to download file: ${response.status} ${response.statusText}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.startsWith('application/pdf')) {
          throw new Error('Invalid file format. Only PDF files are supported.');
        }
        response.blob().then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = rawPdfDownloaderUrl.substring(rawPdfDownloaderUrl.lastIndexOf('/') + 1);
          a.click();
        });
      }).catch(error => {
        console.error(error);
      });
  };

  return (
    <IconButton onClick={handleDownload}>
      <DownloadIcon fontSize='small' />
    </IconButton>
  );
};


export const StyledAnchor = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: 0;
`;

export default DownloadDocumentButton;
