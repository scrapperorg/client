import React from 'react';
import { GenericTable } from 'components/genericTable';
import { GenericTableRow } from 'components/genericTableRow';
import { DocumentDto } from 'services/api/dtos';
import { Link } from 'react-router-dom';

import { Grid, TableCell, TableRow, Typography, useTheme } from '@mui/material';
import styled from 'styled-components';
import { Status } from 'services/api/dtos/document';
import { FormattedDate } from 'components/formatedDate';
import { Translations } from '../../constants/translations';
import { DocumentMarks } from 'components/documentsTableDocumentMarks';
import { ActionButtons } from 'components/documentsTableActionButtons';
import { capitalizeString } from 'helpers/formatters';

interface DocumentsTableProps {
  documents: DocumentDto[];
  totalNumberOfDocuments?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void | undefined;
  onPageSizeChange?: (pageSize: number) => void | undefined;
}

const columns = [
  '',
  'Identificator',
  'Titlu',
  'Proiect',
  'Responsabil',
  'Data publicarii',
  'Sursa',
  'Stare',
  'Termeni identificati',
  'Actiuni',
];

export const DocumentsTable = (props: DocumentsTableProps) => {
  const { documents, totalNumberOfDocuments, page, onPageChange, pageSize, onPageSizeChange } = props;

  const theme = useTheme();

  const documentRows = documents.map((document) => (
    <GenericTableRow
      id={document.id}
      key={document.id}
      className={`${document.status === Status.NOU ? 'new' : ''}`}
      values={[
        <DocumentMarks document={document} key={`marks-for-${document.id}`} />,
        document.identifier,
        <StyledLink to={`/document/${document.id}`} key={document.id} theme={theme}>
          {document.title}
        </StyledLink>,
        <StyledLink to={`/project/${document.project.id}`} key={document.project.id} theme={theme}>
          {document.project.title}
        </StyledLink>,
        document.assignedUser
          ? `${capitalizeString(document.assignedUser.surname)} ${capitalizeString(document.assignedUser.name)}`
          : 'Lipsa responsabil',
        <FormattedDate key={`date-for-${document.id}`} date={document.publicationDate} />,
        Translations[document.source],
        document.status,
        document.numberOfIdentifiedTerms || 0,
        <ActionButtons key={`action-for-${document.id}`} document={document} />,
      ]}
    />
  ));

  if (documents.length === 0) {
    documentRows.push(
      <TableRow>
        <TableCell colSpan={10}>
          <Grid container alignItems='center' justifyContent='center'>
            <Typography variant='h5' color='grey'>
              Nu exista rezultate
            </Typography>
          </Grid>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <GenericTable
      columns={columns}
      tableRows={documentRows}
      count={totalNumberOfDocuments}
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
