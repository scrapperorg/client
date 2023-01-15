import React, { createContext } from 'react';
import { ProjectDto, QueryAll } from 'services/api/dtos';
import { usePaginatedApiService } from 'hooks/usePaginatedApiService';
import { projectApiService } from '../../../services/api/ProjectApiService';

export interface ProjectsSearchProviderState {
  projects: ProjectDto[];
  totalNumberOfProjects: number;
  page: number;
  pageSize: number;
  error?: string;
  fetch: (page: number, pageSize: number, sourceOfInterest?: string[]) => void;
  onPageSizeChange: (pageSize: number) => void;
  onPageChange: (page: number) => void;
}

const defaultState: ProjectsSearchProviderState = {
  projects: [],
  totalNumberOfProjects: 0,
  page: 0,
  pageSize: 2,
  fetch: () => {
    console.log('method not implemented');
  },
  onPageSizeChange: () => {
    console.log('method not implemented');
  },
  onPageChange: (page: number) => {
    console.log(`method not implemented. page: ${page}`);
  },
};

export const ProjectsSearchContext = createContext(defaultState);

const ProjectsSearchDataProvider = ({ children }: any) => {
  const { page, pageSize, data, fetch, onPageSizeChange, error, onPageChange } =
    usePaginatedApiService<QueryAll<ProjectDto>>(projectApiService, projectApiService.getProjects);

  const state: ProjectsSearchProviderState = {
    projects: data?.results ?? defaultState.projects,
    totalNumberOfProjects: data?.totalNumberOfResults ?? defaultState.totalNumberOfProjects,
    error,
    page,
    fetch,
    pageSize: pageSize,
    onPageSizeChange,
    onPageChange: onPageChange,
  };

  return <ProjectsSearchContext.Provider value={state}>{children}</ProjectsSearchContext.Provider>;
};

export default ProjectsSearchDataProvider;
