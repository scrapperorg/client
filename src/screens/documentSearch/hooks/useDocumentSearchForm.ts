import { DocumentDto } from 'services/api/dtos';
import { joiResolver } from "@hookform/resolvers/joi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { documentApiService } from "services/api/DocumentApiService";
import { documentSearchSchema } from "../formSchemas/documentSearchSchema";

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


  const documentSearchForm = useForm<DocumentSearchFormValues>({
    mode: 'onSubmit',
    defaultValues: { 
      isRulesBreaker: false,
      source: ''
    },
    resolver: joiResolver(documentSearchSchema),
  })

  const handleSubmit = async (searchParams: DocumentSearchFormValues) => {
    setShowLoading(true)

    const response = await documentApiService.search(searchParams)

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
    documentSearchForm
  }
}