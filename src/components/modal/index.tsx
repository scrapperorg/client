import React from 'react';
import { Backdrop, Box, Modal as MUIModal, Fade } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
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

interface Props {
  isModalOpened: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

export const Modal = (props: Props) => {
  return (
    <MUIModal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={props.isModalOpened}
      onClose={props.closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.isModalOpened}>
        <Box sx={{ ...style }}>{props.children}</Box>
      </Fade>
    </MUIModal>
  );
};
