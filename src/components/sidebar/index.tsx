import React, { useState } from 'react';
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
import { Menu, ChevronLeft } from '@mui/icons-material';
import {
  GridOnOutlined,
  DescriptionOutlined,
  PlagiarismOutlined,
  LaptopWindowsOutlined,
  ScreenSearchDesktopOutlined,
  SettingsOutlined,
  PersonOutlineOutlined,
} from '@mui/icons-material';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const sidebarButtonsList = [
  {
    key: 'Monitor',
    Icon: GridOnOutlined,
  },
  {
    key: 'Document',
    Icon: DescriptionOutlined,
  },
  {
    key: 'Cautare Documente',
    Icon: PlagiarismOutlined,
  },
  {
    key: 'Proiect',
    Icon: LaptopWindowsOutlined,
  },
  {
    key: 'Cautare Proiecte',
    Icon: ScreenSearchDesktopOutlined,
  },
  {
    key: 'Optiuni',
    Icon: SettingsOutlined,
  },
  {
    key: 'Profilul meu',
    Icon: PersonOutlineOutlined,
  },
];

export default function Sidebar({ sidebarState }: any) {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
    sidebarState(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    sidebarState(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <IconButton
        color='secondary'
        aria-label='open drawer'
        onClick={handleDrawerOpen}
        edge='start'
        sx={{ mr: 2, ...(open && { display: 'none' }) }}
      >
        <Menu sx={{ position: 'fixed', left: '5px' }} />
      </IconButton>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            top: 65,
            backgroundColor: '#111827',
            color: '#A0AEC0',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft color='secondary' />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sidebarButtonsList.map(({ key, Icon }) => (
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
