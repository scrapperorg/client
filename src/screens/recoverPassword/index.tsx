import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, TextField, Typography, Box, Divider, Snackbar, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import { authApiService } from '../../services/api/AuthApiService';
import { LoadingButton } from '@mui/lab';

interface RecoverPasswordFormValues {
  email: string;
  password: string;
}

const recoverPasswordSchema = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Adresa de email trebuie sa fie de forma nume@adresa.ceva',
      'string.empty': 'Acest camp este obligatoriu',
    }),
});

export default function RecoverPasswordScreen() {
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const recoverPasswordForm = useForm<RecoverPasswordFormValues>({
    mode: 'onChange',
    defaultValues: { email: '' },
    resolver: joiResolver(recoverPasswordSchema),
  });

  const handleSubmit = async ({ email }: RecoverPasswordFormValues) => {
    setShowLoading(true);
    const response = await authApiService.recoverPassword(email);

    if (!response.success) {
      setShowLoading(false);
      setShowError(true);
      return;
    }

    setShowLoading(false);
    // setShowSuccessMessage();
  };

  return (
    <Background>
      <ContentCard>
        <HeadersContainer>
          <Typography variant='h1' align='center'>
            Recupereaza parola
          </Typography>
          <Typography variant='h6' align='center'>
            Introdu emailul asociat contului tau pentru a iti recupera parola
          </Typography>
        </HeadersContainer>

        <form onSubmit={recoverPasswordForm.handleSubmit(handleSubmit)}>
          <TextField
            fullWidth
            label='Email'
            variant='outlined'
            error={Boolean(recoverPasswordForm.formState.errors.email)}
            helperText={recoverPasswordForm.formState.errors.email?.message}
            {...recoverPasswordForm.register('email')}
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
            Recupereaza parola
          </LoadingButton>
        </form>
      </ContentCard>

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

export const ContentCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(8)};
  max-width: 500px;
`;
