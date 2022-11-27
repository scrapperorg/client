import React from 'react';
import { GenericTable } from "components/genericTable"
import { GenericTableRow } from 'components/genericTableRow';
import { DocumentDto } from 'services/api/dtos';

interface DocumentsTableProps {
  documents: DocumentDto[];
  totalNumberOfDocuments: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void | undefined;
};

export const DocumentsTable = (props: DocumentsTableProps) => {
  const { 
    documents,
    totalNumberOfDocuments,
    page,
    onPageChange,
    pageSize
  } = props;

  const columns = [
    'Identificator',
    'Titlu',
    'Proiect',
    'Data publicarii',
    'Sursa',
    'Stare',
    'Termeni identificati'
  ]

  const documentRows = documents && documents.map(document => (
    <GenericTableRow
      key={document.id}
      id={document.id}
      values={[
        document.identificator,
        document.title,
        document.project,
        document.publicationDate.toString(),
        document.source,
        document.status,
        document.numberOfIdentifiedTerms || 0,
        ]
      }

    ></GenericTableRow>
  ))

  return (
    <GenericTable
      columns={columns}
      tableRows={documentRows}
      count={totalNumberOfDocuments}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={pageSize}
    ></GenericTable>
  )
}