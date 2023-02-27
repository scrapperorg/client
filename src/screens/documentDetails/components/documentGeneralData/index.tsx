import Grid from '@mui/material/Grid';
import { Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
import { FormattedDate } from '../../../../components/formatedDate';
import React, { useCallback, useState } from 'react';
import { DocumentDto } from '../../../../services/api/dtos';
import { PdfViewer } from 'components/pdfViewer';

interface DocumentGeneralDataProps {
  document: DocumentDto;
}

function DocumentGeneralData({ document }: DocumentGeneralDataProps) {
  const [isPdfVisible, setIsPdfVisible] = useState(false);

  const handleClosePdf = useCallback(() => setIsPdfVisible(false), [setIsPdfVisible]);
  const handleOpenPdf = useCallback(() => setIsPdfVisible(true), [setIsPdfVisible]);

  return (
    <Grid container spacing={4}>
      <Grid item md={10}>
        <Card>
          <CardContent>
            <Chip label='Date generale' color='primary' size='medium' sx={{ mb: 3 }} />
            <Grid container spacing={4}>
              <Grid item md={4}>
                <Typography variant='h4' sx={{ mb: 3 }}>
                  Titlu document:
                </Typography>
                <Typography variant='h4' sx={{ mb: 3 }}>
                  Proiect Legislativ:
                </Typography>
                <Typography variant='h4' sx={{ mb: 3 }}>
                  Identificator:
                </Typography>
                <Typography variant='h4' sx={{ mb: 3 }}>
                  Data publicarii:
                </Typography>
                <Typography variant='h4' sx={{ mb: 3 }}>
                  Sursa:
                </Typography>
              </Grid>
              <Grid item md={8}>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  {document.title}
                </Typography>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {document.project.title}
                    <StarsIcon color='primary' fontSize='small' sx={{ ml: 2 }} />
                  </Box>
                </Typography>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  {document.identifier}
                </Typography>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  <FormattedDate date={document.publicationDate} />
                </Typography>
                <Typography variant='h5' fontWeight='bold' sx={{ mb: 3 }}>
                  {document.source}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item md={2}>
        <Stack gap={4}>
          <Button variant='contained'>Vizualizare document original</Button>
          <Button variant='contained' onClick={handleOpenPdf}>
            Vizualizare document procesat
          </Button>
          <Button variant='contained'>Descarca original</Button>
          <Button variant='contained'>Descarca document procesat</Button>
        </Stack>
      </Grid>

      <PdfViewer isOpen={isPdfVisible} onClose={handleClosePdf} />
    </Grid>
  );
}

export default React.memo(DocumentGeneralData);
