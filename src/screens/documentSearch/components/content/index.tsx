import { Box } from '@mui/system';
import { DocumentsTable } from 'components/documentTable';
import React, {useContext} from 'react';
import { DocumentSearchContext } from '../../context';
import { SearchForm } from '../searchForm';

export default function DocumentsSearchContent() {
  const {
    documents,
    totalNumberOfDocuments,
    page,
    onPageChange,
    pageSize,
    // fetch,
    onPageSizeChange,
  } = useContext(DocumentSearchContext);

  if (!documents) return null

  return (
    <>
      <Box sx={{ mb: 10 }}>
        <SearchForm />
      </Box>
      <Box>
        <DocumentsTable
          documents={documents}
          totalNumberOfDocuments={totalNumberOfDocuments}
          page={page}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </Box>
    </>
  );
}
