import Grid from '@mui/material/Grid';
import { Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
import { FormattedDate } from '../../../../components/formatedDate';
import React from 'react';
import { DocumentDto } from '../../../../services/api/dtos';
import { SourceDescription } from 'constants/sources';
import styled from 'styled-components';
import config from '../../../../config/index';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useDocuments } from 'screens/monitor/hooks/useDocuments';
import { documentApiService } from 'services/api/DocumentApiService';

interface DocumentGeneralDataProps {
  onDownloadOcrPdf: () => void;
  document: DocumentDto;
}

function DocumentGeneralData(props: DocumentGeneralDataProps) {
  const { onDownloadOcrPdf, document } = props;
  const { t } = useTranslation();
  const { downloadPdf } = useDocuments();

  const source = document.source as keyof typeof SourceDescription;
  const documentSourceDescription = SourceDescription[source];
  const rawPdfDownloaderUrl = `${config.BASE_URL}/document/download-pdf/${document.id}`;

  const handleDownloadRawPdf = () => {
    downloadPdf(rawPdfDownloaderUrl);
  };

  const handleViewProcessedDoc = async () => {
    if (!document.id) return;

    try {
      const data = await documentApiService.downloadOcrPdf(document.id);
      if (data.payload) {
        const pdfUrl = URL.createObjectURL(data.payload.blob);
        window.open(pdfUrl, '_blank');
      }
    } catch (err) {
      console.error('Documentul nu a putut fi deschis: ', err);
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item md={10}>
        <Card>
          <CardContent>
            <Chip label='Date generale' color='primary' size='medium' sx={{ mb: 3 }} />
            <Grid container spacing={4}>
              <Grid item md={4}>
                <Typography variant='h4' sx={{ mb: 3 }}>
                  {t('documentView.generalData.title')}
                </Typography>
                <Typography variant='h4' sx={{ mb: 3 }}>
                  {t('documentView.generalData.project')}
                </Typography>
                <Typography variant='h4' sx={{ mb: 3 }}>
                  {t('documentView.generalData.identifier')}
                </Typography>
                <Typography variant='h4' sx={{ mb: 3 }}>
                  {t('documentView.generalData.publicationDate')}
                </Typography>
                <Typography variant='h4' sx={{ mb: 3 }}>
                  {t('documentView.generalData.source')}
                </Typography>
              </Grid>
              <Grid item md={8}>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  {document.title}
                </Typography>
                <StyledLink
                  target='_blank'
                  to={`/project/${document.project?.id}`}
                  rel='noreferrer'
                >
                  <Typography variant='h5' sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {document.project.title}
                      <StarsIcon color='primary' fontSize='small' sx={{ ml: 2 }} />
                    </Box>
                  </Typography>
                </StyledLink>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  {document.identifier}
                </Typography>
                <Typography variant='h5' sx={{ mb: 3 }}>
                  <FormattedDate date={document.publicationDate} />
                </Typography>
                <Typography variant='h5' fontWeight='bold' sx={{ mb: 3 }}>
                  {documentSourceDescription}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item md={2}>
        <Stack gap={4}>
          <StyledButton variant='contained'>
            <LinkNoStyle target='_blank' href={document.link} rel='noreferrer'>
              {t('documentView.generalData.viewOriginal')}
            </LinkNoStyle>
          </StyledButton>
          <StyledButton variant='contained'>
            <LinkNoStyle onClick={handleDownloadRawPdf} rel='noreferrer'>
              {t('documentView.generalData.downloadOriginal')}
            </LinkNoStyle>
          </StyledButton>
          <StyledButton variant='contained'>
            <LinkNoStyle onClick={handleViewProcessedDoc} rel='noreferrer'>
              {t('documentView.generalData.viewOCRDoc')}
            </LinkNoStyle>
          </StyledButton>
          <StyledButton variant='contained'>
            <LinkNoStyle onClick={onDownloadOcrPdf} rel='noreferrer'>
              {t('documentView.generalData.downloadOCRDoc')}
            </LinkNoStyle>
          </StyledButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default React.memo(DocumentGeneralData);

const LinkNoStyle = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: 12px;
`;

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  ['&:focus, &:visited, &:active, &:active']: {
    color: theme.palette.text.primary,
  },
  ['&:hover']: {
    color: theme.palette.text.secondary,
  },
}));

const StyledButton = styled(Button)`
  min-height: 36.5px;
`;
