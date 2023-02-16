import React from 'react';
import styled from 'styled-components';
import { Box } from '@mui/system';
import { DocumentsTable } from 'components/documentTable';
import { Loading } from 'components/loading';
import { useDocumentSearchForm } from 'screens/documentSearch/hooks/useDocumentSearchForm';
import { SearchForm } from '../searchForm';
import { Alert, Snackbar } from '@mui/material';



export default function DocumentsSearchContent() {

  const {
    handleSubmit,
    setShowError,
    showError,
    showLoading,
    results,
    documentSearchForm
  } = useDocumentSearchForm();

  const loading = (
    <Box>
      <Searching />
    </Box>
  )

  const documents = (
    <Box>
      <DocumentsTable
        documents={results}
        totalNumberOfDocuments={results.length}
        page={0}
        pageSize={10}
        onPageChange={() => { console.log('not implemented') } }
        onPageSizeChange={() => { console.log('not implemented') } }
      />
    </Box>
  )

  const content = showLoading ? loading : documents

  return (
    <>
      <Box sx={{ mb: 10 }}>
        <SearchForm
          form={documentSearchForm}
          handleSubmit={handleSubmit}
        />
      </Box>

      {content}

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
      <Alert onClose={() => setShowError(false)} severity='error' sx={{ width: '100%' }}>
        Ceva nu a mers bine, te rugam sa incerci din nou
      </Alert>
    </Snackbar>
    </>

  );
}


const Searching = styled(Loading)`
  height: auto !important;
`