import { useState } from 'react';
import { APIServiceResponse, IApiMethod, IUseApiService } from './useApiService';

interface PaginatedData<E> extends APIServiceResponse<E>{
  page: number;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (page: number) => void;
}

export function usePaginatedData<E>(
  useDataApiService: IUseApiService,
  method: IApiMethod<E>,
): PaginatedData<E> {
  const pageSize = 10;
  const [page, setPage] = useState<number>(0);

  const nextPage = () => {
    setPage(page+1);
  }

  const previousPage = () => {
    const newPage = Math.max(0, page-1);
    if (newPage === page) return;
    setPage(newPage);
  }

  const goToPage = (page: number) => {
    setPage(page);
  }  

  const useGetData = useDataApiService<E>(method);

  return {
    ...useGetData({
      page,
      pageSize
    }),
    page,
    nextPage,
    previousPage,
    goToPage
  }  
}