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

export function PdfViewer({
  isOpen,
  onClose: handleOnClose,
  pdf,
  highlightCoords,
}: PdfViewerProps) {
  // This must be here not outside of component otherwise style breaks
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [docLoadError, setDocLoadError] = useState<Error | undefined>();
  const pdfBoxRef = useRef(null);

  const handleDocumentLoadSuccess = ({ numPages }: PDFDocumentProxy): void => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const handleDocumentLoadError = (err: Error): void => {
    setDocLoadError(err);
  };

  const handleSkip = useCallback(
    (skip: number) => {
      setPageNumber(Math.min(Math.max(1, skip), numPages));
    },
    [setPageNumber, numPages],
  );

  const handleOnNextPage = useCallback(() => {
    setPageNumber(Math.min(pageNumber + 1, numPages));
  }, [setPageNumber, pageNumber, numPages]);

  const handleOnPreviousPage = useCallback(() => {
    setPageNumber(Math.max(1, pageNumber - 1));
  }, [setPageNumber, pageNumber]);

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
                {pageNumber}/{numPages}
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
                pageNumber={pageNumber}
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
                data={highlightCoords as Keyword[]}
                onSkip={handleSkip}
                currentPage={pageNumber}
              />
            </Box>
          )}
        </Box>
      </div>
    </Drawer>
  );
}
