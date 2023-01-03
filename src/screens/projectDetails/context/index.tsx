import React, { createContext } from 'react';
import Loading from 'components/loading';
import { ProjectDto } from 'services/api/dtos';
import { useApiService } from 'hooks/useApiService';
import { useParams } from 'react-router-dom';
import { projectApiService } from 'services/api/ProjectApiService';

export interface ProjectDetailsProviderState {
  project: ProjectDto | null;
}

const defaultState: ProjectDetailsProviderState = {
  project: null,
};

export const ProjectDetailsContext = createContext(defaultState);

const ProjecttDetailsDataProvider = ({ children }: any) => {
  const { id='' } = useParams();

  const { data, loading } = useApiService<ProjectDto>(projectApiService, projectApiService.getProjectById, id);

  if (loading) {
    return <Loading />;
  }

  const state: ProjectDetailsProviderState = {
    project: data ?? defaultState.project,
  };


  return <ProjectDetailsContext.Provider value={state}>{children}</ProjectDetailsContext.Provider>;
};

export default ProjecttDetailsDataProvider;
