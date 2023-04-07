import { joiResolver } from "@hookform/resolvers/joi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ProjectDto } from 'services/api/dtos';
import { projectSearchSchema } from '../formSchemas/projectSearchSchema';
import { projectApiService } from 'services/api/ProjectApiService';


export interface ProjectSearchFormValues {
  title: string,
  createdAfter: string,
  createdBefore: string,
  presentsInterest: boolean,
  postOcrContent: string
}

export function useProjectSearchForm() {
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [results, setResults] = useState<ProjectDto[]>([])


  const projectSearchForm = useForm<ProjectSearchFormValues>({
    mode: 'onSubmit',
    defaultValues: { 
      presentsInterest: false,
    },
    resolver: joiResolver(projectSearchSchema),
  })

  const handleSubmit = async (searchParams: ProjectSearchFormValues) => {
    setShowLoading(true)

    const response = await projectApiService.search(searchParams)

    if (!response.success || !response.payload) {
      setShowLoading(false);
      setShowError(true);
      return;
    }

    setShowLoading(false);
    setResults(response.payload);
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