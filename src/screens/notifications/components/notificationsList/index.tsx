import React, { Fragment } from 'react';
import { NotificationDto } from 'services/api/dtos';
import { NotificationsListItem } from '../notificationsListItem';

export interface NotificationListProps {
  notifications: NotificationDto[];
  onDeleteNotification: (id: string) => void;
}

export function NotificationList({ notifications, onDeleteNotification }: NotificationListProps) {
  return (
    <Fragment>
      {notifications
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((notification) => (
          <NotificationsListItem
            key={notification.id}
            notification={notification}
            onDeleteNotification={onDeleteNotification}
          />
        ))}
    </Fragment>
  );
}
