import React from 'react';
import ProjectsSearchContent from './components/content';
import ProjectsSearchDataProvider from './context';

export default function ProjectsSearchScreen() {
  return (
    <ProjectsSearchDataProvider>
      <ProjectsSearchContent />
    </ProjectsSearchDataProvider>
  );
}
