import React from 'react';
import { GenericTable } from 'components/genericTable';
import { GenericTableRow } from 'components/genericTableRow';
import { ProjectDto } from 'services/api/dtos';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material';
import styled from 'styled-components';
import { FormattedDate } from 'components/formatedDate';
import { ProjectMarks } from '../projectsTableDocumentMarks';
import { EmptyTableRow } from 'components/genericTableRow/emptyTableRow';
import { Translations } from '../../../../constants/translations';

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
          {!!project.numarInregistrareGuvern && project.numarInregistrareGuvern !== '-' ? project.numarInregistrareGuvern : project.numarInregistrareSenat}
        </span>,
        <StyledLink to={`/project/${project.id}`} key={`${project.id}-title`} theme={theme}>
          {project.title}
        </StyledLink>,
        <span key={`${project.id}-forum`}>
          { project.source && Translations[project.source] }
        </span>,
        <span key={`${project.id}-initiator`}>
          { project.initiator }
        </span>,
        <FormattedDate key={`${project.id}-date`} date={project.createdAt} />,
      ]}
    />
  ));

  if (projects.length === 0) {
    projectRows.push(<EmptyTableRow colSpan={6}/>)
  }

  return (
    <GenericTable
      columns={columns}
      tableRows={projectRows}
      count={totalNumberOfProjects}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={pageSize}
      onPageSizeChange={onPageSizeChange}
      maxHeight='60vh'
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
