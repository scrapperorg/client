import React from 'react';
import { GenericTable } from 'components/genericTable';
import { GenericTableRow } from 'components/genericTableRow';
import { DocumentDto } from 'services/api/dtos';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material';
import styled from 'styled-components';
import {DocumentMarks} from "./components/DocumentMarks";
import { Status } from 'services/api/dtos/document';
import {ActionButtons} from "./components/ActionButtons";

interface DocumentsTableProps {
  documents: DocumentDto[];
  totalNumberOfDocuments: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void | undefined;
}

const columns = [
  '',
  'Identificator',
  'Titlu',
  'Proiect',
  'Data publicarii',
  'Sursa',
  'Stare',
  'Termeni identificati',
  'Actiuni',
];

export const DocumentsTable = (props: DocumentsTableProps) => {
  const { documents, totalNumberOfDocuments, page, onPageChange, pageSize } = props;

  const theme = useTheme();

  const documentRows = documents.map((document) => (
    <GenericTableRow
      className={`${document.status[0] === Status.NOU ? 'new' : ''}`}
      id={document.id}
      key={document.id}
      values={[
        <DocumentMarks document={document} key={`marks-for-${document.id}`} />,
        document.identifier,
        <StyledLink to={`/document/${document.id}`} key={document.id} theme={theme}>
          {document.title}
        </StyledLink>, // todo: use constant
        document.project.title,
        document.publicationDate.toString(),
        document.source,
        document.status,
        document.numberOfIdentifiedTerms || 0,
        <ActionButtons key={`action-for-${document.id}`} />,
      ]}
    />
  ));

  return (
    <GenericTable
      columns={columns}
      tableRows={documentRows}
      count={totalNumberOfDocuments}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={pageSize}
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
