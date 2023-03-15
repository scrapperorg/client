import React, { useCallback, useState } from 'react';
import { Box, Drawer, IconButton } from '@mui/material';

import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { PdfViewerKeywords } from './PdfViewerKeywords';

interface PdfViewerProps {
  isOpen: boolean;
  onClose: () => void;
}
function highlightPattern(text: string, words: string[]): string {
  const regex = new RegExp(`\\b(${words.join('|')})\\b`, 'gi');
  return text.replace(
    regex,
    (value) => `<span style="background-color: yellow; color: black">${value}</span>`,
  );
}

const hardcodedWords = {
  results: [
    {
      keyword: 'function',
      occs: [
        {
          location: {
            x1: 141.85400390625,
            x2: 155.35560607910156,
            y1: 306.2344970703125,
            y2: 317.2403564453125,
          },
          page: 2,
        },
        {
          location: {
            x1: 131.320390625,
            x2: 153.0607910156,
            y1: 309.2674970703125,
            y2: 319.564453125,
          },
          page: 3,
        },
      ],
      total_occs: 2,
    },
    {
      keyword: 'limited',
      occs: [
        {
          location: {
            x1: 11.54000625,
            x2: 15.3607910156,
            y1: 36.2344970703125,
            y2: 37.240453125,
          },
          page: 3,
        },
      ],
      total_occs: 1,
    },
  ],
};

function extractKeywords(data: any): string[] {
  const keywords: string[] = [];

  data.results.forEach((result: any) => {
    if (!keywords.includes(result.keyword)) {
      keywords.push(result.keyword);
    }
  });

  return keywords;
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
            <Box>
              <IconButton size='large' onClick={handleOnPreviousPage}>
                <NavigateBeforeIcon fontSize='inherit' />
              </IconButton>
              {pageNumber}/{numPages}
              <IconButton size='large' onClick={handleOnNextPage}>
                <NavigateNextIcon fontSize='inherit' />
              </IconButton>
            </Box>
            <Document
              file={'https://arxiv.org/pdf/1708.08021.pdf'}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page
                width={700}
                pageNumber={pageNumber}
                customTextRenderer={(layer) => {
                  return highlightPattern(layer.str, extractKeywords(hardcodedWords));
                }}
              />
            </Document>
          </Box>
          <Box sx={{ width: '200px' }}>
            <PdfViewerKeywords data={hardcodedWords.results} onSkip={handleSkip} />
          </Box>
        </Box>
      </div>
    </Drawer>
  );
}
