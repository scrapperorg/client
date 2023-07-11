import Grid from '@mui/material/Grid';
import { Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
import { FormattedDate } from '../../../../components/formatedDate';
import React, { useCallback, useState } from 'react';
import { DocumentDto } from '../../../../services/api/dtos';
import { PdfViewer } from 'components/pdfViewer';
import { SourceDescription } from 'constants/sources';
import styled from 'styled-components';
import config from '../../../../config/index';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface DocumentGeneralDataProps {
  document: DocumentDto;
}

function DocumentGeneralData({ document }: DocumentGeneralDataProps) {
  const [isPdfVisible, setIsPdfVisible] = useState(false);
  const { t } = useTranslation();

  const handleClosePdf = useCallback(() => setIsPdfVisible(false), [setIsPdfVisible]);
  const handleOpenPdf = useCallback(() => setIsPdfVisible(true), [setIsPdfVisible]);

  const source = document.source as keyof typeof SourceDescription;
  const documentSourceDescription = SourceDescription[source];
  const pdfViewerUrl = `${config.BASE_URL}/document/download-highlight-pdf/${document.id}`;

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
                <StyledLink target='_blank' to={`/project/${document.project?.id}`} rel='noreferrer'>
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
          <Button variant='contained'>
            <LinkNoStyle target='_blank' href={document.link} rel='noreferrer'>
              {t('documentView.generalData.viewOriginal')}
            </LinkNoStyle>
          </Button>
          <Button variant='contained' onClick={handleOpenPdf} disabled={!document.highlightFile}>
            {t('documentView.generalData.viewProcessed')}
          </Button>
          {/*<Button variant='contained'>Descarca original</Button>*/}
          {/*<Button variant='contained'>Descarca document procesat</Button>*/}
        </Stack>
      </Grid>

      {document.highlightFile && (
        <PdfViewer
          pdf={pdfViewerUrl}
          highlightCoords={document.highlightMetadata}
          isOpen={isPdfVisible}
          onClose={handleClosePdf}
        />
      )}
    </Grid>
  );
}

export default React.memo(DocumentGeneralData);

const LinkNoStyle = styled.a`
  text-decoration: none;
  color: inherit;
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
