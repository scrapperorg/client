import React, { useContext } from 'react';
import { UsersManagementContext } from 'screens/usersManagement/context';
import { UsersTable } from '../usersTable';
import { Alert, Box, Button, Snackbar } from '@mui/material';
import styled from 'styled-components';
import { useUsersManagement } from 'screens/usersManagement/hooks/useUsersManagement';
import { AuthContext } from 'contexts/authContext';

export default function UsersManagementContent () {

  const { users } = useContext(UsersManagementContext);
  const { user: currentUser } = useContext(AuthContext);

  const {
    isLoading,
    showError,
    isFetchingUsers,
    setShowError,
    deleteUser,
    activateUser 
  } = useUsersManagement();

  return (
    <>
    <ButtonBox>
      <Button variant='contained'>
        Adauga utilizator
      </Button>
    </ButtonBox>
    <Box>
      <UsersTable
        users={users}
        deleteUser={deleteUser}
        activateUser={activateUser}
        isLoading={isLoading || isFetchingUsers}
        currentUser={currentUser}
      />
    </Box>

    <Snackbar
      open={showError}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={() => setShowError(false)} severity='error' sx={{ width: '100%' }}>
        Ceva nu a mers bine, te rugam sa incerci din nou
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