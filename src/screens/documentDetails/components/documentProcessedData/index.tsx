import React, { useCallback, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { DocumentDto, ProcessingStatus } from 'services/api/dtos';
import { Translations } from 'constants/translations';
import CircularProgressIndicator from 'components/circularProgressIndicator';
import { useTranslation } from 'react-i18next';
import { PdfViewer } from 'components/pdfViewer';
import config from '../../../../config/index';
import styled from 'styled-components';
import { useDocuments } from 'screens/monitor/hooks/useDocuments';

interface DocumentProcessedDataProps {
  onReanalyseDocument: () => void;
  document: DocumentDto;
}

function DocumentProcessedData(props: DocumentProcessedDataProps) {
  const { onReanalyseDocument, document } = props;
  const { t } = useTranslation();
  const [isPdfVisible, setIsPdfVisible] = useState(false);
  const { downloadPdf } = useDocuments();

  const handleClosePdf = useCallback(() => setIsPdfVisible(false), [setIsPdfVisible]);
  const handleOpenPdf = useCallback(() => setIsPdfVisible(true), [setIsPdfVisible]);

  const pdfViewerUrl = `${config.BASE_URL}/document/download-highlight-pdf/${document.id}`;

  const handleDownloadHighlightPdf = () => {
    downloadPdf(pdfViewerUrl);
  };

  const processingProperties = [
    document.link,
    document.numberOfPages,
    document.numberOfIdentifiedTerms,
    document.textInterpretationPrecision,
  ];

  const isBeingReanalyzed =
    document.processingStatus === ProcessingStatus.downloaded &&
    processingProperties.some((property) => !!property);

  let processingStatus: string = Translations[document.processingStatus];
  let originalFormat: string = document.link;
  let numberOfPages: number | string | undefined | null = document.numberOfPages;
  let numberOfIdentifiedTerms: number | string | undefined | null =
    document.numberOfIdentifiedTerms;
  const textInterpretationPrecision: number | undefined | null =
    document.textInterpretationPrecision;
  let textInterpretationPrecisionDisplay: string | JSX.Element | null = '';

  if (isBeingReanalyzed) {
    processingStatus = t('documentView.processedData.reanalyzationStatus');
    originalFormat =
      numberOfPages =
      numberOfIdentifiedTerms =
      textInterpretationPrecisionDisplay =
        '';
  }

  if (
    document.processingStatus === ProcessingStatus.ocr_done ||
    document.processingStatus === ProcessingStatus.ocr_failed
  ) {
    processingStatus = processingStatus || t('documentView.processedData.updateError');
    originalFormat = originalFormat || t('documentView.processedData.updateError');
    numberOfPages = numberOfPages || t('documentView.processedData.updateError');
    numberOfIdentifiedTerms =
      numberOfIdentifiedTerms || t('documentView.processedData.updateError');
    if (textInterpretationPrecision) {
      textInterpretationPrecisionDisplay = (
        <CircularProgressIndicator percentage={textInterpretationPrecision} />
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
          <StyledButton variant='contained'>
            <LinkNoStyle onClick={onReanalyseDocument} rel='noreferrer'>
              {t('documentView.processedData.reAnalyze')}
            </LinkNoStyle>
          </StyledButton>
          <StyledButton variant='contained' disabled={!document.highlightFile}>
            <LinkNoStyle onClick={handleOpenPdf} rel='noreferrer'>
              {t('documentView.processedData.viewProcessed')}
            </LinkNoStyle>
          </StyledButton>
          <StyledButton variant='contained' disabled={!document.highlightFile}>
            <LinkNoStyle onClick={handleDownloadHighlightPdf} rel='noreferrer'>
              {t('documentView.processedData.downloadProcessed')}
            </LinkNoStyle>
          </StyledButton>
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

export default React.memo(DocumentProcessedData);

const LinkNoStyle = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: 12px;
`;

const StyledButton = styled(Button)`
  min-height: 36.5px;
`;
