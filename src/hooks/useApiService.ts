import { useState, useEffect, useRef } from 'react';
import { OperationStatus } from 'services/api/dtos';

export interface APIServiceResponse<E>{
  data: E | undefined;
  loading: boolean;
  error: string | undefined;
} 


export type IApiMethod<E> = (args: Record<string, string | number>) => Promise<OperationStatus<E>>
export type IUseApiService = <E>(method: IApiMethod<E>) => (args: Record<string, string | number>) => APIServiceResponse<E>

export function useApiService(apiService: unknown): IUseApiService {
  return function<E>(method: IApiMethod<E>): (args: Record<string, string | number>) => APIServiceResponse<E>
    {
      return (args) => {
        const [loading, setLoading] = useState<boolean>(false);
        const [data, setData] = useState<E | undefined>();
        const [error, setError] = useState<string | undefined>();

        const shouldFetch = useRef(true);
        useEffect(() => {
          if(!shouldFetch.current) return;
          shouldFetch.current = false;
          
          if (!method) return;
          const fetchData = async () => {
            setLoading(true);
            const response = await method.call(apiService, args);
            
            if(!response.success) {
              setError(response.error ?? 'Ceva nu a functionat. Va rugam incercati din nou.');
              setLoading(false);
            }

            setData(response.payload);
            setLoading(false);
          };

          fetchData();
        }, [method]);

        return {data, loading, error};
      }
  }
};
