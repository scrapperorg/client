import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Snackbar, Alert, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ResetForm, ResetPasswordFormValues } from './ResetForm';
import { TokenValidation } from './TokenValidation';
import { authApiService } from '../../services/api/AuthApiService';
import { Link } from 'react-router-dom';
import PATHS from 'constants/paths';

export interface HandleValidateProps {
  token: string;
}

const ResetSuccessMessage = () => (
  <Typography variant='h3' align='center'>
      Parola a fost resetata cu success. <br/>
      <Link to={PATHS.LOGIN}>Autentificati-va</Link> cu noua parola aici.
  </Typography>
)

export default function ResetPasswordScreen() {
  const [showError, setShowError] = useState(false);
  const [showInvalidTokenMessage, setShowInvalidTokenMessage] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [showResetLoading, setShowResetLoading] = useState(false);
  const [showValidateLoading, setShowValidateLoading] = useState(false);
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
    setIsPasswordReset(true);
  };

  const handleValidateToken = async ({ token }: HandleValidateProps) => {
    setShowValidateLoading(true);
    const response = await authApiService.validateResetPasswordToken(token);

    if(response?.status === 404) {
      setTimeout(() => {
        setShowValidateLoading(false);
        setShowInvalidTokenMessage(true);
      }, 1000);
      return;
    }

    if(!response.success) {
      setShowValidateLoading(false);
      setShowError(true)
      return;
    }

    setTimeout(() => {
      setShowValidateLoading(false);
      setIsTokenValidated(true);
    }, 1000);
  }

  const content = isTokenValidated
    ? 
      isPasswordReset
        ? <ResetSuccessMessage />
        : <ResetForm
            handleSubmit={handleResetPassword}
            showLoading={showResetLoading}
          />
    : <TokenValidation
        handleValidateToken={() => handleValidateToken({ token })}  
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
