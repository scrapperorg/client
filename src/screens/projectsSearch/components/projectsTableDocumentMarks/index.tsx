import React from 'react';
import styled from 'styled-components';
import { Box, Tooltip } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
import { ProjectDto } from 'services/api/dtos';

export interface ProjectMarksProps {
  project: ProjectDto;
}

export const ProjectMarks = ({ project }: ProjectMarksProps) => {
  return (
    <StyledBox>
      {project.presentsInterest && (
        <Tooltip title='Proiect de interes/cu impact' placement='top'>
          <StarsIcon color='primary' fontSize='small' />
        </Tooltip>
      )}
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  display: flex;
`;
