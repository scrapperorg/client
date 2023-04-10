import { Box } from '@mui/system';
import React from 'react';
import { SearchForm } from '../searchForm';
import { ProjectsTable } from '../projectsTable';
import { useProjectSearchForm } from 'screens/projectsSearch/hooks/useProjectSearchForm';
import styled from 'styled-components';
import { Loading } from 'components/loading';
import { Alert, Snackbar } from '@mui/material';

export default function ProjectsSearchContent() {
  const {
    handleSubmit,
    setShowError,
    showError,
    showLoading,
    results,
    projectSearchForm
  } = useProjectSearchForm()

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
            Ceva nu a mers bine, te rugam sa incerci din nou
          </Alert>
        </Snackbar>
    </>
  );
}

const Searching = styled(Loading)`
  height: auto !important;
`