import React, { useContext } from 'react';
import { InteractiveComponentsContext } from 'contexts/interactiveComponentsContext';
import { styled } from '@mui/material/styles';
import {
  Box,
  Drawer,
  CssBaseline,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { SIDEBAR_BUTTONS_LIST } from 'constants/icons';

const DRAWER_WIDTH = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Sidebar() {
  const { isSidebarOpened, toggleSidebar } = useContext(InteractiveComponentsContext);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <IconButton
        color='secondary'
        aria-label='open drawer'
        onClick={toggleSidebar}
        edge='start'
        sx={{ mr: 2, ...(isSidebarOpened && { display: 'none' }) }}
      >
        <MenuIcon sx={{ position: 'fixed', left: '5px' }} />
      </IconButton>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            top: 65,
            backgroundColor: '#111827',
            color: '#A0AEC0',
          },
        }}
        variant='persistent'
        anchor='left'
        open={isSidebarOpened}
      >
        <DrawerHeader>
          <IconButton onClick={toggleSidebar}>
            <ChevronLeftIcon color='secondary' />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {SIDEBAR_BUTTONS_LIST.map(({ key, Icon }) => (
            <ListItemButton key={key} divider={true}>
              <ListItem key={key}>
                <ListItemIcon>
                  <Icon fontSize='large' color='secondary' />
                </ListItemIcon>
                <ListItemText primary={key} />
              </ListItem>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
