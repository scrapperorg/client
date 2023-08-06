import React, { ReactNode, useContext } from 'react';
import { ContentWrapper, MainWrapper, StyledLayout } from './styled';
import { Outlet, useLocation } from 'react-router-dom';
import { InteractiveComponentsContext } from 'contexts/interactiveComponentsContext';
import { SideMenu } from '../sidebar';
import TopBar from '../topbar';
import { menuItems } from '../sidebar/sideMenuItems';
import { SidebarTitleProps } from 'components/sidebar/components/SidebarTitle';
import MotionPhotosAutoIcon from '@mui/icons-material/MotionPhotosAuto';
import LayoutDataProvider, { LayoutContext } from './context';
import { notificationApiService } from '../../services/api/NotificationApiService';

const Content = ({ children }: { children: ReactNode }) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

const Main = ({ children }: { children: ReactNode }) => {
  return <MainWrapper>{children}</MainWrapper>;
};

const title: SidebarTitleProps = {
  title: 'Monitor Legislativ',
  icon: <MotionPhotosAutoIcon />,
};

export function LayoutContent() {
  const { isCollapsed } = useContext(InteractiveComponentsContext);
  const { pathname } = useLocation();
  const { notifications, fetchNotifications } = useContext(LayoutContext);

  return (
    <StyledLayout>
      <SideMenu items={menuItems} currentPath={pathname} isCollapsed={isCollapsed} title={title} />
      <Content>
        <TopBar
          notifications={notifications}
          onDeleteNotification={async (id) => {
            await notificationApiService.delete(id);
            await fetchNotifications();
          }}
          onDeleteAllNotifications={async () => {
            await notificationApiService.deleteAll();
            await fetchNotifications();
          }}
        />
        <Main>
          <Outlet />
        </Main>
      </Content>
    </StyledLayout>
  );
}

export default function Layout() {
  return (
    <LayoutDataProvider>
      <LayoutContent />
    </LayoutDataProvider>
  );
}
