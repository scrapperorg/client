import React from 'react';
import styled from 'styled-components';
import { Button, Card, TextField, Typography, Box, Divider } from '@mui/material';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import { Link } from 'react-router-dom';
import PATHS from 'constants/paths';

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
  const loginForm = useForm({
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
    resolver: joiResolver(loginSchema),
  });

  console.log(loginForm.formState.errors.email);

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

        <form onSubmit={loginForm.handleSubmit((data) => console.log(data))}>
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
            label='Password'
            variant='outlined'
            {...loginForm.register('password')}
            error={Boolean(loginForm.formState.errors.password)}
            helperText={loginForm.formState.errors.password?.message}
          />
          <br />

          <Button fullWidth type='submit' variant='contained' color='primary' size='large'>
            Intra in cont
          </Button>
        </form>

        <Box marginY={4}>
          <Divider />
        </Box>

        <Link to={PATHS.RESET_PASSWORD}>Am uitat parola</Link>
        <br />
        <Link to={PATHS.RECOVER_PASSWORD}>Recupereaza parola</Link>
      </LoginCard>
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
