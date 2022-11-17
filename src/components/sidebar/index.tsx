import React, { useContext } from 'react';
import { InteractiveComponentsContext } from 'contexts/interactiveComponentsContext';
import { styled, useTheme } from '@mui/material/styles';
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
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { SIDEBAR_BUTTONS_LIST } from 'constants/icons';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Sidebar() {
  const { isSidebarOpened, toggleSidebar, selectedIndex, selectIndex } = useContext(
    InteractiveComponentsContext,
  );
  const theme = useTheme();
  const DRAWER_WIDTH = isSidebarOpened ? 210 : 100;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          transition: 'width 0.2s',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            transition: 'width 0.2s',
            boxSizing: 'border-box',
            top: 65,
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.text.secondary,
          },
        }}
        variant='persistent'
        anchor='left'
        open={true}
      >
        <DrawerHeader>
          <IconButton
            onClick={toggleSidebar}
            sx={[{ '&:hover': { backgroundColor: theme.palette.common.white } }]}
          >
            {isSidebarOpened ? (
              <ChevronLeftIcon color='secondary' />
            ) : (
              <ChevronRightIcon color='secondary' />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{
            '&& .Mui-selected': {
              backgroundColor: '#303b54',
            },
          }}
        >
          {SIDEBAR_BUTTONS_LIST.map(({ key, Icon }) => (
            <ListItemButton
              key={key}
              divider={true}
              selected={selectedIndex === key}
              onClick={() => selectIndex(key)}
            >
              <ListItem
                key={key}
                sx={{
                  height: 89,
                }}
              >
                <ListItemIcon>
                  <Icon fontSize='large' color='secondary' />
                </ListItemIcon>
                {isSidebarOpened && <ListItemText primary={key} />}
              </ListItem>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
