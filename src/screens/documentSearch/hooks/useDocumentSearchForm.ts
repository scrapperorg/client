import { DocumentDto } from 'services/api/dtos';
import { joiResolver } from "@hookform/resolvers/joi";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { documentApiService } from "services/api/DocumentApiService";
import { documentSearchSchema } from "../formSchemas/documentSearchSchema";
import { removeNullishEntries } from 'helpers/formatters';
import { useSessionStorage } from 'hooks/useSessionStorage';

export interface DocumentSearchFormValues {
  identificator: string,
  title: string,
  source: string,
  status: string,
  assignedUserId: string,
  projectId: string, // autocomplete this with search in existing projects after project search is implemented
  publishedAfter: string,
  publishedBefore: string,
  postOcrContent: string;
  isRulesBreaker: boolean;
}

export function useDocumentSearchForm() {
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [results, setResults] = useState<DocumentDto[]>([])

  const { setItem, getItem } = useSessionStorage()

  const documentSearchForm = useForm<DocumentSearchFormValues>({
    mode: 'onSubmit',
    defaultValues: { 
      isRulesBreaker: false,
    },
    resolver: joiResolver(documentSearchSchema),
  })


  const shouldFetch = useRef(true);
  useEffect(() => {
    if(!shouldFetch.current) return;
    shouldFetch.current = false;

    const savedSearchParams = getItem('documentSearchParams');
    let searchParams = {}
    if (savedSearchParams?.length) {
      searchParams = JSON.parse(savedSearchParams);
    }

    if (Object.entries(searchParams).length) {
      documentSearchForm.reset(searchParams, { keepDefaultValues: true})
      performSearch(searchParams);
    }
  }, [])

  const persistSearchParams = (searchParams: Partial<DocumentSearchFormValues>) => {
    const params = removeNullishEntries(searchParams)
    setItem('documentSearchParams', JSON.stringify(params))
  }

  const performSearch = async (searchParams: Partial<DocumentSearchFormValues>) => {
    setShowLoading(true);

    const response = await documentApiService.search(searchParams)

    if (!response.success || !response.payload) {
      setShowLoading(false);
      setShowError(true);
      return;
    }

    setShowLoading(false);
    setResults(response.payload);
  }

  const handleSubmit = async (searchParams: DocumentSearchFormValues) => {
    performSearch(searchParams);
    persistSearchParams(searchParams);
  }

  return {
    showLoading,
    showError,
    results,
    handleSubmit,
    setShowError,
    documentSearchForm
  }
}



/// TODO: autocomplete fields on document search form if there is data saved in session storage