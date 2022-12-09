import { AxiosInstance, AxiosError } from 'axios';
import { axios } from 'config/http';
import { LoginDto, OperationStatus, RecoverPasswordDto } from './dtos';

class AuthApiService {
  constructor(private readonly httpClient: AxiosInstance) {}

  async refreshToken(token: string): Promise<OperationStatus<LoginDto>> {
    try {
      const res = await this.httpClient.post<LoginDto>(
        '/refresh-token',
        {},
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

  async logout() {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['authorization'];
  }

  async recoverPassword(email: string): Promise<OperationStatus<RecoverPasswordDto>> {
    try {
      const res = await this.httpClient.post<RecoverPasswordDto>('/recover-password', { email });
      return {
        success: true,
        payload: res.data,
      };
    } catch (err: any) {
      const error: AxiosError = err;
      return {
        success: false,
        status: error.response?.status,
      };
    }
  }

  async validateResetPasswordToken(token: string): Promise<OperationStatus<boolean>> {
    try {
      await this.httpClient.post<boolean>(`/validate-reset-password-token`, { token });
      return {
        success: true,
      };
    } catch (err: any) {
      const error: AxiosError = err;
      return {
        success: false,
        status: error.response?.status,
      };
    }
  }

  async resetPassword(token: string, password: string): Promise<OperationStatus<boolean>> {
    try {
      await this.httpClient.post<boolean>(`/reset-password`, { token, password });
      return {
        success: true,
      };
    } catch (err: any) {
      const error: AxiosError = err;
      return {
        success: false,
        status: error.response?.status,
      };
    }
  }
}

export const authApiService = new AuthApiService(axios);
