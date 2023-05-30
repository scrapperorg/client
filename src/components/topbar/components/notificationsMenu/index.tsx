import React from 'react';
import { Box, Button, Menu } from '@mui/material';
import { NotificationDto } from '../../../../services/api/dtos';
import { NotificationMenuItem } from '../notificationMenuItem';
import PATHS from '../../../../constants/paths';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  if (!anchor) {
    return null;
  }

  return (
    <Menu anchorEl={anchor} open={isOpen} onClose={onClose}>
      {notifications.length === 0 && <Box sx={{ padding: '8px' }}>Nu sunt notificari</Box>}
      {notifications.length > 0 && (
        <Box sx={{ padding: '8px' }}>
          {notifications
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 3)
            .map((notification) => {
              return (
                <NotificationMenuItem
                  key={notification.id}
                  notification={notification}
                  onDeleteNotification={onDeleteNotification}
                  onClose={onClose}
                />
              );
            })}
          <Box
            sx={{
              mx: '16px',
              marginTop: '8px',
            }}
          >
            <Button
              onClick={() => {
                onClose();
                navigate(PATHS.NOTIFICATIONS);
              }}
            >
              VEZI TOATE NOTIFICARILE
            </Button>
          </Box>
        </Box>
      )}
    </Menu>
  );
}
