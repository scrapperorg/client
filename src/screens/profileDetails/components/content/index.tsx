import React, { useState } from 'react';
import { useContext } from 'react';
import { Box, Grid, Typography, Avatar, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { AuthContext } from 'contexts/authContext';
import { capitalizeString } from 'helpers/formatters';
import { RoleDescription } from 'constants/roles';
import { Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import TodayIcon from '@mui/icons-material/Today';
import dayjs from 'dayjs';
import 'dayjs/locale/ro';
import { UploadPhoto } from '../uploadPhoto';
import config from 'config';
import { useTranslation } from 'react-i18next';
import { ChangePasswordModal } from 'screens/usersManagement/components/modals/changePasswordModal';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const formattedCreationDate = dayjs(user?.createdAt).locale('ro').format('dddd, DD MMMM YYYY');

  const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const { t } = useTranslation();

  return (
    <Grid container spacing={10}>
      <Grid item xs={12} md={3}>
        <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
          <Avatar
            alt={user?.name}
            src={`data:image/png;base64,${user?.avatar}`}
            sx={{ width: 180, height: 180 }}
          />
        </Box>
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
        >
          <UploadPhoto
            serverUrl={`${config.BASE_URL}/user/${user?.id}/avatar`}
            labelText={t('profile.uploadPhoto')}
          />
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
            <ListItemText primary={user?.email} secondary='Email' />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <BadgeIcon />
            </ListItemIcon>
            <ListItemText
              primary={user?.role ? RoleDescription[user?.role] : 'Lipsa rol'}
              secondary='Rol'
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <TodayIcon />
            </ListItemIcon>
            <ListItemText primary={formattedCreationDate} secondary='Data creare cont' />
          </ListItem>
          <ListItem disableGutters>
            <Button
              variant='contained'
              onClick={() => {
                setChangePasswordModalOpen(true);
                setCurrentUserId(user?.id || null);
              }}
            >
              {t('usersManagement.changePasswordConfirmation')}
            </Button>
            <ChangePasswordModal
              isOpened={isChangePasswordModalOpen}
              closeModal={() => setChangePasswordModalOpen(false)}
              currentUserId={currentUserId}
              setCurrentUserId={setCurrentUserId}
            />
          </ListItem>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
