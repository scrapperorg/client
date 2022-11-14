import { AxiosInstance } from 'axios';
import { axios } from 'config/http';

export interface OperationStatus<TPayload> {
  success: boolean;
  error?: string;
  payload?: TPayload;
}

export interface UserDto {
  id: string;
  name: string;
  surname: string;
  role: string;
  email: string;
}

export interface LoginDto {
  token: string;
  user: UserDto;
}

class AuthApiService {
  constructor(private readonly httpClient: AxiosInstance) {}

  async login(email: string, password: string): Promise<OperationStatus<LoginDto>> {
    try {
      const res = await this.httpClient.post<LoginDto>('/login', { email, password });
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

export const authApiService = new AuthApiService(axios);
