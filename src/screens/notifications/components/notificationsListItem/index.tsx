import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import { NotificationIcon } from '../../../../components/topbar/components/notificationMenuItem';
import React from 'react';
import { NotificationDto } from 'services/api/dtos';
import DeleteIcon from '@mui/icons-material/Delete';

export interface NotificationListItemProps {
  notification: NotificationDto;
  onDeleteNotification: (id: string) => void;
}

export function NotificationsListItem({
  notification,
  onDeleteNotification,
}: NotificationListItemProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  return (
    <Box
      key={notification.id}
      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: '16px' }}>
        <NotificationIcon type={notification.type} />
        <Typography sx={{ marginLeft: '8px' }} key={notification.id}>
          {notification.message}
        </Typography>
      </Box>
      <Box>
        {!isDeleting ? (
          <IconButton
            onClick={() => {
              setIsDeleting(true);
              onDeleteNotification(notification.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        ) : (
          <IconButton>
            <CircularProgress size='16px' />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
