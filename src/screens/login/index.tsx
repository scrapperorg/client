import React from 'react';
import styled from 'styled-components';
import { Card, TextField, Typography, Box, Divider, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import PATHS from 'constants/paths';
import { LoadingButton } from '@mui/lab';
import {useLoginForm} from "./hooks/useLoginForm";
import { useTranslation } from 'react-i18next'

export default function LoginScreen() {
  const { handleSubmit, showLoading, showError, loginForm, setShowError } = useLoginForm();
  const { t } = useTranslation();

  return (
    <Background>
      <LoginCard>
        <HeadersContainer>
          <Typography variant='h1' align='center'>
            {t('login.title')}
          </Typography>
          <Typography variant='h6' align='center'>
            {t('login.subtitle')}
          </Typography>
        </HeadersContainer>

        <form onSubmit={loginForm.handleSubmit(handleSubmit)}>
          <TextField
            fullWidth
            label={t('login.email')}
            variant='outlined'
            error={Boolean(loginForm.formState.errors.email)}
            helperText={loginForm.formState.errors.email?.message}
            {...loginForm.register('email')}
          />
          <br />
          <TextField
            fullWidth
            type='password'
            label={t('login.password')}
            variant='outlined'
            {...loginForm.register('password')}
            error={Boolean(loginForm.formState.errors.password)}
            helperText={loginForm.formState.errors.password?.message}
          />
          <br />

          <LoadingButton
            fullWidth
            type='submit'
            variant='contained'
            color='primary'
            size='large'
            loading={showLoading}
          >
            {t('login.login')}
          </LoadingButton>
        </form>

        <Box marginY={4}>
          <Divider />
        </Box>
        <Link to={PATHS.RECOVER_PASSWORD}>{t('login.forgotPass')}</Link>
      </LoginCard>

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setShowError(false)} severity='error' sx={{ width: '100%' }}>
          {t('generic.error')}
        </Alert>
      </Snackbar>
    </Background>
  );
}

export const HeadersContainer = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(8)};
`;

export const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100vw;
  height: 100vh;
  padding: ${(props) => props.theme.spacing(8)};
  background-color: ${(props) => props.theme.palette.primary.dark};
`;

export const LoginCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(8)};
  max-width: 500px;
`;
