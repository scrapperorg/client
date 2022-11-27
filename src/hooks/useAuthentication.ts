import { authApiService } from 'services/api/AuthApiService';
import { useApiService } from "./useApiService";

export const useAuthenticationApi = useApiService(authApiService);