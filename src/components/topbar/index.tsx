import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { LeftSide, RightSide, StyledContainer } from './styled';

export default function TopBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='transparent'>
        <Toolbar>
          <StyledContainer>
            <LeftSide>Left side</LeftSide>
            <RightSide>Right side</RightSide>
          </StyledContainer>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
