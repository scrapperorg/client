import { AxiosInstance, AxiosError } from 'axios';
import { axios } from 'config/http';
import { OperationStatus } from './dtos';
import { handleUnauthorized } from 'helpers/errorHandlers';
import { MonitorCardsListDto } from './dtos/presentation';

class PresentationApiService {
  constructor(private readonly httpClient: AxiosInstance) {}
  async getMonitorCardsList(): Promise<OperationStatus<MonitorCardsListDto>> {
    const token = localStorage.getItem('token');

    try {
      const response = await this.httpClient.get<MonitorCardsListDto>(
        `/presentation/monitor-cards-list`,
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
}

export const presentationApiService = new PresentationApiService(axios);
