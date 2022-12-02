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
        <Grid container>
          <Grid item xs={isSidebarOpened ? 2 : 1}>
            <SideBar />
          </Grid>
          <Grid item xs={isSidebarOpened ? 10 : 11}>
            <Outlet />
          </Grid>
        </Grid>
      </Content>
    </StyledLayout>
  );
}
