import React from 'react';
import styled from 'styled-components';
import { Box, CircularProgress } from '@mui/material';

const StyledLoading = styled(Box)`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default function Loading() {
  return (
    <StyledLoading>
      <CircularProgress />
    </StyledLoading>
  );
}
