import React from 'react';
import styled from 'styled-components';
import { Box, Tooltip } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
import WarningIcon from '@mui/icons-material/Warning';
import { DocumentDto } from 'services/api/dtos';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { pink } from '@mui/material/colors';
import { isDateOverdue } from 'helpers/formatters';

const StyledBox = styled(Box)`
  display: flex;
`;

export interface DocumentMarksProps {
  document: DocumentDto;
}

export const DocumentMarks = ({ document }: DocumentMarksProps) => {
  return (
    <StyledBox>
      {document.project?.presentsInterest && (
        <Tooltip title='Proiect de interes/cu impact' placement='top'>
          <StarsIcon color='primary' fontSize='small' />
        </Tooltip>
      )}
      {document.isRulesBreaker && (
        <Tooltip title='Document ce contravine normelor in vigoare' placement='top'>
          <WarningIcon color='warning' fontSize='small' />
        </Tooltip>
      )}
      {isDateOverdue(document.deadline) && (
        <Tooltip title='Data limita atinsa' placement='top'>
          <EventBusyIcon sx={{ color: pink[400] }} fontSize='small' />
        </Tooltip>
      )}
    </StyledBox>
  );
};
