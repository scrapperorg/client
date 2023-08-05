import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormattedDate, GenericTableRow } from 'components';
import { USER_STATUS, UserDto } from 'services/api/dtos';
import { ActionButtons } from './actionsButttons';
import { Translations } from 'constants/translations';
import { ScrollableTable } from 'components/scrollableTable/table';
import { User } from 'contexts/authContext';

interface UsersTableProps {
  users: UserDto[];
  currentUser: User | undefined;
  isLoading: boolean;
  deleteUser: (id: string) => void;
  activateUser: (id: string) => void;
  openChangePasswordModal: () => void;
  setCurrentUserId: (id: string) => void;
}

export const UsersTable = (props: UsersTableProps) => {
  const {
    users,
    currentUser,
    isLoading,
    deleteUser,
    activateUser,
    openChangePasswordModal,
    setCurrentUserId,
  } = props;

  const { t } = useTranslation();

  const columns = [
    'Nume',
    'Email',
    'Rol',
    'Data crearii',
    'Status',
    'Actiuni',
    t('usersManagement.activePasswordChangeRequests'),
  ];

  const userRows = users.map((user) => {
    const isCurrentUser = currentUser?.id === user.id;

    const disabledClassName = isLoading ? 'disabled' : '';

    const onOpenChangePasswordModal = () => {
      openChangePasswordModal();
      setCurrentUserId(user.id);
    };

    const userRequestedPasswordChange = user.status === USER_STATUS.REQUESTED_PASSWORD_CHANGE;

    return (
      <GenericTableRow
        id={user.id}
        key={user.id}
        values={[
          <span key={`${user.id}-name`}>{`${user.name} ${user.surname}`} </span>,
          <span key={`${user.id}-email`}>{user.email}</span>,
          <span key={`${user.id}-role`}>{user.role}</span>,
          <FormattedDate key={`${user.id}-created`} date={user.createdAt} />,
          <span key={`${user.id}-status`}>{Translations[user.status]}</span>,
          <ActionButtons
            key={`${user.id}-actions`}
            id={user.id}
            status={user.status}
            isCurrentUser={isCurrentUser}
            deleteUser={deleteUser}
            activateUser={activateUser}
            openChangePasswordModal={onOpenChangePasswordModal}
          />,
          userRequestedPasswordChange ? (
            <span key={`${user.id}-last-column`}>{t('usersManagement.requestedPasswordChange')}</span>
          ) : (
            ''
          ),
        ]}
        className={`${disabledClassName} ${userRequestedPasswordChange ? 'new' : ''}`}
      />
    );
  });

  return <ScrollableTable columns={columns} tableRows={userRows} maxHeight='60vh' />;
};
