import { documentApiService } from 'services/api/DocumentApiService';
import { useContext, useEffect, useState } from "react";
import { DocumentDto } from "services/api/dtos";
import { DocumentDetailsContext } from "../context";

export function useDocumentDetails() {
  const { document: contextDocument } = useContext(DocumentDetailsContext);

  const [document, setDocument] = useState<DocumentDto | null>(contextDocument)

  const assignResponsible = async (userId: string) => {
    if (!document?.id) return false;
    const { payload } = await documentApiService.assignResponsible(document.id, userId);
    if (!payload) return;
    setDocument(payload);
  }

  useEffect(() => setDocument(contextDocument), [contextDocument])

  return {
    document,
    assignResponsible,
  }
}