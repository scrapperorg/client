import React, { useContext } from 'react';
import { Typography, Avatar, Box, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import avatar from '../../../static/images/john-doe.png';
import { InteractiveComponentsContext } from 'contexts/interactiveComponentsContext';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { Modal } from 'components/modal';
import { AuthContext } from 'contexts/authContext';
import { capitalizeString } from 'helpers/formatters';
import { RoleDescription } from 'constants/roles';
import { ModalNames } from 'constants/modals';
import { useNavigate } from "react-router-dom";
import PATHS from 'constants/paths';

export const ProfileModal = () => {
  const { closeModal, modalName } = useContext(InteractiveComponentsContext);
  const theme = useTheme();
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    closeModal();
    logoutUser();
  };

  const goToProfilePage = () => {
    closeModal();
    navigate(PATHS.PROFILE_DETAILS);
  };

  return (
    <Modal isModalOpened={modalName === ModalNames.PROFILE} closeModal={closeModal}>
      <Box
        sx={{
          position: 'absolute',
          width: '110%',
          minHeight: '100px',
          backgroundColor: theme.palette.primary.main,
          top: -17,
          transform: 'rotate(5deg)',
        }}
      />
      <IconButton
        aria-label='close'
        onClick={closeModal}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <Avatar
        alt={`${capitalizeString(user?.name)} ${capitalizeString(user?.surname)}`}
        src={avatar}
        sx={{ width: 100, height: 100, border: `3px solid ${theme.palette.primary.main}` }}
      />
      <Typography
        id='transition-modal-title'
        variant='h1'
        component='h6'
        sx={{ mt: 5, mb: 0, width: '350px' }}
        align='center'
      >
        {`${capitalizeString(user?.name)} ${capitalizeString(user?.surname)}`}
      </Typography>
      <Typography id='transition-modal-description' variant='h5' sx={{ mb: 5 }}>
        {user?.role ? RoleDescription[user?.role] : 'Lipsa rol'}
      </Typography>
      <LoadingButton
        fullWidth
        type='submit'
        variant='contained'
        color='secondary'
        size='large'
        sx={{ mt: 5 }}
        onClick={goToProfilePage}
      >
        Vezi profil
      </LoadingButton>
      <LoadingButton
        fullWidth
        type='submit'
        variant='contained'
        color='primary'
        size='large'
        sx={{ mt: 5 }}
        onClick={logout}
      >
        Iesi din cont
      </LoadingButton>
    </Modal>
  );
};
