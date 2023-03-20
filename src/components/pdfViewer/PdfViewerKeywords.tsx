import { Box } from '@mui/material';
import React, { Fragment } from 'react';

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

interface PdfViewerKeywords {
  data: Keyword[];
  onSkip: (page: number) => void;
}
export function PdfViewerKeywords({ data, onSkip }: PdfViewerKeywords) {
  const orderedKeywords = orderOccurrencesByPageAndCoordinates(data);
  return (
    <Fragment>
      <Box sx={{ padding: 3 }}>Cuvinte cheie</Box>
      {orderedKeywords.map((item) => (
        <Box
          key={item.location.x1 + item.location.x2}
          sx={{
            padding: 3,
            paddingLeft: 5,
            backgroundColor: '#F6F6F6',
            borderRadius: '12px 0 0 12px',
            marginBottom: 2,
            cursor: 'pointer',
          }}
          onClick={() => onSkip(item.page)}
        >
          <Box>{item.keyword}</Box>
          <Box sx={{ fontSize: '12px' }}>pagina {++item.page}</Box>
        </Box>
      ))}
    </Fragment>
  );
}
