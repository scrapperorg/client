import React from 'react';
import Grid from '@mui/material/Grid';
import { Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { DocumentDto } from 'services/api/dtos';
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
              <Grid item md={6}>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  {Translations[document.processingStatus] || t('documentView.processedData.updateError')}
                </Typography>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  {document.link?.split('.').pop()?.toUpperCase() || t('documentView.processedData.updateError')}
                </Typography>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  {document.numberOfPages || t('documentView.processedData.updateError')}
                </Typography>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  {document.numberOfIdentifiedTerms || t('documentView.processedData.updateError')}
                </Typography>
                {document.textInterpretationPrecision ? (
                  <Typography variant='h5' sx={{ mb: 3 }}>
                    <CircularProgressIndicator
                      percentage={document.textInterpretationPrecision}
                    />
                  </Typography>
                ) : (
                  <Typography variant='h5' sx={{ mb: 3, mt: 5 }}>
                    {t('documentView.processedData.updateError')}
                  </Typography>
                )}
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
