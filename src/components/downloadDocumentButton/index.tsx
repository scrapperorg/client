import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton, Tooltip } from '@mui/material';
import config from 'config/index';
import { useDocuments } from 'screens/monitor/hooks/useDocuments';
import { useTranslation } from 'react-i18next';

interface DownloadDocumentButtonProps {
  fileUrl: string;
}

const DownloadDocumentButton: React.FC<DownloadDocumentButtonProps> = ({ fileUrl }) => {
  const rawPdfDownloaderUrl = `${config.BASE_URL}/document/download-pdf/${fileUrl}`;

  const { downloadPdf } = useDocuments();
  const { t } = useTranslation();

  const handleDownload = () => {
    downloadPdf(rawPdfDownloaderUrl);
  };

  return (
    <Tooltip title={t('monitor.quickActionsTooltips.downloadDoc')}>
      <IconButton onClick={handleDownload}>
        <DownloadIcon fontSize='small' />
      </IconButton>
    </Tooltip>
  );
};

export default DownloadDocumentButton;
