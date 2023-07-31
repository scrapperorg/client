import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import { useTranslation } from 'react-i18next';

const QuickAnalysis = () => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t('monitor.quickActionsTooltips.quickAnalysis')}>
      <IconButton>
        <QuickreplyIcon fontSize='small' />
      </IconButton>
    </Tooltip>
  );
};

export default QuickAnalysis;
