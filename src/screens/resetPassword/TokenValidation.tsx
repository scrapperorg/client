import React, { useEffect } from 'react';
import styled from 'styled-components';
import { CircularProgress, Typography } from '@mui/material';

interface TokenValidationProps {
  showLoading: boolean;
  showInvalidTokenMessage: boolean;
  handleValidateToken: () => void;
}

const LoadingMessage = () => (
  <LoadingContainer>
    <CircularProgress />
  </LoadingContainer>
)

const InvalidTokenMessage = () => (
  <Typography variant='h4' align='center'>
      Linkul de resetare a parolei este invalid, sau a expirat. <br/>
      Va rugam sa reluati procesul de recuperare a parolei.
  </Typography>
)

export const TokenValidation = ({ handleValidateToken, showLoading, showInvalidTokenMessage }: TokenValidationProps) => {
  useEffect(() => {
    // react will trigger this twice in dev mode: https://stackoverflow.com/questions/72238175/useeffect-is-running-twice-on-mount-in-react
    (async function() { handleValidateToken() })();
  }, []);

  const content = showLoading
    ? <LoadingMessage />
    : showInvalidTokenMessage
      ? <InvalidTokenMessage />
      : null

  return content
}

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
`