import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton } from '@mui/material';
import config from 'config/index';
import { downloadBlob } from 'helpers/downloadBlob';
// import { documentApiService } from "services/api/DocumentApiService";
import { useDocuments } from 'screens/monitor/hooks/useDocuments';

interface DownloadDocumentButtonProps {
  fileUrl: string;
}

const DownloadDocumentButton: React.FC<DownloadDocumentButtonProps> = ({ fileUrl }) => {
  const rawPdfDownloaderUrl = `${config.BASE_URL}/document/download-pdf/${fileUrl}`;

  const { downloadRawPdf } = useDocuments();

  const handleDownload = () => {
    console.log('componenta')

    downloadRawPdf(rawPdfDownloaderUrl);
  };

  return (
    <IconButton onClick={handleDownload}>
      <DownloadIcon fontSize='small' />
    </IconButton>
  );
};

export default DownloadDocumentButton;
