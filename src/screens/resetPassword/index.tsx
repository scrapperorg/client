import React  from 'react';
import styled from 'styled-components';
import { Card, Snackbar, Alert, Typography } from '@mui/material';
import { ResetForm } from './components/resetForm';
import { TokenValidation } from './components/tokenValidation';
import { Link } from 'react-router-dom';
import PATHS from 'constants/paths';
import {useResetPasswordForm} from "./hooks/useResetPasswordForm";

const ResetSuccessMessage = () => (
  <Typography variant='h3' align='center'>
      Parola a fost resetata cu success. <br/>
      <Link to={PATHS.LOGIN}>Autentificati-va</Link> cu noua parola aici.
  </Typography>
)

export default function ResetPasswordScreen() {
  const {
    isTokenValidated, isPasswordReset, handleResetPassword,
    handleValidateToken, showResetLoading, showValidateLoading,
    showInvalidTokenMessage, showError, token, setShowError
  } = useResetPasswordForm();

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
