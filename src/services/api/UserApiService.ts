import { AxiosInstance } from 'axios';
import { axios } from 'config/http';
import { OperationStatus } from './dtos';

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

}

export const userApiService = new UserApiService(axios);
