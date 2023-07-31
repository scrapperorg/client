import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useTranslation } from 'react-i18next';

interface ViewDocumentButtonProps {
  fileUrl: string;
}

const ViewDocumentButton: React.FC<ViewDocumentButtonProps> = ({ fileUrl }) => {
  const { t } = useTranslation();

  const handleClick = () => {
    window.open(fileUrl);
  };

  return (
    <Tooltip title={t('monitor.quickActionsTooltips.viewDoc')}>
      <IconButton onClick={handleClick}>
        <RemoveRedEyeIcon fontSize='small' />
      </IconButton>
    </Tooltip>
  );
};

export default ViewDocumentButton;
