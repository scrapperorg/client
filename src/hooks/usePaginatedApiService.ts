import {useCallback, useEffect, useState} from "react";
import {ApiMethod, APIServiceResponse} from "./useApiService";

interface PaginatedData<ResponseType> extends APIServiceResponse<ResponseType>{
    page: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    fetch: (page: number, pageSize: number) => void;
}

export const usePaginatedApiService = <DataType>(apiService: unknown, method: ApiMethod<DataType>) :PaginatedData<DataType> => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<DataType>();
    const [error, setError] = useState<string | undefined>();
    const [page, setPage] = useState<number>(0);
    const pageSize = 5;

    const fetch = useCallback(async (page: number, pageSize: number) => {
        setLoading(true);
        const response = await method.call(apiService, page, pageSize);

        if(!response.success) {
            setError(response.error ?? 'Ceva nu a functionat. Va rugam incercati din nou.');
            setLoading(false);
        }

        if (JSON.stringify(response.payload) !== JSON.stringify(data)) {
            console.log('test');
            setData(response.payload);
        }
        setLoading(false);
    }, []);

    const onPageChange = (page: number) => {
        setPage(page);
    }

    useEffect(() => {
        fetch(page, pageSize);
    }, [page, fetch]);

    return {data, loading, error, page, pageSize, fetch, onPageChange};
}
