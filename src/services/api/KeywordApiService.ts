import { AxiosInstance, AxiosError } from 'axios';
import { axios } from 'config/http';
import { OperationStatus } from './dtos';
import { handleUnauthorized } from 'helpers/errorHandlers';
import { KeywordDto } from './dtos/keyword';

class KeywordApiService {
  constructor(private readonly httpClient: AxiosInstance) {}

  async create(name: string): Promise<OperationStatus<KeywordDto>> {
    const token = localStorage.getItem('token');

    try {
      const response = await this.httpClient.post<KeywordDto>(
        `/keyword`,
        { name },
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

  async delete(id: string): Promise<OperationStatus<null>> {
    const token = localStorage.getItem('token');

    try {
      await this.httpClient.delete<{ success: boolean }>(`/keyword/${id}`, {
        headers: { authorization: token },
      });

      return {
        success: true,
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

  async update(id: string, name: string): Promise<OperationStatus<KeywordDto>> {
    const token = localStorage.getItem('token');

    try {
      const response = await this.httpClient.put<KeywordDto>(
        `/keyword/${id}`,
        { name },
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

  async getAll(): Promise<OperationStatus<KeywordDto[]>> {
    const token = localStorage.getItem('token');

    try {
      const response = await this.httpClient.get<KeywordDto[]>(`/keyword`, {
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
}

export const keywordApiService = new KeywordApiService(axios);
