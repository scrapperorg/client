import { DocumentDto } from 'services/api/dtos';
import { joiResolver } from "@hookform/resolvers/joi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { documentApiService } from "services/api/DocumentApiService";
import { documentSearchSchema } from "../formSchemas/documentSearchSchema";

export interface DocumentSearchFormValues {
  title: string,
  postOcrContent: string;
}

export function useDocumentSearchForm() {
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [results, setResults] = useState<DocumentDto[]>([])


  const documentSearchForm = useForm<DocumentSearchFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      postOcrContent: '',
    },
    resolver: joiResolver(documentSearchSchema),
  })

  const handleSubmit = async ({ title, postOcrContent  }: DocumentSearchFormValues) => {
    setShowLoading(true)

    const response = await documentApiService.search({
      title, postOcrContent
    })

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