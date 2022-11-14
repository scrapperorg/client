import React  from 'react';
import styled from 'styled-components';
import { TextField, Typography} from '@mui/material';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import { LoadingButton } from '@mui/lab';

export interface RecoverPasswordFormValues {
  email: string;
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

export interface RecoverFormProps {
  showLoading: boolean;
  handleSubmit: (props: RecoverPasswordFormValues) => void;
}

export const RecoverForm = ({ handleSubmit, showLoading } : RecoverFormProps) => {

  const recoverPasswordForm = useForm<RecoverPasswordFormValues>({
    mode: 'onChange',
    defaultValues: { email: '' },
    resolver: joiResolver(recoverPasswordSchema),
  });

  return (
    <>
      <HeadersContainer>
          <Typography variant='h1' align='center'>
            Reseteaza parola
          </Typography>
          <Typography variant='h6' align='center'>
            Introdu emailul asociat contului tau pentru a incepe procesul de resetare a parolei
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
            Trimite
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