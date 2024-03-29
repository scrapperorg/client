import { AxiosInstance, AxiosError } from 'axios';
import { axios } from 'config/http';
import { OperationStatus, ProjectDto, QueryAll } from './dtos';
import { handleUnauthorized } from 'helpers/errorHandlers';

interface SearchProps {
  title: string;
  createdAfter: string;
  createdBefore: string;
  presentsInterest: boolean;
  postOcrContent: string;
}

class ProjectApiService {
  constructor(private readonly httpClient: AxiosInstance) {}

  async deleteAttachment(
    projectId: string,
    attachmentId: string,
  ): Promise<OperationStatus<ProjectDto>> {
    const token = localStorage.getItem('token');

    try {
      const response = await this.httpClient.delete<ProjectDto>(
        `/project/${projectId}/attachment/${attachmentId}`,
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
      handleUnauthorized(error);
      return {
        success: false,
        error: error.response?.statusText,
      };
    }
  }

  async uploadAttachment(
    projectId: string,
    attachment: File,
  ): Promise<OperationStatus<ProjectDto>> {
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('attachment', attachment);

    try {
      const response = await this.httpClient.post<ProjectDto>(
        `/project/upload/${projectId}`,
        formData,
        {
          headers: { authorization: token, 'Content-Type': 'multipart/form-data' },
        },
      );

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

  async getProjectByFilter(filters: { title?: string; nrInrCDep?: string; nrInrSenat?: string }) {
    const token = localStorage.getItem('token');

    try {
      const queryParams = new URLSearchParams({
        title: filters.title ?? '',
        nrInrCDep: filters.nrInrCDep ?? '',
        nrInrSenat: filters.nrInrSenat ?? '',
      });

      const response = await this.httpClient.get<ProjectDto[]>(`/project/find?${queryParams}`, {
        headers: { authorization: token },
      });

      return {
        success: true,
        payload: response.data,
      };
    } catch (err: any) {
      console.log(err);
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
      const response = await this.httpClient.post('/project/search', props, {
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
