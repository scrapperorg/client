import React from 'react';
import Grid from '@mui/material/Grid';
import { Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { DocumentDto, ProcessingStatus, Status } from 'services/api/dtos';
import { Translations } from 'constants/translations';
import CircularProgressIndicator from 'components/circularProgressIndicator';
import { useTranslation } from 'react-i18next';

interface DocumentProcessedDataProps {
  onDownloadOcrPdf: () => void;
  onReanalyseDocument: () => void;
  document: DocumentDto;
}

function DocumentProcessedData(props: DocumentProcessedDataProps) {
  const { onDownloadOcrPdf, onReanalyseDocument, document } = props;
  const { t } = useTranslation();


  const processingProperties = [document.link, document.numberOfPages, document.numberOfIdentifiedTerms, document.textInterpretationPrecision];

  const isBeingReanalyzed = document.processingStatus === ProcessingStatus.downloaded && processingProperties.some((property) => !!property);

  Translations

  let processingStatus: string = Translations[document.processingStatus];
  let originalFormat: string = document.link;
  let numberOfPages: number | string | undefined | null = document.numberOfPages;
  let numberOfIdentifiedTerms: number | string | undefined | null = document.numberOfIdentifiedTerms;
  const textInterpretationPrecision: number | undefined | null = document.textInterpretationPrecision;
  let textInterpretationPrecisionDisplay: string | JSX.Element | null = ''

  if (isBeingReanalyzed) {
    processingStatus = t('documentView.processedData.reanalyzationStatus');
    originalFormat = numberOfPages = numberOfIdentifiedTerms = textInterpretationPrecisionDisplay = '';
  }
  
  if (
    document.processingStatus === ProcessingStatus.ocr_done ||
    document.processingStatus === ProcessingStatus.ocr_failed
  ) {
    processingStatus = processingStatus || t('documentView.processedData.updateError');
    originalFormat = originalFormat || t('documentView.processedData.updateError');
    numberOfPages = numberOfPages || t('documentView.processedData.updateError');
    numberOfIdentifiedTerms = numberOfIdentifiedTerms || t('documentView.processedData.updateError');
    if (textInterpretationPrecision) {
      textInterpretationPrecisionDisplay = (
        <CircularProgressIndicator
          percentage={textInterpretationPrecision}
        />
      );
    } else {
      textInterpretationPrecisionDisplay = t('documentView.processedData.updateError');
    }
  }


  return (
    <Grid container spacing={4}>
      <Grid item md={10}>
        <Card>
          <CardContent>
            <Chip label='Procesare inteligenta' color='primary' size='medium' sx={{ mb: 3 }} />
            <Grid container spacing={4}>
              <Grid item md={4}>
                <Typography variant='h4' sx={{ mb: 3 }}>
                  {t('documentView.processedData.status')}
                </Typography>
                <Typography variant='h4' sx={{ mb: 3 }}>
                  {t('documentView.processedData.format')}
                </Typography>
                <Typography variant='h4' sx={{ mb: 3 }}>
                  {t('documentView.processedData.pages')}
                </Typography>
                <Typography variant='h4' sx={{ mb: 4 }}>
                  {t('documentView.processedData.terms')}
                </Typography>
                <Typography variant='h4' sx={{ mb: 3 }}>
                  {t('documentView.processedData.precision')}
                </Typography>
              </Grid>
              <Grid item md={8}>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  {processingStatus}
                </Typography>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  {originalFormat}
                </Typography>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  {numberOfPages}
                </Typography>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  {numberOfIdentifiedTerms}
                </Typography>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  {textInterpretationPrecisionDisplay} 
                </Typography>
              </Grid>
              <Grid item md={4}></Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item md={2}>
        <Stack gap={4}>
          <Button variant='contained' onClick={onDownloadOcrPdf}>
            {t('documentView.processedData.downloadProcessedDoc')}
          </Button>
          <Button variant='contained' onClick={onReanalyseDocument}>
            Re-Analizeaza
          </Button>
          {/*<Button variant='contained'>Actualizeaza stare</Button>*/}
          {/*<Button variant='contained'>Analizeaza rezultat analiza</Button>*/}
        </Stack>
      </Grid>
    </Grid>
  );
}

export default React.memo(DocumentProcessedData);
