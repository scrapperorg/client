import { AxiosError, AxiosInstance } from 'axios';
import { axios } from 'config/http';
import { OperationStatus, UserDto } from './dtos';

class UserApiService {
  constructor(private readonly httpClient: AxiosInstance) {}

  async updateSourcesOfInterest(sourcesOfInterest: string[]): Promise<OperationStatus<boolean>> {
    const token = localStorage.getItem('token')

    try {
      const res = await this.httpClient.post<boolean>(
        '/user/update-sources',
        {
          sourcesOfInterest
        },
        {
          headers: { authorization: token },
        },
      );
      return {
        success: true,
        payload: res.data,
      };
    } catch (err) {
      return {
        success: false,
      };
    }
  }

  async getAssignableResponsibles(): Promise<OperationStatus<UserDto[]>> {
    const token = localStorage.getItem('token')

    try {
      const response = await this.httpClient.get<UserDto[]>(
        'user?roles=LSE&roles=LSS',
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

export const userApiService = new UserApiService(axios);
