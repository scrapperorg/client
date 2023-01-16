import React from 'react';
import { GenericTable } from 'components/genericTable';
import { GenericTableRow } from 'components/genericTableRow';
import { ProjectDto } from 'services/api/dtos';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material';
import styled from 'styled-components';
import { FormattedDate } from 'components/formatedDate';
import { ActionButtons } from 'components/documentsTableActionButtons';
import { ProjectMarks } from '../projectsTableDocumentMarks';

interface ProjectsTableProps {
  projects: ProjectDto[];
  totalNumberOfProjects: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void | undefined;
  onPageSizeChange: (pageSize: number) => void | undefined;
}

const columns = [
  '',
  'Nr. de inregistrare',
  'Nume Proiect',
  'Forum legislativ',
  'Initiator',
  'Data inregistrarii',
  'Actiuni',
];

export const ProjectsTable = (props: ProjectsTableProps) => {
  const { projects, totalNumberOfProjects, page, onPageChange, pageSize, onPageSizeChange } = props;

  const theme = useTheme();

  const documentRows = projects.map((project) => (
    <GenericTableRow
      id={project.id}
      key={project.id}
      values={[
        <ProjectMarks project={project} key={`marks-for-${project.id}`} />,
        <span key={project.id}>
          {project.numarInregistrareGuvern || project.numarInregistrareSenat}
        </span>,
        <StyledLink to={`/document/${project.id}`} key={project.id} theme={theme}>
          {project.title}
        </StyledLink>,
        <StyledLink to={`/project/${project.id}`} key={project.id} theme={theme}>
          {project.cameraDecizionala}
        </StyledLink>,
        <StyledLink to={`/project/${project.id}`} key={project.id} theme={theme}>
          {project.initiator}
        </StyledLink>,
        <FormattedDate key={`date-for-${project.id}`} date={project.createdAt} />,
        <ActionButtons key={`action-for-${project.id}`} />,
      ]}
    />
  ));

  return (
    <GenericTable
      columns={columns}
      tableRows={documentRows}
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
