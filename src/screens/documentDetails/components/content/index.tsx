import { Box, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { DocumentDetailsContext } from 'screens/documentDetails/context';
import Grid from '@mui/material/Grid';
import WarningIcon from '@mui/icons-material/Warning';
import DocumentGeneralData from '../documentGeneralData';
import DocumentActivity from '../documentActivity';
import DocumentProcessedData from '../documentProcessedData';
import DocumentAttachments from '../documentAttachments';
import { InteractiveComponentsContext } from 'contexts/interactiveComponentsContext';
import { useDocumentDetails } from 'screens/documentDetails/hooks/useDocumentDetails';
import { ModalNames } from 'constants/modals';
import { useTranslation } from 'react-i18next';

export default function DocumentDetailsContent() {
  const { assignableResponsibles } = useContext(DocumentDetailsContext);
  const { t } = useTranslation();

  const { openModal, modalName } = useContext(InteractiveComponentsContext);

  const {
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
    handleReanalyseDocument,
  } = useDocumentDetails();

  if (!document) return null;

  return (
    <>
      <Grid container>
        <Grid item md={10}>
          <Grid container justifyContent='space-between'>
            <Grid item>
              <Typography variant='h2'>{t('documentView.title')}</Typography>
            </Grid>
            {document.isRulesBreaker && (
              <Grid item>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <WarningIcon color='warning' fontSize='medium' sx={{ mr: 2 }} />
                  <Typography>{t('documentView.rulesBreaker')}</Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{ mb: 4 }}>
        <DocumentGeneralData document={document} />
      </Box>

      <Box sx={{ mb: 4 }}>
        <DocumentProcessedData
          onDownloadOcrPdf={downloadOcrPdf}
          onReanalyseDocument={handleReanalyseDocument}
          document={document}
        />
      </Box>
      
      <Box sx={{ mb: 4 }}>
        <DocumentActivity
          document={document}
          isModalOpened={modalName === ModalNames.ASSIGN_RESP}
          openModal={() => {
            openModal(ModalNames.ASSIGN_RESP);
          }}
          assignableResponsibles={assignableResponsibles}
          assignResponsible={assignResponsible}
          setDeadline={setDeadline}
          setStatus={setStatus}
          setDecision={setDecision}
          form={assignResponsibleModalForm}
          handleSubmitDocumentAnalysis={handleSubmitDocumentAnalysis}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <DocumentAttachments
          document={document}
          onUploadAttachment={uploadAttachment}
          onDeleteAttachment={deleteAttachment}
          onDownloadAttachment={downloadAttachment}
        />
      </Box>
    </>
  );
}
