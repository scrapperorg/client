import React, { useContext } from 'react';
import { MonitorContext } from 'screens/monitor/context';
import { Grid, Typography } from '@mui/material';
import MonitorCard from '../monitorCard';
import MonitorDoubleCard from '../monitorDoubleCard';
import { User } from '../../../../contexts/authContext';
import { Box } from '@mui/system';

function generateGreet() {
  const nowUtc = new Date();
  const nowRomanian = parseInt(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Bucharest',
      hour: '2-digit',
      hour12: false,
    }).format(nowUtc),
  );

  if (nowRomanian >= 0 && nowRomanian < 12) {
    return 'Buna dimineata';
  } else if (nowRomanian >= 12 && nowRomanian < 24) {
    return 'Bine ai venit';
  }
}

export interface CardsListProps {
  user: User | undefined;
}

export default function CardsList({ user }: CardsListProps) {
  const { monitorCardsList } = useContext(MonitorContext);
  const greet = generateGreet();

  return (
    <Box>
      <Typography variant={'h2'}>
        {greet} {user?.name}!
      </Typography>
      <Grid container spacing={8}>
        <Grid item xs={3}>
          <MonitorCard title={monitorCardsList.documentsCount} subtitle='Documente ne-analizate' />
        </Grid>
        <Grid item xs={3}>
          <MonitorCard title={monitorCardsList.projectsCount} subtitle='Proiecte ne-analizate' />
        </Grid>
        <Grid item xs={6}>
          <MonitorDoubleCard
            titleLeft={monitorCardsList.robotsCount}
            titleRight={monitorCardsList.failedRobotsCount}
            subtitleLeft='Total Roboti'
            subtitleRight='Roboti functionali'
          />
        </Grid>
      </Grid>
    </Box>
  );
}
