import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Typography, Snackbar, Alert } from '@mui/material';
import { authApiService } from 'services/api/AuthApiService';
import { RecoverForm, RecoverPasswordFormValues } from './RecoverForm';


const RecoverSuccessMessage = () => (
  <Typography variant='h3' align='center'>
      Verificati-va adresa de email pentru a continua procesul de resetare a parolei.
  </Typography>
)

export default function RecoverPasswordScreen() {
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isRecoverSentSuccessfuly, setIsRecoverSentSuccessfuly] = useState(false);

  const handleSubmit = async ({ email }: RecoverPasswordFormValues) => {
    setShowLoading(true);
    const response = await authApiService.recoverPassword(email);

    if (!response.success) {
      setShowLoading(false);
      setShowError(true);
      return;
    }

    setShowLoading(false);
    setIsRecoverSentSuccessfuly(true);
  };

  const content = isRecoverSentSuccessfuly
    ? <RecoverSuccessMessage />
    : <RecoverForm
        handleSubmit={handleSubmit}
        showLoading={showLoading}
      />

  return (
    <Background>
      <ContentCard>
        { content }
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
