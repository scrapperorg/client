import React from 'react';
import { GenericTable } from 'components/genericTable';
import { GenericTableRow } from 'components/genericTableRow';
import { DocumentDto } from 'services/api/dtos';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material';
import styled from 'styled-components';
import { Status } from 'services/api/dtos/document';
import { FormattedDate } from 'components/formatedDate';
import { DocumentMarks } from 'components/documentsTableDocumentMarks';
import { ActionButtons } from 'components/documentsTableActionButtons';
import { capitalizeString } from 'helpers/formatters';
import { EmptyTableRow } from 'components/genericTableRow/emptyTableRow';
import { useTranslation } from 'react-i18next';

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
  'Titlu document',
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

  const { t } = useTranslation();

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
          : `${t('documentsTable.lipsaResponsabil')}`,
        <FormattedDate key={`date-for-${document.id}`} date={document.publicationDate} />,
          t(`documentsTable.source.${document.source}`) || '',
          t(`documentsTable.status.${document.status}`) || '',
        document.numberOfIdentifiedTerms || 0,
        <ActionButtons key={`action-for-${document.id}`} document={document} />,
      ]}
    />
  ));

  if (documents.length === 0) {
    documentRows.push(<EmptyTableRow />)
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
      maxHeight='55vh'
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
