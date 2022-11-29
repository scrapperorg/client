import React from 'react';
import styled from 'styled-components';
import { Card, TextField, Typography, Box, Divider, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import PATHS from 'constants/paths';
import { LoadingButton } from '@mui/lab';
import {useLoginForm} from "./hooks/useLoginForm";

export default function LoginScreen() {
  const { handleSubmit, showLoading, showError, loginForm, setShowError } = useLoginForm();

  return (
    <Background>
      <LoginCard>
        <HeadersContainer>
          <Typography variant='h1' align='center'>
            Intra in cont
          </Typography>
          <Typography variant='h6' align='center'>
            Foloseste credentialele pentru a accesa contul
          </Typography>
        </HeadersContainer>

        <form onSubmit={loginForm.handleSubmit(handleSubmit)}>
          <TextField
            fullWidth
            label='Email'
            variant='outlined'
            error={Boolean(loginForm.formState.errors.email)}
            helperText={loginForm.formState.errors.email?.message}
            {...loginForm.register('email')}
          />
          <br />
          <TextField
            fullWidth
            type='password'
            label='Password'
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
            Intra in cont
          </LoadingButton>
        </form>

        <Box marginY={4}>
          <Divider />
        </Box>
        <Link to={PATHS.RECOVER_PASSWORD}>Am uitat parola</Link>
      </LoginCard>

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setShowError(false)} severity='error' sx={{ width: '100%' }}>
          Ceva nu a mers bine, te rugam sa incerci din nou
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
