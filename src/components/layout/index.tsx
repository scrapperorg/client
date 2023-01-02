import React, { useContext } from 'react';
import { Content, StyledLayout } from './styled';
import TopBar from 'components/topbar';
import SideBar from 'components/sidebar';
import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';
import { InteractiveComponentsContext } from 'contexts/interactiveComponentsContext';

export default function Layout() {
  const { isSidebarOpened } = useContext(InteractiveComponentsContext);
  return (
    <StyledLayout>
      <TopBar />
      <Content>
        <Grid container spacing={isSidebarOpened ? 50 : 0}>
          <Grid item xs={isSidebarOpened ? 1.5 : 1}>
            <SideBar />
          </Grid>
          <Grid item xs={isSidebarOpened ? 10.5 : 11} sx={{ paddingRight: '30px' }}>
            <Outlet />
          </Grid>
        </Grid>
      </Content>
    </StyledLayout>
  );
}
