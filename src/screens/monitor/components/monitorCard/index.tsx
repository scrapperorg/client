import { Box } from '@mui/system';
import React from 'react';
import { Card as MuiCard, CardContent, Typography } from '@mui/material';

export interface MonitorCardProps {
  title: string | number | null;
  subtitle: string | number | null;
}

export default function MonitorCard(props: MonitorCardProps) {
  const { title, subtitle } = props;
  return (
    <MuiCard sx={{ minWidth: 275, minHeight: 120, mb: 4 }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography sx={{ fontSize: 32, fontWeight: 'bold' }}>{title}</Typography>
          <Typography sx={{ mb: 1.5 }}>{subtitle}</Typography>
        </Box>
      </CardContent>
    </MuiCard>
  );
}
