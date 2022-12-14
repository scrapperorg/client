import React from 'react';
import ProjectDetailsContent from './components/content';
import ProjectDetailsDataProvider from './context';


export default function MonitorScreen() {
  return (
    <ProjectDetailsDataProvider>
      <ProjectDetailsContent />
    </ProjectDetailsDataProvider>
  );
}
