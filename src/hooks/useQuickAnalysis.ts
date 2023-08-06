import { AuthContext } from "contexts/authContext";
import { useContext, useState } from "react";
import { documentApiService } from "services/api/DocumentApiService";
import { Decision, DocumentDto, OperationStatus, Status } from "services/api/dtos";

interface QuickAnalysisProps {
  callback?: (document: DocumentDto) => void;
}

export function useQuickAnalysis({ callback }: QuickAnalysisProps) {

  const [isAnalysisUpdateLoading, setIsAnalysisUpdateLoading] = useState<boolean>(false);

  const { user: currentUser } = useContext(AuthContext);

  const performQuickAnalysis = async (documentId: string) => {
    
    setIsAnalysisUpdateLoading(true);
    
    const response: OperationStatus<DocumentDto> = await documentApiService.updateAnalysis({
      documentId,
      assignedUser: currentUser?.id,
      status: Status.REVIZUIT,
      decision: Decision.FARA_CONCLUZIE,
    });

    if (response.success && response.payload) {
      setIsAnalysisUpdateLoading(false);
      if (callback) callback(response.payload);
    }
  };

  return {
    isAnalysisUpdateLoading,
    performQuickAnalysis,
  }
}