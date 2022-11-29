import React, { useContext } from 'react';
import { Box, AppBar, Toolbar, IconButton, Badge, Tooltip } from '@mui/material';
import { LeftSide, RightSide, StyledContainer } from './styled';
import {
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  GridOnOutlined as GridOnOutlinedIcon,
} from '@mui/icons-material';
import { ProfileModal } from 'components/modal/profile';
import { InteractiveComponentsContext } from 'contexts/interactiveComponentsContext';

export default function TopBar() {
  const { openModal } = useContext(InteractiveComponentsContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color='transparent'>
        <Toolbar>
          <StyledContainer>
            <LeftSide></LeftSide>
            <RightSide>
              <Box sx={{ display: { md: 'flex' } }}>
                <Tooltip title='Monitor'>
                  <IconButton size='large' aria-label='dashboard' color='inherit'>
                    <GridOnOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Notificari'>
                  <IconButton size='large' aria-label='show 3 new notifications' color='inherit'>
                    <Badge badgeContent={3} color='error'>
                      <NotificationsIcon />
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
                    onClick={openModal}
                  >
                    <PersonIcon />
                  </IconButton>
                </Tooltip>
                <ProfileModal />
              </Box>
            </RightSide>
          </StyledContainer>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
