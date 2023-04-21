import {AxiosError, AxiosInstance} from 'axios';
import { axios } from 'config/http';
import { handleUnauthorized } from 'helpers/errorHandlers';
import {RobotDTO} from "./dtos/robot";
import {OperationStatus} from "./dtos";

class RobotApiService {
  constructor(private readonly httpClient: AxiosInstance) {}

  async getRobots(): Promise<OperationStatus<RobotDTO[]>> {
    const token = localStorage.getItem('token');

    try {
      const response = await this.httpClient.get<RobotDTO[]>(`/robot`, {
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

export const robotApiService = new RobotApiService(axios);
