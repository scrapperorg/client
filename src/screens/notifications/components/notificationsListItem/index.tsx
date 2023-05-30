import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import { NotificationIcon } from '../../../../components/topbar/components/notificationMenuItem';
import React from 'react';
import { NotificationDto } from 'services/api/dtos';
import DeleteIcon from '@mui/icons-material/Delete';
import PATHS from '../../../../constants/paths';
import { useNavigate } from 'react-router-dom';

export interface NotificationListItemProps {
  notification: NotificationDto;
  onDeleteNotification: (id: string) => void;
}

export function NotificationsListItem({
  notification,
  onDeleteNotification,
}: NotificationListItemProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isHover, setIsHover] = React.useState(false);
  const navigate = useNavigate();
  return (
    <Box
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      key={notification.id}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: '24px',
        p: '8px',
        cursor: 'pointer',
        backgroundColor: isHover ? '#e5e5e5' : '#fff',
      }}
    >
      <Box
        sx={{ display: 'flex', alignItems: 'center' }}
        onClick={() => {
          navigate(PATHS.DOCUMENT_DETAILS.split(':id')[0] + notification.document.id);
        }}
      >
        <NotificationIcon type={notification.type} />
        <Typography sx={{ marginLeft: '8px' }} key={notification.id}>
          {notification.message}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
