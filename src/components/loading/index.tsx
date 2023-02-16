import React from 'react';
import styled from 'styled-components';
import { Box, CircularProgress } from '@mui/material';

const StyledLoading = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FullLoading = styled(StyledLoading)`
  height: 100vh;
`;

export function FullScreenLoading() {
  return (
    <FullLoading>
      <CircularProgress />
    </FullLoading>
  );
}

export function Loading() {
  return (
    <StyledLoading>
      <CircularProgress />
    </StyledLoading>
  );
}