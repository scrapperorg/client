import React, { useContext, useEffect } from 'react';
import { InteractiveComponentsContext } from 'contexts/interactiveComponentsContext';
import { Modal } from 'components/modal';
import { Box, Button, FormControl, IconButton, styled, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ModalNames } from 'constants/modals';
import { useForm } from 'react-hook-form';
import { KeywordDto } from '../../../../services/api/dtos/keyword';
import { useTranslation } from 'react-i18next';

interface CreateKeywordModalProps {
  keyword: KeywordDto | null;
  onSubmit: (name: string) => void;
  onSetKeyword: (keyword: KeywordDto | null) => void;
}

export const CreateEditKeywordModal = ({
  keyword,
  onSubmit,
  onSetKeyword,
}: CreateKeywordModalProps) => {
  const { modalName, closeModal } = useContext(InteractiveComponentsContext);
  const form = useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (keyword) {
      form.reset({ name: keyword.name });
    }
  }, [keyword]);

  return (
    <Modal isModalOpened={modalName === ModalNames.ADD_EDIT_KEYWORD} closeModal={closeModal}>
      <StyledModalCloseButton
        aria-label='close'
        onClick={() => {
          onSetKeyword(null);
          closeModal();
        }}
      >
        <CloseIcon />
      </StyledModalCloseButton>
      <StyledModalContainer>
        <form
          onSubmit={form.handleSubmit(async (values) => {
            await onSubmit(values.name);
            closeModal();
            onSetKeyword(null);
          })}
        >
          <Typography variant='h3' sx={{ mt: 3 }}>
            {t(`options.${keyword ? 'editTerm' : 'addTerm'}`)}
          </Typography>

          <FormControl fullWidth sx={{ mt: 4 }}>
            <TextField
              autoComplete='off'
              fullWidth
              label={t('options.name')}
              variant='outlined'
              error={false}
              helperText={''}
              {...form.register('name')}
            />
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <Button
              onClick={() => {
                closeModal();
                onSetKeyword(null);
              }}
            >
              {t('generic.cancel')}
            </Button>
            <Button type={'submit'} variant={'contained'}>
              {t('generic.save')}
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
