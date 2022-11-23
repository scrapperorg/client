import { authApiService } from './../../../services/api/AuthApiService';
import { useApiService } from './useApiService';

export const useDocuments = useApiService<Document[]>(authApiService.getDocuments);