import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { OptionsContext } from '../../context';
import { OptionsTable } from '../keywordsTable';

export default function OptionsContent() {
  const { keywords } = useContext(OptionsContext);

  return (
    <>
      <ButtonBox>
        <Button variant='contained'>
          Adauga termen
        </Button>
      </ButtonBox>
      <Box>
        <OptionsTable keywords={keywords} />
      </Box>
    </>
  );
}

const ButtonBox = styled(Box)`
  display: flex;
  justify-content: end;
  padding: 15px 0;
`;
