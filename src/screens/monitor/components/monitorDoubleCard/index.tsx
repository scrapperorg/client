import { Box } from '@mui/system';
import React from 'react';
import { Card as MuiCard, CardContent, Grid, Typography } from '@mui/material';

export interface MonitorCardProps {
  titleLeft: string | number | null;
  titleRight: string | number | null;
  subtitleLeft: string | number | null;
  subtitleRight: string | number | null;
}

export default function MonitorDoubleCard(props: MonitorCardProps) {
  const { titleLeft, titleRight, subtitleLeft, subtitleRight } = props;

  return (
    <MuiCard sx={{ minWidth: 275, minHeight: 120 }}>
      <CardContent>
        <Grid container spacing={8}>
          <Grid item xs={5}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography sx={{ fontSize: 32, fontWeight: 'bold' }}>{titleLeft}</Typography>

              <Typography sx={{ mb: 1.5 }}>{subtitleLeft}</Typography>
            </Box>
          </Grid>
          <Grid item xs={2} alignItems='center'>
            <Box
              sx={{ width: '3px', height: '100%', backgroundColor: '#d6d6d6', margin: '0 auto' }}
            />
          </Grid>
          <Grid item xs={5}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography sx={{ fontSize: 32, fontWeight: 'bold' }}>{titleRight}</Typography>
              <Typography sx={{ mb: 1.5 }}>{subtitleRight}</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </MuiCard>
  );
}
