import React from 'react';
import { Box, Button, Menu } from '@mui/material';
import { NotificationDto } from '../../../../services/api/dtos';
import { NotificationMenuItem } from '../notificationMenuItem';
import PATHS from '../../../../constants/paths';
import { Link } from 'react-router-dom';

export interface NotificationsMenuProps {
  notifications: NotificationDto[];
  anchor: HTMLAnchorElement | null;
  isOpen: boolean;
  onClose: () => void;
  onDeleteNotification: (id: string) => Promise<boolean>;
}
export default function NotificationsMenu({
  anchor,
  isOpen,
  onClose,
  notifications,
  onDeleteNotification,
}: NotificationsMenuProps) {
  if (!anchor) {
    return null;
  }

  return (
    <Menu anchorEl={anchor} open={isOpen} onClose={onClose}>
      {notifications.length === 0 && (
        <Box sx={{ padding: '8px', width: '400px' }}>Nu sunt notificari</Box>
      )}
      {notifications.length > 0 && (
        <Box sx={{ padding: '8px', width: '400px' }}>
          {notifications.slice(0, 3).map((notification) => {
            return (
              <NotificationMenuItem
                key={notification.id}
                notification={notification}
                onDeleteNotification={onDeleteNotification}
              />
            );
          })}
          <Box
            sx={{
              mx: '16px',
              marginTop: '8px',
            }}
          >
            <Button>
              <Link to={PATHS.NOTIFICATIONS}>VEZI TOATE NOTIFICARILE</Link>
            </Button>
          </Box>
        </Box>
      )}
    </Menu>
  );
}
