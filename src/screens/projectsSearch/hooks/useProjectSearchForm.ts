import { joiResolver } from "@hookform/resolvers/joi";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ProjectDto } from 'services/api/dtos';
import { projectSearchSchema } from '../formSchemas/projectSearchSchema';
import { projectApiService } from 'services/api/ProjectApiService';
import { removeNullishEntries } from "helpers/formatters";
import { useSessionStorage } from "hooks/useSessionStorage";


export interface ProjectSearchFormValues {
  title: string,
  initiator: string,
  source: string,
  createdAfter: string,
  createdBefore: string,
  presentsInterest: boolean,
  postOcrContent: string
}

export function useProjectSearchForm() {
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [results, setResults] = useState<ProjectDto[]>([])

  const { setItem, getItem } = useSessionStorage()

  const projectSearchForm = useForm<ProjectSearchFormValues>({
    mode: 'onSubmit',
    defaultValues: { 
      presentsInterest: false,
    },
    resolver: joiResolver(projectSearchSchema),
  })


  const shouldFetch = useRef(true);
  useEffect(() => {
    if(!shouldFetch.current) return;
    shouldFetch.current = false;

    const savedSearchParams = getItem('projectSearchParams');
    let searchParams = {}
    if (savedSearchParams?.length) {
      searchParams = JSON.parse(savedSearchParams);
    }

    if (Object.entries(searchParams).length) {
      projectSearchForm.reset(searchParams, { keepDefaultValues: true})
      performSearch(searchParams);
    }
  }, [])

  const persistSearchParams = (searchParams: Partial<ProjectSearchFormValues>) => {
    const params = removeNullishEntries(searchParams)
    setItem('projectSearchParams', JSON.stringify(params))
  }

  const performSearch = async (searchParams: Partial<ProjectSearchFormValues>) => {
    setShowLoading(true);

    const response = await projectApiService.search(searchParams)

    if (!response.success || !response.payload) {
      setShowLoading(false);
      setShowError(true);
      return;
    }

    setShowLoading(false);
    setResults(response.payload);
  }

  const handleSubmit = async (searchParams: ProjectSearchFormValues) => {
    performSearch(searchParams);
    persistSearchParams(searchParams);
  }

  return {
    showLoading,
    showError,
    results,
    handleSubmit,
    setShowError,
    projectSearchForm
  }
}