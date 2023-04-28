import React from 'react';
import Grid from '@mui/material/Grid';
import { Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { DocumentDto } from 'services/api/dtos';
import { Translations } from 'constants/translations';
import CircularProgressIndicator from 'components/circularProgressIndicator';

interface DocumentProcessedDataProps {
  onDownloadOcrPdf: () => void;
  document: DocumentDto;
}

function DocumentProcessedData(props: DocumentProcessedDataProps) {
  const { onDownloadOcrPdf, document } = props;
  return (
    <Grid container spacing={4}>
      <Grid item md={10}>
        <Card>
          <CardContent>
            <Chip label='Procesare inteligenta' color='primary' size='medium' sx={{ mb: 3 }} />
            <Grid container spacing={4}>
              <Grid item md={4}>
                <Typography variant='h4' sx={{ mb: 3 }}>
                  Status OCR-izare:
                </Typography>
                <Typography variant='h4' sx={{ mb: 3 }}>
                  Format original:
                </Typography>
                <Typography variant='h4' sx={{ mb: 3 }}>
                  Nr de pagini:
                </Typography>
                <Typography variant='h4' sx={{ mb: 4 }}>
                  Termeni identificati:
                </Typography>
                <Typography variant='h4' sx={{ mb: 3 }}>
                  Precizie procesare inteligenta:
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  {Translations[document.processingStatus] || 'Nu s-a putut actualiza'}
                </Typography>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  {document.link.split('.').pop()?.toUpperCase() || 'Nu s-a putut actualiza'}
                </Typography>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  {document.numberOfPages || 'Nu s-a putut actualiza'}
                </Typography>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  {document.numberOfIdentifiedTerms || 'Nu s-a putut actualiza'}
                </Typography>
                {document.textInterpretationPrecision ? (
                  <Typography variant='h5' sx={{ mb: 3 }}>
                    <CircularProgressIndicator
                      percentage={document.textInterpretationPrecision}
                    />
                  </Typography>
                ) : (
                  <Typography variant='h5' sx={{ mb: 3, mt: 5 }}>
                    Nu s-a putut actualiza
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
            Descarca document analizat
          </Button>
          {/*<Button variant='contained'>Analizeaza</Button>*/}
          {/*<Button variant='contained'>Actualizeaza stare</Button>*/}
          {/*<Button variant='contained'>Analizeaza rezultat analiza</Button>*/}
        </Stack>
      </Grid>
    </Grid>
  );
}

export default React.memo(DocumentProcessedData);
