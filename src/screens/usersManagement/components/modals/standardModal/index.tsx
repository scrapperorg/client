import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Modal } from 'components/modal';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

interface StandardModalProps {
  isOpened: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
}

export const StandardModal = (props: StandardModalProps) => {

  const { isOpened, closeModal } = props;

  return (
    <Modal isModalOpened={isOpened} closeModal={closeModal}>
      <StyledModalCloseButton aria-label='close' onClick={closeModal}>
        <CloseIcon />
      </StyledModalCloseButton>
      <StyledModalContainer>
        {props.children}
      </StyledModalContainer>
    </Modal>
  );
};

const StyledModalContainer = styled(Box)`
  width: 600px;
  padding: 24px 8px 8px;
`;

const StyledModalCloseButton = styled(IconButton)`
  position: absolute !important;
  right: 8px;
  top: 8px;
`;
