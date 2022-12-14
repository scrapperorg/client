import { AxiosInstance, AxiosError } from 'axios';
import { axios } from 'config/http';
import { OperationStatus, ProjectDto } from './dtos';

class ProjectApiService {
  constructor(private readonly httpClient: AxiosInstance) {}

  async getProjectById(id: string): Promise<OperationStatus<ProjectDto>> {
    const token = localStorage.getItem('token')

    try {
      const response = await this.httpClient.get<ProjectDto>(
        `/project/${id}`,
        {
          headers: { authorization: token },
        }
      );
      return {
        success: true,
        payload: response.data,
      }
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
