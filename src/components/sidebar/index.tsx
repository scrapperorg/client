import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { StyledListItem, StyledListItemHeader } from './styled';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';
import LaptopWindowsOutlinedIcon from '@mui/icons-material/LaptopWindowsOutlined';
import ScreenSearchDesktopOutlinedIcon from '@mui/icons-material/ScreenSearchDesktopOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export default function TopBar({ sidebarState }: any) {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
    sidebarState(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    sidebarState(false);
  };

  const sidebarButtonsList = [
    {
      key: 'Monitor',
      Icon: GridOnOutlinedIcon,
    },
    {
      key: 'Document',
      Icon: DescriptionOutlinedIcon,
    },
    {
      key: 'Cautare Documente',
      Icon: PlagiarismOutlinedIcon,
    },
    {
      key: 'Proiect',
      Icon: LaptopWindowsOutlinedIcon,
    },
    {
      key: 'Cautare Proiecte',
      Icon: ScreenSearchDesktopOutlinedIcon,
    },
    {
      key: 'Optiuni',
      Icon: SettingsOutlinedIcon,
    },
    {
      key: 'Profilul meu',
      Icon: PersonOutlineOutlinedIcon,
    },
  ];

  return (
    <>
      {!open && (
        <IconButton
          onClick={handleDrawerOpen}
          color='inherit'
          aria-label='open drawer'
          edge='start'
          sx={{ mt: 2 }}
        >
          <ChevronRightIcon />
        </IconButton>
      )}
      {open && (
        <Box
          sx={{
            flexGrow: 1,
            boxShadow: 20,
            borderRadius: 6,
            paddingY: 2,
            maxWidth: 160,
            minWidth: 160,
          }}
        >
          <IconButton
            onClick={handleDrawerClose}
            color='inherit'
            aria-label='open drawer'
            edge='start'
            sx={{ ml: 17, zIndex: 2, position: 'absolute' }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <StyledListItemHeader>
            <span>Ion Ionescu</span>
            <span>Specialist</span>
          </StyledListItemHeader>
          {sidebarButtonsList.map(({ key, Icon }) => (
            <StyledListItem key={key} disablePadding>
              <ListItemIcon>
                <Icon fontSize='large' />
              </ListItemIcon>
              <ListItemText primary={key} />
            </StyledListItem>
          ))}
        </Box>
      )}
    </>
  );
}
