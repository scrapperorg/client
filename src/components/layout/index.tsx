import React from 'react';
import { Content, StyledLayout } from './styled';
import TopBar from 'components/topbar';
import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <StyledLayout>
      <TopBar />
      <Content>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            sidebar
          </Grid>
          <Grid item xs={9} sx={{ m: 'auto' }}>
            <Outlet />
          </Grid>
        </Grid>
      </Content>
    </StyledLayout>
  );
}
