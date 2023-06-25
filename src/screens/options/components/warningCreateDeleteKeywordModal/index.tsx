import React, { useContext } from 'react';
import { InteractiveComponentsContext } from 'contexts/interactiveComponentsContext';
import { Modal } from 'components/modal';
import { Box, Button, IconButton, styled, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ModalNames } from 'constants/modals';
import { KeywordDto } from '../../../../services/api/dtos/keyword';
import { useTranslation } from 'react-i18next';

interface DeleteKeywordModalProps {
  onYes: () => void;
  onSetKeywordToDelete: (keyword: KeywordDto | null) => void;
}

export const WarningCreateDeleteKeywordModal = ({
  onYes,
  onSetKeywordToDelete,
}: DeleteKeywordModalProps) => {
  const { modalName, closeModal } = useContext(InteractiveComponentsContext);
  const { t } = useTranslation();

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
        <Typography variant='h3'>{t('options.deleteTermTitle')}</Typography>
        <br />
        <Typography variant='h3' sx={{ mb: 3 }}>
          {t('options.firstAttentionMessage')}
          <br />
          {t('options.secondAttentionMessage')}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <Button
            onClick={() => {
              onSetKeywordToDelete(null);
              closeModal();
            }}
          >
            {t('options.noDelete')}
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={async () => {
              await onYes();
            }}
          >
            {t('options.yesDelete')}
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
