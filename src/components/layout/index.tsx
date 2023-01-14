import React, { ReactNode, useContext } from 'react';
import { ContentWrapper, MainWrapper, StyledLayout } from './styled';
import { Outlet, useLocation } from 'react-router-dom';
import { InteractiveComponentsContext } from 'contexts/interactiveComponentsContext';
import { SideMenu } from '../sidebar';
import TopBar from '../topbar';
import { menuItems } from '../sidebar/sideMenuItems';

const Content = ({ children }: { children: ReactNode }) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

const Main = ({ children }: { children: ReactNode }) => {
  return <MainWrapper>{children}</MainWrapper>;
};

export default function Layout() {
  const { isCollapsed } = useContext(InteractiveComponentsContext);
  const { pathname } = useLocation();

  return (
    <StyledLayout>
      <SideMenu items={menuItems} currentPath={pathname} isCollapsed={isCollapsed} />
      <Content>
        <TopBar />
        <Main>
          <Outlet />
        </Main>
      </Content>
    </StyledLayout>
  );
}
