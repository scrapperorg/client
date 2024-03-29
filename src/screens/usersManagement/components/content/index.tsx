import React, { useContext } from 'react';
import { UsersManagementContext } from 'screens/usersManagement/context';
import { UsersTable } from '../usersTable';
import { Alert, Box, Button, Snackbar } from '@mui/material';
import styled from 'styled-components';
import { useUsersManagement } from 'screens/usersManagement/hooks/useUsersManagement';
import { AuthContext } from 'contexts/authContext';
import { ModalNames } from 'constants/modals';
import { useModal } from 'screens/usersManagement/hooks/useModal';
import { AddUserModal } from '../modals/addUserModal';
import { ChangePasswordModal } from '../modals/changePasswordModal';
import { useTranslation } from 'react-i18next';

export default function UsersManagementContent() {
  const { users } = useContext(UsersManagementContext);

  const { user: currentUser } = useContext(AuthContext);

  const {
    openModal: openAddUserModal,
    isModalOpen: isAddUserModalOpen,
    closeModal,
  } = useModal(ModalNames.ADD_USER);

  const { openModal: openChangePasswordModal, isModalOpen: isChangePasswordModalOpen } = useModal(
    ModalNames.CHANGE_PASSWORD,
  );

  const { t } = useTranslation();

  const {
    isLoading,
    showError,
    isFetchingUsers,
    currentUserId,
    setShowError,
    deleteUser,
    activateUser,
    setCurrentUserId,
    getUsers,
  } = useUsersManagement();

  return (
    <>
      <ButtonBox>
        <Button variant='contained' onClick={openAddUserModal}>
          {t('usersManagement.addUser')}
        </Button>
      </ButtonBox>
      <Box>
        <UsersTable
          users={users}
          deleteUser={deleteUser}
          activateUser={activateUser}
          setCurrentUserId={setCurrentUserId}
          isLoading={isLoading || isFetchingUsers}
          currentUser={currentUser}
          openChangePasswordModal={openChangePasswordModal}
        />
      </Box>

      <AddUserModal isOpened={isAddUserModalOpen} closeModal={closeModal} />

      <ChangePasswordModal
        isOpened={isChangePasswordModalOpen}
        closeModal={async () => {
          await getUsers();
          closeModal();
        }}
        currentUserId={currentUserId}
        setCurrentUserId={setCurrentUserId}
      />

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setShowError(false)} severity='error' sx={{ width: '100%' }}>
          {t('generic.error')}
        </Alert>
      </Snackbar>
    </>
  );
}

const ButtonBox = styled(Box)`
  display: flex;
  justify-content: end;
  padding: 15px 0;
`;
