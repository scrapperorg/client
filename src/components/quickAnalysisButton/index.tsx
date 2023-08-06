import React from 'react';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useQuickAnalysis } from 'hooks/useQuickAnalysis';
import { DocumentDto } from 'services/api/dtos';

interface QuickAnalysisButton {
  documentId: string;
  callback?: (document: DocumentDto) => void;
}

export const QuickAnalysisButton: React.FC<QuickAnalysisButton> = ({ documentId, callback }) => {
  const { t } = useTranslation();

  const { performQuickAnalysis, isAnalysisUpdateLoading } = useQuickAnalysis({ callback });

  const handleQuickAnalysis = () => {
    performQuickAnalysis(documentId);
  };

  const icon = isAnalysisUpdateLoading ? (
    <HourglassBottomIcon fontSize='small' />
  ) : (
    <DoneAllIcon fontSize='small' />
  );

  return (
    <Tooltip title={t('monitor.quickActionsTooltips.quickAnalysis')}>
      <IconButton onClick={handleQuickAnalysis} disabled={isAnalysisUpdateLoading}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};
