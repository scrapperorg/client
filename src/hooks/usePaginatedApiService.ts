import {useCallback, useEffect, useState} from "react";
import {ApiMethod, APIServiceResponse} from "./useApiService";

interface PaginatedData<ResponseType> extends APIServiceResponse<ResponseType>{
    page: number;
    pageSize: number;
    fetch: (page: number, pageSize: number, ...args: Parameters<ApiMethod<any>>) => Promise<void>;
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
    const pageSize = 5;

    const fetch = useCallback(async (page: number, pageSize: number, ...args: Parameters<ApiMethod<DataType>>) => {
        setLoading(true);
        const response = await method.call(apiService, ...args, page, pageSize);

        if(!response.success) {
            setError(response.error ?? 'Ceva nu a functionat. Va rugam incercati din nou.');
            setLoading(false);
        }

        setData(response.payload);
        setLoading(false);
    }, [method, setLoading, setData, setError]);

    const onPageChange = (page: number) => {
        setPage(page);
    }

    useEffect(() => {
        fetch(page, pageSize, ...args);
    }, [page, ...args]);

    return {data, loading, error, page, pageSize, fetch, onPageChange};
}
