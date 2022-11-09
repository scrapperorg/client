import React, { useState } from 'react';
import { Content, StyledLayout } from './styled';
import TopBar from 'components/topbar';
import SideBar from 'components/sidebar';
import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  const [open, setOpen] = useState(true);
  const sidebarState = (state: boolean) => {
    setOpen(state);
  };

  console.log(open);
  return (
    <StyledLayout>
      <TopBar />
      <Content>
        <Grid container spacing={2}>
          <Grid item xs={open ? 2 : 0}>
            <SideBar sidebarState={sidebarState} />
          </Grid>
          <Grid
            item
            xs={open ? 9 : 11}
            sx={{
              m: 'auto',
              height: '700px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#add8e6',
            }}
          >
            <Outlet />
          </Grid>
        </Grid>
      </Content>
    </StyledLayout>
  );
}
