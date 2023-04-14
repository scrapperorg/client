import React, { createContext } from 'react';

export const ProjectsSearchContext = createContext({});

const ProjectsSearchDataProvider = ({ children }: any) => {

  const state = {};

  return <ProjectsSearchContext.Provider value={state}>{children}</ProjectsSearchContext.Provider>;
};

export default ProjectsSearchDataProvider;
