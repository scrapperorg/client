import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { NotificationDto, NotificationType } from '../../../../services/api/dtos';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SnoozeIcon from '@mui/icons-material/Snooze';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import AlarmOffIcon from '@mui/icons-material/AlarmOff';
import DeleteIcon from '@mui/icons-material/Delete';
import PATHS from 'constants/paths';
import { useNavigate } from 'react-router-dom';
import { SourceDescription } from '../../../../constants/sources';

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
  onDeleteNotification: (id: string) => Promise<void>;
  onClose: () => void;
}

export function NotificationMenuItem({
  notification,
  onDeleteNotification,
  onClose,
}: NotificationMenuItemProps) {
  const [isHover, setIsHover] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const navigate = useNavigate();

  const navigateToNotificationPage = useCallback(
    (notificationType: NotificationType) => {
      switch (notificationType) {
        case NotificationType.RESET_PASSWORD: {
          navigate(PATHS.USERS_MANAGEMENT);
          break;
        }
        case NotificationType.ROBOT_NOT_FUNCTIONAL: {
          navigate(PATHS.ROBOTS_STATUS);
          break;
        }
        default: {
          window.location.href = PATHS.DOCUMENT_DETAILS.split(':id')[0] + notification.document.id;
        }
      }
    },
    [navigate],
  );

  return (
    <Box
      key={notification.id}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      sx={{
        backgroundColor: isHover ? '#e5e5e5' : '#fff',
        cursor: 'pointer',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: '500px' }}>
        <Box
          sx={{ m: '16px', display: 'flex', alignItems: 'flex-start', width: 'calc(100% - 50px)' }}
          onClick={() => {
            onClose();
            navigateToNotificationPage(notification.type);
          }}
        >
          <NotificationIcon type={notification.type} />
          <Box sx={{ marginLeft: '8px' }}>
            <Typography variant='body1'>
              {notification.type === NotificationType.ROBOT_NOT_FUNCTIONAL
                ? `Robotul ${
                    SourceDescription[notification.message as keyof typeof SourceDescription]
                  } a incetat sa mai functioneze`
                : notification.message}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '50px' }}>
          {isHover && (
            <IconButton
              onClick={async () => {
                setIsDeleting(true);
                await onDeleteNotification(notification.id);
              }}
            >
              {isDeleting ? <CircularProgress size='20px' /> : <DeleteIcon />}
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
}
