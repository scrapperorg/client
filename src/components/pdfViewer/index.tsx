import React, { useCallback, useRef, useState } from 'react';
import { Box, Drawer, IconButton } from '@mui/material';

import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Keyword, PdfViewerKeywords } from './PdfViewerKeywords';

interface PdfViewerProps {
  pdf: string;
  isOpen: boolean;
  onClose: () => void;
  highlightCoords: Array<Record<string, any>>;
}

export interface PageDetails {
  page: number;
  wordIndex: number | null;
  word: string | null;
}

export function PdfViewer({
  isOpen,
  onClose: handleOnClose,
  pdf,
  highlightCoords,
}: PdfViewerProps) {
  // This must be here not outside of component otherwise style breaks
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(0);
  const [pageDetails, setPageDetails] = useState<PageDetails>({ page: 0, wordIndex: 0, word: '' });
  const [docLoadError, setDocLoadError] = useState<Error | undefined>();
  const pdfBoxRef = useRef(null);

  const handleDocumentLoadSuccess = ({ numPages }: PDFDocumentProxy): void => {
    setNumPages(numPages);
    setPageDetails({ page: 1, wordIndex: null, word: null });
  };

  const handleDocumentLoadError = (err: Error): void => {
    setDocLoadError(err);
  };

  const handleSkip = useCallback(
    (pageDetails: PageDetails) => {
      const page = Math.min(Math.max(1, pageDetails.page), numPages);
      setPageDetails({ page, wordIndex: pageDetails.wordIndex, word: pageDetails.word });
    },
    [pageDetails, setPageDetails, numPages],
  );

  const handleOnNextPage = useCallback(() => {
    const page = Math.min(pageDetails.page + 1, numPages);
    setPageDetails({ page, wordIndex: null, word: null });
  }, [pageDetails, setPageDetails, numPages]);

  const handleOnPreviousPage = useCallback(() => {
    const page = Math.max(1, pageDetails.page - 1);
    setPageDetails({ page, wordIndex: null, word: null });
  }, [pageDetails, setPageDetails]);

  return (
    <Drawer anchor='right' open={isOpen} onClose={handleOnClose}>
      <div style={{ width: '900px' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box>
            {!docLoadError && (
              <Box>
                <IconButton size='large' onClick={handleOnPreviousPage}>
                  <NavigateBeforeIcon fontSize='inherit' />
                </IconButton>
                {pageDetails.page}/{numPages}
                <IconButton size='large' onClick={handleOnNextPage}>
                  <NavigateNextIcon fontSize='inherit' />
                </IconButton>
              </Box>
            )}
            <Document
              ref={pdfBoxRef}
              file={pdf}
              onLoadSuccess={handleDocumentLoadSuccess}
              onLoadError={handleDocumentLoadError}
            >
              <Page
                width={700}
                pageNumber={pageDetails.page}
                renderTextLayer={true}
                // DO NOT DELETE, MIGHT NEED
                // customTextRenderer={(layer) => {
                //   console.log(layer);
                //   return `<span class='test'>${layer.str}</span>`;
                // }}
              />
            </Document>
          </Box>
          {!docLoadError && (
            <Box sx={{ width: '200px' }}>
              <PdfViewerKeywords
                pageDetails={pageDetails}
                data={highlightCoords as Keyword[]}
                onSkip={handleSkip}
                currentPage={pageDetails.page}
              />
            </Box>
          )}
        </Box>
      </div>
    </Drawer>
  );
}
