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

interface Keyword {
  keyword: string;
  occs: Occurrence[];
  total_occs: number;
}

interface OccurrenceWithKeyword {
  keyword: string;
  location: Occurrence['location'];
  page: number;
}

function orderOccurrencesByPage(keywords: Keyword[]): OccurrenceWithKeyword[] {
  const occurrences: OccurrenceWithKeyword[] = [];

  keywords.forEach(({ keyword, occs }) => {
    occs.forEach(({ location, page }) => {
      occurrences.push({ keyword, location, page });
    });
  });

  return occurrences.sort((a, b) => a.page - b.page);
}

interface PdfViewerKeywords {
  data: Keyword[];
  onSkip: (page: number) => void;
}
export function PdfViewerKeywords({ data, onSkip }: PdfViewerKeywords) {
  const orderedKeywords = orderOccurrencesByPage(data);
  console.log(orderedKeywords);
  return (
    <Fragment>
      <Box sx={{ padding: 3 }}>Cuvinte cheie</Box>
      {orderedKeywords.map((item) => (
        <Box
          key={item.location.x1}
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
          <Box sx={{ fontSize: '12px' }}>pagina {item.page}</Box>
        </Box>
      ))}
    </Fragment>
  );
}
