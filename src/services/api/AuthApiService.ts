import { AxiosInstance, AxiosError } from 'axios';
import { axios } from 'config/http';

export interface OperationStatus<TPayload> {
  success: boolean;
  error?: string;
  payload?: TPayload;
  status?: number;
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

export interface RecoverPasswordDto {
  userId: string;
  token: string;
}

export enum Status {
  NOU = 'nou',
  IN_ANALIZA = 'in analiza',
  REVIZUIT = 'revizuit',
}

export interface DocumentDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  project: string;
  identificator: string;
  publicationDate: Date;
  source: string;
  status: Status;
  assignedUser?: string;
  deadline?: Date;
  originalFormat?: string;
  numberOfPages?: number;
  textInterpretationPrecision?: number;
  numberOfIdentifiedArticles?: number;
  numberOfIdentifiedTerms?: number;
  attachments?: string[];
}

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

  async getDocuments(): Promise<OperationStatus<Document[]>> {
    try {
      const response = await this.httpClient.get<Document[]>('/document');

      return {
        success: true,
        payload: response.data,
      }
    } catch (err: any) {
      const error: AxiosError = err;
      return {
        success: false,
        error: error.response?.statusText,
      };
    }
  }

}

export const authApiService = new AuthApiService(axios);
