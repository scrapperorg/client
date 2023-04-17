import { AxiosInstance } from 'axios';
import { axios } from 'config/http';
import { handleUnauthorized } from 'helpers/errorHandlers';
import {RobotDTO} from "./dtos/robot";

class RobotApiService {
  constructor(private readonly httpClient: AxiosInstance) {}

  async getRobots(): Promise<RobotDTO[]> {
    try {
      const response = await this.httpClient.get('/robot');
      return response.data;
    } catch (error) {
      handleUnauthorized(error);
      throw error;
    }
  }

}

export const robotApiService = new RobotApiService(axios);
