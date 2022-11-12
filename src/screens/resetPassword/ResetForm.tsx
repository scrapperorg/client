import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Typography} from '@mui/material';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import { LoadingButton } from '@mui/lab';

export interface ResetPasswordFormValues {
  password: string;
  repeat_password: string;
}

const resetPasswordSchema = joi.object({
  password: joi
    .string()
    .alphanum()
    .required()
    .messages({ 'string.empty': 'Acest camp este obligatoriu' }),

  repeat_password: joi
    .ref('password')
})
  .with('password', 'repeat_password');


interface RestFormProps {
  showLoading: boolean;
  showResetSuccessMessage: boolean;
  handleSubmit: (props: ResetPasswordFormValues) => void;
}

export const ResetForm = ({ handleSubmit, showLoading, showResetSuccessMessage } : RestFormProps) => {

  const recoverPasswordForm = useForm<ResetPasswordFormValues>({
    mode: 'onChange',
    defaultValues: { password: '', repeat_password: 'password' },
    resolver: joiResolver(resetPasswordSchema),
  });

  return (
    <>
      <HeadersContainer>
        <Typography variant='h1' align='center'>
          Reseteaza parola
        </Typography>
        <Typography variant='h6' align='center'>
          Introdu noua parola
        </Typography>
      </HeadersContainer>

      <form onSubmit={recoverPasswordForm.handleSubmit(handleSubmit)}>
        <TextField
          fullWidth
          label='Parola'
          type='password'
          variant='outlined'
          error={Boolean(recoverPasswordForm.formState.errors.password)}
          helperText={recoverPasswordForm.formState.errors.password?.message}
          {...recoverPasswordForm.register('password')}
        />
        <br />

        <TextField
          fullWidth
          label='Repeta Parola'
          type='password'
          variant='outlined'
          error={Boolean(recoverPasswordForm.formState.errors.password)}
          helperText={recoverPasswordForm.formState.errors.password?.message}
          {...recoverPasswordForm.register('repeat_password')}
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
          Reseteaza parola
        </LoadingButton>
      </form>
    </>
  )
}

export const FormFullWith = styled.form`
  width: 100%;
`;

export const HeadersContainer = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(8)};
`;