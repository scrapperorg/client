import {useState, useEffect, useRef} from 'react';
import { OperationStatus } from 'services/api/dtos';

export type ApiMethod<ResponseType> = (...args: any[]) => Promise<OperationStatus<ResponseType>>

export interface APIServiceResponse<E>{
  data: E | undefined;
  loading: boolean;
  error: string | undefined;
}

export const useApiService = <DataType>(
  apiService: unknown,
  method: ApiMethod<DataType>,
  ...args: Parameters<ApiMethod<DataType>>
) :APIServiceResponse<DataType> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataType>();
  const [error, setError] = useState<string | undefined>();

  const fetch = async () => {
    setLoading(true);
    const response = await method.call(apiService, ...args);
    
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

