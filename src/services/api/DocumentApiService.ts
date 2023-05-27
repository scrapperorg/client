import { QueryAll } from './dtos/generic';
import { AxiosInstance, AxiosError } from 'axios';
import { axios } from 'config/http';
import { OperationStatus, DocumentDto } from './dtos';
import { handleUnauthorized } from 'helpers/errorHandlers';
import { downloadBlob } from 'helpers/downloadBlob';
import { KeywordDto } from './dtos/keyword';

interface SearchProps {
  identificator: string;
  title: string;
  source: string;
  status: string;
  assignedUserId: string;
  projectId: string;
  publishedAfter: string;
  publishedBefore: string;
  postOcrContent: string;
  isRulesBreaker: boolean;
}

interface UpdateAnalysisProps {
  documentId: string | undefined;
  assignedUser?: string | undefined;
  deadline: Date | undefined;
  status: string | undefined;
  decision: string | undefined;
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
      const response = await this.httpClient.get<{
        keywords: KeywordDto;
        keywordsHash: string;
        documents: QueryAll<DocumentDto>;
      }>(`/document?page=${page}&pageSize=${pageSize}${sourcesQueryParams}`, {
        headers: { authorization: token },
      });

      return {
        success: true,
        payload: {
          results: response.data.documents.results,
          totalNumberOfResults: response.data.documents.totalNumberOfResults,
        },
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

  async setStatus(documentId: string, status: string): Promise<OperationStatus<DocumentDto>> {
    const token = localStorage.getItem('token');

    try {
      const response = await this.httpClient.post(
        '/document/set-status',
        {
          documentId,
          status,
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

  async setDecision(documentId: string, decision: string): Promise<OperationStatus<DocumentDto>> {
    const token = localStorage.getItem('token');

    try {
      const response = await this.httpClient.post(
        '/document/set-decision',
        {
          documentId,
          decision,
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

  async updateAnalysis(props: UpdateAnalysisProps): Promise<OperationStatus<DocumentDto>> {
    const token = localStorage.getItem('token');

    try {
      const response = await this.httpClient.post('/document/update-document-analysis', props, {
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

  async search(props: Partial<SearchProps>): Promise<OperationStatus<DocumentDto[]>> {
    const token = localStorage.getItem('token');

    try {
      const response = await this.httpClient.post('/document/search', props, {
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

  async downloadOcrPdf(
    documentId: string,
  ): Promise<OperationStatus<{ blob: Blob; fileName: string }>> {
    const token = localStorage.getItem('token');
    try {
      const response = await this.httpClient.get(`/document/download-ocr-pdf/${documentId}`, {
        responseType: 'blob',
        headers: { authorization: token },
      });

      const fileName =
        response.headers['content-disposition']?.split('filename=')[1] || 'Document ocr';

      return {
        success: true,
        payload: {
          blob: new Blob([response.data], { type: response.headers['content-type'] }),
          fileName,
        },
      };
    } catch (err) {
      handleUnauthorized(err);
      return {
        success: false,
      };
    }
  }

  async downloadRawPdf(url: string): Promise<OperationStatus<{ blob: Blob; fileName: string }>> {
    try {
      const response = await this.httpClient.get(url, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const fileName =
        response.headers['content-disposition']?.split('filename=')[1] || 'Document Descarcat';
      downloadBlob(blob, fileName);
      return {
        success: true,
        payload: {
          blob,
          fileName,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
      };
    }
  }

  async updateDocument(documentId: string, props: Partial<DocumentDto>): Promise<OperationStatus<DocumentDto>> {
    const token = localStorage.getItem('token');

    try {
      const response = await this.httpClient.put(`/document/${documentId}`, props, {
        headers: { authorization: token },
      });
      return {
        success: true,
        payload: response.data,
      };
    } catch (err) {
      handleUnauthorized(err);
      return {
        success: false,
      };
    }
  }
}

export const documentApiService = new DocumentApiService(axios);
