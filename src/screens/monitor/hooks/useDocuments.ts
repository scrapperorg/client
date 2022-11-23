import { DocumentDto } from './../../../services/api/dtos/document';
import { documentApiService } from './../../../services/api/DocumentApiService';
import { useApiService } from './useApiService';

export const useDocumentApi = useApiService(documentApiService);

export const useGetDocuments = useDocumentApi<DocumentDto[]>(documentApiService.getDocuments);