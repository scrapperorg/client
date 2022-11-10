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

  return (
    <StyledLayout>
      <TopBar />
      <Content>
        <Grid container spacing={2}>
          <Grid item xs={open ? 3 : 1}>
            <SideBar sidebarState={sidebarState} />
          </Grid>
          <Grid item xs={open ? 9 : 11}>
            <Outlet />
          </Grid>
        </Grid>
      </Content>
    </StyledLayout>
  );
}
