import { useState, useEffect, useRef } from 'react';
import { OperationStatus } from 'services/api/dtos';



export type ApiMethod<E> = (...args: any[]) => Promise<OperationStatus<E>>

export interface APIServiceResponse<E>{
  data: E | undefined;
  loading: boolean;
  error: string | undefined;
}

export const useApiService = <DataType>(apiService: unknown, method: ApiMethod<DataType>) :APIServiceResponse<DataType> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataType>();
  const [error, setError] = useState<string | undefined>();

  const fetch = async () => {
    setLoading(true);
    const response = await method.call(apiService);
    
    if(!response.success) {
      setError(response.error ?? 'Ceva nu a functionat. Va rugam incercati din nou.');
      setLoading(false);
    }

    setData(response.payload);
    setLoading(false);
  };

  const shouldFetch = useRef(true);
  useEffect(() => {
    if(!shouldFetch.current) return;
    shouldFetch.current = false;
    
    if (!method) return;
    
    fetch();
  }, [method]);

  return {data, loading, error};
}

interface PaginatedData<E> extends APIServiceResponse<E>{
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const usePaginatedApiService = <DataType>(apiService: unknown, method: ApiMethod<DataType>) :PaginatedData<DataType> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataType>();
  const [error, setError] = useState<string | undefined>();
  const [page, setPage] = useState<number>(0);
  const pageSize = 2;

  const fetch = async (page: number, pageSize: number) => {
    setLoading(true);
    const response = await method.call(apiService, page, pageSize);
    
    if(!response.success) {
      setError(response.error ?? 'Ceva nu a functionat. Va rugam incercati din nou.');
      setLoading(false);
    }

    setData(response.payload);
    setLoading(false);
  };

  const onPageChange = (page: number) => {
    setPage(page);
  }

  useEffect(() => {
    fetch(page, pageSize);
  }, [page]);

  return {data, loading, error, page, pageSize, onPageChange};
}
