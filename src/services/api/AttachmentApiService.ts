import { AxiosInstance } from 'axios';
import { axios } from 'config/http';
import { OperationStatus } from './dtos';
import { handleUnauthorized } from 'helpers/errorHandlers';

class AttachmentApiService {
  constructor(private readonly httpClient: AxiosInstance) {}

  async downloadAttachment(id: string): Promise<OperationStatus<{ blob: Blob; fileName: string }>> {
    const token = localStorage.getItem('token');
    try {
      const response = await this.httpClient.get(`/attachment/download/${id}`, {
        responseType: 'blob',
        headers: { authorization: token },
      });

      const fileName =
        response.headers['content-disposition']?.split('filename=')[1] || 'Atasament Descarcat';

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
}

export const attachmentApiService = new AttachmentApiService(axios);
