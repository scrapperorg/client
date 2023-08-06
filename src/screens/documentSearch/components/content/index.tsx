import React from 'react';
import styled from 'styled-components';
import { Box } from '@mui/system';
import { DocumentsTable } from 'components/documentTable';
import { Loading } from 'components/loading';
import { useDocumentSearchForm } from 'screens/documentSearch/hooks/useDocumentSearchForm';
import { SearchForm } from '../searchForm';
import { Alert, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PATHS from 'constants/paths';

export default function DocumentsSearchContent() {

  const {
    handleSubmit,
    setShowError,
    showError,
    showLoading,
    results,
    documentSearchForm
  } = useDocumentSearchForm();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const loading = (
    <Box>
      <Searching />
    </Box>
  )

  const documents = (
    <Box>
      <DocumentsTable
        documents={results}
        actionsCallbacks={{
          quickAnalysisSuccess: document => navigate(PATHS.DOCUMENT_DETAILS.split(':id')[0] + document.id),
        }}
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
            {t('documentSearch.searchError')}
        </Alert>
      </Snackbar>
    </>

  );
}


const Searching = styled(Loading)`
  height: auto !important;
`