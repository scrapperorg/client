import React, { Fragment, useContext } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { LayoutContext } from '../../../../components/layout/context';
import { NotificationList } from '../notificationsList';
import { useNotifications } from '../../hooks/useOptions';

export default function NotificationsContent() {
  const { notifications, fetchNotifications } = useContext(LayoutContext);
  const { deleteNotification } = useNotifications();
  const todayNotifications = notifications.filter((notification) => {
    const notificationDate = new Date(notification.createdAt);
    const today = new Date();
    return (
      notificationDate.getDate() === today.getDate() &&
      notificationDate.getMonth() === today.getMonth() &&
      notificationDate.getFullYear() === today.getFullYear()
    );
  });

  const olderThanTodayNotifications = notifications.filter((notification) => {
    const notificationDate = new Date(notification.createdAt);
    const today = new Date();
    return (
      notificationDate.getDate() !== today.getDate() ||
      notificationDate.getMonth() !== today.getMonth() ||
      notificationDate.getFullYear() !== today.getFullYear()
    );
  });

  const handleDeleteNotification = async (id: string) => {
    await deleteNotification(id);
    fetchNotifications();
  };

  return (
    <Fragment>
      <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
        <Card sx={{ mb: '48px' }}>
          <CardContent>
            <Typography variant='h4' sx={{ mb: '24px' }}>
              Notificari primite astazi
            </Typography>
            <NotificationList
              notifications={todayNotifications}
              onDeleteNotification={handleDeleteNotification}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant='h4' sx={{ mb: '24px' }}>
              Notificari mai vechi
            </Typography>
            <NotificationList
              notifications={olderThanTodayNotifications}
              onDeleteNotification={handleDeleteNotification}
            />
          </CardContent>
        </Card>
      </Box>
    </Fragment>
  );
}
