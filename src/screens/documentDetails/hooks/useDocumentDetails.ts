import { documentApiService } from 'services/api/DocumentApiService';
import { useContext, useEffect, useState } from 'react';
import { DocumentDto, OperationStatus } from 'services/api/dtos';
import { DocumentDetailsContext } from '../context';
import { attachmentApiService } from 'services/api/AttachmentApiService';
import { downloadBlob } from 'helpers/downloadBlob';
import { useForm } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';
import { documentDetailsSchema } from '../formSchemas/documentDetailsSchema';

export interface AssignResponsibleModalFormValues {
  documentId: string | undefined;
  assignedUser?: string | undefined;
  deadline: Date | undefined;
  status: string | undefined;
  decision: string | undefined;
}

export function useDocumentDetails() {
  const { document: contextDocument } = useContext(DocumentDetailsContext);

  const [document, setDocument] = useState<DocumentDto | null>(contextDocument);

  const assignResponsible = async (userId: string) => {
    if (!document?.id) return false;
    const { payload } = await documentApiService.assignResponsible(document.id, userId);
    if (!payload) return;
    setDocument(payload);
  };

  const setDeadline = async (date: string | undefined) => {
    if (!document?.id) return false;
    const { payload } = await documentApiService.setDeadline(document.id, date ?? '');
    if (!payload) return;
    setDocument(payload);
  };

  const uploadAttachment = async (attachment: File) => {
    if (!document?.id) return false;
    const { payload } = await documentApiService.uploadAttachment(document.id, attachment);

    if (!payload) return;
    setDocument(payload);
  };

  const deleteAttachment = async (attachmentId: string) => {
    if (!document?.id) return false;
    const { payload } = await documentApiService.deleteAttachment(document.id, attachmentId);
    if (!payload) return;
    setDocument(payload);
  };

  const downloadAttachment = async (attachmentId: string) => {
    const data = await attachmentApiService.downloadAttachment(attachmentId);

    if (data.payload) {
      const { blob, fileName } = data.payload;
      downloadBlob(blob, fileName);
    }
  };

  const downloadOcrPdf = async () => {
    if (!document?.id) return false;
    const data = await documentApiService.downloadOcrPdf(document?.id);

    if (data.payload) {
      const { blob, fileName } = data.payload;
      downloadBlob(blob, fileName);
    }
  };
  const setStatus = async (status: string | undefined) => {
    if (!document?.id) return false;
    const { payload } = await documentApiService.setStatus(document.id, status ?? '');
    if (!payload) return;
    setDocument(payload);
  };

  const setDecision = async (status: string | undefined) => {
    if (!document?.id) return false;
    const { payload } = await documentApiService.setDecision(document.id, status ?? '');
    if (!payload) return;
    setDocument(payload);
  };

  const assignResponsibleModalForm = useForm<AssignResponsibleModalFormValues>({
    mode: 'onSubmit',
    resolver: joiResolver(documentDetailsSchema),
  });

  const handleSubmitDocumentAnalysis = async (modalParams: AssignResponsibleModalFormValues) => {
    modalParams.documentId = document?.id;
    const response = await documentApiService.updateAnalysis(modalParams);
    
    const documentResponse = response as OperationStatus<DocumentDto>;
  
    if (documentResponse.success && documentResponse.payload) {
      setDocument(documentResponse.payload);
    }
  };

  useEffect(() => setDocument(contextDocument), [contextDocument]);

  return {
    document,
    assignResponsible,
    setDeadline,
    uploadAttachment,
    deleteAttachment,
    downloadAttachment,
    downloadOcrPdf,
    setStatus,
    setDecision,
    assignResponsibleModalForm,
    handleSubmitDocumentAnalysis,
  };
}
