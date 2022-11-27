import { QueryAll } from './dtos/generic';
import { AxiosInstance, AxiosError } from 'axios';
import { axios } from 'config/http';
import { OperationStatus, DocumentDto } from './dtos';


const argsToQuery = (args: Record<string, string | number>) => {
  const stringifiedArgs: Record<string, string> = {};
  Object.keys(args).forEach((key: string) => stringifiedArgs[key] = args[key].toString())
  return new URLSearchParams(stringifiedArgs).toString() 
}
class DocumentApiService {
  constructor(private readonly httpClient: AxiosInstance) {}

  async getDocuments(args: Record<string, string | number>): Promise<OperationStatus<QueryAll<DocumentDto>>> {
    try {
      const params = argsToQuery(args);
      const response = await this.httpClient.get<QueryAll<DocumentDto>>(`/document?${params}`);

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

export const documentApiService = new DocumentApiService(axios);
