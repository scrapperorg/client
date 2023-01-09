import React from 'react';
import { IconButton } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface ViewDocumentButtonProps {
  fileUrl: string;
}

const ViewDocumentButton: React.FC<ViewDocumentButtonProps> = ({ fileUrl }) => {
  const handleClick = () => {
    window.open(fileUrl);
  };

  return (
    <IconButton onClick={handleClick}>
      <RemoveRedEyeIcon fontSize='small' />
    </IconButton>
  );
};

export default ViewDocumentButton;
