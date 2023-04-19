import React from 'react';
import { Box, IconButton } from '@mui/material';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import PasswordIcon from '@mui/icons-material/Password';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { USER_STATUS } from 'services/api/dtos';

interface ActionButtonsProps {
  id: string;
  status: string;
  deleteUser: (id: string) => void;
  activateUser: (id: string) => void;
}

const StyledBox = styled(Box)`
  display: flex;
`;

const ChangePassword = () => (
  <IconButton>
    <PasswordIcon fontSize='small' />
  </IconButton>
)

export const ActionButtons = (props: ActionButtonsProps) => {
  const { status, id, deleteUser, activateUser } = props;

  const activeActions = (
    <StyledBox>
      <IconButton onClick={() => deleteUser(id)}>
        <DeleteIcon fontSize='small' />
      </IconButton>

      <ChangePassword />
    </StyledBox>
  )

  const deletedActions = (
    <StyledBox>
      <IconButton onClick={() => activateUser(id)}>
        <RestoreFromTrashIcon fontSize='small' />
      </IconButton>
    </StyledBox>
  )

  const actions = status === USER_STATUS.DELETED ? deletedActions : activeActions;

  return actions;
};
