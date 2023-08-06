import { AxiosInstance, AxiosError } from 'axios';
import { axios } from 'config/http';
import { NotificationDto, OperationStatus } from './dtos';
import { handleUnauthorized } from 'helpers/errorHandlers';

class NotificationApiService {
  constructor(private readonly httpClient: AxiosInstance) {}
  async getAll(userId: string): Promise<OperationStatus<NotificationDto[]>> {
    const token = localStorage.getItem('token');

    try {
      const response = await this.httpClient.get<NotificationDto[]>(
        //`/notification?user=${userId}&seen=false`,
        `/notification?user=${userId}`,
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

  async delete(id: string): Promise<boolean> {
    const token = localStorage.getItem('token');

    try {
      await this.httpClient.delete(`/notification/${id}`, {
        headers: { authorization: token },
      });

      return true;
    } catch (err: any) {
      const error: AxiosError = err;
      handleUnauthorized(error);
      return false;
    }
  }

  async deleteAll(): Promise<boolean> {
    const token = localStorage.getItem('token');

    try {
      await this.httpClient.delete(`/notification`, {
        headers: { authorization: token },
      });

      return true;
    } catch (err: any) {
      const error: AxiosError = err;
      handleUnauthorized(error);
      return false;
    }
  }
}

export const notificationApiService = new NotificationApiService(axios);
