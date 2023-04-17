import React from 'react';
import { GenericTable } from 'components/genericTable';
import { GenericTableRow } from 'components/genericTableRow';
import { ProjectDto } from 'services/api/dtos';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material';
import styled from 'styled-components';
import { FormattedDate } from 'components/formatedDate';
import { ProjectMarks } from '../projectsTableDocumentMarks';

interface ProjectsTableProps {
  projects: ProjectDto[];
  totalNumberOfProjects?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void | undefined;
  onPageSizeChange?: (pageSize: number) => void | undefined;
}

const columns = [
  '',
  'Nr. de inregistrare',
  'Nume Proiect',
  'Forum legislativ',
  'Initiator',
  'Data inregistrarii',
];

export const ProjectsTable = (props: ProjectsTableProps) => {
  const { projects, totalNumberOfProjects, page, onPageChange, pageSize, onPageSizeChange } = props;

  const theme = useTheme();

  const projectRows = projects.map((project) => (
    <GenericTableRow
      id={project.id}
      key={project.id}
      values={[
        <ProjectMarks project={project} key={`${project.id}-marks`} />,
        <span key={`${project.id}-identificator`}>
          {project.numarInregistrareGuvern || project.numarInregistrareSenat}
        </span>,
        <StyledLink to={`/project/${project.id}`} key={`${project.id}-title`} theme={theme}>
          {project.title}
        </StyledLink>,
        <StyledLink to={`/project/${project.id}`} key={`${project.id}-decision`} theme={theme}>
          {project.cameraDecizionala}
        </StyledLink>,
        <StyledLink to={`/project/${project.id}`} key={`${project.id}-initiator`} theme={theme}>
          {project.initiator}
        </StyledLink>,
        <FormattedDate key={`${project.id}-date`} date={project.createdAt} />,
      ]}
    />
  ));

  return (
    <GenericTable
      columns={columns}
      tableRows={projectRows}
      count={totalNumberOfProjects}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={pageSize}
      onPageSizeChange={onPageSizeChange}
    ></GenericTable>
  );
};

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  ['&:focus, &:visited, &:active, &:active']: {
    color: theme.palette.text.primary,
  },
  ['&:hover']: {
    color: theme.palette.text.secondary,
  },
}));
