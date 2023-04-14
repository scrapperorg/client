import { AxiosInstance, AxiosError } from 'axios';
import { axios } from 'config/http';
import { OperationStatus, ProjectDto, QueryAll } from './dtos';
import { handleUnauthorized } from 'helpers/errorHandlers';

interface SearchProps {
  title: string,
  createdAfter: string,
  createdBefore: string,
  presentsInterest: boolean,
  postOcrContent: string
}

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
      handleUnauthorized(error);
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
      handleUnauthorized(error);
      return {
        success: false,
        error: error.response?.statusText,
      };
    }
  }

  async search(props: Partial<SearchProps>): Promise<OperationStatus<ProjectDto[]>> {
    const token = localStorage.getItem('token');

    try {
      const response = await this.httpClient.post(
        '/project/search',
        props,
        {
          headers: { authorization: token },
        },
      );
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
