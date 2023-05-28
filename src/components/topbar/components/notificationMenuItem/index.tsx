import { Box, MenuItem } from '@mui/material';
import React from 'react';
import { NotificationDto, NotificationType } from '../../../../services/api/dtos';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SnoozeIcon from '@mui/icons-material/Snooze';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import AlarmOffIcon from '@mui/icons-material/AlarmOff';

export interface NotificationIconProps {
  type: NotificationType;
}
export function NotificationIcon({ type }: NotificationIconProps) {
  switch (type) {
    case NotificationType.NEW_DOCUMENT: {
      return <NoteAddIcon />;
    }
    case NotificationType.NEW_ASSIGNMENT: {
      return <AssignmentIcon />;
    }
    case NotificationType.DEADLINE_APPROACHING: {
      return <SnoozeIcon />;
    }
    case NotificationType.DEADLINE_REACHED: {
      return <AccessAlarmsIcon />;
    }
    case NotificationType.DEADLINE_PASSED: {
      return <AlarmOffIcon />;
    }
    default: {
      return <CircleNotificationsIcon />;
    }
  }
}

export interface NotificationMenuItemProps {
  notification: NotificationDto;
  onDeleteNotification?: (id: string) => Promise<boolean>;
}

export function NotificationMenuItem({ notification }: NotificationMenuItemProps) {
  // const [isHover, setIsHover] = React.useState(false);
  // const [isDeleting, setIsDeleting] = React.useState(false);

  return (
    <MenuItem
      key={notification.id}
      // onMouseEnter={() => setIsHover(true)}
      // onMouseLeave={() => setIsHover(false)}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Box sx={{ my: '8px', display: 'flex', alignItems: 'center' }}>
          <NotificationIcon type={notification.type} />
          <Box sx={{ marginLeft: '8px' }}>{notification.message}</Box>
        </Box>
        {/*{isHover && (*/}
        {/*  <Box>*/}
        {/*    <IconButton*/}
        {/*      onClick={async () => {*/}
        {/*        setIsDeleting(true);*/}
        {/*        await onDeleteNotification(notification.id);*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      {isDeleting ? <CircularProgress size='20px' /> : <CloseIcon />}*/}
        {/*    </IconButton>*/}
        {/*  </Box>*/}
        {/*)}*/}
      </Box>
    </MenuItem>
  );
}
