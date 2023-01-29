import Grid from '@mui/material/Grid';
import { Card, CardContent, Chip, Stack } from '@mui/material';
import React, { useState, ChangeEvent, createRef } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { DocumentDto } from '../../../../services/api/dtos';

export interface DocumentAttachmentsProps {
  document: DocumentDto;
  onUploadAttachment: (file: File) => void;
}

function DocumentAttachments({ onUploadAttachment, document }: DocumentAttachmentsProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const documentInput = createRef<HTMLInputElement>();

  const handleAddDocument = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setLoading(true);
      await onUploadAttachment(e.target.files?.[0]);
      setLoading(false);
    }
  };

  const handleOnClick = () => {
    documentInput.current?.click();
  };

  return (
    <Grid container spacing={4}>
      <Grid item md={10}>
        <Card>
          <CardContent>
            <Chip label='Atasamente' color='primary' size='medium' sx={{ mb: 3 }} />
            <Stack direction='row' spacing={2}>
              {document.attachments?.map((attachment) => {
                return <Chip key={attachment.id} label={attachment.name} variant='outlined' />;
              })}
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid item md={2}>
        <Stack gap={4}>
          <input
            type='file'
            onChange={handleAddDocument}
            style={{ display: 'none' }}
            ref={documentInput}
          />
          <LoadingButton
            onClick={handleOnClick}
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition='end'
            variant='contained'
          >
            <span>Ataseaza</span>
          </LoadingButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default React.memo(DocumentAttachments);
