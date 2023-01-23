import Grid from '@mui/material/Grid';
import { Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import React, { useState, ChangeEvent, createRef } from 'react';

function DocumentAttachments() {
  const [document, setDocument] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const documentInput = createRef<HTMLInputElement>();

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    if (documentInput.current) {
      const inputFile = documentInput.current;
      if (inputFile.files?.[0]) setDocument(inputFile.files?.[0]);
      if (e.target.files?.[0]) {
        setUploading(true);
        const formData = new FormData();
        formData.append('file', document as File);
        try {
          // TODO: replace dummy endpoint with real one
          const response = await fetch('https://httpbin.org/post', {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          console.log('Document atasat!');
        } catch (error) {
          console.error('Eroare in atasarea documentului: ', error);
        }

        setUploading(false);
      }
    }
  };
  return (
    <Grid container spacing={4}>
      <Grid item md={10}>
        <Card>
          <CardContent>
            <Chip label='Atasamente' color='primary' size='medium' sx={{ mb: 3 }} />
            <Typography variant='h5' sx={{ mb: 3 }}>
              {document && document.name}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item md={2}>
        <Stack gap={4}>
          <input
            type='file'
            onChange={handleFileSelect}
            style={{ display: 'none' }}
            ref={documentInput}
          />
          <Button
            variant='contained'
            type='button'
            onClick={() => documentInput.current?.click()}
            disabled={uploading}
          >
            Ataseaza
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default React.memo(DocumentAttachments);
