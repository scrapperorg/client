import { useContext } from 'react';
import { notificationApiService } from '../../../services/api/NotificationApiService';
import { AuthContext } from '../../../contexts/authContext';

export function useNotifications() {
  const deleteNotification = async (id: string) => {
    await notificationApiService.delete(id);
  };

  return {
    deleteNotification,
  };
}
