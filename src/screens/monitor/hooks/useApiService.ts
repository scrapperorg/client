import { useState, useEffect } from 'react';
import { OperationStatus } from './../../../services/api/dtos';

export function useApiService(apiService: unknown) {
  return function<E> (
    method: (...args: unknown[]) => Promise<OperationStatus<E>>): (...args: unknown[]) => [E | undefined, boolean, string | undefined]
    {
      return (...args) => {
        const [loading, setLoading] = useState<boolean>(false);
        const [data, setData] = useState<E | undefined>();
        const [error, setError] = useState<string | undefined>();

        useEffect(() => {
            if (!method) return;
            const fetchData = async () => {
                setLoading(true);
                const response = await method.call(apiService, ...args);
                
                if(!response.success) {
                  setError(response.error ?? 'Ceva nu a functionat. Va rugam incercati din nou.');
                  setLoading(false);
                }

                setData(response.payload);
                setLoading(false);
            };

            fetchData();
        }, [method]);

        return [data, loading, error];
      }
  }
};
