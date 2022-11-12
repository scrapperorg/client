import React from 'react';
import { Typography } from '@mui/material';

export interface HandleValidateProps {
  token: string;
}

interface TokenValidationProps {
  token: string | undefined;
  showLoading: boolean;
  showInvalidTokenMessage: boolean;
  handleValidateToken: (props: HandleValidateProps) => void;
}

export const TokenValidation = ({ token, handleValidateToken, showLoading, showInvalidTokenMessage }: TokenValidationProps) => (
  <Typography variant='h2' align='center'>
    Tokenul este invalid sau expirat
  </Typography>
)