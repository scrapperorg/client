import {useState, useEffect, useRef, useCallback} from 'react';
import { OperationStatus } from 'services/api/dtos';

export type ApiMethod<ResponseType> = (...args: any[]) => Promise<OperationStatus<ResponseType>>

export type FetchArgs = Parameters<ApiMethod<any>> & {page?: number, pageSize?: number};

export interface APIServiceResponse<E>{
  data: E | undefined;
  loading: boolean;
  error: string | undefined;
  fetch: (...args: FetchArgs) => Promise<void>;
}

export const useApiService = <DataType>(
  apiService: unknown,
  method: ApiMethod<DataType>,
  ...args: Parameters<ApiMethod<DataType>>
) :APIServiceResponse<DataType> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataType>();
  const [error, setError] = useState<string | undefined>();

  const fetch = useCallback(async () => {
    setLoading(true);
    const response = await method.call(apiService, ...args);

    if(!response.success) {
      setError(response.error ?? 'Ceva nu a functionat. Va rugam incercati din nou.');
      setLoading(false);
    }

    setData(response.payload);
    setLoading(false);
  }, [method, args]);

  const shouldFetch = useRef(true);
  useEffect(() => {
    if(!shouldFetch.current) return;
    shouldFetch.current = false;
    
    if (!method) return;
    
    fetch();
  }, [method]);

  return {data, loading, fetch, error};
}
