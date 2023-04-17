import { Box, IconButton } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import PasswordIcon from '@mui/icons-material/Password';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { USER_STATUS } from 'services/api/dtos';

interface ActionButtonsProps {
  status: string;
}

const StyledBox = styled(Box)`
  display: flex;
`;

const Delete = () => (
  <IconButton>
    <DeleteIcon fontSize='small' />
  </IconButton>
);

const ChangePassword = () => (
  <IconButton>
    <PasswordIcon fontSize='small' />
  </IconButton>
)

const Restore = () => (
  <IconButton>
    <RestoreFromTrashIcon fontSize='small' />
  </IconButton>
)

export const ActionButtons = (props: ActionButtonsProps) => {
  const { status } = props;

  const activeActions = (
    <StyledBox>
      <Delete />
      <ChangePassword />
    </StyledBox>
  )

  const deletedActions = (
    <StyledBox>
      <Restore />
    </StyledBox>
  )

  const actions = status === USER_STATUS.DELETED ? deletedActions : activeActions;

  return actions;
};
