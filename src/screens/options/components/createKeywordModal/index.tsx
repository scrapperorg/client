import React, { useContext } from 'react';
import { InteractiveComponentsContext } from 'contexts/interactiveComponentsContext';
import { Modal } from 'components/modal';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ModalNames } from 'constants/modals';
import { useForm } from 'react-hook-form';

interface CreateKeywordModalProps {
  onSubmit: (name: string) => void;
}

export const CreateEditKeywordModal = ({ onSubmit }: CreateKeywordModalProps) => {
  const { modalName, closeModal } = useContext(InteractiveComponentsContext);
  const form = useForm();

  return (
    <Modal isModalOpened={modalName === ModalNames.ADD_EDIT_KEYWORD} closeModal={closeModal}>
      <StyledModalCloseButton aria-label='close' onClick={closeModal}>
        <CloseIcon />
      </StyledModalCloseButton>
      <StyledModalContainer>
        <form
          onSubmit={form.handleSubmit(async (values) => {
            await onSubmit(values.name);
            closeModal();
          })}
        >
          <Typography variant='h3' sx={{ mt: 3 }}>
            Adauga termen
          </Typography>

          <FormControl fullWidth sx={{ mt: 4 }}>
            <TextField
              autoComplete='off'
              fullWidth
              label='Nume'
              variant='outlined'
              error={false}
              helperText={''}
              {...form.register('name')}
            />
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <Button onClick={closeModal}>Anuleaza</Button>
            <Button type={'submit'} variant={'contained'}>
              Salveaza
            </Button>
          </Box>
        </form>
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
