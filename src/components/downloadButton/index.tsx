import React from 'react';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

interface DownloadButtonProps {
  fileUrl: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ fileUrl }) => {
  const handleDownload = () => {
    window.open(fileUrl);
  };

  return (
    <IconButton onClick={handleDownload}>
      <DownloadIcon />
    </IconButton>
  );
};

export default DownloadButton;
