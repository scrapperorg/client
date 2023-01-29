import { AxiosInstance, AxiosError } from 'axios';
import { axios } from 'config/http';
import { OperationStatus, ProjectDto, QueryAll } from './dtos';

class ProjectApiService {
  constructor(private readonly httpClient: AxiosInstance) {}

  async getProjects(
    page: number,
    pageSize: number,
    forumLegislativ: string[] = [],
  ): Promise<OperationStatus<QueryAll<ProjectDto>>> {
    const token = localStorage.getItem('token');

    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });

      if (forumLegislativ.length > 0) {
        forumLegislativ.forEach((entry) => queryParams.append('forumLegislativ', entry));
      }

      const response = await this.httpClient.get<QueryAll<ProjectDto>>(`/project?${queryParams}`, {
        headers: { authorization: token },
      });

      return {
        success: true,
        payload: response.data,
      };
    } catch (err: any) {
      const error: AxiosError = err;
      return {
        success: false,
        error: error.response?.statusText,
      };
    }
  }

  async getProjectById(id: string): Promise<OperationStatus<ProjectDto>> {
    const token = localStorage.getItem('token');

    try {
      const response = await this.httpClient.get<ProjectDto>(`/project/${id}`, {
        headers: { authorization: token },
      });
      return {
        success: true,
        payload: response.data,
      };
    } catch (err: any) {
      const error: AxiosError = err;
      return {
        success: false,
        error: error.response?.statusText,
      };
    }
  }
}

export const projectApiService = new ProjectApiService(axios);
