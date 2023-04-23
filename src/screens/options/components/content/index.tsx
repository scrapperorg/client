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

export default function OptionsContent() {
  const { keywords } = useContext(OptionsContext);
  const { openModal } = useModal(ModalNames.ADD_EDIT_KEYWORD);
  const { deleteKeyword, createKeyword, updateKeyword } = useOptions();

  return (
    <>
      <ButtonBox>
        <Button variant='contained' onClick={openModal}>
          Adauga termen
        </Button>
      </ButtonBox>
      <Box>
        <OptionsTable keywords={keywords} onDeleteKeyword={deleteKeyword} />
      </Box>
      <CreateEditKeywordModal onSubmit={createKeyword} />
    </>
  );
}

const ButtonBox = styled(Box)`
  display: flex;
  justify-content: end;
  padding: 15px 0;
`;
