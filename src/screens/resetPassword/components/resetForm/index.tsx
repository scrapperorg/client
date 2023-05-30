import React  from 'react';
import styled from 'styled-components';
import { TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next'

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
  handleSubmit: (props: ResetPasswordFormValues) => void;
}

export const ResetForm = ({ handleSubmit, showLoading } : RestFormProps) => {

  const recoverPasswordForm = useForm<ResetPasswordFormValues>({
    mode: 'onChange',
    defaultValues: { password: '', repeat_password: 'password' },
    resolver: joiResolver(resetPasswordSchema),
  });
  const { t } = useTranslation();

  return (
    <>
      <HeadersContainer>
        <Typography variant='h1' align='center'>
          {t('resetPassword.resetPass')}
        </Typography>
        <Typography variant='h6' align='center'>
          {t('resetPassword.reenterPass')}
        </Typography>
      </HeadersContainer>

      <form onSubmit={recoverPasswordForm.handleSubmit(handleSubmit)}>
        <TextField
          fullWidth
          label={t('resetPassword.pass')}
          type='password'
          variant='outlined'
          error={Boolean(recoverPasswordForm.formState.errors.password)}
          helperText={recoverPasswordForm.formState.errors.password?.message}
          {...recoverPasswordForm.register('password')}
        />
        <br />

        <TextField
          fullWidth
          label={t('resetPassword.repeatPass')}
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
          {t('resetPassword.resetPass')}
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