import React from 'react';
import Grid from '@mui/material/Grid';
import { Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';

interface DocumentProcessedDataProps {
  onDownloadOcrPdf: () => void;
}

function DocumentProcessedData(props: DocumentProcessedDataProps) {
  const { onDownloadOcrPdf } = props;
  return (
    <Grid container spacing={4}>
      <Grid item md={10}>
        <Card>
          <CardContent>
            <Chip label='Procesare inteligenta' color='primary' size='medium' sx={{ mb: 3 }} />
            <Grid container spacing={4}>
              <Grid item md={4}>
                <Typography variant='h4' sx={{ mb: 3 }}>
                  Format original:
                </Typography>
                <Typography variant='h4' sx={{ mb: 3 }}>
                  Nr de pagini:
                </Typography>
                <Typography variant='h4' sx={{ mb: 3 }}>
                  Articole Identificate:
                </Typography>
                <Typography variant='h4' sx={{ mb: 3 }}>
                  Termeni identificati:
                </Typography>
              </Grid>
              <Grid item md={4}>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  Not yet implemented
                </Typography>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  Not yet implemented
                </Typography>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  Not yet implemented
                </Typography>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  Not yet implemented
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
