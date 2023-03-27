import { QueryAll } from './dtos/generic';
import { AxiosInstance, AxiosError } from 'axios';
import { axios } from 'config/http';
import { OperationStatus, DocumentDto } from './dtos';
import { handleUnauthorized } from 'helpers/errorHandlers';
import { downloadBlob } from 'helpers/downloadBlob';

interface SearchProps {
  identificator: string,
  title: string,
  source: string,
  status: string,
  assignedUserId: string,
  projectId: string,
  publishedAfter: string,
  publishedBefore: string,
  postOcrContent: string;
  isRulesBreaker: boolean;
}

class DocumentApiService {
  constructor(private readonly httpClient: AxiosInstance) {}

  async deleteAttachment(
    documentId: string,
    attachmentId: string,
  ): Promise<OperationStatus<DocumentDto>> {
    const token = localStorage.getItem('token');

    try {
      const response = await this.httpClient.delete<DocumentDto>(
        `/document/${documentId}/attachment/${attachmentId}`,
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
    documentId: string,
    attachment: File,
  ): Promise<OperationStatus<DocumentDto>> {
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('attachment', attachment);

    try {
      const response = await this.httpClient.post<DocumentDto>(
        `/document/upload/${documentId}`,
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

  async getDocuments(
    page: number,
    pageSize: number,
    sourcesOfInterest: string[] = [],
  ): Promise<OperationStatus<QueryAll<DocumentDto>>> {
    const token = localStorage.getItem('token');

    try {
      const sourcesQueryParams =
        sourcesOfInterest &&
        sourcesOfInterest.map((source) => `&sourcesOfInterest=${source}`).join('');
      const response = await this.httpClient.get<QueryAll<DocumentDto>>(
        `/document?page=${page}&pageSize=${pageSize}${sourcesQueryParams}`,
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

  async getDocumentById(id: string): Promise<OperationStatus<DocumentDto>> {
    const token = localStorage.getItem('token');

    try {
      const response = await this.httpClient.get<DocumentDto>(`/document/${id}`, {
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

  async assignResponsible(
    documentId: string,
    userId: string,
  ): Promise<OperationStatus<DocumentDto>> {
    const token = localStorage.getItem('token');

    try {
      const response = await this.httpClient.post(
        '/document/assign-responsible',
        {
          documentId,
          userId,
        },
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

  async setDeadline(documentId: string, date: string): Promise<OperationStatus<DocumentDto>> {
    const token = localStorage.getItem('token');

    try {
      const response = await this.httpClient.post(
        '/document/set-deadline',
        {
          documentId,
          date,
        },
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

  async search(props: SearchProps): Promise<OperationStatus<DocumentDto[]>> {
    const token = localStorage.getItem('token');

    try {
      const response = await this.httpClient.post(
        '/document/search',
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

  async downloadRawPdf(url: string): Promise<OperationStatus<{ blob: Blob; fileName: string }>> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.status} ${response.statusText}`);
      }
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.startsWith('application/pdf')) {
        throw new Error('Invalid file format. Only PDF files are supported.');
      }
      const blob = await response.blob();
      const fileName = response.headers.get('content-disposition')?.split('filename=')[1] || 'Document Descarcat';
      downloadBlob(blob, fileName);
      return { 
        success: true,
        payload: { 
          blob: blob,
          fileName: fileName
        } 
      };
    } catch (error) {
      console.error(error);
      return { 
        success: false,
      };
    }
  }
}

export const documentApiService = new DocumentApiService(axios);
