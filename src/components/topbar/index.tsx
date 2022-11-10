import React from 'react';
import { Box, AppBar, Toolbar, IconButton, Badge, Tooltip } from '@mui/material';
import { LeftSide, RightSide, StyledContainer } from './styled';
import { Person, Notifications, GridOnOutlined } from '@mui/icons-material';

export default function TopBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='transparent'>
        <Toolbar>
          <StyledContainer>
            <LeftSide>Left side</LeftSide>
            <RightSide>
              <Box sx={{ display: { md: 'flex' } }}>
                <Tooltip title='Monitor'>
                  <IconButton size='large' aria-label='dashboard' color='inherit'>
                    <GridOnOutlined />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Notificari'>
                  <IconButton size='large' aria-label='show 3 new notifications' color='inherit'>
                    <Badge badgeContent={3} color='error'>
                      <Notifications />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title='Profilul meu'>
                  <IconButton
                    size='large'
                    edge='end'
                    aria-label='account of current user'
                    aria-haspopup='true'
                    color='inherit'
                  >
                    <Person />
                  </IconButton>
                </Tooltip>
              </Box>
            </RightSide>
          </StyledContainer>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
