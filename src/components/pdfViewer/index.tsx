import React, { useCallback, useState } from 'react';
import { Box, Drawer, IconButton } from '@mui/material';

import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface PdfViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

function highlightPattern(text: string, pattern: string): string {
  return text.replace(
    pattern,
    (value) => `<span style="background-color: yellow; color: black">${value}</span>`,
  );
}

export function PdfViewer({ isOpen, onClose: handleOnClose }: PdfViewerProps) {
  // This must be here not outside of component otherwise style breaks
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: PDFDocumentProxy): void => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  // const onSkip = useCallback(
  //   (skip: number) => {
  //     setPageNumber(Math.min(Math.max(1, skip), numPages));
  //   },
  //   [setPageNumber],
  // );

  const onNextPage = useCallback(() => {
    setPageNumber(Math.min(pageNumber + 1, numPages));
  }, [setPageNumber, pageNumber, numPages]);

  const onPreviousPage = useCallback(() => {
    setPageNumber(Math.max(1, pageNumber - 1));
  }, [setPageNumber, pageNumber]);

  return (
    <Drawer anchor='right' open={isOpen} onClose={handleOnClose}>
      <div style={{ width: '800px' }}>
        <Box sx={{ padding: 2, display: 'flex', alignItems: 'center' }}>
          <IconButton size='large' onClick={onPreviousPage}>
            <NavigateBeforeIcon fontSize='inherit' />
          </IconButton>
          {pageNumber}/{numPages}
          <IconButton size='large' onClick={onNextPage}>
            <NavigateNextIcon fontSize='inherit' />
          </IconButton>
        </Box>
        <Document
          file={'https://arxiv.org/pdf/1708.08021.pdf'}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            width={800}
            pageNumber={pageNumber}
            customTextRenderer={(layer) => {
              return highlightPattern(layer.str, 'function');
            }}
          />
        </Document>
      </div>
    </Drawer>
  );
}
