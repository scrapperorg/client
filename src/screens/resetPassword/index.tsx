import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Snackbar, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ResetForm, ResetPasswordFormValues } from './ResetForm';
import { HandleValidateProps, TokenValidation } from './TokenValidation';
import { authApiService } from '../../services/api/AuthApiService';



export default function ResetPasswordScreen() {
  const [showError, setShowError] = useState(false);
  const [showInvalidTokenMessage, setShowInvalidTokenMessage] = useState(false);
  const [showResetSuccessMessage, setShowResetSuccessMessage] = useState(false);
  const [showResetLoading, setShowResetLoading] = useState(false);
  const [showValidateLoading, setShowValidateLoading] = useState(true);
  const [isTokenValidated, setIsTokenValidated] = useState(false);

  const { token='' } = useParams();

  const handleResetPassword = async ({ password, repeat_password }: ResetPasswordFormValues) => {
    setShowResetLoading(true);
    const response = await authApiService.resetPassword(token, password);
  
    if (!response.success) {
      setShowResetLoading(false);
      setShowError(true);
      return;
    }
  
    setShowResetLoading(false);
    setShowResetSuccessMessage(true);
  };

  const handleValidateToken = async ({ token }: HandleValidateProps) => {
    setShowValidateLoading(true);
    const response = await authApiService.validateResetPasswordToken(token);

    if(response?.status === 404) {
      setShowValidateLoading(false);
      setShowInvalidTokenMessage(true);
      return;
    }

    if(!response.success) {
      setShowValidateLoading(false);
      setShowError(true)
      return;
    }

    setShowValidateLoading(false);
    setIsTokenValidated(true);
  }

  const content = isTokenValidated
    ? <ResetForm
        handleSubmit={handleResetPassword}
        showLoading={showResetLoading}
        showResetSuccessMessage={showResetSuccessMessage}
      />
    : <TokenValidation
        token={token}
        handleValidateToken={handleValidateToken}  
        showLoading={showValidateLoading}
        showInvalidTokenMessage={showInvalidTokenMessage}
    />

  return (
    <Background>
      <ContentCard>
        {content}
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
