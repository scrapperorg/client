import {DocumentDto, QueryAll} from "services/api/dtos";
import {documentApiService} from "services/api/DocumentApiService";
import {usePaginatedApiService} from "hooks/usePaginatedApiService";

export const useDocuments = () => {
    const { page, pageSize, data, loading, error, onPageChange, fetch } = usePaginatedApiService<QueryAll<DocumentDto>>(documentApiService, documentApiService.getDocuments);

    const downloadRawPdf = async(url: string) => {
        console.log('hooks')
        documentApiService.downloadRawPdf(url);
    }

    return {
        documents: data?.results ?? [],
        totalNumberOfDocuments: data?.totalNumberOfResults ?? 0,
        error,
        page,
        pageSize: pageSize || 2,
        isLoading: loading,
        onPageChange: onPageChange,
        fetch,
        downloadRawPdf
    };

}
