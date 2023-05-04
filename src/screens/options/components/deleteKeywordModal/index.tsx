import React, { useContext } from 'react';
import { InteractiveComponentsContext } from 'contexts/interactiveComponentsContext';
import { Modal } from 'components/modal';
import { Box, Button, IconButton, styled, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ModalNames } from 'constants/modals';
import { KeywordDto } from '../../../../services/api/dtos/keyword';

interface DeleteKeywordModalProps {
  onDelete: () => void;
  onSetKeywordToDelete: (keyword: KeywordDto | null) => void;
}

export const DeleteKeywordModal = ({ onDelete, onSetKeywordToDelete }: DeleteKeywordModalProps) => {
  const { modalName, closeModal } = useContext(InteractiveComponentsContext);

  return (
    <Modal
      isModalOpened={modalName === ModalNames.DELETE_KEYWORD}
      closeModal={() => {
        onSetKeywordToDelete(null);
        closeModal();
      }}
    >
      <StyledModalCloseButton
        aria-label='close'
        onClick={() => {
          onSetKeywordToDelete(null);
          closeModal();
        }}
      >
        <CloseIcon />
      </StyledModalCloseButton>
      <StyledModalContainer>
        <Typography variant='h3'>ATENTIE!</Typography>
        <br />
        <Typography variant='h3' sx={{ mb: 3 }}>
          Stergerea acestui termen va afecta intregul sistem. Continuati doar daca sunteti sigur de
          ceea ce faceti!
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <Button
            onClick={() => {
              onSetKeywordToDelete(null);
              closeModal();
            }}
          >
            Anuleaza
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={async () => {
              await onDelete();
              onSetKeywordToDelete(null);
              closeModal();
            }}
          >
            Sterge
          </Button>
        </Box>
      </StyledModalContainer>
    </Modal>
  );
};

const StyledModalContainer = styled(Box)`
  width: 400px;
  padding: 24px 8px 8px;
`;

const StyledModalCloseButton = styled(IconButton)`
  position: absolute;
  right: 8px;
  top: 8px;
`;
