import { notificationApiService } from '../../../services/api/NotificationApiService';

export function useNotifications() {
  const deleteNotification = async (id: string) => {
    await notificationApiService.delete(id);
  };

  return {
    deleteNotification,
  };
}
