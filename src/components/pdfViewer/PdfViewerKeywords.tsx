import { Box, Collapse, IconButton, Typography } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

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

  return occurrences.sort((a, b) => {
    if (a.page !== b.page) {
      return a.page - b.page;
    }
    if (a.location.y1 !== b.location.y1) {
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

const handleRemoveVoodooHighlight = () => {
  const elements = document.querySelectorAll('.voodoo_highlight');

  if (elements.length === 0) {
    return;
  }

  elements.forEach((element) => {
    const elementParent = element.parentElement;

    if (!elementParent) {
      return;
    }

    elementParent.innerHTML = element.innerHTML;
    element.remove();
  });
};

const handleVoodooHighlight = (
  targetX: number,
  targetY: number,
  filterText: string,
): HTMLElement | null => {
  let closestElement = null;
  let closestDistance = Infinity;

  const elements = document.querySelectorAll('.textLayer > span');

  if (elements.length === 0) {
    return null;
  }

  elements.forEach((element: any) => {
    const elementX = element.offsetLeft;
    const elementY = element.offsetTop;
    const distance = Math.sqrt((targetX - elementX) ** 2 + (targetY - elementY) ** 2);
    const text = (element.textContent || element.innerText).toLowerCase();

    if (distance < closestDistance) {
      if (text.includes(filterText.toLowerCase())) {
        closestElement = element;
        closestDistance = distance;
      }
    }
  });
  return closestElement;
};

interface PdfViewerPageGroupProps {
  page: number;
  currentPage: number;
  data: OccurrenceWithKeyword[];
  open: boolean;
  onSkip: (page: number, termActive: string) => void;
  activeTerm: string;
}

export function PdfViewerPageGroup({
  page,
  currentPage,
  data,
  open,
  onSkip,
  activeTerm,
}: PdfViewerPageGroupProps) {
  const [isOpen, setIsOpen] = useState(true);

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
        {data.map((item) => (
          <Box
            key={item.location.x1 + item.location.x2}
            onClick={() => {
              onSkip(item.page + 1, (item.location.x1 + item.location.x2).toString());
            }}
            sx={{
              padding: 3,
              paddingLeft: 5,
              backgroundColor:
                activeTerm === (item.location.x1 + item.location.x2).toString()
                  ? '#b9b9b9'
                  : '#F6F6F6',
              borderRadius: '12px 0 0 12px',
              marginBottom: 2,
              cursor: 'pointer',
            }}
          >
            <Box
              // sx={{ pointer: 'cursor-pointer' }}
              onMouseEnter={() => {
                if (currentPage !== item.page + 1) {
                  return;
                }

                const element = handleVoodooHighlight(
                  item.location.x1,
                  item.location.y1,
                  item.keyword,
                );

                if (!element) {
                  return;
                }

                element.innerHTML = element.textContent!.replace(
                  new RegExp(item.keyword, 'gi'),
                  '<span class="voodoo_highlight" style="border-bottom: 3px solid red;">$&</span>',
                );
              }}
              onMouseLeave={handleRemoveVoodooHighlight}
            >
              {item.keyword}
            </Box>
          </Box>
        ))}
      </Collapse>
    </Fragment>
  );
}

interface PdfViewerKeywords {
  data: Keyword[];
  currentPage: number;
  onSkip: (page: number) => void;
}
export function PdfViewerKeywords({ data, onSkip, currentPage }: PdfViewerKeywords) {
  const [isAllOpen, setIsAllOpen] = useState(false);
  const orderedKeywords = orderOccurrencesByPageAndCoordinates(data);
  const groupByPage = groupOccurencesPerPage(orderedKeywords);
  const [isTermActive, setIsTermActive] = useState('');
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
            page={parseInt(key)}
            currentPage={currentPage}
            data={value}
            open={isAllOpen}
            onSkip={(page, term) => {
              onSkip(page);
              setIsTermActive(term);
            }}
            activeTerm={isTermActive}
          />
        );
      })}
    </Fragment>
  );
}
