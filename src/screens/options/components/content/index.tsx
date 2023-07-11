import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import styled from 'styled-components';
import { OptionsTable } from '../keywordsTable';
import { useModal } from '../../../usersManagement/hooks/useModal';
import { ModalNames } from '../../../../constants/modals';
import { CreateEditKeywordModal } from '../createKeywordModal';
import { useOptions } from '../../hooks/useOptions';
import { WarningCreateDeleteKeywordModal } from '../warningCreateDeleteKeywordModal';
import { useTranslation } from 'react-i18next';

export default function OptionsContent() {
  const { openModal: openCreateEditModal } = useModal(ModalNames.ADD_EDIT_KEYWORD);
  const { openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal(
    ModalNames.DELETE_KEYWORD,
  );
  const {
    keywords,
    filterKeywords,
    keywordToEdit,
    keywordToDelete,
    deleteKeyword,
    createEditKeyword,
    setKeywordToEdit,
    setKeywordToDelete,
  } = useOptions();
  const { t } = useTranslation();

  return (
    <>
      <ButtonBox>
        <Button
          variant='contained'
          onClick={() => {
            setKeywordToDelete(null);
            openDeleteModal();
          }}
        >
          {t('options.addTerm')}
        </Button>
      </ButtonBox>
      <TextField
        placeholder={t('options.searchKeyword')!}
        onChange={(e) => {
          filterKeywords(e.target.value);
        }}
      />
      <Box>
        <OptionsTable
          keywords={keywords}
          onDeleteKeyword={(keyword) => {
            setKeywordToDelete(keyword);
            openDeleteModal();
          }}
          onUpdateKeyword={(keyword) => {
            setKeywordToEdit(keyword);
            openCreateEditModal();
          }}
        />
      </Box>
      <CreateEditKeywordModal
        onSubmit={createEditKeyword}
        onSetKeyword={setKeywordToEdit}
        keyword={keywordToEdit}
      />
      <WarningCreateDeleteKeywordModal
        onYes={
          keywordToDelete
            ? async () => {
                await deleteKeyword();
                setKeywordToDelete(null);
                closeDeleteModal();
              }
            : openCreateEditModal
        }
        onSetKeywordToDelete={
          keywordToDelete
            ? () => {
                return null;
              }
            : setKeywordToDelete
        }
      />
    </>
  );
}

const ButtonBox = styled(Box)`
  display: flex;
  justify-content: end;
  padding: 15px 0;
`;
