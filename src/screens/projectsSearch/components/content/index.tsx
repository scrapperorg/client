import { Box } from '@mui/system';
import React, { useContext } from 'react';
import { ProjectsSearchContext } from '../../context';
import { SearchForm } from '../searchForm';
import { ProjectsTable } from '../projectsTable';

export default function ProjectsSearchContent() {
  const {
    projects,
    totalNumberOfProjects,
    page,
    onPageChange,
    pageSize,
    // fetch,
    onPageSizeChange,
  } = useContext(ProjectsSearchContext);

  if (!projects) return null;

  return (
    <>
      <Box sx={{ mb: 10 }}>
        <SearchForm />
      </Box>
      <Box>
        <ProjectsTable
          projects={projects}
          totalNumberOfProjects={totalNumberOfProjects}
          page={page}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </Box>
    </>
  );
}
