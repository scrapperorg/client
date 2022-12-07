import React from 'react';
import { GenericTable } from 'components/genericTable';
import { GenericTableRow } from 'components/genericTableRow';
import { DocumentDto } from 'services/api/dtos';
import { Link } from 'react-router-dom';

import DownloadIcon from '@mui/icons-material/Download';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, useTheme } from '@mui/material';
import styled from 'styled-components';
import { Status } from 'services/api/dtos/document';

interface DocumentsTableProps {
  documents: DocumentDto[];
  totalNumberOfDocuments: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void | undefined;
}

const columns = [
  'Identificator',
  'Titlu',
  'Proiect',
  'Data publicarii',
  'Sursa',
  'Stare',
  'Termeni identificati',
  'Actiuni',
];

const ActionButtons = () => (
  <StyledBox>
    <IconButton>
      <DownloadIcon fontSize='small' />
    </IconButton>
    <IconButton>
      <RemoveRedEyeIcon fontSize='small' />
    </IconButton>
    <IconButton>
      <SearchIcon fontSize='small' />
    </IconButton>
  </StyledBox>
);

export const DocumentsTable = (props: DocumentsTableProps) => {
  const { documents, totalNumberOfDocuments, page, onPageChange, pageSize } = props;

  const theme = useTheme();

  const documentRows = documents.map((document) => (
    <GenericTableRow
      className={`${document.status[0] === Status.NOU ? 'new' : ''}`}
      id={document.id}
      key={document.id}
      values={[
        document.identificator,
        <StyledLink to={`/document/${document.id}`} key={document.id} theme={theme}>
          {document.title}
        </StyledLink>, // todo: use constant
        document.project,
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

const StyledBox = styled(Box)`
  display: flex;
`;

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
