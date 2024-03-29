import React from 'react';
import { Box, Button, Menu, Typography } from '@mui/material';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import { NotificationDto } from '../../../../services/api/dtos';
import { NotificationMenuItem } from '../notificationMenuItem';
import PATHS from '../../../../constants/paths';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';

export interface NotificationsMenuProps {
  notifications: NotificationDto[];
  anchor: HTMLAnchorElement | null;
  isOpen: boolean;
  onClose: () => void;
  onDeleteNotification: (id: string) => Promise<void>;
  onDeleteAllNotifications: () => Promise<void>;
}
export default function NotificationsMenu({
  anchor,
  isOpen,
  onClose,
  notifications,
  onDeleteNotification,
  onDeleteAllNotifications,
}: NotificationsMenuProps) {
  const [isDeletingAll, setIsDeletingAll] = React.useState(false);
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
              display: 'flex',
              justifyContent: 'space-between',
              mx: '16px',
              marginTop: '8px',
            }}
          >
            <LoadingButton
              loading={isDeletingAll}
              onClick={async () => {
                setIsDeletingAll(true);
                await onDeleteAllNotifications();
              }}
            >
              {t('notifications.cta.deleteAll')}
            </LoadingButton>

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
