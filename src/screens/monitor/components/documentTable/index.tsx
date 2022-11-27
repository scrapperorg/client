import React from 'react';
import { GenericTable } from "components/genericTable"
import { GenericTableRow } from 'components/genericTableRow';
import { DocumentDto } from 'services/api/dtos';
import { Link } from 'react-router-dom';

interface DocumentsTableProps {
  documents: DocumentDto[];
  totalNumberOfDocuments: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void | undefined;
};

const columns = [
  'Identificator',
  'Titlu',
  'Proiect',
  'Data publicarii',
  'Sursa',
  'Stare',
  'Termeni identificati'
]

export const DocumentsTable = (props: DocumentsTableProps) => {
  const { 
    documents,
    totalNumberOfDocuments,
    page,
    onPageChange,
    pageSize
  } = props;

  const documentRows = documents && documents.map(document => (
      <GenericTableRow
        id={document.id}
        key={document.id}
        values={[
          document.identificator,
          <Link to={`/document/${document.id}`} key={document.id}>{document.title}</Link>, // todo: use constant
          document.project,
          document.publicationDate.toString(),
          document.source,
          document.status,
          document.numberOfIdentifiedTerms || 0,
          ]
        }/>
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