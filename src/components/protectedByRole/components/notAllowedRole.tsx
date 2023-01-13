import React from 'react';
import styled from 'styled-components';
import { Box, Typography } from '@mui/material';

const StyledLoading = styled(Box)`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export function NotAllowedRole() {
  return (
    <StyledLoading>
      <Typography>Sorry, you are not allowed to see this section.</Typography>
    </StyledLoading>
  );
}
