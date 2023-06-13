import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { OptionsContext } from '../../context';
import { OptionsTable } from '../keywordsTable';
import { useModal } from '../../../usersManagement/hooks/useModal';
import { ModalNames } from '../../../../constants/modals';
import { CreateEditKeywordModal } from '../createKeywordModal';
import { useOptions } from '../../hooks/useOptions';
import { DeleteKeywordModal } from '../deleteKeywordModal';
import { useTranslation } from 'react-i18next';

export default function OptionsContent() {
  const { keywords } = useContext(OptionsContext);
  const { openModal: openCreateEditModal } = useModal(ModalNames.ADD_EDIT_KEYWORD);
  const { openModal: openDeleteModal } = useModal(ModalNames.DELETE_KEYWORD);
  const { keywordToEdit, deleteKeyword, createEditKeyword, setKeywordToEdit, setKeywordToDelete } =
    useOptions();
  const { t } = useTranslation();

  return (
    <>
      <ButtonBox>
        <Button variant='contained' onClick={openCreateEditModal}>
            {t('options.addTerm')}
        </Button>
      </ButtonBox>
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
      <DeleteKeywordModal onDelete={deleteKeyword} onSetKeywordToDelete={setKeywordToDelete} />
    </>
  );
}

const ButtonBox = styled(Box)`
  display: flex;
  justify-content: end;
  padding: 15px 0;
`;
