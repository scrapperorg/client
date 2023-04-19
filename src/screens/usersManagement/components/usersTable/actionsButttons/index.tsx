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
  isCurrentUser: boolean;
  deleteUser: (id: string) => void;
  activateUser: (id: string) => void;
  openChangePasswordModal: () => void;
}

const StyledBox = styled(Box)`
  display: flex;
`;

const ChangePassword = ({ openModal }: { openModal: () => void }) => (
  <IconButton onClick={openModal}>
    <PasswordIcon fontSize='small' />
  </IconButton>
)

export const ActionButtons = (props: ActionButtonsProps) => {
  const {
    status,
    id,
    isCurrentUser,
    deleteUser,
    activateUser,
    openChangePasswordModal
  } = props;

  const activeActions = (
    <StyledBox>
      <IconButton onClick={() => deleteUser(id)}>
        <DeleteIcon fontSize='small' />
      </IconButton>

      <ChangePassword openModal={openChangePasswordModal}/>
    </StyledBox>
  )

  const currentUserActions = (
    <StyledBox>
      <ChangePassword openModal={openChangePasswordModal}/>
    </StyledBox>
  )

  const deletedActions = (
    <StyledBox>
      <IconButton onClick={() => activateUser(id)}>
        <RestoreFromTrashIcon fontSize='small' />
      </IconButton>
    </StyledBox>
  )

  if (isCurrentUser) {
    return currentUserActions;
  }

  if (status === USER_STATUS.DELETED) {
    return deletedActions;
  }

  return activeActions;
};
