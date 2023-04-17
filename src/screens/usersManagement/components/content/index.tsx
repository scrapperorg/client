import React, { useContext } from 'react';
import { UsersManagementContext } from 'screens/usersManagement/context';
import { UsersTable } from '../usersTable';
import { Box, Button } from '@mui/material';
import styled from 'styled-components';

export default function UsersManagementContent () {

  const { users } = useContext(UsersManagementContext);

  return (
    <>
    <ButtonBox>
      <Button variant='contained'>
        Adauga utilizator
      </Button>
    </ButtonBox>
    <Box>
      <UsersTable users={users}/>
    </Box>
  </>
    
  );
}

const ButtonBox = styled(Box)`
  display: flex;
  justify-content: end;
  padding: 15px 0;
`;