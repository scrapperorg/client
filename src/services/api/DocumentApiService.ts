import { QueryAll } from './dtos/generic';
import { AxiosInstance, AxiosError } from 'axios';
import { axios } from 'config/http';
import { OperationStatus, DocumentDto } from './dtos';

class DocumentApiService {
  constructor(private readonly httpClient: AxiosInstance) {}

  async getDocuments(
    sourcesOfInterest: string[] = [],
    page: number,
    pageSize: number): Promise<OperationStatus<QueryAll<DocumentDto>>> {
    const token = localStorage.getItem('token')

    try {
      const sourcesQueryParams = sourcesOfInterest.map(source => `&sourcesOfInterest=${source}`).join('');
      const response = await this.httpClient.get<QueryAll<DocumentDto>>(
        `/document?page=${page}&pageSize=${pageSize}${sourcesQueryParams}`,
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

  async getDocumentById(id: string): Promise<OperationStatus<DocumentDto>> {
    const token = localStorage.getItem('token')

    try {
      const response = await this.httpClient.get<DocumentDto>(
        `/document/${id}`,
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

export const documentApiService = new DocumentApiService(axios);
