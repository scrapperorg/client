import React from 'react';
import { ProjectDto } from "services/api/dtos";
import { Box, Grid, useTheme } from "@mui/material";
import { Translations } from "../../../../constants/translations";
import { GenericTable, GenericTableRow, DocumentMarks, ActionButtons, FormattedDate } from 'components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface ProjectDocumentsListProps {
  project: ProjectDto;
}

const columns = [
  '',
  'Identificator',
  'Titlu',
  'Data publicarii',
  'Sursa',
  'Stare',
  'Termeni identificati',
  'Actiuni',
];


export function ProjectDocumentsList({ project }: ProjectDocumentsListProps) {

  const { documents = [] } = project;

  const theme = useTheme();

  const documentRows = documents.map(document => (
    <GenericTableRow
      id={document.id}
      key={document.id}
      values={[
        <DocumentMarks document={document} key={`marks-for-${document.id}`} />,
        document.identifier,
        <StyledLink to={`/document/${document.id}`} key={document.id} theme={theme}>{document.title}</StyledLink>,
        <StyledLink to={`/project/${document.project.id}`} key={document.project.id} theme={theme}>{document.project.title}</StyledLink>,
        <FormattedDate key={`date-for-${document.id}`} date={document.publicationDate} />,
        Translations[document.source],
        document.status,
        document.numberOfIdentifiedTerms || 0,
        <ActionButtons key={`action-for-${document.id}`}/>
        ]
      }/>
))


  return (
    <Box sx={{ mb: 4 }}>
      <Grid container>
        <Grid item md={10}>
        <GenericTable
          columns={columns}
          tableRows={documentRows}
        ></GenericTable>
        </Grid>
      </Grid>
    </Box>
  )
}

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