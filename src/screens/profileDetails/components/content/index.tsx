import * as React from 'react';
import { useContext } from 'react';
import { Box, Grid, Typography, Avatar, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { AuthContext } from 'contexts/authContext';
import { capitalizeString } from 'helpers/formatters';
import { RoleDescription } from 'constants/roles';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import TodayIcon from '@mui/icons-material/Today';
import dayjs from "dayjs";
import 'dayjs/locale/ro';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const formattedCreationDate = dayjs(user?.createdAt).locale('ro').format('dddd, DD MMMM YYYY');

  return (
    <Grid container spacing={10}>
      <Grid item xs={12} md={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Avatar alt='Remy Sharp' src='' sx={{ width: 180, height: 180}} />
        </Box>
      </Grid>
      <Grid item xs={12} md={9} sx={{ display: 'flex', justifyContent: 'left' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography variant='h2'>
            {`${capitalizeString(user?.name)} ${capitalizeString(user?.surname)}`}
          </Typography>
          <ListItem disableGutters>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary={user?.email} secondary="Email" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <BadgeIcon />
            </ListItemIcon>
            <ListItemText primary={user?.role ? RoleDescription[user?.role] : 'Lipsa rol'} secondary="Rol"/>
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <TodayIcon />
            </ListItemIcon>
            <ListItemText primary={formattedCreationDate} secondary="Data creare cont" />
          </ListItem>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
