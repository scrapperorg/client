import { DocumentDto } from 'services/api/dtos/document';
import { documentApiService } from 'services/api/DocumentApiService';
import { useApiService } from './useApiService';
import { QueryAll } from 'services/api/dtos';
import { usePaginatedData } from './usePaginated';

export const useDocumentApi = useApiService(documentApiService);

export const useGetDocuments = () => usePaginatedData<QueryAll<DocumentDto>>(useDocumentApi, documentApiService.getDocuments)
