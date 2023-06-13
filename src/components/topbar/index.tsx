import React, { useContext } from 'react';
import { Box, AppBar, Toolbar, IconButton, Badge, Tooltip } from '@mui/material';
import { LeftSide, RightSide, StyledContainer } from './styled';
import {
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  MenuOpen as MenuOpenIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { ProfileModal } from 'components/modal/profile';
import { InteractiveComponentsContext } from 'contexts/interactiveComponentsContext';
import { ModalNames } from 'constants/modals';
import NotificationsMenu from './components/notificationsMenu';
import { NotificationDto } from '../../services/api/dtos';
import { useTranslation } from 'react-i18next';

export interface TopBarProps {
  notifications: NotificationDto[];
  onDeleteNotification: (id: string) => Promise<boolean>;
}

export default function TopBar({ notifications, onDeleteNotification }: TopBarProps) {
  const { openModal, toggleSidebar, isCollapsed, toggleNotificationMenu, isNotificationMenuOpen } =
    useContext(InteractiveComponentsContext);
  const anchorRef = React.useRef(null);
  const { t } = useTranslation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='relative' color='transparent'>
        <Toolbar>
          <StyledContainer>
            <LeftSide>
              <IconButton
                size='large'
                aria-label='dashboard'
                color='inherit'
                onClick={toggleSidebar}
              >
                {!isCollapsed ? <MenuOpenIcon /> : <MenuIcon />}
              </IconButton>
            </LeftSide>
            <RightSide>
              <Box sx={{ display: { md: 'flex' } }}>
                <Tooltip title={t('topbar.notifications')}>
                  <IconButton
                    ref={anchorRef}
                    size='large'
                    aria-label='show 3 new notifications'
                    color='inherit'
                    onClick={() => {
                      toggleNotificationMenu();
                    }}
                  >
                    {notifications.length > 0 && (
                      <Badge badgeContent={notifications.length} color='error'>
                        <NotificationsIcon />
                      </Badge>
                    )}
                    {notifications.length === 0 && <NotificationsIcon />}
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('topbar.myProfile')}>
                  <IconButton
                    size='large'
                    edge='end'
                    aria-label='account of current user'
                    aria-haspopup='true'
                    color='inherit'
                    onClick={() => {
                      openModal(ModalNames.PROFILE);
                    }}
                  >
                    <PersonIcon />
                  </IconButton>
                </Tooltip>
                <ProfileModal />
              </Box>
            </RightSide>
          </StyledContainer>
        </Toolbar>

        <NotificationsMenu
          notifications={notifications}
          anchor={anchorRef.current}
          isOpen={isNotificationMenuOpen}
          onClose={() => toggleNotificationMenu(false)}
          onDeleteNotification={onDeleteNotification}
        />
      </AppBar>
    </Box>
  );
}
