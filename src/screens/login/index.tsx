import React from 'react';
import styled from 'styled-components';
import { Button, Card, TextField, Typography, Box } from '@mui/material';

export default function LoginScreen() {
  return (
    <Background>
      <LoginCard>
        <HeadersContainer>
          <Typography variant='h1' align='center'>
            Login
          </Typography>
          <Typography variant='h6' align='center'>
            Use your work credentials to login
          </Typography>
        </HeadersContainer>

        <TextField label='Email' variant='outlined' />
        <br />
        <TextField label='Password' variant='outlined' />
        <br />

        <Button variant='contained' color='primary' size='large'>
          Log in
        </Button>
      </LoginCard>
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
