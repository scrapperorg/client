import { AxiosError, AxiosInstance } from 'axios';
import { axios } from 'config/http';
import { OperationStatus, UserDto } from './dtos';
import { handleUnauthorized } from 'helpers/errorHandlers';
import { AddUserFormValues } from 'screens/usersManagement/hooks/useAddUserForm';
import { ChangePasswordFormValues } from 'screens/usersManagement/hooks/useChangePasswordForm';

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
      handleUnauthorized(err);
      return {
        success: false,
      };
    }
  }

  async getUsersWithRoles(roles: string[]): Promise<OperationStatus<UserDto[]>> {
    const token = localStorage.getItem('token');

    const rolesQueryParams = roles.map((role, i) => {
      let param = `roles=${role}`;
      if (i>0) param = '&' + param;
      return param;
    }).join('')

    try {
      const response = await this.httpClient.get<UserDto[]>(
        `user?${rolesQueryParams}`,
        {
          headers: { authorization: token },
        }
      );
      return {
        success: true,
        payload: response.data,
      }
    } catch (err: any) {
      const error: AxiosError = err;
      handleUnauthorized(error);
      return {
        success: false,
        error: error.response?.statusText,
      };
    }
  }

  async getCurrentUser(): Promise<OperationStatus<UserDto>> {
    const token = localStorage.getItem('token');

    try {
      const response = await this.httpClient.get<UserDto>(
        '/user/current',
        {
          headers: { authorization: token },
        }
      );
      return {
        success: true,
        payload: response.data,
      }
    } catch (err: any) {
      const error: AxiosError = err;
      handleUnauthorized(error);
      return {
        success: false,
        error: error.response?.statusText,
      };
    }
  }

  async deleteUser(id: string): Promise<OperationStatus<boolean>> {
    const token = localStorage.getItem('token');

    try {
      const response = await this.httpClient.delete<boolean>(
        `/user/${id}`,
        {
          headers: { authorization: token },
        }
      );
      return {
        success: true,
        payload: response.data,
      }
    } catch (err: any) {
      const error: AxiosError = err;
      handleUnauthorized(error);
      return {
        success: false,
        error: error.response?.statusText,
      };
    }
  }

  async activateUser(id: string): Promise<OperationStatus<boolean>> {
    const token = localStorage.getItem('token');

    try {
      const response = await this.httpClient.put<boolean>(
        `/user/${id}/activate`,
        {},
        {
          headers: { authorization: token },
        }
      );
      return {
        success: true,
        payload: response.data,
      }
    } catch (err: any) {
      const error: AxiosError = err;
      handleUnauthorized(error);
      return {
        success: false,
        error: error.response?.statusText,
      };
    }
  }

  async addUser(user: AddUserFormValues): Promise<OperationStatus<UserDto>> {
    const token = localStorage.getItem('token');

    try {
      const response = await this.httpClient.post<UserDto>(
        '/user/create',
        user,
        {
          headers: { authorization: token },
        }
      );
      return {
        success: true,
        payload: response.data,
      }
    } catch (err: any) {
      const error: AxiosError = err;
      handleUnauthorized(error);
      return {
        success: false,
        error: error.response?.statusText,
      };
    }
  }

  async updatePassword(userId: string | null, values: ChangePasswordFormValues): Promise<OperationStatus<string>> {
    const token = localStorage.getItem('token');

    try {
      const response = await this.httpClient.put<string>(
        `/user/${userId}/update-password`,
        values,
        {
          headers: { authorization: token },
        }
      );
      return {
        success: true,
        payload: response.data,
      }
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

export const userApiService = new UserApiService(axios);
