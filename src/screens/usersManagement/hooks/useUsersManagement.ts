import { useContext, useState } from 'react';
import { userApiService } from 'services/api/UserApiService';
import { UsersManagementContext } from '../context';

export function useUsersManagement() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const { loading: isFetchingUsers, fetch } = useContext(UsersManagementContext);

  const deleteUser = async (id: string) => {
    setShowError(false);

    setIsLoading(true);

    const { error, success } = await userApiService.deleteUser(id);

    if (error || !success) {
      setShowError(true);
    } else {
      fetch();
    }

    setIsLoading(false);
  };

  const activateUser = async (id: string) => {
    setShowError(false);

    setIsLoading(true);

    const { error, success } = await userApiService.activateUser(id);

    if (error || !success) {
      setShowError(true);
    } else {
      fetch();
    }

    setIsLoading(false);
  };

  return {
    isLoading,
    isFetchingUsers,
    showError,
    currentUserId,
    setShowError,
    deleteUser,
    activateUser,
    setCurrentUserId,
    getUsers: fetch,
  };
}
