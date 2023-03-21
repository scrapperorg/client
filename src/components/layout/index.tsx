import React, { ReactNode, useContext } from 'react';
import { ContentWrapper, MainWrapper, StyledLayout } from './styled';
import { Outlet, useLocation } from 'react-router-dom';
import { InteractiveComponentsContext } from 'contexts/interactiveComponentsContext';
import { SideMenu } from '../sidebar';
import TopBar from '../topbar';
import { menuItems } from '../sidebar/sideMenuItems';
import { SidebarTitleProps } from 'components/sidebar/components/SidebarTitle';
import MotionPhotosAutoIcon from '@mui/icons-material/MotionPhotosAuto';

const Content = ({ children }: { children: ReactNode }) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

const Main = ({ children }: { children: ReactNode }) => {
  return <MainWrapper>{children}</MainWrapper>;
};

const title: SidebarTitleProps = {
  title: "Monitor Legislativ",
  icon: <MotionPhotosAutoIcon />,
};

export default function Layout() {
  const { isCollapsed } = useContext(InteractiveComponentsContext);
  const { pathname } = useLocation();

  return (
    <StyledLayout>
      <SideMenu items={menuItems} currentPath={pathname} isCollapsed={isCollapsed} title={title} />
      <Content>
        <TopBar />
        <Main>
          <Outlet />
        </Main>
      </Content>
    </StyledLayout>
  );
}
