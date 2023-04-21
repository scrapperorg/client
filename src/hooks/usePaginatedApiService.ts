import {useCallback, useEffect, useRef, useState} from "react";
import {ApiMethod, APIServiceResponse, FetchArgs} from "./useApiService";

interface PaginatedData<ResponseType> extends APIServiceResponse<ResponseType>{
    page: number;
    pageSize: number;
    onPageSizeChange: (pageSize: number) => void;
    fetch: (...args: FetchArgs) => Promise<void>;
    onPageChange: (page: number) => void;
}

export const usePaginatedApiService = <DataType>(
    apiService: unknown,
    method: ApiMethod<DataType>,
    ...args: Parameters<ApiMethod<DataType>>
) :PaginatedData<DataType> => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<DataType>();
    const [error, setError] = useState<string | undefined>();
    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);

    const fetch = useCallback(async (...args: FetchArgs) => {
        setLoading(true);
        const response = await method.call(apiService, page, pageSize, ...args);

        if(!response.success) {
            setError(response.error ?? 'Ceva nu a functionat. Va rugam incercati din nou.');
            setLoading(false);
        }

        setData(response.payload);
        setLoading(false);
    }, [method, page, pageSize, setLoading, setData, setError]);

    const onPageChange = (page: number) => {
        setPage(page);
    }

    useEffect(() => {
        fetch(...args);
    }, [pageSize, page, ...args]);

    return {data, loading, error, page, pageSize, onPageSizeChange: setPageSize, fetch, onPageChange};
}
