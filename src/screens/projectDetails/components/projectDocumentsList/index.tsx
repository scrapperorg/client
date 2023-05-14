import React from 'react';
import { ProjectDto } from "services/api/dtos";
import { Box, Grid, useTheme } from "@mui/material";
import { Translations } from "../../../../constants/translations";
import { GenericTable, GenericTableRow, DocumentMarks, FormattedDate } from 'components';
import { ActionButtons } from 'components/documentsTableActionButtons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Status } from 'services/api/dtos/document';

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
  'Concluzia analizei legislative',
  'Actiuni',
];


export function ProjectDocumentsList({ project }: ProjectDocumentsListProps) {

  const { documents = [] } = project;

  const theme = useTheme();

  const documentRows = documents.map(document => (
    <GenericTableRow
      className={`${document.status === Status.NOU ? 'new' : ''}`}
      id={document.id}
      key={document.id}
      values={[
        <DocumentMarks document={document} key={`marks-for-${document.id}`} />,
        document.identifier,
        <StyledLink to={`/document/${document.id}`} key={document.id} theme={theme}>{document.title}</StyledLink>,
        <FormattedDate key={`date-for-${document.id}`} date={document.publicationDate} />,
        Translations[document.source],
        Translations[document.status],
        document.numberOfIdentifiedTerms || 0,
        Translations[document.decision],
        <ActionButtons key={`action-for-${document.id}`} document={document} />,
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