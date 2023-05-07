import { Box, Collapse, IconButton, Typography } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { PageDetails } from './index';

interface Occurrence {
  location: {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  };
  page: number;
}

export interface Keyword {
  keyword: string;
  occs: Occurrence[];
  total_occs: number;
}

interface OccurrenceWithKeyword {
  keyword: string;
  location: Occurrence['location'];
  page: number;
}

function orderOccurrencesByPageAndCoordinates(keywords: Keyword[]): OccurrenceWithKeyword[] {
  const occurrences: OccurrenceWithKeyword[] = [];

  keywords.forEach(({ keyword, occs }) => {
    occs.forEach(({ location, page }) => {
      occurrences.push({ keyword, location, page });
    });
  });

  const yTolerance = 0.5; // You can adjust this value based on your requirements

  return occurrences.sort((a, b) => {
    if (a.page !== b.page) {
      return a.page - b.page;
    }
    if (Math.abs(a.location.y1 - b.location.y1) > yTolerance) {
      return a.location.y1 - b.location.y1;
    }
    if (a.location.x1 !== b.location.x1) {
      return a.location.x1 - b.location.x1;
    }
    return 0;
  });
}

function groupOccurencesPerPage(
  occurences: OccurrenceWithKeyword[],
): Record<number, OccurrenceWithKeyword[]> {
  const pages: Record<number, OccurrenceWithKeyword[]> = {};
  occurences.forEach((occ) => {
    if (Array.isArray(pages[occ.page])) {
      pages[occ.page].push(occ);
    } else {
      pages[occ.page] = [occ];
    }
  });
  return pages;
}

interface PdfViewerPageGroupProps {
  pageDetails: PageDetails;
  page: number;
  currentPage: number;
  data: OccurrenceWithKeyword[];
  open: boolean;
  onSkip: (pageDetails: PageDetails) => void;
}

export function PdfViewerPageGroup({
  pageDetails,
  page,
  data,
  open,
  onSkip,
}: PdfViewerPageGroupProps) {
  const [isOpen, setIsOpen] = useState(true);

  const words = data.map((w) => w.keyword);

  const isTermActive = (wordPage: number, wordIndex: number): boolean =>
    wordPage === pageDetails.page && wordIndex === pageDetails.wordIndex;

  const hightlightWordInPdf = (wordIndex: number | null) => {
    if (words.length === 0 || wordIndex === null) {
      return;
    }

    const popupWrappers = document.querySelectorAll('.popupWrapper');

    if (popupWrappers.length === 0) {
      return;
    }
    popupWrappers.forEach((elem) => {
      if (!elem.parentElement) {
        return;
      }

      elem.parentElement.style.border = 'none';
    });

    const outline = popupWrappers[wordIndex].parentElement;

    if (!outline) {
      return;
    }

    outline.style.border = '3px solid red';
  };

  useEffect(() => {
    // Pdf render is way too slow, we need this
    setTimeout(() => {
      hightlightWordInPdf(pageDetails.wordIndex);
    }, 0);
  }, [pageDetails]);

  useEffect(() => {
    setIsOpen(open);
  }, [setIsOpen, open]);

  return (
    <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant={'h4'} sx={{ cursor: 'pointer' }}>
          Pagina {page + 1}
        </Typography>
        <IconButton onClick={() => setIsOpen(!isOpen)}>
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>
      <Collapse in={isOpen}>
        {data.map((item, index) => (
          <Box
            key={index}
            onClick={() => {
              onSkip({ page: page + 1, wordIndex: index, word: item.keyword });
            }}
            sx={{
              padding: 3,
              paddingLeft: 5,
              backgroundColor: isTermActive(item.page + 1, index) ? '#b9b9b9' : '#F6F6F6',
              borderRadius: '12px 0 0 12px',
              marginBottom: 2,
              cursor: 'pointer',
            }}
          >
            <Box>{item.keyword}</Box>
          </Box>
        ))}
      </Collapse>
    </Fragment>
  );
}

interface PdfViewerKeywords {
  pageDetails: PageDetails;
  data: Keyword[];
  currentPage: number;
  onSkip: (pageDetails: PageDetails) => void;
}
export function PdfViewerKeywords({ data, onSkip, currentPage, pageDetails }: PdfViewerKeywords) {
  const [isAllOpen, setIsAllOpen] = useState(false);
  const orderedKeywords = orderOccurrencesByPageAndCoordinates(data);
  const groupByPage = groupOccurencesPerPage(orderedKeywords);

  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 3,
        }}
      >
        <Typography variant='h3'>Cuvinte cheie</Typography>
        <IconButton onClick={() => setIsAllOpen(!isAllOpen)}>
          <KeyboardDoubleArrowDownIcon />
        </IconButton>
      </Box>
      {Object.entries(groupByPage).map(([key, value]) => {
        return (
          <PdfViewerPageGroup
            key={key}
            pageDetails={pageDetails}
            page={parseInt(key)}
            currentPage={currentPage}
            data={value}
            open={isAllOpen}
            onSkip={onSkip}
          />
        );
      })}
    </Fragment>
  );
}
