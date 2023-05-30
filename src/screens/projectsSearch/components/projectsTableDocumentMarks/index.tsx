import React from 'react';
import styled from 'styled-components';
import { Box, Tooltip } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
import { ProjectDto } from 'services/api/dtos';
import { useTranslation } from 'react-i18next'

export interface ProjectMarksProps {
  project: ProjectDto;
}

export const ProjectMarks = ({ project }: ProjectMarksProps) => {
  const { t } = useTranslation();

  return (
    <StyledBox>
      {project.presentsInterest && (
        <Tooltip title={t('tooltips.projectPresentsInterest')} placement='top'>
          <StarsIcon color='primary' fontSize='small' />
        </Tooltip>
      )}
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  display: flex;
`;
