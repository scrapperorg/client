import Grid from '@mui/material/Grid';
import { Card, CardContent, Chip, Stack } from '@mui/material';
import React, { useState, ChangeEvent, createRef, useCallback } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { DocumentDto } from '../../../../services/api/dtos';
import { useTranslation } from 'react-i18next';

export interface DocumentAttachmentsProps {
  document: DocumentDto;
  onUploadAttachment: (file: File) => void;
  onDeleteAttachment: (attachmentId: string) => void;
  onDownloadAttachment: (attachmentId: string) => void;
}

function DocumentAttachments({
  onUploadAttachment,
  onDeleteAttachment,
  onDownloadAttachment,
  document,
}: DocumentAttachmentsProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const documentInput = createRef<HTMLInputElement>();
  const { t } = useTranslation();

  const handleAddDocument = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setLoading(true);
      await onUploadAttachment(e.target.files?.[0]);
      setLoading(false);
    }
  };

  const handleOnClick = useCallback(() => {
    documentInput.current?.click();
  }, [documentInput]);

  return (
    <Grid container spacing={4}>
      <Grid item md={10}>
        <Card>
          <CardContent>
            <Chip label='Atasamente' color='primary' size='medium' sx={{ mb: 3 }} />
            <Stack direction='row' spacing={2}>
              {document.attachments?.map((attachment) => {
                return (
                  <Chip
                    key={attachment.id}
                    label={attachment.name}
                    variant='outlined'
                    onClick={() => onDownloadAttachment(attachment.id)}
                    onDelete={() => onDeleteAttachment(attachment.id)}
                  />
                );
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
            sx={{ minHeight: 36.5 }}
          >
            <span style={{ fontSize: '12px' }}>{t('generic.attach')}</span>
          </LoadingButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default React.memo(DocumentAttachments);
