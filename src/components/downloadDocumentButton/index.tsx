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
    // documentApiService.downloadRawPdf(rawPdfDownloaderUrl);
    // fetch(rawPdfDownloaderUrl)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error(`Failed to download file: ${response.status} ${response.statusText}`);
    //     }
    //     const contentType = response.headers.get('content-type');
    //     if (!contentType || !contentType.startsWith('application/pdf')) {
    //       throw new Error('Invalid file format. Only PDF files are supported.');
    //     }
    //     response.blob().then(blob => {
    //       // const url = window.URL.createObjectURL(blob);
    //       // const a = document.createElement('a');
    //       // a.href = url;
    //       // a.download = rawPdfDownloaderUrl.substring(rawPdfDownloaderUrl.lastIndexOf('/') + 1);
    //       // a.click();
    //       const fileName = response.headers.get('content-disposition')?.split('filename=')[1] || 'Atasament Descarcat';
    //       downloadBlob(blob, fileName)
    //       console.log(response.headers.get('content-disposition')?.split('filename=')[1] || 'Atasament Descarcat')
    //     });
    //   }).catch(error => {
    //     console.error(error);
    //   });

  };

  return (
    <IconButton onClick={handleDownload}>
      <DownloadIcon fontSize='small' />
    </IconButton>
  );
};

export default DownloadDocumentButton;
