import React from 'react';
import { Box, Button, Menu, Typography } from '@mui/material';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import { NotificationDto } from '../../../../services/api/dtos';
import { NotificationMenuItem } from '../notificationMenuItem';
import PATHS from '../../../../constants/paths';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  if (!anchor) {
    return null;
  }

  return (
    <Menu anchorEl={anchor} open={isOpen} onClose={onClose}>
      {notifications.length === 0 && (
        <Box
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '500px',
          }}
        >
          <NotificationsOffIcon sx={{ fontSize: '48px', mt: 2 }} />
          <Typography variant='h4'>{t('notifications.noNotifications.title')}</Typography>
          <Typography variant='body1' sx={{ mt: 5, color: 'grey' }}>
            {t('notifications.noNotifications.body')}
          </Typography>
        </Box>
      )}
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
              {t('notifications.cta.seeAll')}
            </Button>
          </Box>
        </Box>
      )}
    </Menu>
  );
}
