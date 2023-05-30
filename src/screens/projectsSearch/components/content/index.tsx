import { Box } from '@mui/system';
import React from 'react';
import { SearchForm } from '../searchForm';
import { ProjectsTable } from '../projectsTable';
import { useProjectSearchForm } from 'screens/projectsSearch/hooks/useProjectSearchForm';
import styled from 'styled-components';
import { Loading } from 'components/loading';
import { Alert, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next'

export default function ProjectsSearchContent() {
  const {
    handleSubmit,
    setShowError,
    showError,
    showLoading,
    results,
    projectSearchForm
  } = useProjectSearchForm()
  const { t } = useTranslation();

  const loading = (
    <Box>
      <Searching />
    </Box>
  )

  const projects = (
    <Box>
      <ProjectsTable
        projects={results}
      />
    </Box>
  )
  

  const content = showLoading ? loading : projects

  
  return (
    <>
      <Box sx={{ mb: 10 }}>
        <SearchForm
          form={projectSearchForm}
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
            {t('generic.error')}
          </Alert>
        </Snackbar>
    </>
  );
}

const Searching = styled(Loading)`
  height: auto !important;
`