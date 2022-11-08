import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, TextField, Typography, Box, Divider, Snackbar, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import { Link } from 'react-router-dom';
import PATHS from 'constants/paths';
import { authApiService } from '../../services/api/AuthApiService';
import { LoadingButton } from '@mui/lab';

interface LoginFormValues {
  email: string;
  password: string;
}

const loginSchema = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Adresa de email trebuie sa fie de forma nume@adresa.ceva',
      'string.empty': 'Acest camp este obligatoriu',
    }),
  password: joi
    .string()
    .alphanum()
    .required()
    .messages({ 'string.empty': 'Acest camp este obligatoriu' }),
});

export default function LoginScreen() {
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const loginForm = useForm<LoginFormValues>({
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
    resolver: joiResolver(loginSchema),
  });

  const handleSubmit = async ({ email, password }: LoginFormValues) => {
    setShowLoading(true);
    const response = await authApiService.login(email, password);

    if (!response.success) {
      setShowLoading(false);
      setShowError(true);
      return;
    }

    setShowLoading(false);
    // TODO
    // REDIRECT TO DASHBOARD
    // ADD TOKEN TO CONTEXT
    // ADD TOKEN TO AUTH HEADER OF AXIOS INSTANCE
  };

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

        <Link to={PATHS.RESET_PASSWORD}>Am uitat parola</Link>
        <br />
        <Link to={PATHS.RECOVER_PASSWORD}>Recupereaza parola</Link>
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

export const FormFullWith = styled.form`
  width: 100%;
`;

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
