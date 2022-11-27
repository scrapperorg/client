import { QueryAll } from './dtos/generic';
import { AxiosInstance, AxiosError } from 'axios';
import { axios } from 'config/http';
import { OperationStatus, DocumentDto } from './dtos';

class DocumentApiService {
  constructor(private readonly httpClient: AxiosInstance) {}

  async getDocuments(page: number, pageSize: number): Promise<OperationStatus<QueryAll<DocumentDto>>> {
    try {
      const response = await this.httpClient.get<QueryAll<DocumentDto>>(`/document?page=${page}&pageSize=${pageSize}`);
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

export const documentApiService = new DocumentApiService(axios);
