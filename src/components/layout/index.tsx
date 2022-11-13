import React, { useContext } from 'react';
import { Content, StyledLayout } from './styled';
import TopBar from 'components/topbar';
import SideBar from 'components/sidebar';
import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';
import { SidebarContext } from 'contexts/interactiveComponentsContext';

export default function Layout() {
  const { isSidebarOpened } = useContext(SidebarContext);

  return (
    <StyledLayout>
      <TopBar />
      <Content>
        <Grid container spacing={2}>
          <Grid item xs={isSidebarOpened ? 3 : 1}>
            <SideBar />
          </Grid>
          <Grid item xs={isSidebarOpened ? 9 : 11}>
            <Outlet />
          </Grid>
        </Grid>
      </Content>
    </StyledLayout>
  );
}
