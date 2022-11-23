import React, { useContext } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { LoadingButton } from '@mui/lab';
import avatar from '../../../static/images/john-doe.png';
import { Box } from '@mui/material';
import { InteractiveComponentsContext } from 'contexts/interactiveComponentsContext';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
};

export const ProfileModal = () => {
  const { isProfileModalOpened, closeProfileModal } = useContext(InteractiveComponentsContext);
  const theme = useTheme();

  const logout = () => {
    closeProfileModal();
    //TODO: add logout functionality
  };

  const goToProfilePage = () => {
    closeProfileModal();
    //TODO: route to profile page
  };

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={isProfileModalOpened}
      onClose={closeProfileModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isProfileModalOpened}>
        <Box sx={style}>
          <Box
            sx={{
              position: 'absolute',
              width: '110%',
              minHeight: '100px',
              backgroundColor: theme.palette.primary.main,
              top: -17,
              transform: 'rotate(5deg)',
            }}
          ></Box>
          <IconButton
            aria-label='close'
            onClick={closeProfileModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Avatar
            alt='John Doe'
            src={avatar}
            sx={{ width: 100, height: 100, border: `3px solid ${theme.palette.primary.main}` }}
          />
          <Typography
            id='transition-modal-title'
            variant='h1'
            component='h6'
            sx={{ mt: 5, mb: 0 }}
            align='center'
          >
            John Doe
          </Typography>
          <Typography id='transition-modal-description' variant='h5' sx={{ mb: 5 }}>
            Analist
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
        </Box>
      </Fade>
    </Modal>
  );
};
